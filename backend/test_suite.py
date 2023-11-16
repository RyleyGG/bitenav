from models.dto_models import SignUpInfo
from models.db_models import UserToken, Meal, MealIngredient, Ingredient
from services.config_service import logger
from conftest import testClient, dbSession

_accessToken = None

def test_sign_up(testClient, dbSession, overrideDbDepend):
    res = testClient.post(
        '/auth/sign_up',
        json={
            'email_address':'test@test.com',
            'first_name':'joe',
            'last_name':'test',
            'password':'123'
        }
    )

    logger.debug(res.json())
    assert res.status_code == 200

def test_sign_in(testClient, dbSession, overrideDbDepend):
    global _accessToken

    res = testClient.post(
        '/auth/sign_in',
        json={
            'email_address':'test@test.com',
            'password':'123'
        }
    )

    if res.status_code == 200:
        _accessToken = res.json()['access_token']

    assert res.status_code == 200

def test_basic_auth_check(testClient, dbSession):
    logger.debug(_accessToken)
    res = testClient.get('/', headers={'Authorization': f'Bearer {_accessToken}'})

    assert res.status_code == 200
    assert res.json()['message'] == 'Hello World'

def sample_user():
    # Create a sample user instance for testing
    user = UserToken(UserName="testuser", Password="password", Email="testuser@example.com")
    return user

def test_user_model_create(sample_user):
    # Test the creation of a user
    assert sample_user.UserName == "testuser"
    assert sample_user.Password == "password"
    assert sample_user.Email == "testuser@example.com"

def test_meal_model_create():
    # Create a sample meal instance
    meal = Meal(Name="Spaghetti", Category="Pasta")
    assert meal.Name == "Spaghetti"
    assert meal.Category == "Pasta"

def test_meal_ingredient_model_create():
    # Create a sample meal ingredient instance
    meal_ingredient = MealIngredient(MealID=1, IngredientID=1)
    assert meal_ingredient.MealID == 1
    assert meal_ingredient.IngredientID == 1

def test_ingredient_model_create():
    # Create a sample ingredient instance
    ingredient = Ingredient(Name="Tomato", Calories=20.0, Protein=1.0)
    assert ingredient.Name == "Tomato"
    assert ingredient.Calories == 20.0
    assert ingredient.Protein == 1.0