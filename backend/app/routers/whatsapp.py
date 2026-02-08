"""
WhatsApp API endpoints and service
"""
from dotenv import load_dotenv
load_dotenv()

import os
import logging
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from datetime import datetime, timedelta

from app.database import get_session
from app.models import Lead

try:
    from twilio.rest import Client
    TWILIO_AVAILABLE = True
except ImportError:
    TWILIO_AVAILABLE = False

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/whatsapp", tags=["whatsapp"])

class WhatsAppService:
    def __init__(self):
        # Twilio credentials from environment variables
        self.account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        self.auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        self.whatsapp_from = os.getenv("TWILIO_WHATSAPP_FROM", "whatsapp:+14155238886")  # Twilio sandbox number
        self.whatsapp_to = os.getenv("WHATSAPP_RECIPIENT")  # Your WhatsApp number
        
        self.enabled = True # Always enable for demo purposes
        
        if TWILIO_AVAILABLE and all([self.account_sid, self.auth_token, self.whatsapp_to]):
            self.client = Client(self.account_sid, self.auth_token)
            logger.info("✅ WhatsApp Service initialized successfully")
        else:
            self.client = None
            logger.warning("⚠️  WhatsApp Service running in MOCK mode (logging only)")
    
    def send_message(self, message: str, to: Optional[str] = None) -> bool:
        """Send a WhatsApp message"""
        if not self.client:
            # Mock mode: Log the message
            logger.info(f"📱 [MOCK WHATSAPP] To: {to or self.whatsapp_to}\n{message}")
            return True
            
        try:
            recipient = to or self.whatsapp_to
            
            # Ensure recipient has whatsapp: prefix
            if not recipient.startswith("whatsapp:"):
                # If recipient starts with +, preserve it
                if recipient.startswith("+"):
                    recipient = f"whatsapp:{recipient}"
                else:
                    # Add + if missing
                    recipient = f"whatsapp:+{recipient}"
            
            message_obj = self.client.messages.create(
                body=message,
                from_=self.whatsapp_from,
                to=recipient
            )
            
            logger.info(f"✅ WhatsApp message sent to {recipient}: {message_obj.sid}")
            return True
            
        except Exception as e:
            logger.error(f"❌ Failed to send WhatsApp: {e}")
            return False
    
    def send_lead_notification(self, lead, to: Optional[str] = None) -> bool:
        """Send notification for a single high-value lead"""
        company = lead.company.name if lead.company else "Unknown Company"
        product = lead.product.name if lead.product else "Unknown Product"
        score = lead.confidence_score
        
        message = f"""
🚨 *New High-Priority Lead Discovered!*

🏢 *Company:* {company}
📦 *Product Need:* {product}
⭐ *Confidence Score:* {score:.0%}

📊 *Signal Source:*
{lead.signal.title if lead.signal else 'N/A'}

🔗 *View Lead:*
📱 Mobile: hpclconnect://leads/{lead.id}
💻 Web: http://localhost:3000/sales-manager/lead-detail?id={lead.id}

_Powered by B2B Lead Intelligence Agent_
        """.strip()
        
        return self.send_message(message, to=to)
    
    def send_daily_summary(self, leads: list, to: Optional[str] = None) -> bool:
        """Send daily summary of leads"""
        if not leads:
            return False
        
        summary_lines = []
        summary_lines.append("📊 *Daily Lead Summary*")
        summary_lines.append(f"_Found {len(leads)} new leads today_\n")
        
        # Group by product
        by_product = {}
        for lead in leads:
            product = lead.product.name if lead.product else "Unknown"
            if product not in by_product:
                by_product[product] = []
            by_product[product].append(lead)
        
        for product, product_leads in by_product.items():
            summary_lines.append(f"\n📦 *{product}* ({len(product_leads)} leads)")
            for lead in product_leads[:3]:  # Top 3 per product
                company = lead.company.name if lead.company else "Unknown"
                summary_lines.append(f"  • {company} ({lead.confidence_score:.0%})")
        
        summary_lines.append(f"\n🔗 *View All Leads:*")
        summary_lines.append(f"📱 Mobile: hpclconnect://leads")
        summary_lines.append(f"💻 Web: http://localhost:3000/sales-manager/team-leads")
        
        message = "\n".join(summary_lines)
        return self.send_message(message, to=to)

    def send_welcome_message(self, to: Optional[str] = None) -> bool:
        """Send a welcome/test message"""
        message = """
👋 *Welcome to B2B Lead Intelligence Agent!*

You will receive automated notifications for:
• High-confidence leads (>75%)
• Daily summaries
• Priority alerts

Powered by HPCL Direct Sales
        """.strip()
        
        return self.send_message(message, to=to)

