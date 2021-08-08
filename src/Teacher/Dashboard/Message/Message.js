import React from 'react';
import Chats from './MessageUsers';
import ChatScreen1 from './Messages1';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Message() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="ChatScreen1" component={ChatScreen1} />
    </Stack.Navigator>
  );
}
