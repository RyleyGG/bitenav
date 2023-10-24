import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext

from services.config_service import config

pwdContext = CryptContext(schemes=['bcrypt'], deprecated='auto')

def createAccessToken(data: dict):
    toEncode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=config.jwt_token_exp_minutes)
    toEncode.update({"exp": expire})
    encodedJwt = jwt.encode(toEncode, config.auth_secret, algorithm=config.auth_algo)
    return encodedJwt


def verifyPassword(plainPassword, hashedPassword):
    return pwdContext.verify(plainPassword, hashedPassword)

def genPasswordHash(password):
    return pwdContext.hash(password)