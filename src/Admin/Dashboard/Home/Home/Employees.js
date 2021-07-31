import React, { useState } from 'react';
import EmployeeList from './Employees/EmployeeList';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Employees() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="EmployeeList" component={EmployeeList} />
         </Stack.Navigator>
  );
}
