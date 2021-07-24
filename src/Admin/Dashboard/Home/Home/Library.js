import React, { useState } from 'react';
import AddBooks from './Library/AddBooks';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Library() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AddBooks" component={AddBooks} />
      {/* <Stack.Screen name="AddVisitors" component={AddVisitors} />
      <Stack.Screen name="EditVisitors" component={EditVisitors} /> */}
    </Stack.Navigator>
  );
}
