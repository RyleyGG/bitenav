from fastapi import APIRouter, HTTPException, status, Depends
from db import getDb
from sqlalchemy.orm import Session

from models.dto_models import MealSearchFilters, MealSearchResult
import requests
from typing import List

router = APIRouter()

@router.post('/meal_search', response_model = MealSearchResult, response_model_by_alias = False)
async def MealSearch(incomingSearches: MealSearchFilters, db: Session = Depends(getDb)):
    
    NameSearch = ''
    if incomingSearches.name:
        NameSearch += f'query={incomingSearches.name}&'
    if NameSearch[-1] == '&':
        NameSearch = NameSearch[0:-2]
    spoonacularURL = f'https://api.spoonacular.com/recipes/complexSearch?apiKey=&f5c554fbdd43461eb5ff8af17aba8941{NameSearch}'

    results = requests.get(spoonacularURL)

    returnMeals = []

    for meal in results['results']:
        NewMealResult = MealSearchResult()
        NewMealResult.name = meal['name']
        returnMeals.append(NewMealResult)

    return returnMeals[0]


    