from fastapi import APIRouter, Depends
from sqlmodel import Session, select, func
from typing import Dict, Any
from app.database import get_session
from app.models import Lead, Company, Product
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/dashboard-stats")
def get_dashboard_stats(session: Session = Depends(get_session)) -> Dict[str, Any]:
    """
    Get aggregated dashboard statistics for Sales Manager view
    Returns counts for total leads, by status, and high priority leads
    """
    try:
        # Total leads
        total = session.exec(select(func.count(Lead.id))).one()
        
        # By status
        new = session.exec(select(func.count(Lead.id)).where(Lead.status == "NEW")).one()
        contacted = session.exec(select(func.count(Lead.id)).where(Lead.status == "CONTACTED")).one()
        qualified = session.exec(select(func.count(Lead.id)).where(Lead.status == "QUALIFIED")).one()
        won = session.exec(select(func.count(Lead.id)).where(Lead.status == "WON")).one()
        lost = session.exec(select(func.count(Lead.id)).where(Lead.status == "LOST")).one()
        
        # High priority (confidence >= 0.75)
        high_priority = session.exec(
            select(func.count(Lead.id)).where(Lead.confidence_score >= 0.75)
        ).one()
        
        # Pending (new + contacted)
        pending = new + contacted
        
        # Conversion rate
        total_decided = won + lost
        conversion_rate = (won / total_decided * 100) if total_decided > 0 else 0

        # Calculate Revenue (WON leads) and Pipeline Value (NEW/CONTACTED/QUALIFIED)
        # Fetching volumes to sum in Python as they are strings
        won_leads = session.exec(select(Lead.estimated_volume).where(Lead.status == "WON")).all()
        pipeline_leads = session.exec(select(Lead.estimated_volume).where(Lead.status.in_(["NEW", "CONTACTED", "QUALIFIED"]))).all()
        
        def parse_volume(vol):
            if not vol: return 0
            try:
                # Remove currency symbols and k/m suffixes
                clean = str(vol).lower().replace('$', '').replace(',', '').replace('₹', '')
                if 'k' in clean:
                    return float(clean.replace('k', '')) * 1000
                if 'm' in clean:
                    return float(clean.replace('m', '')) * 1000000
                return float(clean)
            except:
                return 0

        revenue = sum(parse_volume(v) for v in won_leads)
        pipeline_value = sum(parse_volume(v) for v in pipeline_leads)
        
        return {
            "total": total,
            "new": new,
            "contacted": contacted,
            "qualified": qualified,
            "won": won,
            "lost": lost,
            "highPriority": high_priority,
            "pending": pending,
            "conversionRate": round(conversion_rate, 1),
            "revenue": revenue,
            "pipeline_value": pipeline_value
        }
    except Exception as e:
        logger.error(f"Error getting dashboard stats: {e}")
        return {
            "total": 0,
            "new": 0,
            "contacted": 0,
            "qualified": 0,
            "won": 0,
            "lost": 0,
            "highPriority": 0,
            "pending": 0,
            "conversionRate": 0,
            "revenue": 0,
            "pipeline_value": 0
        }

@router.get("/conversion-funnel")
def get_conversion_funnel(session: Session = Depends(get_session)) -> Dict[str, Any]:
    """
    Get conversion funnel metrics: New → Contacted → Qualified → Won
    """
    new = session.exec(select(func.count(Lead.id)).where(Lead.status == "NEW")).one()
    contacted = session.exec(select(func.count(Lead.id)).where(Lead.status == "CONTACTED")).one()
    qualified = session.exec(select(func.count(Lead.id)).where(Lead.status == "QUALIFIED")).one()
    won = session.exec(select(func.count(Lead.id)).where(Lead.status == "WON")).one()
    
    return {
        "stages": [
            {"name": "New", "count": new},
            {"name": "Contacted", "count": contacted},
            {"name": "Qualified", "count": qualified},
            {"name": "Won", "count": won}
        ]
    }

@router.get("/top-products")
def get_top_products(limit: int = 5, session: Session = Depends(get_session)):
    """
    Get top products by lead count
    """
    # Query leads grouped by product_id with counts
    results = session.exec(
        select(Lead.product_id, func.count(Lead.id).label('count'))
        .where(Lead.product_id.is_not(None))
        .group_by(Lead.product_id)
        .order_by(func.count(Lead.id).desc())
        .limit(limit)
    ).all()
    
    top_products = []
    for product_id, count in results:
        product = session.get(Product, product_id)
        if product:
            top_products.append({
                "name": product.name,
                "count": count
            })
    
    return {"products": top_products}

@router.get("/top-industries")
def get_top_industries(limit: int = 5, session: Session = Depends(get_session)):
    """
    Get top industries/sectors by lead count
    """
    # Query companies grouped by industry
    results = session.exec(
        select(Company.industry, func.count(Lead.id).label('count'))
        .join(Lead, Lead.company_id == Company.id)
        .where(Company.industry.is_not(None))
        .group_by(Company.industry)
        .order_by(func.count(Lead.id).desc())
        .limit(limit)
    ).all()
    
    industries = []
    for industry, count in results:
        industries.append({
            "name": industry,
            "count": count
        })
    
    return {"industries": industries}

@router.get("/geography-breakdown")
def get_geography_breakdown(session: Session = Depends(get_session)):
    """
    Get leads grouped by state/city
    """
    # Group by state
    state_results = session.exec(
        select(Company.state, func.count(Lead.id).label('count'))
        .join(Lead, Lead.company_id == Company.id)
        .where(Company.state.is_not(None))
        .group_by(Company.state)
        .order_by(func.count(Lead.id).desc())
    ).all()
    
    states = []
    for state, count in state_results:
        states.append({
            "state": state,
            "count": count
        })
    
    return {"states": states}
