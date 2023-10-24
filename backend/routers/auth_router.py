from fastapi import APIRouter, HTTPException, status, Depends
from db import getDb
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from models.db_models import User as UserDb
from models.pydantic_models import User as UserPyd
from models.dto_models import SignUpInfo, SignInInfo, SuccessfulUserAuth

from services import auth_service

router = APIRouter()

@router.post('/sign_in')
async def attemptSignin(signinObj: SignInInfo, db: Session = Depends(getDb)):
    existing_user = db.query(UserDb).filter(UserDb.email_address == signinObj.email_address).first()
    
    if not existing_user or not auth_service.verifyPassword(signinObj.password, existing_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect email or password',
            headers={'WWW-Authenticate': 'Bearer'},
        )

    access_token = auth_service.createAccessToken(data={'sub': existing_user.email_address})
    return {'access_token': access_token, 'token_type': 'bearer'}

@router.post('/sign_up', response_model=SuccessfulUserAuth, response_model_by_alias=False)
async def attemptSignup(signupObj: SignUpInfo, db: Session = Depends(getDb)):
    # Validate incoming data prior to committing to db
    existing_user = db.query(UserDb).filter(UserDb.email_address == signupObj.email_address).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="There was a problem with your credentials. Please try again.",
        )

    # Commit to db
    hashedPassword = auth_service.genPasswordHash(signupObj.password)
    newUser = UserDb(
        email_address=signupObj.email_address,
        password=hashedPassword,
        first_name=signupObj.first_name,
        last_name=signupObj.last_name
    )
    db.add(newUser)
    db.commit()
    db.refresh(newUser)

    access_token = auth_service.createAccessToken(data={"sub": newUser.email_address})
    return {"access_token": access_token, "token_type": "bearer", "user": UserPyd.model_validate(newUser)}