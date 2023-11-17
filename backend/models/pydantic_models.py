from pydantic import BaseModel, ConfigDict
import uuid
from typing import Optional

class User(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    email_address: str
    first_name: str
    last_name: str
    password: str

class CustomMeal(BaseModel):
    id: uuid.UUID
    user_id: str
    name: Optional[str]
    calories: Optional[str]
    fat: Optional[str]
    carbs: Optional[str]
    protein: Optional[str]
    photolink: Optional[str]