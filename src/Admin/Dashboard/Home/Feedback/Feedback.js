import React, { useState } from 'react';
import FeedbackMain from './FeedBackMain';
import AddQuestion from './AddQuestion';
import EditQuestion from './EditQuestion';
import QuestionList from './QuestionList';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function FeedBack() {
  return (
    <Stack.Navigator headerMode="none">
      

      <Stack.Screen name="AddQuestion" component={AddQuestion} />
      <Stack.Screen name="EditQuestion" component={EditQuestion} />
      <Stack.Screen name="QuestionList" component={QuestionList} />
      
      <Stack.Screen name="FeedbackMain" component={FeedbackMain} />
    </Stack.Navigator>
  );
}
