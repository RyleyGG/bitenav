import uuid
from pydantic import BaseModel

class User(BaseModel):
    id: uuid.UUID
    email_address: str
    first_name: str
    last_name: str
    password: str
    
class Meal(BaseModel):
    Name: str
    Category: str
    UserID: uuid.UUID

class Ingredient(BaseModel):
    Name: str
    Calories: float
    Protein: float

class MealIngredient(BaseModel):
    MealID: int
    IngredientID: int


