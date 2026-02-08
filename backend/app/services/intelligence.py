from datetime import datetime
from typing import List, Optional
from sqlmodel import Session, select
from app.models import Signal, Lead, Company, Product
import re
import logging

logger = logging.getLogger(__name__)

class IntelligenceService:
    def __init__(self, session: Session):
        self.session = session
        self._ensure_products()

    def _ensure_products(self):
        """Seed initial products if they don't exist"""
        products = [
            {"name": "Furnace Oil", "keywords": "boiler,thermal,furnace,heating,manufacturing plant,factory,industrial unit"},
            {"name": "Bitumen", "keywords": "road,highway,pavement,NHAI,construction,laning,expressway"},
            {"name": "LDO (Light Diesel Oil)", "keywords": "genset,textile,power,auto,tractor,metal,steel"},
            {"name": "MTO (Mineral Turpentine Oil)", "keywords": "paint,coating,solvent,varnish,chemical"},
            {"name": "Hexane", "keywords": "extraction,solvent,pharma,fluorochemicals"},
        ]
        
        for p_data in products:
            stmt = select(Product).where(Product.name == p_data["name"])
            existing = self.session.exec(stmt).first()
            if not existing:
                prod = Product(
                    name=p_data["name"],
                    category="Industrial Fuel/Solvent",
                    keywords=p_data["keywords"]
                )
                self.session.add(prod)
            else:
                # Update keywords if changed (simple way to iterate logic)
                existing.keywords = p_data["keywords"]
                self.session.add(existing)
        self.session.commit()

    def extract_company_name(self, text: str) -> Optional[str]:
        """
        Heuristic-based company name extraction.
        """
        if not text:
            return None
            
        # Common legal suffixes
        suffixes = r"(?:Pvt\.? Ltd\.?|Limited|Ltd\.?|Inc\.?|Corp\.?|Corporation|LLC|Industries|Enterprises|Group|Infra|Chemicals|Petrochemicals|Construct|Systems|Motors|Energy)"
        
        # Regex 1: Capitalized words followed by a suffix
        pattern = fr"([A-Z][\w'&]+(?:\s+[A-Z][\w'&]+)*\s+{suffixes})"
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return match.group(1).strip()
            
        # Regex 2: Action verbs at start of sentence
        # "Mahindra to set up..."
        action_pattern = r"^([A-Z][\w'&]+(?:\s+[A-Z][\w'&]+)*)\s+(?:to set up|plans|launches|invests|signs|starts|commences|books|wins)"
        match = re.search(action_pattern, text, re.IGNORECASE)
        if match:
            return match.group(1).strip()
            
        # Regex 3: "X's new plant"
        possession_pattern = r"^([A-Z][\w'&]+)(?:'s|’s)\s+(?:new|largest|massive)"
        match = re.search(possession_pattern, text, re.IGNORECASE)
        if match:
             return match.group(1).strip()

        return None

    def infer_product(self, text: str) -> Optional[Product]:
        """
        Match text against product keywords to find the most likely product.
        """
        text_lower = text.lower()
        products = self.session.exec(select(Product)).all()
        
        best_match = None
        max_score = 0
        
        for prod in products:
            keywords = prod.keywords.lower().split(',')
            score = 0
            for kw in keywords:
                if kw in text_lower:
                    score += 1
            
            if score > max_score:
                max_score = score
                best_match = prod
                
        return best_match

    def calculate_confidence(self, signal: Signal, product: Product) -> float:
        """
        Advanced lead scoring with multiple factors:
        1. Intent Strength (0-0.35) - Tender vs vague mention
        2. Freshness (0-0.20) - Days since signal  
        3. Product Match (0-0.25) - Keyword alignment
        4. Company Size (0-0.20) - Investment/capacity mentions
        """
        from datetime import datetime, timezone
        
        score = 0.0
        title_lower = signal.title.lower()
        content = f"{signal.title} {signal.content_summary or ''}".lower()
        
        # 1. INTENT STRENGTH (0-0.35)
        if any(kw in title_lower for kw in ["tender", "floats tender", "invites tender"]):
            score += 0.35  # Explicit tender
        elif any(kw in title_lower for kw in ["mou", "signs", "agreement", "contract"]):
            score += 0.25  # Formal agreement
        elif any(kw in title_lower for kw in ["plans", "to set up", "to invest"]):
            score += 0.15  # Planned project
        elif any(kw in title_lower for kw in ["commissions", "launches", "opens"]):
            score += 0.20  # Already operational
        else:
            score += 0.05  # Vague mention
        
        # 2. FRESHNESS (0-0.20)
        if signal.published_date:
            try:
                if signal.published_date.tzinfo is None:
                    pub_date = signal.published_date.replace(tzinfo=timezone.utc)
                else:
                    pub_date = signal.published_date
                now = datetime.now(timezone.utc)
                days_old = (now - pub_date).days
                
                if days_old <= 3:
                    score += 0.20
                elif days_old <= 7:
                    score += 0.15
                elif days_old <= 30:
                    score += 0.10
                else:
                    score += 0.05
            except:
                score += 0.10
        else:
            score += 0.10
        
        # 3. PRODUCT MATCH (0-0.25)
        if product and product.keywords:
            keywords = [kw.strip() for kw in product.keywords.lower().split(',')]
            matches = sum(1 for kw in keywords if kw in content)
            score += min(0.25, matches * 0.05)
        
        # 4. COMPANY SIZE (0-0.20)
        if any(ind in content for ind in ["crore", "₹", "rs.", "investment"]):
            crore_pattern = r'(\d+(?:,\d+)*)\s*crore'
            match = re.search(crore_pattern, content)
            if match:
                amount = int(match.group(1).replace(',', ''))
                if amount >= 1000:
                    score += 0.20
                elif amount >= 100:
                    score += 0.15
                else:
                    score += 0.10
            else:
                score += 0.10
                
        return min(1.0, score)

    def process_signal(self, signal: Signal) -> Optional[Lead]:
        """
        Main pipeline: Signal -> Extraction -> Inference -> Lead
        """
        logger.info(f"Processing Signal ID {signal.id}: {signal.title}")
        
        # 1. Entity Resolution
        company_name = self.extract_company_name(signal.title) or self.extract_company_name(signal.content_summary)
        
        company = None
        if company_name:
            logger.info(f"  -> Extracted Company: {company_name}")
            # Check ID or create
            stmt = select(Company).where(Company.name == company_name)
            company = self.session.exec(stmt).first()
            if not company:
                company = Company(name=company_name)
                self.session.add(company)
                self.session.commit()
                self.session.refresh(company)
        else:
            logger.info("  -> No company extracted")

        # 2. Product Inference
        # Check both title and content
        search_text = f"{signal.title} {signal.content_summary}"
        product = self.infer_product(search_text)
        
        if product:
            logger.info(f"  -> Inferred Product: {product.name}")
        else:
            logger.info("  -> No product inferred")

        # 3. Create Lead
        # Only create lead if we found EITHER a company OR a strong product signal (e.g. strict tender)
        if company or product:
            confidence = self.calculate_confidence(signal, product)
            
            lead = Lead(
                signal_id=signal.id,
                company_id=company.id if company else None,
                status="NEW",
                confidence_score=confidence,
                notes=f"Auto-generated. Inferred Product: {product.name if product else 'Unknown'}"
            )
            self.session.add(lead)
            self.session.commit()
            logger.info(f"  -> Created Lead ID {lead.id} (Confidence: {confidence:.2f})")
            return lead
            
        return None

    def process_all_new_signals(self):
        """Batch process signals that don't have leads yet"""
        # Find signals with no leads
        # LEFT JOIN lead ON signal.id = lead.signal_id WHERE lead.id IS NULL
        # SQLModel support for this might be verbose, simpler to just iterate for now or use raw SQL
        # For simplicity in this hackathon context:
        
        signals = self.session.exec(select(Signal)).all()
        processed_count = 0
        for sig in signals:
            # Check if lead exists
            # This is N+1 but fine for small hackathon datasets
            existing_lead = self.session.exec(select(Lead).where(Lead.signal_id == sig.id)).first()
            if not existing_lead:
                self.process_signal(sig)
                processed_count += 1
                
        return processed_count
