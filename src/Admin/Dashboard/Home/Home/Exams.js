import React, { useState } from 'react';
import OnlineExams from './Exams/OnlineExams';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Exams() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="OnlineExams" component={OnlineExams} />
         </Stack.Navigator>
  );
}
