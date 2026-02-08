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
    
    # Seed Data
    from sqlmodel import Session, select
    from app.database import engine
    from app.models.user import User, UserRole
    from app.utils.security import get_password_hash
    
    with Session(engine) as session:
        # Check if users exist
        if not session.exec(select(User).where(User.email == "rajesh.kumar@hpcl.in")).first():
            manager = User(
                name="Rajesh Kumar",
                email="rajesh.kumar@hpcl.in",
                password_hash=get_password_hash("Manager@123"),
                role=UserRole.MANAGER,
                employee_id="HPCL88290",
                phone_number="+91 98765-43210"
            )
            session.add(manager)
            print("👤 Seeded Manager: Rajesh Kumar")
            
        if not session.exec(select(User).where(User.email == "amit.sharma@hpcl.in")).first():
            officer = User(
                name="Amit Sharma",
                email="amit.sharma@hpcl.in",
                password_hash=get_password_hash("Officer@123"),
                role=UserRole.OFFICER,
                employee_id="HPCL88291",
                phone_number="+91 98765-12345"
            )
            session.add(officer)
            print("👤 Seeded Officer: Amit Sharma")
            
        session.commit()
    
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

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:8000", "http://127.0.0.1:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingestion.router)
app.include_router(leads.router)
app.include_router(companies.router)
app.include_router(whatsapp.router)
from app.routers import analytics, auth
app.include_router(analytics.router)
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
