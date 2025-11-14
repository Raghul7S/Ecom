import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Cart from './src/screens/Cart';
import CheckOut from './src/screens/CheckOut';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="CheckOut" component={CheckOut} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
