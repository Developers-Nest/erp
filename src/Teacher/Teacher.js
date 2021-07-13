import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Login';
import DashboardScreen from './Dashboard/Dashboard';

const Stack = createStackNavigator();

export default function Teacher() {

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Teacher Login" component={LoginScreen} />
      <Stack.Screen name="Teacher Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}
