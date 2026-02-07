from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class ProductBase(SQLModel):
    name: str = Field(index=True) # e.g., "Furnace Oil"
    category: str # e.g., "Industrial Fuels"
    description: Optional[str] = None
    keywords: str # Comma-separated keywords "boiler, heating"

class Product(ProductBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    leads: List["Lead"] = Relationship(back_populates="product")
