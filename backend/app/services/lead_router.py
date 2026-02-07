"""
Lead Router - Automatically routes leads to regional sales officers
"""
from typing import Optional, Dict
import re
import logging
from app.config.sales_officers import SALES_OFFICERS

logger = logging.getLogger(__name__)

class LeadRouter:
    """Routes leads to appropriate sales officers based on location and product"""
    
    def __init__(self):
        self.officers = SALES_OFFICERS
    
    def detect_region(self, text: str) -> str:
        """
        Detect region from text (company name, signal content)
        Returns region code (NORTH, SOUTH, EAST, WEST) or DEFAULT
        """
        if not text:
            return "DEFAULT"
        
        text_lower = text.lower()
        
        # Check each region's states
        for region_code, officer_data in self.officers.items():
            if region_code == "DEFAULT":
                continue
                
            for state in officer_data.get("states", []):
                if state.lower() in text_lower:
                    logger.info(f"Detected region {region_code} from state: {state}")
                    return region_code
        
        # Check for city names (common major cities)
        city_region_map = {
            "delhi": "NORTH", "mumbai": "WEST", "bangalore": "SOUTH", "kolkata": "EAST",
            "chennai": "SOUTH", "hyderabad": "SOUTH", "pune": "WEST", "ahmedabad": "WEST",
            "jaipur": "WEST", "lucknow": "NORTH", "kanpur": "NORTH", "nagpur": "WEST",
            "indore": "WEST", "bhopal": "WEST", "visakhapatnam": "SOUTH", "kochi": "SOUTH",
            "coimbatore": "SOUTH", "chandigarh": "NORTH", "gurgaon": "NORTH", "noida": "NORTH"
        }
        
        for city, region in city_region_map.items():
            if city in text_lower:
                logger.info(f"Detected region {region} from city: {city}")
                return region
        
        logger.info("No region detected, using DEFAULT")
        return "DEFAULT"
    
    def get_officer_for_lead(self, lead) -> Optional[Dict]:
        """
        Get appropriate sales officer for a lead
        Returns officer data dict or None
        """
        # Build text to analyze
        text_parts = []
        
        if lead.company and lead.company.name:
            text_parts.append(lead.company.name)
        
        if lead.signal:
            if lead.signal.title:
                text_parts.append(lead.signal.title)
            if lead.signal.content_summary:
                text_parts.append(lead.signal.content_summary)
        
        combined_text = " ".join(text_parts)
        
        # Detect region
        region = self.detect_region(combined_text)
        
        # Get officer data
        officer = self.officers.get(region, self.officers.get("DEFAULT"))
        
        if officer:
            logger.info(f"Assigned lead to {officer['name']} ({region} region)")
        
        return officer
    
    def get_all_officers(self):
        """Get list of all sales officers"""
        return [
            {
                "region": region,
                "name": data["name"],
                "phone": data["phone"],
                "products": data.get("products", []),
                "states": data.get("states", [])
            }
            for region, data in self.officers.items()
        ]

# Singleton instance
lead_router = LeadRouter()
