from pydantic import BaseModel
from models.pydantic_models import User

from typing import Optional

class SignUpInfo(BaseModel):
    email_address: str
    first_name: str
    last_name: str
    password: str

class SignInInfo(BaseModel):
    email_address: str
    password: str
    
class SuccessfulUserAuth(BaseModel):
    token_type: str
    access_token: str
    refresh_token: str

class MealSearchFilters(BaseModel):
    name: Optional[str]
    cuisine: Optional[str]
    diet: Optional[str]
    allergies: Optional[str]
    highProtein: Optional[bool]
    lowCarb: Optional[bool]
    lowFat: Optional[bool]
    

class MealSearchResult(BaseModel):
    id: str
    name: str
    calories: str
    protein: str
    carbs: str
    fat: str
    photolink: str

class CustomMeal(BaseModel):
    userID: str
    name: Optional[str]
    calories: Optional[str]
    fat: Optional[str]
    carbs: Optional[str]
    protein: Optional[str]
    photolink: Optional[str]
    
class RefreshToken(BaseModel):
    refresh_token: str
