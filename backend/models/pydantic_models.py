from pydantic import BaseModel
import uuid

class User(BaseModel):
    id: uuid.UUID
    email_address: str
    first_name: str
    last_name: str