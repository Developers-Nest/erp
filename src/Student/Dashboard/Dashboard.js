import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Button, Appbar} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import Home from './Home/Home';
import Message from './Message/Message';
import Profile from './Profile/Profile';
import Statistics from './Statistics/Statistics';
import Classes from './Classes/Classes';

const Tab = createBottomTabNavigator();
const getTabBarVisibility = route => {
  // const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home Route';
  // if (
  //   routeName !== 'Home' &&
  //   routeName !== 'Statistics' &&
  //   routeName !== 'Classes' &&
  //   routeName !== 'Profile' &&
  //   routeName !== 'Message'
  // ) {
  //   // alert(routeName);

  //   return false;
  // }
  // // alert(routeName);

  return true;
};

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: {
          paddingTop: 5,
          borderTopWidth: 0,
          height: 80,
          backgroundColor: 'rgba(249, 249, 249, 1)',
        },
        showLabel: false,
        activeTintColor: 'black',
      }}>
      <Tab.Screen
        name="Classes"
        component={Classes}
        options={{
          tabBarLabel: 'Classes',
          tabBarIcon: ({color, size, focused}) => (
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcons name="video" color={color} size={30} />
              {focused ? (
                <Text style={{color: color, fontSize: 12}}>Classes</Text>
              ) : null}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({color, size, focused}) => (
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="chart-bar"
                color={color}
                size={30}
              />
              {focused ? (
                <Text style={{color: color, fontSize: 12}}>Statistics</Text>
              ) : null}
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({color, size, focused}) => (
            <View style={{alignItems: 'center'}}>
              <Foundation name="home" color={color} size={30} />
              {focused ? (
                <Text style={{color: color, fontSize: 12}}>Home</Text>
              ) : null}
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="chat-processing-outline"
                color={color}
                size={30}
              />
              {focused ? (
                <Text style={{color: color, fontSize: 12}}>Message</Text>
              ) : null}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="account-circle-outline"
                color={color}
                size={30}
              />
              {focused ? (
                <Text style={{color: color, fontSize: 12}}>Profile</Text>
              ) : null}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
