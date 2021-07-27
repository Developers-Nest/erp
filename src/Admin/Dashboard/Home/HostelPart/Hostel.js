import React, { useState } from 'react';

//hostel allocation
import HostelDetails from './HostelDetails';
import HostelAllocationAdd from './HostelAllocationAdd';
import AllocatedListHostel from './AllocatedListHostel';
//hostel request


//rooms list

//visitors list
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Hostel() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HostelDetails" component={HostelDetails} />
      <Stack.Screen name="HostelAllocationAdd" component={HostelAllocationAdd} />
      <Stack.Screen name="AllocatedListHostel" component={AllocatedListHostel} />
    

      
      
    </Stack.Navigator>
  );
}
