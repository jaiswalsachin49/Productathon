import logging
from typing import List
from fastapi import APIRouter, Depends, BackgroundTasks
from sqlmodel import Session, select
from app.database import engine, get_session
from app.models import Signal, Source
from app.ingestion.multi_source_monitor import MultiSourceMonitor
from app.ingestion.tender_monitor import TenderMonitor
from app.services.intelligence import IntelligenceService

# Setup Logger
logger = logging.getLogger(__name__)

# Initialize Monitors
news_monitor = MultiSourceMonitor()
tender_monitor = TenderMonitor()

# Router
router = APIRouter(prefix="/ingestion", tags=["ingestion"])

def run_ingestion_task(keywords: List[str]):
    """Background task for ingestion"""
    logger.info(f"Starting ingestion for keywords: {keywords}")
    
    # 1. Fetch News Signals
    signals_data = news_monitor.fetch_signals(keywords)
    logger.info(f"[DEBUG] News Monitor returned: {len(signals_data)} signals")
    
    # 2. Fetch Tender Signals
    tender_data = tender_monitor.fetch_tenders(keywords)
    logger.info(f"[DEBUG] Tender Monitor returned: {len(tender_data)} signals")
    
    # Combine results
    all_data = signals_data + tender_data
    
    with Session(engine) as session:
        new_signals_count = 0
        for data in all_data:
            # 1. Get or Create Source
            domain = data["source_domain"]
            source = session.exec(select(Source).where(Source.domain == domain)).first()
            
            if not source:
                source = Source(domain=domain, name=domain, type="News", trust_score=0.5)
                session.add(source)
                session.commit()
                session.refresh(source)
            
            # 2. Check deduplication (by URL)
            existing = session.exec(select(Signal).where(Signal.url == data["url"])).first()
            if not existing:
                # 3. Create Signal
                signal = Signal(
                    title=data["title"],
                    url=data["url"],
                    published_date=data["published_date"],
                    source_id=source.id,
                    content_summary=data["content_summary"], # Removed f-string to preserve raw content
                    keyword_matched=data.get('keyword_matched')
                )
                session.add(signal)
                new_signals_count += 1
        
        session.commit()
        logger.info(f"Ingestion complete. Added {new_signals_count} new signals.")
        
        # 3. Intelligence Processing
        if new_signals_count > 0:
            logger.info("Starting Intelligence Processing...")
            intel_service = IntelligenceService(session)
            leads_created = intel_service.process_all_new_signals()
            logger.info(f"Intelligence complete. Created {leads_created} new leads.")
        else:
             # Even if no new signals, try processing any old unprocessed ones just in case
             intel_service = IntelligenceService(session)
             intel_service.process_all_new_signals()

@router.post("/trigger")
def trigger_ingestion(
    background_tasks: BackgroundTasks,
    session: Session = Depends(get_session),
    keywords: List[str] = ["new manufacturing plant India", "boiler commissioning India", "industrial expansion India"]
):
    background_tasks.add_task(run_ingestion_task, keywords)
    return {"status": "Ingestion started in background", "keywords": keywords}
