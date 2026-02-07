from prettytable import PrettyTable
from sqlmodel import Session, select
from app.database import engine
from app.models import Signal, Lead

def show_data():
    with Session(engine) as session:
        # Signals
        print("\n=== Extracted Data (Last 20 Signals) ===")
        table = PrettyTable()
        table.field_names = ["ID", "Title", "Source", "Context"]
        table.max_width["Title"] = 40
        table.max_width["Context"] = 50
        table.align = "l"
        
        signals = session.exec(select(Signal).order_by(Signal.id.desc()).limit(20)).all()
        for sig in signals:
            context = sig.content_summary[:100] + "..." if sig.content_summary else "N/A"
            domain = sig.source.domain if sig.source else "Unknown"
            table.add_row([sig.id, sig.title, domain, context])
        print(table)

        # Leads
        print("\n=== Generated Leads (Last 20) ===")
        lt = PrettyTable()
        lt.field_names = ["ID", "Score", "Company", "Status", "Notes"]
        lt.align = "l"
        
        leads = session.exec(select(Lead).order_by(Lead.id.desc()).limit(20)).all()
        for l in leads:
            company_name = l.company.name if l.company else "Unknown"
            lt.add_row([l.id, f"{l.confidence_score:.2f}", company_name, l.status, l.notes])
        print(lt)

if __name__ == "__main__":
    show_data()
