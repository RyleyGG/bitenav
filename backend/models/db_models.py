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

class CustomMeal(Base):
    __tablename__ = 'CustomMeal'
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('User.id'), default=uuid.uuid4)
    name = Column(String)
    calories = Column(String)
    fat = Column(String)
    carbs = Column(String)
    protein = Column(String)
    photolink = Column(String)

class MealIngredient(Base):
    __tablename__ = 'MealIngredient'
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    meal_id = Column(UUID(as_uuid=True), ForeignKey('CustomMeal.id'))  # Foreign Key relationship to Meals table
    ingredient_id = Column(UUID(as_uuid=True), ForeignKey('Ingredient.id'))

class Ingredient(Base):
    __tablename__ = 'Ingredient'
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    Name = Column(String)
    Calories = Column(Float)
    Protein = Column(Float)
