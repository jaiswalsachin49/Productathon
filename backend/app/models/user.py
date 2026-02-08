from typing import Optional
from sqlmodel import SQLModel, Field
from enum import Enum

class UserRole(str, Enum):
    MANAGER = "MANAGER"
    OFFICER = "OFFICER"

class UserBase(SQLModel):
    name: str
    email: str = Field(unique=True, index=True)
    role: UserRole = Field(default=UserRole.OFFICER)
    employee_id: Optional[str] = None
    phone_number: Optional[str] = None
    profile_image: Optional[str] = None

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    password_hash: str
