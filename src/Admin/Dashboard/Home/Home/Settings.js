import React, { useState } from 'react';
import Settingsmain from './Settings/Settingsmain';
import AddVisitors from './Settings/AddVisitors';
import EditVisitors from './Settings/EditVisitors';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Settings() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SettingUsers" component={Settingsmain} />
      <Stack.Screen name="AddVisitors" component={AddVisitors} />
      <Stack.Screen name="EditVisitors" component={EditVisitors} />
    </Stack.Navigator>
  );
}
