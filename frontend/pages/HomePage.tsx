import { View, Text } from 'react-native';
import { Button } from '@rneui/base';
import SearchMeal from '../components/SearchMeal';
import DisplayMeal from '../components/DisplayMeal';

const HomePage = ({ navigation }: { navigation: any }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text>Search Page</Text>
        <Button
            title="Test Meal Search"
            onPress={() => navigation.navigate('Search')}
        />
        <Button
            title="Test Multi Meal Search"
            onPress={() => navigation.navigate('MultiSearch')}
        />
      </View>
    );
}

export default HomePage;