import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Button, Appbar} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import IonIcon from 'react-native-vector-icons/Ionicons';

//bottom navigation
import Home from './Home/Home';
import Message from './Message/Message';
import Profile from './Profile/Profile';
import Statistics from './Statistics/Statistics';
import Classes from './Classes/Classes';

// redux
import {useSelector, useDispatch} from 'react-redux';
import {INSTITUTE} from '../../reducers/actionType';

// helpers
import get from '../../services/helpers/request/get';
import read from '../../services/localstorage/read';

const Tab = createBottomTabNavigator();
const getTabBarVisibility = route => {
  return true;
};

export default function DashboardScreen() {
  let dispatch = useDispatch();
  const [themeColor, setThemeColor] = useState('black');

  useEffect(async () => {
    try {
      let slug = '/institution';
      let token = await read('token');
      let res = await get(slug, token);
      console.log('Institute Res ', res);
      dispatch({
        type: INSTITUTE,
        institute: res,
      });
      console.log('Theme color ', res.themeColor);
      setThemeColor(res.themeColor);
    } catch (err) {
      alert('Cannot fetch Institute Details!');
    }
  }, []);

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
        activeTintColor: themeColor,
        inactiveTintColor: themeColor,
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="Classes"
        component={Classes}
        options={{
          tabBarLabel: 'Classes',
          tabBarIcon: ({color, size, focused}) => (
            <View style={{alignItems: 'center', width: 100}}>
              <MaterialCommunityIcons
                name={focused ? 'video' : 'video-outline'}
                color={color}
                size={focused ? 35 : 30}
              />
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
            <View style={{alignItems: 'center', width: 100}}>
              <IonIcon
                name={focused ? 'bar-chart-sharp' : 'bar-chart-outline'}
                color={color}
                size={focused ? 35 : 30}
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
            <View style={{alignItems: 'center', width: 100}}>
              <IonIcon
                name={focused ? 'home' : 'home-outline'}
                color={color}
                size={focused ? 35 : 30}
              />
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
            <View style={{alignItems: 'center', width: 100}}>
              <MaterialCommunityIcons
                name={focused ? 'chat-processing' : 'chat-processing-outline'}
                color={color}
                size={focused ? 35 : 30}
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
            <View style={{alignItems: 'center', width: 100}}>
              <MaterialCommunityIcons
                name={focused ? 'account-circle' : 'account-circle-outline'}
                color={color}
                size={focused ? 35 : 30}
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
