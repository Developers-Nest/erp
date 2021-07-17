import React from 'react';

import {Button} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NotesAdd from './Notes/NotesAdd';
import NotesEdit from './Notes/NotesEdit';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Add Notes" component={NotesAdd} />
      <Stack.Screen name="Edit Notes" component={NotesEdit} />
    </Stack.Navigator>
  );
}
