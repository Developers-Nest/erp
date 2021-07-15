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
import AttendanceScreen1 from './AttendanceScreen1';
import AttendanceScreen2 from './AttendanceScreen2';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AttendanceStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AttendanceScreen1" component={AttendanceScreen1} />
      <Stack.Screen name="AttendanceScreen2" component={AttendanceScreen2} />
    </Stack.Navigator>
  );
}
