import sys
import os
import random
import json
from datetime import datetime, timedelta
from sqlmodel import select, delete, col
from typing import List, Dict

# Add the current directory to sys.path
sys.path.append(os.getcwd())

from app.database import get_session
from app.models import Lead, Company, Signal, Product
from app.services.whatsapp import whatsapp_service

OFFICERS = [
    {"name": "Rajesh Kumar", "region": "North", "states": ["Delhi", "Punjab", "Haryana", "Uttar Pradesh", "Jammu & Kashmir", "Himachal Pradesh", "Uttarakhand"]},
    {"name": "Priya Sharma", "region": "West", "states": ["Maharashtra", "Gujarat", "Rajasthan", "Goa", "Dadra & Nagar Haveli", "Madhya Pradesh"]},
    {"name": "Amit Verma", "region": "South", "states": ["Tamil Nadu", "Karnataka", "Kerala", "Telangana", "Andhra Pradesh"]},
    {"name": "Anjali Gupta", "region": "East", "states": ["West Bengal", "Odisha", "Bihar", "Jharkhand", "Assam", "Sikkim", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Tripura"]},
]

MOCK_LOCATIONS = [
    {"city": "Mumbai", "state": "Maharashtra"},
    {"city": "Delhi", "state": "Delhi"},
    {"city": "Bangalore", "state": "Karnataka"},
    {"city": "Chennai", "state": "Tamil Nadu"},
    {"city": "Kolkata", "state": "West Bengal"},
    {"city": "Hyderabad", "state": "Telangana"},
    {"city": "Pune", "state": "Maharashtra"},
    {"city": "Ahmedabad", "state": "Gujarat"},
    {"city": "Jaipur", "state": "Rajasthan"},
    {"city": "Lucknow", "state": "Uttar Pradesh"},
    {"city": "Chandigarh", "state": "Punjab"},
    {"city": "Kochi", "state": "Kerala"},
    {"city": "Indore", "state": "Madhya Pradesh"},
    {"city": "Bhubaneswar", "state": "Odisha"},
    {"city": "Guwahati", "state": "Assam"},
    {"city": "Surat", "state": "Gujarat"},
    {"city": "Visakhapatnam", "state": "Andhra Pradesh"},
    {"city": "Nagpur", "state": "Maharashtra"},
    {"city": "Ludhiana", "state": "Punjab"},
    {"city": "Patna", "state": "Bihar"},
]

KEYWORDS = {
    "Expansion": ["plans to set up", "invests", "expands", "new plant"],
    "Tender": ["floats tender", "invites bids", "RFP"],
    "Maintenance": ["shutdown", "overhaul", "maintenance"],
}

def generate_ai_analysis(company_name: str, city: str, state: str, product: str, signal_title: str) -> str:
    """Generate realistic AI analysis text simulating Groq output"""
    
    templates = [
        f"**Groq AI Analysis:**\nBased on recent market signals, **{company_name}** is showing strong indicators of industrial expansion in the **{city}, {state}** region. The signal '{signal_title}' suggests an immediate requirement for industrial fuels. Historically, similar projects in this sector have required **{product}** with volumes exceeding 50kL/month. We estimate a **High Probability (85%+)** of conversion if approached within 7 days.",
        
        f"**Groq AI Analysis:**\nDetected a high-intent signal from **{company_name}**. The announcement regarding '{signal_title}' directly correlates with increased consumption of **{product}**. Our predictive model scores this lead in the top 10% for the **{state}** region. Recommend immediate engagement by the regional officer to secure the contract before competitors.",
        
        f"**Groq AI Analysis:**\n**{company_name}** has initiated procurement activities in likely response to '{signal_title}'. Supply chain analysis indicates a gap in their current **{product}** sourcing for the {city} facility. This presents a strategic opportunity for HPCL to offer a long-term supply agreement. **Action Recommended:** Schedule a site visit.",
    ]
    return random.choice(templates)

def generate_recommendations(product_name: str) -> str:
    """Generate JSON string for recommended products"""
    recs = [
        {"name": product_name, "reason": "Primary requirement identified from signal analysis."},
        {"name": "Lubricants", "reason": "Cross-selling opportunity for machinery maintenance."},
        {"name": "LPG (Industrial)", "reason": "Potential alternative fuel for heating processes."}
    ]
    return json.dumps(recs)

def clean_duplicates(session):
    print("🧹 Cleaning duplicate signals/leads...")
    signals = session.exec(select(Signal)).all()
    seen_urls = set()
    seen_titles = set()
    duplicates_count = 0
    
    for sig in signals:
        is_duplicate = False
        if sig.url in seen_urls:
            is_duplicate = True
        elif sig.title in seen_titles:
            is_duplicate = True
            
        if is_duplicate:
            lead = session.exec(select(Lead).where(Lead.signal_id == sig.id)).first()
            if lead:
                session.delete(lead)
            session.delete(sig)
            duplicates_count += 1
        else:
            seen_urls.add(sig.url)
            seen_titles.add(sig.title)
            
    session.commit()
    print(f"Removed {duplicates_count} duplicates.")

def get_officer_for_state(state: str) -> str:
    for officer in OFFICERS:
        if state in officer["states"]:
            return officer["name"]
    return random.choice(OFFICERS)["name"]

def seed_data():
    print("🌱 Fix & Seed Data with AI Analysis...")
    session_gen = get_session()
    session = next(session_gen)
    
    # 1. Clean Duplicates
    clean_duplicates(session)
    
    # 2. Update Companies with Locations
    companies = session.exec(select(Company)).all()
    print(f"Updating {len(companies)} companies with locations...")
    
    for company in companies:
        if not company.city or not company.state:
            loc = random.choice(MOCK_LOCATIONS)
            company.city = loc["city"]
            company.state = loc["state"]
            session.add(company)
            
    session.commit()
    
    # 3. Helpers to ensure relationships
    def get_or_create_product(name: str):
        product = session.exec(select(Product).where(Product.name == name)).first()
        if not product:
            product = Product(
                name=name, 
                category="Industrial",
                keywords="industrial, fuel, energy"  # Default keywords
            )
            session.add(product)
            session.commit()
            session.refresh(product)
        return product

    def get_or_create_company(name: str):
        company = session.exec(select(Company).where(Company.name == name)).first()
        if not company:
            loc = random.choice(MOCK_LOCATIONS)
            company = Company(
                name=name, 
                industry="Manufacturing", 
                city=loc["city"], 
                state=loc["state"]
            )
            session.add(company)
            session.commit()
            session.refresh(company)
        elif not company.city or not company.state:
            # Fix existing company with no location
            loc = random.choice(MOCK_LOCATIONS)
            company.city = loc["city"]
            company.state = loc["state"]
            session.add(company)
            session.commit()
            session.refresh(company)
        return company

    # 4. Update Leads (Rich Content, Officer, Volume, Relationships)
    leads = session.exec(select(Lead)).all()
    print(f"Updating {len(leads)} leads with AI detailed analysis & fixing missing data...")
    
    volumes = ["$50k", "$1.2m", "₹5 Lakhs", "₹45 Lakhs", "₹2.5 Cr", "10000", "$250,000", "₹1 Cr"]
    common_products = ["Furnace Oil", "Industrial Lubricants", "LPG (Commercial)", "Bitumen", "Petcoke"]
    highest_conf_lead = None
    
    for lead in leads:
        # Load relationships if missing
        session.refresh(lead)

        # FIX: Ensure Company Exists
        if not lead.company:
            # Assign a generic company if missing (or derive from signal info if possible)
            lead.company = get_or_create_company(f"Industrial Client {lead.id}")
        else:
             # Ensure existing company has location
            if not lead.company.city or not lead.company.state:
                loc = random.choice(MOCK_LOCATIONS)
                lead.company.city = loc["city"]
                lead.company.state = loc["state"]
                session.add(lead.company)

        # FIX: Ensure Product Exists
        if not lead.product:
            p_name = random.choice(common_products)
            lead.product = get_or_create_product(p_name)
        
        # Assign Officer based on Company Location
        if lead.company and lead.company.state:
            lead.assigned_officer = get_officer_for_state(lead.company.state)
        else:
            lead.assigned_officer = random.choice(OFFICERS)["name"]
            
        # Ensure Status
        if not lead.status or lead.status.upper() == "NEW":
            lead.status = "NEW"
        else:
            lead.status = lead.status.upper() # Standardize to uppercase
            
        # Distribute Statuses if NEW
        if lead.status == "NEW" and random.random() > 0.3:
            r = random.random()
            if r < 0.4: lead.status = "CONTACTED"
            elif r < 0.7: lead.status = "QUALIFIED"
            elif r < 0.9: lead.status = "WON"
            else: lead.status = "LOST"
        
        # Ensure Volume
        if not lead.estimated_volume:
            lead.estimated_volume = random.choice(volumes)
            
        # Ensure Confidence
        if not lead.confidence_score:
            lead.confidence_score = random.uniform(0.4, 0.98)
            
        # Ensure Lead Quality
        if not lead.lead_quality:
            if lead.confidence_score > 0.8: lead.lead_quality = "HIGH"
            elif lead.confidence_score > 0.5: lead.lead_quality = "MEDIUM"
            else: lead.lead_quality = "LOW"
            
        # --- AI ENRICHMENT ---
        company_name = lead.company.name if lead.company else "Unknown Company"
        city = lead.company.city if lead.company else "Unknown City"
        state = lead.company.state if lead.company else "Unknown State"
        product_name = lead.product.name if lead.product else "Industrial Fuel"
        signal_title = lead.signal.title if lead.signal else "Market Expansion"
        
        # Force AI analysis regen
        lead.ai_reasoning = generate_ai_analysis(company_name, city, state, product_name, signal_title)
        lead.recommended_products = generate_recommendations(product_name)
        
        # Track highest confidence for alert
        if not highest_conf_lead or lead.confidence_score > highest_conf_lead.confidence_score:
            highest_conf_lead = lead
            
        session.add(lead)
        
    session.commit()
    print("✅ Data fixed & seeded successfully!")
    
    # 5. Trigger WhatsApp Alert
    if highest_conf_lead:
        print(f"📱 Triggering WhatsApp Alert for Top Lead: {highest_conf_lead.company.name}...")
        try:
            whatsapp_service.send_lead_notification(highest_conf_lead)
            print("✅ WhatsApp Alert Triggered (Check Logs)")
        except Exception as e:
            print(f"❌ WhatsApp Trigger Failed: {e}")

if __name__ == "__main__":
    seed_data()
