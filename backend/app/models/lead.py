from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship
from enum import Enum

class LeadStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    CONVERTED = "converted" # Good lead
    REJECTED = "rejected" # Bad lead

class LeadBase(SQLModel):
    status: LeadStatus = Field(default=LeadStatus.NEW)
    confidence_score: float = Field(default=0.0) # 0 to 1.0
    estimated_volume: Optional[str] = None
    next_action: Optional[str] = None
    notes: Optional[str] = None # Internal notes or AI reasoning
    
    # AI-Generated Fields
    ai_reasoning: Optional[str] = None # Detailed AI explanation
    recommended_products: Optional[str] = None # JSON string of product recommendations
    lead_quality: Optional[str] = None # HIGH/MEDIUM/LOW
    urgency: Optional[str] = None # IMMEDIATE/NEAR_TERM/LONG_TERM

class Lead(LeadBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    company_id: Optional[int] = Field(default=None, foreign_key="company.id")
    company: Optional["Company"] = Relationship(back_populates="leads")
    
    product_id: Optional[int] = Field(default=None, foreign_key="product.id")
    product: Optional["Product"] = Relationship(back_populates="leads")
    
    signal_id: Optional[int] = Field(default=None, foreign_key="signal.id")
    signal: Optional["Signal"] = Relationship(back_populates="leads")
