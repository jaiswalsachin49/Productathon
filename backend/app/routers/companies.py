from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from app.database import get_session
from app.models import Company

router = APIRouter(
    prefix="/companies",
    tags=["companies"],
)

@router.get("/", response_model=List[Company])
def read_companies(session: Session = Depends(get_session), offset: int = 0, limit: int = 100):
    companies = session.exec(select(Company).offset(offset).limit(limit)).all()
    return companies

@router.get("/{company_id}", response_model=Company)
def read_company(company_id: int, session: Session = Depends(get_session)):
    company = session.get(Company, company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company
