import React, { useState } from 'react';
import TransportMain from './Transport/TransportMain';
import AddDestination from './Transport/AddDestination';
import AddDriver from './Transport/AddDriver';
import AddVehicle from './Transport/AddVehicle';
import EditDestination from './Transport/EditDestination';
import EditDriver from './Transport/EditDriver';
import EditVehicle from './Transport/EditVehicle';
import SmsAlert from './Transport/SmsAlert';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Transport() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TransportMain" component={TransportMain} />

      <Stack.Screen name="AddDestination" component={AddDestination} />
      <Stack.Screen name="AddDriver" component={AddDriver} />
      <Stack.Screen name="AddVehicle" component={AddVehicle} />
      <Stack.Screen name="EditVehicle" component={EditVehicle} />
      <Stack.Screen name="EditDestination" component={EditDestination} />
      <Stack.Screen name="EditDriver" component={EditDriver} />
      <Stack.Screen name="SmsAlert" component={SmsAlert} />

    </Stack.Navigator>
  );
}
