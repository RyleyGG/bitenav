import pytest
from models.db_models import UserToken, Meal, MealIngredient, Ingredient

@pytest.fixture
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