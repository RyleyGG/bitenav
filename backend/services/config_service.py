from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from loguru import logger
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

config_dir = Path(__file__).parent.parent.parent / 'config'
cwd = Path(__file__).parent.parent
class Config(BaseSettings):
    postgres_password: str = ''
    auth_secret: str = ''
    auth_algo: str = 'HS256'
    access_token_lifetime: int = 30
    refresh_token_lifetime: int = 7 * 1440 # days * minutes in a day
    model_config = SettingsConfigDict(env_file=config_dir / '.env', from_attributes=True, extra='allow')
    model_config = SettingsConfigDict(env_file=cwd / '.env')
config: Config = Config()

dbUrl = f'postgresql://postgres:{config.postgres_password}@db:5432/postgres'
engine = create_engine(
    dbUrl
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

logger.add(cwd / 'logs' / f'{str(int(datetime.now().timestamp()))}.log')