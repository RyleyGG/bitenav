import { View, Text } from 'react-native';
import { Button } from '@rneui/base';

const HomePage = ({ navigation }: { navigation: any }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Landing Page</Text>
        <Button
            title="Go to OtherPage"
            onPress={() => navigation.navigate('Other')}
        />
        <Button
            title="Go to Search"
            onPress={() => navigation.navigate('Search')}
        />
      </View>
    );
}

export default HomePage;