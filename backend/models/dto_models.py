from pydantic import BaseModel
from models.pydantic_models import User


class SignUpInfo(BaseModel):
    email_address: str
    first_name: str
    last_name: str
    password: str

class SuccessfulUserAuth(BaseModel):
    user: User
    token_type: str
    access_token: str