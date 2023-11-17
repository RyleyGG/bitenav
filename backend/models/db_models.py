from sqlalchemy import Integer, String, Column
from sqlalchemy.dialects.postgresql import UUID
import uuid

from services.config_service import Base

from typing import Optional


class User(Base):
    __tablename__ = 'User'
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    first_name = Column(String)
    last_name = Column(String)
    email_address = Column(String)
    password = Column(String)

class CustomMeal(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), default=uuid.uuid4)
    name = Column(String)
    calories = Column(String)
    fat = Column(String)
    carbs = Column(String)
    protein = Column(String)
    photolink = Column(String)