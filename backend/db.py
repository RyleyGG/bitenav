from fastapi import Depends
from typing import Annotated
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from typing import Annotated
from sqlalchemy.orm import Session

from services.config_service import config, Base, engine, SessionLocal

# NOTE: Keep all table imports here at all times. Table schemas must be imported here to be properly initialized in the database.
from models.db_models import User

dbUrl = f'postgresql://postgres:{config.postgres_password}@db:5432/postgres'
engine = create_engine(
    dbUrl
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
Base.metadata.create_all(bind=engine)

def getDb():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
db = Annotated[Session, Depends(getDb)]