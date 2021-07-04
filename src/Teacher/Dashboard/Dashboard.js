import React from 'react';
import {View} from 'react-native';

import {Button, Appbar} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './Home/Home';
import Message from './Message/Message';
import Profile from './Profile/Profile';
import Statistics from './Statistics/Statistics';
import Classes from './Classes/Classes';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Classes" component={Classes} />
      <Tab.Screen name="Statistics" component={Statistics} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Message" component={Message} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
