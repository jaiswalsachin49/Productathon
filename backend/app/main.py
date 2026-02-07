import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.database import create_db_and_tables
from app.routers import ingestion
from app.scheduler import start_scheduler, stop_scheduler

logging.basicConfig(level=logging.INFO)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    create_db_and_tables()
    start_scheduler()
    yield
    # Shutdown
    stop_scheduler()

app = FastAPI(lifespan=lifespan)

app.include_router(ingestion.router)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
