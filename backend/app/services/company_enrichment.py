"""
Company Enrichment Service
Extracts additional company metadata from signals and AI analysis
"""
import re
import logging
from typing import Dict, Optional
from datetime import datetime
from app.models import Company, Signal

logger = logging.getLogger(__name__)

class CompanyEnrichment:
    """Extract and enrich company metadata from signals and AI results"""
    
    # Industry classification keywords
    INDUSTRY_MAP = {
        "Automotive": ["auto", "tractor", "vehicle", "car", "truck", "two-wheeler", "ev", "electric vehicle"],
        "Chemicals": ["chemical", "fluorochemical", "specialty chemicals", "petrochemical"],
        "Pharmaceuticals": ["pharma", "pharmaceutical", "drug", "medicine", "biotech"],
        "Infrastructure": ["road", "highway", "construction", "infrastructure", "bridge"],
        "Steel & Metals": ["steel", "metal", "iron", "aluminum", "alloy"],
        "Textiles": ["textile", "fabric", "garment", "weaving", "spinning"],
        "Energy": ["power", "energy", "solar", "renewable", "thermal plant"],
        "Manufacturing": ["manufacturing", "factory", "plant", "production facility"]
    }
    
    def enrich_from_signal(self, company: Company, signal: Signal, ai_result: Optional[Dict] = None) -> Company:
        """
        Enrich company data from signal and AI analysis
        """
        try:
            text = f"{signal.title} {signal.content_summary or ''}"
            
            # Extract location from signal or AI
            if ai_result and ai_result.get("location"):
                location = ai_result.get("location", "")
                if location and location != "Unknown":
                    self._parse_location(company, location)
            else:
                self._extract_location(company, text)
            
            # Classify industry
            if not company.industry:
                company.industry = self._classify_industry(text)
            
            # Extract investment/size info
            if not company.key_products:
                company.key_products = self._extract_key_products(text)
            
            # Extract contact hints (if publicly mentioned)
            self._extract_contact_hints(company, text)
            
            # Mark as enriched
            company.enriched_at = datetime.utcnow()
            company.data_source = "AI Extracted" if ai_result else "Signal Extracted"
            
            logger.info(f"Enriched company: {company.name} - {company.industry} in {company.city}, {company.state}")
            
        except Exception as e:
            logger.error(f"Error enriching company {company.name}: {e}")
        
        return company
    
    def _parse_location(self, company: Company, location_str: str):
        """Parse 'City, State' format"""
        parts = [p.strip() for p in location_str.split(',')]
        if len(parts) >= 2:
            company.city = parts[0]
            company.state = parts[1]
        elif len(parts) == 1:
            # Try to infer if it's a state or city
            company.state = parts[0]
    
    def _extract_location(self, company: Company, text: str):
        """Extract location from text using common patterns"""
        # Indian states
        states = [
            "Maharashtra", "Tamil Nadu", "Karnataka", "Gujarat", "Rajasthan",
            "Uttar Pradesh", "West Bengal", "Andhra Pradesh", "Telangana",
            "Kerala", "Madhya Pradesh", "Punjab", "Haryana", "Delhi"
        ]
        
        # Major cities
        cities = [
            "Mumbai", "Pune", "Chennai", "Bangalore", "Hyderabad", "Ahmedabad",
            "Kolkata", "Delhi", "Gurugram", "Noida", "Jaipur", "Lucknow"
        ]
        
        text_lower = text.lower()
        
        for state in states:
            if state.lower() in text_lower:
                company.state = state
                break
        
        for city in cities:
            if city.lower() in text_lower:
                company.city = city
                break
    
    def _classify_industry(self, text: str) -> Optional[str]:
        """Classify industry based on keywords"""
        text_lower = text.lower()
        
        # Score each industry
        industry_scores = {}
        for industry, keywords in self.INDUSTRY_MAP.items():
            score = sum(1 for kw in keywords if kw in text_lower)
            if score > 0:
                industry_scores[industry] = score
        
        # Return highest scoring industry
        if industry_scores:
            return max(industry_scores, key=industry_scores.get)
        
        return "General Manufacturing"
    
    def _extract_key_products(self, text: str) -> Optional[str]:
        """Extract what the company produces/manufactures"""
        patterns = [
            r"manufactur(?:ing|es?) ([\w\s,]+?)(?:\.|,|for)",
            r"produc(?:ing|es?) ([\w\s,]+?)(?:\.|,|for)",
            r"([\w\s]+) (?:manufacturing|production) (?:facility|plant|unit)",
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                product = match.group(1).strip()
                if len(product) < 50:  # Reasonable length
                    return product
        
        return None
    
    def _extract_contact_hints(self, company: Company, text: str):
        """
        Extract publicly available contact info
        IMPORTANT: Only extract if explicitly mentioned in public news
        """
        # Website patterns
        website_pattern = r'(?:www\.|https?://)([\w\.-]+\.(?:com|in|org|co\.in))'
        website_match = re.search(website_pattern, text, re.IGNORECASE)
        if website_match and not company.website:
            company.website = website_match.group(1)
        
        # Email patterns (only if publicly listed in news)
        email_pattern = r'[\w\.-]+@[\w\.-]+\.[\w]+'
        email_match = re.search(email_pattern, text)
        if email_match and not company.email:
            # Only save if it's a corporate email (not journalist)
            email = email_match.group(0)
            if any(domain in email.lower() for domain in ['@gmail', '@yahoo', '@hotmail']):
                pass  # Skip personal emails
            else:
                company.email = email
        
        # Phone patterns (only if explicitly mentioned)
        phone_pattern = r'(?:\+91|0)?[\s-]?[6-9]\d{9}'
        phone_match = re.search(phone_pattern, text)
        if phone_match and not company.phone:
            company.phone = phone_match.group(0).strip()
        
        # CIN/GST patterns
        cin_pattern = r'CIN[:\s]*([A-Z0-9]{21})'
        cin_match = re.search(cin_pattern, text, re.IGNORECASE)
        if cin_match and not company.cin:
            company.cin = cin_match.group(1)
        
        gstn_pattern = r'GST(?:IN|N)?[:\s]*([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})'
        gstn_match = re.search(gstn_pattern, text, re.IGNORECASE)
        if gstn_match and not company.gstn:
            company.gstn = gstn_match.group(1)

# Singleton instance
company_enrichment = CompanyEnrichment()
