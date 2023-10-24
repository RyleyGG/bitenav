from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

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

dbUrl = f'postgresql://postgres:{config.postgres_password}@db:5432/postgres'
engine = create_engine(
    dbUrl
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

@app.get("/")
async def root():
    return {'message': 'Hello World'}