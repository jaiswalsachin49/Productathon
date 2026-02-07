#!/usr/bin/env python3
"""
Simple script to run the FastAPI backend server.
Usage: python run.py
"""
import uvicorn

if __name__ == "__main__":
    print("🚀 Starting B2B Lead Intelligence Agent Backend...")
    print("📊 Server will be available at: http://localhost:8000")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("\n⏰ Scheduler will run ingestion every 30 minutes")
    print("🔄 Auto-reload enabled for development\n")
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
