from fastapi import APIRouter
from db import db
from models.db_models import SomeTable


router = APIRouter()

@router.get('/')
async def someFuncName():
    return {'message': 'Test Func'}

@router.get('/someotherendpoint')
async def otherFuncName(db: db):
    newEntry = SomeTable(attrOne='someVal')
    db.add(newEntry)
    db.commit()