import { View, Text } from 'react-native';
import { Button } from '@rneui/base';
import SearchMeal from '../components/SearchMeal';
import DisplayMeal from '../components/DisplayMeal';

const HomePage = ({ navigation }: { navigation: any }) => {

    const testString = `{
      "id": 716429,
      "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      "image": "https://spoonacular.com/recipeImages/716429-556x370.jpg",
      "imageType": "jpg",
      "servings": 2,
      "readyInMinutes": 45,
      "license": "CC BY-SA 3.0",
      "sourceName": "Full Belly Sisters",
      "sourceUrl": "http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
      "spoonacularSourceUrl": "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429",
      "healthScore": 19.0,
      "spoonacularScore": 83.0,
      "pricePerServing": 163.15,
      "analyzedInstructions": [],
      "cheap": false,
      "nutrients": [
          {
              "name": "Calories",
              "amount": 316.49,
              "unit": "kcal",
              "percentOfDailyNeeds": 15.82
          },
          {
              "name": "Fat",
              "amount": 12.09,
              "unit": "g",
              "percentOfDailyNeeds": 18.6
          },
          {
              "name": "Saturated Fat",
              "amount": 3.98,
              "unit": "g",
              "percentOfDailyNeeds": 24.88
          },
          {
              "name": "Carbohydrates",
              "amount": 49.25,
              "unit": "g",
              "percentOfDailyNeeds": 16.42
          },
          {
              "name": "Net Carbohydrates",
              "amount": 46.76,
              "unit": "g",
              "percentOfDailyNeeds": 17.0
          },
          {
              "name": "Sugar",
              "amount": 21.98,
              "unit": "g",
              "percentOfDailyNeeds": 24.42
          },
          {
              "name": "Cholesterol",
              "amount": 1.88,
              "unit": "mg",
              "percentOfDailyNeeds": 0.63
          },
          {
              "name": "Sodium",
              "amount": 279.1,
              "unit": "mg",
              "percentOfDailyNeeds": 12.13
          },
          {
              "name": "Protein",
              "amount": 3.79,
              "unit": "g",
              "percentOfDailyNeeds": 7.57
          }
      ]
    }`
    const testData = JSON.parse(testString)

   
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Landing Page</Text>
          <Button
              title="Go to OtherPage"
              onPress={() => navigation.navigate('Other')}
          />
        </View>
        <View style={{ width:'100%', justifyContent:'center', alignItems:'center'}}>
          <SearchMeal >

          </SearchMeal>
        </View>

        <View style={{ width:'100%', justifyContent:'center', alignItems:'center'}}>
          <DisplayMeal
          title={testData.title}
          servings={testData.servings}
          readyInMinutes={testData.readyInMinutes}
          calories={testData.nutrients[0].amount}
          fat={testData.nutrients[1].amount}
          protein={testData.nutrients[8].amount}
          carbs={testData.nutrients[3].amount} />
        </View>

      </View>
    );
    
}

export default HomePage;