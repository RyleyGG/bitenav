from pydantic import BaseModel

class SignUpInfo(BaseModel):
    email_address: str
    first_name: str
    last_name: str