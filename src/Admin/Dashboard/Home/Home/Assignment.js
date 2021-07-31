import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AssignmentDue from './Assignment/AssignmentDue';
import AssignmentAdd from './Assignment/AssignmentAdd';
import AssignmentEdit from './Assignment/AssignmentEdit';
const Stack = createStackNavigator();

export default function Assignment() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Assignment Due" component={AssignmentDue} />
      <Stack.Screen name="Assignment Add" component={AssignmentAdd} />
      <Stack.Screen name="Assignment Edit" component={AssignmentEdit} />
    </Stack.Navigator>
  );
}
