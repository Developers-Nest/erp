import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Subjects from './Subjects';
import LessonPlan from './Plan';
const Stack = createStackNavigator();

export default function LessonPlanStack() {
  return (
    <Stack.Navigator headerMode="none">
                    <Stack.Screen name="Subjects" component={Subjects} />
      <Stack.Screen name="LessonPlan" component={LessonPlan} />

  
    </Stack.Navigator>
  );
}