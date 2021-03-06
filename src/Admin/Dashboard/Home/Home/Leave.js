import React, { useState } from 'react';
import LeaveManager from './Leave/LeaveManager';
import LeaveApplication from './Leave/LeaveApplication';
import AddApplication from './Leave/AddApplication';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Leave() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LeaveManager" component={LeaveManager} />
      <Stack.Screen name="LeaveApplication" component={LeaveApplication} />
      
      <Stack.Screen name="AddApplication" component={AddApplication} />
               </Stack.Navigator>
  );
}
