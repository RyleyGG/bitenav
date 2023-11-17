from fastapi import APIRouter, HTTPException, status, Depends
from db import getDb
from sqlalchemy.orm import Session
from models.pydantic_models import Ingredient

router = APIRouter()

@router.post('/', response_model=Ingredient, response_model_by_alias=False)
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

    return new_ingredient

@router.get('/{ingredient_id}', response_model=Ingredient)
async def get_ingredient(ingredient_id: int, db: Session = Depends(getDb)):
    ingredient = db.query(Ingredient).filter(Ingredient.IngredientID == ingredient_id).first()
    if ingredient is None:
        return {"message": "Ingredient not found"}
    
    return Ingredient
