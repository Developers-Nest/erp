import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LessonPlan from './Plan';
import LessonPlanAdd from './LessonPlanAdd';
import LessonPlanEdit from './LessonPlanEdit';

const Stack = createStackNavigator();

export default function OnlineLecture() {
  return (
    <Stack.Navigator headerMode="none">
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
    height: 69,
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
