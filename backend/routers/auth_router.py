from fastapi import APIRouter, HTTPException, status, Depends
from db import getDb
from sqlalchemy.orm import Session

from models.db_models import User as UserDb
from models.pydantic_models import User as UserPyd
from models.dto_models import SignUpInfo


router = APIRouter()

@router.post('/sign_in')
async def attemptSignin(db: Session = Depends(getDb)):
    pass

@router.post('/sign_up', response_model=UserPyd, response_model_by_alias=False)
async def attemptSignup(incomingObj: SignUpInfo, db: Session = Depends(getDb)):
    # Validate incoming data prior to committing to db
    existing_user = db.query(UserDb).filter(UserDb.emailAddress == incomingObj.email_address).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="There was a problem with your credentials. Please try again.",
        )

    # Commit to db
    newUser = UserDb(
        emailAddress=incomingObj.email_address,
        firstName=incomingObj.first_name,
        lastName=incomingObj.last_name
    )
    db.add(newUser)
    db.commit()

    return UserPyd.from_orm(newUser)