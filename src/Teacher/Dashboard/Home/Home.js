import React from 'react';

import {Text} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Assignment from './Assignment/Assignment';
import Attendance from './Attendance/Attendance';
import Books from './Books/Books';
import ContentLibrary from './Content Library/ContentLibrary';
import Feedback from './Feedback/Feedback';
import LessonPlan from './Lesson Plan/LessonPlan';
import Transport from './Transport/Transport';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Content Library" component={ContentLibrary} />
      <Drawer.Screen name="Attendance" component={Attendance} />
      <Drawer.Screen name="Assignment" component={Assignment} />
      <Drawer.Screen name="Lesson Plan" component={LessonPlan} />
      <Drawer.Screen name="Books" component={Books} />
      <Drawer.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen name="Transport" component={Transport} />
    </Drawer.Navigator>
  );
}
