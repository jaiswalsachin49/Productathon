from sqlmodel import SQLModel
from app.database import engine
from app.models import Company, Source, Signal, Product, Lead

def init_db():
    SQLModel.metadata.create_all(engine)
    print("Initialized production database tables.")

if __name__ == "__main__":
    init_db()
