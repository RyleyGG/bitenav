from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import test_router

app = FastAPI()
app.include_router(test_router.router, prefix='/test')

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def someFuncName():
    return {'message': 'Hello World'}