import {View} from 'react-native';
import MultiMealSearch from '../components/MultiMealSearch';

const MultiSearchPage = ({ navigation }: { navigation: any }) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            <MultiMealSearch></MultiMealSearch>
            
        </View>
    );
}

export default MultiSearchPage;