import {View} from 'react-native';
import SearchMeal from '../components/SearchMeal';

const SearchPage = ({ navigation }: { navigation: any }) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            <SearchMeal></SearchMeal>
            
        </View>
    );
}

export default SearchPage;