from fastapi import APIRouter, Depends, HTTPException
from db import db, getDb, Session
from models.db_models import User, Meal, Ingredient, MealIngredient


router = APIRouter()


@router.post('/meal')
async def create_meal(meal_name: str, category: str, user_id: str, db: Session = Depends(getDb)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    new_meal = Meal(Name=meal_name, Category=category, UserID=user.id)
    try:
        db.add(new_meal)
        db.commit()
        db.refresh(new_meal)
    except Exception as e:
        print(f"Error while creating meal: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Error creating meal")

    return {"message": "Meal created successfully", "meal_id": str(new_meal.MealID)}

@router.get('/meal/{meal_id}')
async def get_meal(meal_id: int, db: Session = Depends(getDb)):
    meal = db.query(Meal).filter(Meal.MealID == meal_id).first()
    if meal is None:
        return {"message": "Meal not found"}
    
    return {"meal_id": meal.MealID, "name": meal.Name, "category": meal.Category, "user_id": str(meal.UserID)}

@router.post('/ingredient')
async def create_ingredient(name: str, calories: float, protein: float, db: Session = Depends(getDb)):
    new_ingredient = Ingredient(Name=name, Calories=calories, Protein=protein)
    try:
        db.add(new_ingredient)
        db.commit()
        db.refresh(new_ingredient)
    except Exception as e:
        print(f"Error while creating ingredient: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Error creating ingredient")

    return {"message": "Ingredient created successfully", "ingredient_id": str(new_ingredient.IngredientID)}

@router.get('/ingredient/{ingredient_id}')
async def get_ingredient(ingredient_id: int, db: Session = Depends(getDb)):
    ingredient = db.query(Ingredient).filter(Ingredient.IngredientID == ingredient_id).first()
    if ingredient is None:
        return {"message": "Ingredient not found"}
    
    return {"ingredient_id": ingredient.IngredientID, "name": ingredient.Name, "calories": ingredient.Calories, "protein": ingredient.Protein}
