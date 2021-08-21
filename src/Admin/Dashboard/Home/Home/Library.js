import React, { useState } from 'react';
import AddBooks from './Library/AddBooks';
import EditBooks from './Library/EditBooks';
import IssuedBooksAdd from './Library/IssuedBooksAdd';
import IssuedBooksEdit from './Library/IssuedBooksEdit';
import Booksrequest from './Library/BooksRequest';
import LibraryMain from './Library/LibraryMain';
import IssuedStatus from './Library/IssuedStatus';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Library() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LibraryMain" component={LibraryMain} />
      <Stack.Screen name="IssuedStatus" component={IssuedStatus} />
      <Stack.Screen name="BooksRequest" component={Booksrequest} />
      <Stack.Screen name="AddBooks" component={AddBooks} />
      <Stack.Screen name="EditBooks" component={EditBooks} />

      <Stack.Screen name="IssuedBooksAdd" component={IssuedBooksAdd} />
      <Stack.Screen name="IssuedBooksEdit" component={IssuedBooksEdit} />
    </Stack.Navigator>
  );
}
