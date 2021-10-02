import React from 'react';

import LecturesScreen from './LecturesScreen';
import GoLiveScreen from './GoLive';
import LiveLectureScreen from './LectureLiveEdit';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();


// navigation for classes 

export default function Classes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Lectures" component={LecturesScreen} />
      <Stack.Screen name="GoLive" component={GoLiveScreen} />
      <Stack.Screen name="LiveEdit" component={LiveLectureScreen} />
    </Stack.Navigator>
  );
}
