"""
AI-Powered Intelligence Service using Groq LLM
Analyzes full article content to infer product needs with detailed reasoning
"""
from dotenv import load_dotenv
load_dotenv()

import os
import json
import logging
from typing import Dict, List, Optional
from groq import Groq

logger = logging.getLogger(__name__)

class GroqIntelligence:
    """Uses Groq LLM to analyze signals and infer product requirements"""
    
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")
        self.enabled = bool(self.api_key)
        
        if self.enabled:
            self.client = Groq(api_key=self.api_key)
            self.model = "llama-3.3-70b-versatile"  # Fast and accurate
            logger.info("✅ Groq AI Intelligence initialized")
        else:
            logger.warning("⚠️  Groq AI disabled - Missing API key")
    
    def analyze_signal(self, title: str, content: str) -> Optional[Dict]:
        """
        Analyze a signal using LLM to extract:
        - Company name
        - Required products (Top 3 with reasoning)
        - Confidence score
        - Key indicators
        """
        if not self.enabled:
            return None
        
        try:
            # Build comprehensive prompt
            prompt = f"""You are an expert B2B sales analyst for HPCL (Hindustan Petroleum Corporation Limited) Direct Sales division.

Analyze the following news article and identify potential business opportunities for HPCL's industrial fuel and specialty products.

**Article Title:** {title}

**Article Content:**
{content[:3000]}  # Limit to avoid token overflow

**HPCL Product Portfolio:**
1. **Furnace Oil (FO)** - Used in: boilers, thermal plants, furnaces, heating systems, manufacturing plants, factories, industrial units
2. **Bitumen** - Used in: road construction, highway projects, pavement, NHAI projects, expressways, laning
3. **Light Diesel Oil (LDO)** - Used in: gensets, textile mills, power generation, automotive, tractors, metal industries, steel plants
4. **Mineral Turpentine Oil (MTO/Solvent 1425)** - Used in: paint manufacturing, coatings, solvents, varnish, chemical industries
5. **Hexane** - Used in: oil extraction, solvent applications, pharmaceuticals, fluorochemicals

**Your Task:**
Extract the following information in JSON format:

{{
  "company_name": "Full legal company name (or 'Unknown' if not found)",
  "location": "City and State mentioned (or 'Unknown')",
  "products_needed": [
    {{
      "product_name": "Exact product name from above list",
      "confidence": 0.0-1.0,
      "reasoning": "Specific evidence from article explaining why this product is needed",
      "indicators": ["keyword1", "keyword2"]
    }}
  ],
  "overall_confidence": 0.0-1.0,
  "lead_quality": "HIGH/MEDIUM/LOW",
  "urgency": "IMMEDIATE/NEAR_TERM/LONG_TERM",
  "key_facts": ["fact1", "fact2"]
}}

**Instructions:**
- Only recommend products with strong evidence from the article
- Product recommendations should be in priority order (most likely first)
- Be conservative with confidence scores
- 'Unknown' if information is not clearly stated
- Focus on actionable insights for sales team

Return ONLY valid JSON, no additional text."""

            # Call Groq API
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a B2B sales intelligence analyst. Always respond with valid JSON only."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.1,  # Low temperature for consistency
                max_tokens=1000,
                response_format={"type": "json_object"}
            )
            
            # Parse response
            result_text = response.choices[0].message.content
            result = json.loads(result_text)
            
            logger.info(f"✅ Groq analysis complete: {result.get('company_name', 'Unknown')}")
            return result
            
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse Groq response as JSON: {e}")
            return None
        except Exception as e:
            logger.error(f"Groq API error: {e}")
            return None
    
    def get_detailed_recommendation(self, signal_data: Dict) -> str:
        """Generate human-readable recommendation summary"""
        if not signal_data or "products_needed" not in signal_data:
            return "No detailed analysis available"
        
        lines = []
        lines.append(f"**Company:** {signal_data.get('company_name', 'Unknown')}")
        lines.append(f"**Location:** {signal_data.get('location', 'Unknown')}")
        lines.append(f"**Lead Quality:** {signal_data.get('lead_quality', 'MEDIUM')}")
        lines.append(f"**Urgency:** {signal_data.get('urgency', 'NEAR_TERM')}")
        lines.append("")
        
        lines.append("**Recommended Products:**")
        for i, product in enumerate(signal_data.get('products_needed', [])[:3], 1):
            lines.append(f"{i}. {product['product_name']} ({product['confidence']:.0%} confidence)")
            lines.append(f"   Reason: {product['reasoning']}")
        
        if signal_data.get('key_facts'):
            lines.append("")
            lines.append("**Key Facts:**")
            for fact in signal_data['key_facts']:
                lines.append(f"• {fact}")
        
        return "\n".join(lines)

# Singleton instance
groq_intelligence = GroqIntelligence()
