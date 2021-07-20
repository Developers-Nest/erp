import React, { useState } from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  RadioButton,
} from 'react-native-paper';
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
