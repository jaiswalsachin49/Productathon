from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class SourceBase(SQLModel):
    domain: str = Field(index=True, unique=True)
    name: str
    type: str # e.g., "News", "Tender", "Social"
    trust_score: float = Field(default=0.5) # 0.0 to 1.0
    total_leads: int = Field(default=0)
    good_leads: int = Field(default=0)
    bad_leads: int = Field(default=0)

class Source(SourceBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    signals: List["Signal"] = Relationship(back_populates="source")

class SignalBase(SQLModel):
    title: str
    url: str
    content_summary: Optional[str] = None
    published_date: datetime
    raw_content: Optional[str] = None

class Signal(SignalBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    source_id: Optional[int] = Field(default=None, foreign_key="source.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    source: Optional[Source] = Relationship(back_populates="signals")
    leads: List["Lead"] = Relationship(back_populates="signal")
