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
import AssignmentStudentDue from './AssignmentStudentDue';
import AssignmentSubmit from './AssignmentSubmit';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AssignmentStudent() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AssignmentStudentDue" component={AssignmentStudentDue} />
      <Stack.Screen name="AssignmentSubmit" component={AssignmentSubmit} />
    </Stack.Navigator>
  );
}
