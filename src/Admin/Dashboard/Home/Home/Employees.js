import React, {useState} from 'react';

import EmployeeList from './Employees/EmployeeList';
import EmployeeAttendance from './Employees/EmployeeAttendance';
import EmpAttendance from './Employees/EmpAttendance';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Employees() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="EmployeeList" component={EmployeeList} />
      <Stack.Screen name="EmployeeAttendance" component={EmployeeAttendance} />
      <Stack.Screen name="EmpAttendance" component={EmpAttendance} />
    </Stack.Navigator>
  );
}
