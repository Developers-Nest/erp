import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  Button,
  List,
  Card,
  Title,
  Paragraph,
  TextInput,
} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import Subjects from './Subjects';
import LessonPlan from './Plan';
const Stack = createStackNavigator();

export default function LessonPlanStack() {
  return (
    <Stack.Navigator headerMode="none">
                    <Stack.Screen name="Subjects" component={Subjects} />
      <Stack.Screen name="LessonPlan" component={LessonPlan} />

  
    </Stack.Navigator>
  );
}