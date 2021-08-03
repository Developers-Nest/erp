import React, { useState } from 'react';
import TransportMain from './Transport/TransportMain';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Transport() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TransportMain" component={TransportMain} />
    </Stack.Navigator>
  );
}
