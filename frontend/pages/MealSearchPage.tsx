import {View, Text} from 'react-native';
import SearchMeal from '../components/SearchMeal';
import { API_URL } from '@env'

const SearchPage = ({ navigation }: { navigation: any }) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <SearchMeal></SearchMeal>
        </View>
    );
}

export default SearchPage;