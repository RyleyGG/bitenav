from fastapi import APIRouter, HTTPException, status, Depends
from db import getDb
from sqlalchemy.orm import Session

from models.dto_models import MealSearchFilters, MealSearchResult
import requests
from typing import List

router = APIRouter()

@router.post('/search', response_model = MealSearchResult, response_model_by_alias = False)
async def MealSearch(incomingSearches: MealSearchFilters, db: Session = Depends(getDb)):
    
    searchFilters = ''
    apiKey = 'f5c554fbdd43461eb5ff8af17aba8941'
    api_return_amount = 3
    # Need a loop to go through the search filters
    if incomingSearches.name:
        searchFilters += f'query={incomingSearches.name}&'
    

    if searchFilters[-1] == '&':
        searchFilters = searchFilters[0:-2]
        
    spoonacularURL = f'https://api.spoonacular.com/recipes/complexSearch?apiKey={apiKey}&{api_return_amount}&{searchFilters}'

    results = requests.get(spoonacularURL)

    returnMeals = []

    try:
        for meal in results.json()['results']:
            NewMealResult = MealSearchResult(name=meal['title'])
            returnMeals.append(NewMealResult)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Error grabbing Spoonacular results',
        )

    return returnMeals[0]


    