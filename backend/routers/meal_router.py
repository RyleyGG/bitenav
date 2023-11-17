from fastapi import APIRouter, HTTPException, status, Depends
from db import getDb
from sqlalchemy.orm import Session
from services.config_service import config

from models.db_models import CustomMeal as CustomMealDb
from models.dto_models import MealSearchFilters, MealSearchResult, CustomMeal
import requests
from typing import List

router = APIRouter()

@router.post('/search', response_model = MealSearchResult, response_model_by_alias = False)
async def MealSearch(incomingSearches: MealSearchFilters, db: Session = Depends(getDb)):

    #Building the Spoonacular Request
    searchFilters = ''
    api_return_amount = 1

    if incomingSearches.name:
        searchFilters += f'query={incomingSearches.name}&'
    
    if incomingSearches.cuisine:
        searchFilters += f'cuisine={incomingSearches.cuisine}&'

    if incomingSearches.diet:
        searchFilters += f'diet={incomingSearches.diet}&'

    if incomingSearches.allergies:
        searchFilters += f'intolerances={incomingSearches.allergies}&'

    if incomingSearches.highProtein == True:
        searchFilters += f'minProtein=25&'
    
    if incomingSearches.lowCarb:
        searchFilters += f'maxCarbs=40&'

    if incomingSearches.lowFat:
        searchFilters += f'maxFat=15&'

    if searchFilters[-1] == '&':
        searchFilters = searchFilters[0:-1]
        
    spoonacularURL = f'https://api.spoonacular.com/recipes/complexSearch?apiKey={config.api_key}&number={api_return_amount}&{searchFilters}'
    
    print(spoonacularURL)
    results = requests.get(spoonacularURL)
    
    returnMeals = []

    #This will return the meals with a title, photolink, and a meal ID
    try:
        for meal in results.json()['results']:
            #print(meal)
            NewMealResult = MealSearchResult(name=meal['title'], id = str(meal['id']), photolink=meal['image'], calories='', protein='',carbs='', fat='')
            #print(NewMealResult)
            returnMeals.append(NewMealResult)
    except Exception as e:
        print(str(e))
        raise HTTPException(
            
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Error grabbing Spoonacular results',
        )
    
    # An additional API call needs to be made for each recipe to get the nutitional info

    try:
        for recipe in returnMeals:

            # We start by generating the url to get nutritional information on the meal
            nutritionalURL = f'https://api.spoonacular.com/recipes/{recipe.id}/nutritionWidget.json/?apiKey={config.api_key}'
            
            # Next, we make the call to the API and store the results in a variable
            nutritionalInfo = requests.get(nutritionalURL)
            print(nutritionalInfo.json())
            # A loop is needed to cycle throught the results from the API call and store the macros
            for macros in nutritionalInfo.json()['nutrients']:
                if macros['name'] == 'Calories':
                    recipe.calories = macros['amount']
                elif macros['name'] == 'Protein':
                    recipe.protein = macros['amount']
                elif macros['name'] == 'Carbohydrates':
                    recipe.carbs = macros['amount']
                elif macros['name'] == 'Fat':
                    recipe.fat = macros['amount']
    except Exception as e:
        print(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Error grabbing Nutrition results',
        )
        


    return returnMeals[0]


@router.post('/custom', response_model = CustomMeal, response_model_by_alias = False)
async def createCustomMeal(incomingCustomMeal: CustomMeal, db: Session = Depends(getDb)):

    newCustomMeal= CustomMealDb(
        userID = incomingCustomMeal.user_id,
        name = incomingCustomMeal.name,
        calories = incomingCustomMeal.calories,
        fat = incomingCustomMeal.fat,
        carbs = incomingCustomMeal.carbs,
        protein = incomingCustomMeal.protein,
        photolink = incomingCustomMeal.photolink
        )

    try:
        db.add(newCustomMeal)
        db.commit()
        db.refresh(newCustomMeal)
    except Exception as e:
        print(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Error posting custom meal',
        )
        


    return 


    