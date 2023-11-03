import React from 'react';
import { AuthProvider } from './AuthContext';
import Root from './Root';

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
      initialRouteName='Home'>
        <Stack.Screen name="Sign-in" component={SigninPage} />
        <Stack.Screen name="Sign-up" component={SignupPage} />
        <Stack.Screen name="Search" component={SearchPage} />
        <Stack.Screen name="Home" component={HomePage} />
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
const App = () => {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
};

export default App;
