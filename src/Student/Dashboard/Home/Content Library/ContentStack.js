import React from 'react';
import ContentLibrary from './ContentLibrary';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function ContentStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ContentLibrary" component={ContentLibrary} />
      {/* <Stack.Screen name="ContentSubject" component={ContentSubject} /> */}
    </Stack.Navigator>
  );
}
