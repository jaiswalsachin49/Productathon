from sqlmodel import create_engine, text
from app.database import sqlite_url

def update_schema():
    engine = create_engine(sqlite_url)
    with engine.connect() as conn:
        try:
            # Check if columns exist
            result = conn.execute(text("PRAGMA table_info(lead)"))
            columns = [row[1] for row in result.fetchall()]
            
            # Add assigned_officer
            if "assigned_officer" not in columns:
                print("Adding assigned_officer column...")
                conn.execute(text("ALTER TABLE lead ADD COLUMN assigned_officer TEXT"))
            
            # Add feedback_status
            if "feedback_status" not in columns:
                print("Adding feedback_status column...")
                conn.execute(text("ALTER TABLE lead ADD COLUMN feedback_status TEXT"))
                
            # Add feedback_date
            if "feedback_date" not in columns:
                print("Adding feedback_date column...")
                conn.execute(text("ALTER TABLE lead ADD COLUMN feedback_date DATETIME"))
                
            # Add feedback_notes
            if "feedback_notes" not in columns:
                print("Adding feedback_notes column...")
                conn.execute(text("ALTER TABLE lead ADD COLUMN feedback_notes TEXT"))
                
            conn.commit()
            print("Schema update completed successfully!")
            
        except Exception as e:
            print(f"Error updating schema: {e}")

if __name__ == "__main__":
    update_schema()
