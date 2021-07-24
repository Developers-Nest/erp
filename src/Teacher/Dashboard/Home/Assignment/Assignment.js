import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AssignmentDue from './AssignmentDue';
import AssignmentAdd from './AssignmentAdd';
import AssignmentEdit from './AssignmentEdit';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Assignment Due" component={AssignmentDue} />
      <Stack.Screen name="Assignment Add" component={AssignmentAdd} />
      <Stack.Screen name="Assignment Edit" component={AssignmentEdit} />
    </Stack.Navigator>
  );
}
