import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AcademicsMain from './Academics/AcademicsMain';
import ClassTeacherAllocation from './Academics/ClassTeacherAllocation';
const Stack = createStackNavigator();

export default function Academics() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="AcademicsMain" component={AcademicsMain} />
            <Stack.Screen name="ClassTeacherAllocation" component={ClassTeacherAllocation} />
        </Stack.Navigator>
    );
}
