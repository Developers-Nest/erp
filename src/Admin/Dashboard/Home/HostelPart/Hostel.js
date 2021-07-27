import React, { useState } from 'react';

//hostel allocation
import HostelDetails from './HostelDetails';
import HostelAllocationAdd from './HostelAllocationAdd';
import HostelAllocationEdit from './HostelAllocationEdit';
import AllocatedListHostel from './AllocatedListHostel';
//hostel request


//rooms list
import RoomsList from './RoomsList';
import VisitorsList from './VisitorsList';
import AddVisitorsHostel from './AddVisitorsHostel';
import EditVisitorsHostel from './EditVisitorsHostel';
//visitors list
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Hostel() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HostelDetails" component={HostelDetails} />
      <Stack.Screen name="HostelAllocationAdd" component={HostelAllocationAdd} />
      <Stack.Screen name="HostelAllocationEdit" component={HostelAllocationEdit} />
      <Stack.Screen name="AllocatedListHostel" component={AllocatedListHostel} />
{/* 
      for rooms */}
      <Stack.Screen name="RoomsList" component={RoomsList} />
      <Stack.Screen name="VisitorsList" component={VisitorsList} />
      <Stack.Screen name="AddVisitorsHostel" component={AddVisitorsHostel} />
      <Stack.Screen name="EditVisitorsHostel" component={EditVisitorsHostel} />    

      
      
    </Stack.Navigator>
  );
}
