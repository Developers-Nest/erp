import React, { useState } from 'react';

import ReportList from './ReportList';
import StudentReport from './StudentReport';

import FeesDueReport from './FeesDueReport';
import AbsenteesReport from './AbsenteesReport';
import FeesPaidReport from './FeesPaidReport';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Report() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ReportList" component={ReportList} />
      <Stack.Screen name="StudentReport" component={StudentReport} />
      <Stack.Screen name="AbsenteesReport" component={AbsenteesReport} />
      <Stack.Screen name="FeesPaidReport" component={FeesPaidReport} />
      <Stack.Screen name="FeesDueReport" component={FeesDueReport} />

      
      
    </Stack.Navigator>
  );
}
