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
  RadioButton
} from 'react-native-paper';

import Settingsmain from './Settings/Settingsmain';
import AddVisitors from './Settings/AddVisitors';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Settings() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SettingUsers" component={Settingsmain} />
      <Stack.Screen name="Addvisitors" component={AddVisitors} />
    </Stack.Navigator>
  );
}
