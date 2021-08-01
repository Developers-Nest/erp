import React, { useState } from 'react';
import BulkSMS from './BulkSMS';
import SmsAlert from './Email';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function SmsStack() {
    return (
        <Stack.Navigator headerMode="none">

            <Stack.Screen name="BulkSMS" component={BulkSMS} />
            <Stack.Screen name="SmsAlert" component={SmsAlert} />
        </Stack.Navigator>
    );
}
