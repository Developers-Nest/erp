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
import LessonPlanAdd from './LessonPlanAdd';
import LessonPlanEdit from './LessonPlanEdit';

const Stack = createStackNavigator();

export default function LessonPlanStack() {
  return (
    <Stack.Navigator headerMode="none">
            <Stack.Screen name="Subjects" component={Subjects} />
      <Stack.Screen name="Lesson Plan" component={LessonPlan} />
      <Stack.Screen name="Add Lesson Plan" component={LessonPlanAdd} />
      <Stack.Screen name="Edit Lesson Plan" component={LessonPlanEdit} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  header: {
    height: 65,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  Drop: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    height: 310,
  },
  Week: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
