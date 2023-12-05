from fastapi import APIRouter, HTTPException, status, Depends
from db import getDb
from sqlalchemy.orm import Session
from services.config_service import config, logger

from models.db_models import CustomMeal as CustomMealDb, User as UserDb
from models.pydantic_models import CustomMeal as CustomMealPyd
from models.dto_models import MealSearchFilters, MealSearchResult
import requests
from typing import List
from services import auth_service


router = APIRouter()

@router.post('/search', response_model=MealSearchResult, response_model_by_alias=False)
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
    
    try:
        results = requests.get(spoonacularURL)
    except Exception as e:
        logger.error(spoonacularURL)
    returnMeals = []

    #This will return the meals with a title, photolink, and a meal ID
    try:
        for meal in results.json()['results']:
            #print(meal)
            NewMealResult = MealSearchResult(name=meal['title'], id = str(meal['id']), photolink=meal['image'], calories='', protein='',carbs='', fat='')
            #print(NewMealResult)
            returnMeals.append(NewMealResult)
    except Exception as e:
        logger.error(str(e))
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
        logger.error(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Error grabbing Nutrition results',
        )
        


    return returnMeals[0]


@router.post('/custom', response_model=CustomMealPyd, response_model_by_alias=False)
async def createCustomMeal(incomingCustomMeal: CustomMealPyd, db: Session = Depends(getDb), user: UserDb = Depends(auth_service.validateToken)):
    newCustomMeal=CustomMealDb(
        Userid=user.id,
        name=incomingCustomMeal.name,
        calories=incomingCustomMeal.calories,
        fat=incomingCustomMeal.fat,
        carbs=incomingCustomMeal.carbs,
        protein=incomingCustomMeal.protein,
        )
    try:
        db.add(newCustomMeal)
        db.commit()
        db.refresh(newCustomMeal)
    except Exception as e:
        logger.error(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Error posting custom meal',
        )
        
    return newCustomMeal

@router.get('/custom', response_model=List[CustomMealPyd], response_model_by_alias=False)
async def get_meal(db: Session = Depends(getDb), user: UserDb = Depends(auth_service.validateToken)):
    meal = db.query(CustomMealDb).filter(CustomMealDb.Userid == user.id).all()
    if meal is None:
        return {"message": "Custom Meal not found"}
    
    return meal
    
@router.get('/{meal_id}', response_model=CustomMealPyd, response_model_by_alias=False)
async def get_meal(meal_id: int, db: Session = Depends(getDb)):
    meal = db.query(CustomMealDb).filter(CustomMealDb.id == meal_id).first()
    if meal is None:
        return {"message": "Meal not found"}
    
    return meal

@router.delete('/custom', response_model=CustomMealPyd, response_model_by_alias=False)
async def delete_meal(db: Session = Depends(getDb), user: UserDb = Depends(auth_service.validateToken)):
    meal = db.query(CustomMealDb).filter(CustomMealDb.Userid == user.id).first()
    if meal is None:
        return {"message": "Meal not found"}
    db.delete(meal)
    db.commit()
    return meal

@router.post('/MultiSearch', response_model=List[MealSearchResult], response_model_by_alias=False)
async def MealSearch(incomingSearches: MealSearchFilters, db: Session = Depends(getDb)):
    #Variable Declaration
    searchFilters = ''
    api_return_amount = 3
    tags = 'popular'
    type = 'main course'
    returnMeals = []

    #Building the Spoonacular Request based on incoming data
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

    if incomingSearches.offset:
        searchFilters += f'offset={incomingSearches.offset}&'

    if searchFilters[-1] == '&':
        searchFilters = searchFilters[0:-1]
        
    #Compiling request URL
    spoonacularURL = f'https://api.spoonacular.com/recipes/complexSearch?apiKey={config.api_key}&number={api_return_amount}&{searchFilters}'
    
    #Calling Spoonacular API
    try:
        results = requests.get(spoonacularURL)
    except Exception as e:
        logger.error(spoonacularURL)

    #The API returns a title, photolink, and meal ID for each meal. These are stored in a list
    try:
        for meal in results.json()['results']:
            #print(meal)
            NewMealResult = MealSearchResult(name=meal['title'], id = str(meal['id']), photolink=meal['image'], calories='', protein='',carbs='', fat='')
            #print(NewMealResult)
            returnMeals.append(NewMealResult)
    except Exception as e:
        logger.error(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Error grabbing Spoonacular results',
        )
    
    # An additional API call is made for each recipe to get it's nutitional info
    try:
        for recipe in returnMeals:

            # We start by generating the url to get nutritional information on the meal
            nutritionalURL = f'https://api.spoonacular.com/recipes/{recipe.id}/nutritionWidget.json/?apiKey={config.api_key}'
            
            # Next, we make the call to the API and store the results in a variable
            nutritionalInfo = requests.get(nutritionalURL)
            #print(nutritionalInfo.json())
            # Then a loop is used to cycle throught the results from the API call and store the macros
            for macros in nutritionalInfo.json()['nutrients']:
                if macros['name'] == 'Calories':
                    recipe.calories = str(macros['amount'])
                elif macros['name'] == 'Protein':
                    recipe.protein = str(macros['amount'])
                elif macros['name'] == 'Carbohydrates':
                    recipe.carbs = str(macros['amount'])
                elif macros['name'] == 'Fat':
                    recipe.fat = str(macros['amount'])
    except Exception as e:
        logger.error(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Error grabbing Nutrition results',
        )
        
    return returnMeals

@router.post('/MultiSearchTest', response_model=List[MealSearchResult], response_model_by_alias=False)
async def MealSearch(incomingSearches: MealSearchFilters, db: Session = Depends(getDb)):
    returnMeals = []
    
    returnMeals.append(MealSearchResult(name="Pizza bites with pumpkin", id = "656329", photolink="https://spoonacular.com/recipeImages/656329-312x231.jpg", calories="310.06", protein="15.57",carbs="13.58", fat=
"22.48"))
    returnMeals.append(MealSearchResult(name="BLT Pizza", id = '680975', photolink="https://spoonacular.com/recipeImages/680975-312x231.jpg", calories="776.64", protein="34.73",carbs="74.61", fat=
"37.96"))
    returnMeals.append(MealSearchResult(name="Thai Pizza", id = '"663136"', photolink="https://spoonacular.com/recipeImages/663136-312x231.jpg", calories="910.57", protein="44.84",carbs="105.96", fat=
"35.44"))
    
        
    return returnMeals