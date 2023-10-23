import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { userIsAuthenticated } from './services/AuthService';

import NavigationHeader from './components/NavigationHeader';
import HomePage from './pages/HomePage'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import OtherPage from './pages/OtherPage'

const Stack = createNativeStackNavigator();

interface NavigatorOptions {
    initialRouteName?: string;
    screenOptions?: NativeStackNavigationOptions;
}

const getNavigatorOpts = (authToken: boolean) => {
    const opts: NavigatorOptions = {};

    if (authToken) {
        opts.initialRouteName = 'Home';
        opts.screenOptions = {
            header: NavigationHeader
        };
    }
    else {
        opts.initialRouteName = 'Sign-in';
    }

    return opts;
}

const App = () => {
    const validAuthToken = userIsAuthenticated();
    const navOpts = getNavigatorOpts(validAuthToken);
  return (
    <NavigationContainer>
        <Stack.Navigator
            {...navOpts}
        >
            {validAuthToken ? (
            <>
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Other" component={OtherPage} />
            </>
            ) : (
            <>
                <Stack.Screen name="Sign-in" component={SigninPage} />
                <Stack.Screen name="Sign-up" component={SignupPage} />
            </>
            )}
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;