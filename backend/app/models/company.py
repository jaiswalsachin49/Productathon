from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime

class CompanyBase(SQLModel):
    name: str = Field(index=True)
    website: Optional[str] = None
    industry: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    gst_number: Optional[str] = None
    cin_number: Optional[str] = None
    
    # Contact Information for sales officers
    phone: Optional[str] = None
    email: Optional[str] = None
    description: Optional[str] = None
    
    # Enrichment tracking
    enriched_at: Optional[datetime] = None

class Company(CompanyBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    leads: List["Lead"] = Relationship(back_populates="company")
