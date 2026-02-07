from apscheduler.schedulers.background import BackgroundScheduler
from sqlmodel import Session
from app.database import engine
from app.routers.ingestion import run_ingestion_task
from contextlib import asynccontextmanager
from fastapi import FastAPI
import logging

logger = logging.getLogger(__name__)

scheduler = BackgroundScheduler()

def scheduled_ingestion():
    keywords = ["new manufacturing plant India", "road construction projects India", "boiler commissioning India"]
    logger.info("Running scheduled ingestion...")
    run_ingestion_task(keywords)

def start_scheduler():
    scheduler.add_job(scheduled_ingestion, 'interval', minutes=30)
    scheduler.start()
    logger.info("Scheduler started. Ingestion will run every 30 minutes.")

def stop_scheduler():
    scheduler.shutdown()
    logger.info("Scheduler shut down.")
