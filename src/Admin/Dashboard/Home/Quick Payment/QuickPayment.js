import React, { useState } from 'react';
import QuickPayment1 from './QuickPayment1';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function QuickPayment() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="QuickPayment1" component={QuickPayment1} />
    </Stack.Navigator>
  );
}
