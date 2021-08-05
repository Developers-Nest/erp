import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EventScreen from './EventScreen'
import AddEvents from './AddEvents'
import EditEvent from './EditEvent'

const Stack = createStackNavigator();

export default function EventNavigation(){
    return (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Events" component={EventScreen} />      
          <Stack.Screen name="AddEvents" component={AddEvents} />
          <Stack.Screen name="EditEvent" component={EditEvent} />
        </Stack.Navigator>
      );
}