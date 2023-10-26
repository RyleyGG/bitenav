import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavigationHeader from './components/NavigationHeader';
import HomePage from './pages/HomePage'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import OtherPage from './pages/OtherPage'
import { AuthContext, AuthProvider } from './AuthContext';
import { useContext, useEffect, useState } from 'react';
import SearchPage from './pages/MealSearchPage';

const Stack = createNativeStackNavigator();

const AuthenticatedApp = () => {
    return (
      <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
          header: NavigationHeader
      }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Other" component={OtherPage} />
      </Stack.Navigator>
    );
  };
  
  const UnauthenticatedApp = () => {
    return (
      <Stack.Navigator
      initialRouteName='Search'>
        <Stack.Screen name="Sign-in" component={SigninPage} />
        <Stack.Screen name="Sign-up" component={SignupPage} />
        <Stack.Screen name="Search" component={SearchPage} />
      </Stack.Navigator>
    );
  };
  
  const AppNavigator = () => {
    const { isAuthenticated } = useContext(AuthContext);
  
    return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
  };
  
  const App = () => {
    return (
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    );
  };
  
  export default App;