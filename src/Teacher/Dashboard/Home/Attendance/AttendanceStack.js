import React, {useState} from 'react';

import AttendanceScreen1 from './AttendanceScreen1';
import AttendanceScreen2 from './AttendanceScreen2';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AttendanceStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AttendanceScreen2" component={AttendanceScreen2} />
      <Stack.Screen name="AttendanceScreen1" component={AttendanceScreen1} />
    </Stack.Navigator>
  );
}