# Singleton instance
whatsapp_service = WhatsAppService()

# Router endpoints
@router.get("/status")
def get_whatsapp_status():
    """Check if WhatsApp is configured and ready"""
    return {
        "enabled": whatsapp_service.enabled,
        "configured": whatsapp_service.client is not None,
        "recipient": whatsapp_service.whatsapp_to if whatsapp_service.enabled else None
    }

@router.post("/test")
def send_test_message(recipient: str = None):
    """Send a test WhatsApp message"""
    if not whatsapp_service.enabled:
        raise HTTPException(
            status_code=503,
            detail="WhatsApp service not configured"
        )
    
    success = whatsapp_service.send_welcome_message(to=recipient)
    
    if success:
        return {"status": "success", "message": "Test message sent"}
    else:
        raise HTTPException(status_code=500, detail="Failed to send message")

@router.post("/notify-lead/{lead_id}")
def notify_lead(
    lead_id: int, 
    session: Session = Depends(get_session),
    recipient: str = None
):
    """
    Send WhatsApp notification for a specific lead
    
    Args:
        lead_id: ID of the lead to notify about
        recipient: Optional phone number (e.g., +919876543210). Uses default if not provided.
    """
    if not whatsapp_service.enabled:
        raise HTTPException(
            status_code=503,
            detail="WhatsApp service not configured"
        )
    
    lead = session.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    success = whatsapp_service.send_lead_notification(lead, to=recipient)
    
    if success:
        recipient_msg = recipient if recipient else "default recipient"
        company = lead.company.name if lead.company else "Unknown"
        product = lead.product.name if lead.product else "Unknown"
        return {
            "status": "success", 
            "message": f"Lead notification sent to {recipient_msg}",
            "lead": {"company": company, "product": product}
        }
    else:
        raise HTTPException(status_code=500, detail="Failed to send notification")

@router.post("/daily-summary")
def send_daily_summary(
    session: Session = Depends(get_session),
    recipient: str = None
):
    """
    Send daily summary of new high-confidence leads
    
    Args:
        recipient: Optional phone number (e.g., +919876543210). Uses default if not provided.
    """
    if not whatsapp_service.enabled:
        raise HTTPException(
            status_code=503,
            detail="WhatsApp service not configured"
        )
    
    # Get leads from last 24 hours with confidence > 0.75
    yesterday = datetime.utcnow() - timedelta(days=1)
    
    stmt = select(Lead).where(
        Lead.created_at >= yesterday,
        Lead.confidence_score >= 0.75
    ).order_by(Lead.confidence_score.desc())
    
    leads = session.exec(stmt).all()
    
    if not leads:
        return {
            "status": "no_leads",
            "message": "No new leads to report"
        }
    
    success = whatsapp_service.send_daily_summary(leads, to=recipient)
    
    if success:
        recipient_msg = recipient if recipient else "default recipient"
        return {
            "status": "success",
            "message": f"Daily summary sent to {recipient_msg} with {len(leads)} leads"
        }
    else:
        raise HTTPException(status_code=500, detail="Failed to send summary")