from sqlalchemy import Integer, String, Column, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid

from services.config_service import Base


class User(Base):
    __tablename__ = 'User'
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    first_name = Column(String)
    last_name = Column(String)
    email_address = Column(String)
    password = Column(String)

class Meal(Base):
    __tablename__ = 'Meals'
    MealID = Column(Integer, primary_key=True, index=True)
    Name = Column(String)
    Category = Column(String)
    UserID = Column(Integer, ForeignKey('Users.UserID'))  # Foreign Key relationship to Users table


class MealIngredient(Base):
    __tablename__ = 'MealIngredients'
    MealIngredients = Column(Integer, primary_key=True, index=True)
    MealID = Column(Integer, ForeignKey('Meals.MealID'))  # Foreign Key relationship to Meals table
    IngredientID = Column(Integer, ForeignKey('Ingredients.IngredientID'))

class Ingredient(Base):
    __tablename__ = 'Ingredients'
    IngredientID = Column(Integer, primary_key=True, index=True)
    Name = Column(String)
    Calories = Column(Float)
    Protein = Column(Float)
