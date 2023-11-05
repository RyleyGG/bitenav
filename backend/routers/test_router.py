from fastapi import APIRouter, Depends
from db import db, getDb, Session
from models.db_models import User, Meal, Ingredient, MealIngredient


router = APIRouter()

@router.get('/')
async def someFuncName():
    return {'message': 'Test Func'}

@router.get('/someotherendpoint')
async def otherFuncName(db: db):
    newEntry = SomeTable(attrOne='someVal')
    db.add(newEntry)
    db.commit()

@router.post('/user')
async def create_user(db: Session = Depends(getDb)):
    new_user = User(UserID = 22)
    db.add(new_user)
    db.commit()

@router.get('/user/{user_id}')
async def get_user(user_id: int, db: Session = Depends(getDb)):
    user = db.query(User).filter(User.UserID == user_id).first()
    if user is None:
        return {"message": "User not found"}
    return {"user_id": user.UserID, "username": user.username, "email": user.email}