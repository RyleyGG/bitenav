import uuid
from pydantic import BaseModel, ConfigDict

class UserToken(BaseModel):
    id: int
    UserName: str
    Email: str
    Password: str

class Meal(BaseModel):
    Name: str
    Category: str
    UserID: int

class Ingredient(BaseModel):
    Name: str
    Calories: float
    Protein: float

class MealIngredient(BaseModel):
    MealID: int
    IngredientID: int

class User(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    email_address: str
    first_name: str
    last_name: str
    password: str