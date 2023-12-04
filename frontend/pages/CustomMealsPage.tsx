import {View} from 'react-native';
import CustomMeals from '../components/CustomMeals';

const SearchPage = ({ navigation }: { navigation: any }) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            <CustomMeals></CustomMeals>

        </View>
    );
}

export default SearchPage;