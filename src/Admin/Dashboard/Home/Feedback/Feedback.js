import React, { useState } from 'react';
import FeedbackMain from './FeedBackMain';
import AddQuestion from './AddQuestion';
import EditQuestion from './EditQuestion';

import QuestionList from './QuestionList';
import TypeList from './TypeList';
import { createStackNavigator } from '@react-navigation/stack';
import AddType from './AddType';
import EditType from './EditType';


const Stack = createStackNavigator();

export default function FeedBack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="FeedbackMain" component={FeedbackMain} />      
      <Stack.Screen name="AddQuestion" component={AddQuestion} />
      <Stack.Screen name="AddType" component={AddType} />
      <Stack.Screen name="EditType" component={EditType} />
      <Stack.Screen name="EditQuestion" component={EditQuestion} />
      <Stack.Screen name="QuestionList" component={QuestionList} />
      <Stack.Screen name="TypeList" component={TypeList} />
    </Stack.Navigator>
  );
}
