from fastapi import FastAPI, APIRouter
from routers import test_router

app = FastAPI()
app.include_router(test_router.router, prefix='/test')

@app.get("/")
async def someFuncName():
    return {'message': 'Hello World'}