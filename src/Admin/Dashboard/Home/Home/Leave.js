import React, { useState } from 'react';
import LeaveManager from './Leave/LeaveManager';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Leave() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LeaveManager" component={LeaveManager} />
               </Stack.Navigator>
  );
}
