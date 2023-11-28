import { View, Text } from 'react-native';
import { Button } from '@rneui/base';
import SearchMeal from '../components/SearchMeal';
import DisplayMeal from '../components/DisplayMeal';

const HomePage = ({ navigation }: { navigation: any }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text>Search Page</Text>
        <Button
            title="Test Meal Search Function"
            onPress={() => navigation.navigate('Search')}
        />
      <Text>Custom Meals</Text>
      <Button
        title="Test Custom Meals Function"
        onPress={() => navigation.navigate("CustomMeals")}
        />
      </View>
    );
}

export default HomePage;