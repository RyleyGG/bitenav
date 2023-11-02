import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from db import Base
from services.config_service import dbUrl

@pytest.fixture(scope="function")
def db_session():
    engine = create_engine(dbUrl.replace('@db', '@localhost'))
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    connection = engine.connect()
    transaction = connection.begin()

    Base.metadata.bind = engine
    Base.metadata.create_all(bind=engine)

    db = TestingSessionLocal(bind=connection)

    yield db

    db.rollback()
    db.close()
    transaction.rollback()
    connection.close()