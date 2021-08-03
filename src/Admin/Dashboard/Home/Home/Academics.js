import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AcademicsMain from './Academics/AcademicsMain';
import ClassTeacherAllocation from './Academics/ClassTeacherAllocation';
import AllocateClassTeacher from './Academics/AllocateClassTeacher';
import AddBatches from './Academics/AddBatches';
import AddCourses from './Academics/AddCourses';
import EditBatches from './Academics/EditBatches';
import EditAllocationTeacher from './Academics/EditAllocationTeacher';
import EditCourses from './Academics/EditCourses';
const Stack = createStackNavigator();

export default function Academics() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="AcademicsMain" component={AcademicsMain} />
            <Stack.Screen name="ClassTeacherAllocation" component={ClassTeacherAllocation} />
            <Stack.Screen name="AllocateClassTeacher" component={AllocateClassTeacher} />
            <Stack.Screen name="AddBatches" component={AddBatches} />
            <Stack.Screen name="AddCourses" component={AddCourses} />
            <Stack.Screen name="EditBatches" component={EditBatches} />
            <Stack.Screen name="EditAllocationTeacher" component={EditAllocationTeacher} />
            <Stack.Screen name="EditCourses" component={EditCourses} />
        </Stack.Navigator>
    );
}
