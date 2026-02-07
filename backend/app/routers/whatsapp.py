"""
WhatsApp API endpoints
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from datetime import datetime, timedelta
from app.database import get_session
from app.models import Lead
from app.services.whatsapp import whatsapp_service

router = APIRouter(prefix="/whatsapp", tags=["whatsapp"])

@router.get("/status")
def get_whatsapp_status():
    """Check if WhatsApp is configured and ready"""
    return {
        "enabled": whatsapp_service.enabled,
        "configured": whatsapp_service.enabled,
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
    recipient: str = None  # Optional: sales officer's phone number
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
    
    # Send to specific recipient or default
    company = lead.company.name if lead.company else "Unknown"
    product = lead.product.name if lead.product else "Unknown Product"
    score = lead.confidence_score
    
    message = f"""
🚨 *New High-Priority Lead Discovered!*

🏢 *Company:* {company}
📦 *Product Need:* {product}
⭐ *Confidence Score:* {score:.0%}

📊 *Signal Source:*
{lead.signal.title if lead.signal else 'N/A'}

🔗 View details: http://localhost:8000/leads/{lead.id}

_Powered by B2B Lead Intelligence Agent_
    """.strip()
    
    success = whatsapp_service.send_message(message, to=recipient)
    
    if success:
        recipient_msg = recipient if recipient else "default recipient"
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
    recipient: str = None  # Optional: sales officer's phone number
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
    
    # Build summary message
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
    
    summary_lines.append(f"\n🔗 View all: http://localhost:8000/leads/")
    
    message = "\n".join(summary_lines)
    success = whatsapp_service.send_message(message, to=recipient)
    
    if success:
        recipient_msg = recipient if recipient else "default recipient"
        return {
            "status": "success",
            "message": f"Daily summary sent to {recipient_msg} with {len(leads)} leads"
        }
    else:
        raise HTTPException(status_code=500, detail="Failed to send summary")
