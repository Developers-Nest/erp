import React from 'react';

import {Button} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './Login';
import DashboardScreen from './Dashboard/Dashboard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Student Login" component={LoginScreen} />
      <Stack.Screen name="Student Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}
