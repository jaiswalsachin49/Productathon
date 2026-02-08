from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import List, Optional
from app.database import get_session
from app.models import Lead, Company, Product

router = APIRouter(
    prefix="/leads",
    tags=["leads"],
)

@router.get("/", response_model=List[dict])
def read_leads(
    session: Session = Depends(get_session),
    offset: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    product_id: Optional[int] = None
):
    query = select(Lead).offset(offset).limit(limit).order_by(Lead.id.desc())
    
    if status:
        query = query.where(Lead.status == status)
    if product_id:
        query = query.where(Lead.product_id == product_id)
        
    leads = session.exec(query).all()
    
    # Custom response format to include related names directly
    result = []
    for lead in leads:
        lead_dict = lead.model_dump()
        lead_dict["company_name"] = lead.company.name if lead.company else None
        # Include full company details for location
        if lead.company:
            lead_dict["company"] = {
                "name": lead.company.name,
                "city": lead.company.city,
                "state": lead.company.state
            }
        else:
            lead_dict["company"] = None
            
        lead_dict["product_name"] = lead.product.name if lead.product else None
        lead_dict["signal_title"] = lead.signal.title if lead.signal else None
        result.append(lead_dict)
        
    return result

@router.get("/{lead_id}", response_model=dict)
def read_lead(lead_id: int, session: Session = Depends(get_session)):
    lead = session.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
        
    lead_dict = lead.model_dump()
    lead_dict["company_name"] = lead.company.name if lead.company else None
    lead_dict["product_name"] = lead.product.name if lead.product else None
    
    # Include signals details for context
    if lead.signal:
        lead_dict["signal_context"] = {
            "title": lead.signal.title,
            "url": lead.signal.url,
            "summary": lead.signal.content_summary,
            "pub_date": lead.signal.published_date
        }
        
    return lead_dict

@router.patch("/{lead_id}")
def update_lead(
    lead_id: int,
    lead_update: dict,
    session: Session = Depends(get_session)
):
    lead = session.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
        
    lead_data = lead.model_dump(exclude_unset=True)
    update_data = lead_update
    
    for key, value in update_data.items():
        setattr(lead, key, value)
        
    session.add(lead)
    session.commit()
    session.refresh(lead)
    return lead
