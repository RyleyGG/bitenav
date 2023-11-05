from pydantic import BaseModel

class User(BaseModel):
    UserID: int
    UserName: str
    Password: str
    Email: str

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