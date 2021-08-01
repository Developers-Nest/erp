import React, { useState } from 'react';

import PaymentSlip from './PaymentSlip';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function PaymentStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="PaymentSlip" component={PaymentSlip} />
      
    </Stack.Navigator>
  );
}
