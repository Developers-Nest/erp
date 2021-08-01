import React from 'react';

import LecturesScreen from './LecturesScreen';
import GoLiveScreen from './GoLive';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lectures"
        component={LecturesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="GoLive" component={GoLiveScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
