from sqlmodel import SQLModel, create_engine
from app.models import Company, Source, Signal, Product, Lead

sqlite_file_name = "test_database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    print("Tables created successfully!")

if __name__ == "__main__":
    create_db_and_tables()
