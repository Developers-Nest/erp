import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import LoginScreen from './Login';
import Login from './Login';
import DashboardScreen from './Dashboard/Dashboard';

const Stack = createStackNavigator();

export default function Admin() {

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
    </Stack.Navigator>
  );
}
