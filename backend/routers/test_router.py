from fastapi import FastAPI, APIRouter

router = APIRouter()

@router.get('/')
async def someFuncName():
    return {'message': 'Test Func'}

@router.get('/someotherendpoint')
async def otherFuncName():
    return {'message': 'Another func'}