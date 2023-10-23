from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from routers import auth_router
from services.config_service import config

app = FastAPI()
app.include_router(auth_router.router, prefix='/auth')

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {'message': 'Hello World'}