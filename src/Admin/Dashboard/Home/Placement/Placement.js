import React, { useState } from 'react';

import PlacementScreen1 from './PlacementScreen1';
import NotFound from './NotFound';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function Placement() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="PlacementScreen1" component={PlacementScreen1} />
            <Stack.Screen name="NotFound" component={NotFound} />
        </Stack.Navigator>
    );
}
