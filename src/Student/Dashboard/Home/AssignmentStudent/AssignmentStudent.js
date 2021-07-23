import React from 'react';

import AssignmentStudentDue from './AssignmentStudentDue';
import AssignmentSubmit from './AssignmentSubmit';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AssignmentStudent() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AssignmentStudentDue" component={AssignmentStudentDue} />
      <Stack.Screen name="AssignmentSubmit" component={AssignmentSubmit} />
    </Stack.Navigator>
  );
}
