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
import ContentSubject from './ContentSubject';
import ContentLibrary from './ContentLibrary';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function ContentStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ContentSubject" component={ContentSubject} />
      <Stack.Screen name="ContentLibrary" component={ContentLibrary} />
    </Stack.Navigator>
  );
}
