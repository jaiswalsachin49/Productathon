import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from dotenv import load_dotenv
from app.database import create_db_and_tables
from app.routers import ingestion, leads, companies, whatsapp
from app.scheduler import start_scheduler, stop_scheduler

# Load environment variables from .env file
load_dotenv()

logging.basicConfig(level=logging.INFO)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    create_db_and_tables()
    start_scheduler()
    
    # Run initial ingestion on startup
    import logging
    from app.routers.ingestion import run_ingestion_task
    logger = logging.getLogger(__name__)
    logger.info("🚀 Running initial data ingestion on startup...")
    
    # Run ingestion in background
    import threading
    default_keywords = [
        "new manufacturing plant India",
        "boiler commissioning India",
        "industrial expansion India"
    ]
    thread = threading.Thread(target=run_ingestion_task, args=(default_keywords,))
    thread.daemon = True
    thread.start()
    
    yield
    # Shutdown
    stop_scheduler()

app = FastAPI(lifespan=lifespan)

app.include_router(ingestion.router)
app.include_router(leads.router)
app.include_router(companies.router)
app.include_router(whatsapp.router)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
