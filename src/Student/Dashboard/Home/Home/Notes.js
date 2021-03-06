import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import NotesAdd from './Notes/NotesAdd';
import NotesEdit from './Notes/NotesEdit';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Add Notes" component={NotesAdd} />
      <Stack.Screen name="Edit Notes" component={NotesEdit} />
    </Stack.Navigator>
  );
}
