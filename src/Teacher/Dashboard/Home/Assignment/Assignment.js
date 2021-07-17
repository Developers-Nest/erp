import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {
  event,
  onChange,
  setValue,
  target,
  value,
} from 'react-native-reanimated';
import {Searchbar} from 'react-native-paper';
// import HeaderAllocatedList from '../shared/headerallocatedlist';
// import {AntDesign} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import AssignmentDue from './AssignmentDue';
import AssignmentAdd from './AssignmentAdd';
import AssignmentEdit from './AssignmentEdit';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Assignment Due" component={AssignmentDue} />
      <Stack.Screen name="Assignment Add" component={AssignmentAdd} />
      <Stack.Screen name="Assignment Edit" component={AssignmentEdit} />
    </Stack.Navigator>
  );
}
