import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavigationHeader from './components/NavigationHeader';
import HomePage from './pages/HomePage'
import OtherPage from './pages/OtherPage'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                header: NavigationHeader
            }}
        >
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Other" component={OtherPage} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;