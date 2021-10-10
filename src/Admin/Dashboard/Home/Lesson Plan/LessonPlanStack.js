import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LessonPlan from './Plan';
const Stack = createStackNavigator();

export default function LessonPlanStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LessonPlan" component={LessonPlan} />

  
    </Stack.Navigator>
  );
}