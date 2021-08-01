import React, { useState } from 'react';

import NotificationMain from './Notification/NotificationMain';
import AddNotification from './Notification/AddNotification';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Notify() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="NotificationMain" component={NotificationMain} />
            <Stack.Screen name="AddNotification" component={AddNotification} />
            
        </Stack.Navigator>
    );
}
