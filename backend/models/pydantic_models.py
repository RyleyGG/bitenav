from pydantic import BaseModel, ConfigDict
import uuid

class User(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    email_address: str
    first_name: str
    last_name: str
    password: str