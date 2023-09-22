from sqlalchemy import Integer, String, Column

from services.ConfigService import Base


class SomeTable(Base):
    __tablename__ = 'SomeTable'
    id = Column(Integer, primary_key=True, index=True)
    attrOne = Column(String, index=True)