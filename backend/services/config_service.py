from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

cwd = Path(__file__).parent.parent.parent

class Config(BaseSettings):
    postgres_password: str = ''
    auth_secret: str = ''
    auth_algo: str = 'HS256'
    jwt_token_exp_minutes: int = 30
    model_config = SettingsConfigDict(env_file=cwd / '.env', from_attributes=True)
config: Config = Config()

dbUrl = f'postgresql://postgres:{config.postgres_password}@db:5432/postgres'
engine = create_engine(
    dbUrl
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()