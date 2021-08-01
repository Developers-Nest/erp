import React, { useState } from 'react';
import TasksList from './TasksList';
import AddTask from './AddTask';
import EditTask from './EditTask';

import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Task() {
  return (
    <Stack.Navigator headerMode="none">
      
      <Stack.Screen name="TasksList" component={TasksList} />
      <Stack.Screen name="AddTask" component={AddTask} />
      <Stack.Screen name="EditTask" component={EditTask} />
    </Stack.Navigator>
  );
}
