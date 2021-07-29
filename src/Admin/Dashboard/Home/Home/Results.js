import React, { useState } from 'react';

import CceMarksAdmin from './Results/CceMarks';
import GpaMarks from './Results/GpaMarks';


import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Results() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="GpaMarks" component={GpaMarks} />
            <Stack.Screen name="CceMarks" component={CceMarksAdmin} />
            
        </Stack.Navigator>
    );
}
