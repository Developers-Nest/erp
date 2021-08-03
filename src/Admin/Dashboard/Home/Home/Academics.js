import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AcademicsMain from './Academics/AcademicsMain';
const Stack = createStackNavigator();

export default function Academics() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="AcademicsMain" component={AcademicsMain} />
        </Stack.Navigator>
    );
}
