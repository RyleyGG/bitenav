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
      </View>
    );
}

export default HomePage;