from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

from routers import auth_router, meal_router, ingredient_router
from services.config_service import config

from services.config_service import config
from services import auth_service
from models.db_models import User as UserDb


app = FastAPI()
app.include_router(auth_router.router, prefix='/auth')
app.include_router(meal_router.router, prefix='/meal')
app.include_router(ingredient_router.router, prefix='/ingredient')

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
async def root(user: UserDb = Depends(auth_service.validateToken)):
    return {'message': 'Hello World'}