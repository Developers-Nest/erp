import React, { useEffect } from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import Firebase  from '@react-native-firebase/app';

// import Teacher from './src/Teacher/Teacher';
// import Student from './src/Student/Student';
import StudentTeacherLogin from './src/Login';
import AdminLogin from './src/Admin/Login';

import StudentDashboard from './src/Student/Dashboard/Dashboard';
import TeacherDashboard from './src/Teacher/Dashboard/Dashboard';
import AdminDashboard from './src/Admin/Dashboard/Dashboard';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import UserReducer from './src/reducers/userReducer';

const store = createStore(UserReducer);

const Stack = createStackNavigator();


export default function App() {
  useEffect(()=>{
    Firebase.initializeApp(this)
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
    
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    
        // process the notification
    
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
    
        // process the action
      },
    
      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
    
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
    
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
    
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  },[]);
  
  
  return (
    <Provider store={store}>
      <NavigationContainer onReady={() => RNBootSplash.hide()}>
        <Stack.Navigator headerMode="none">
          {/* <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Teacher Login" component={Teacher} />
          <Stack.Screen name="Student Login" component={Student} /> */}
          <Stack.Screen name="Role Based Login" component={RoleBased_Login} />
          <Stack.Screen
            name="Student Teacher Login"
            component={StudentTeacherLogin}
          />
          <Stack.Screen name="Admin Login" component={AdminLogin} />

          <Stack.Screen name="Teacher Dashboard" component={TeacherDashboard} />
          <Stack.Screen name="Student Dashboard" component={StudentDashboard} />
          <Stack.Screen name="Admin Dashboard" component={AdminDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function RoleBased_Login({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoStyle}>
        <Image source={require('./assets/bootsplash_logo.png')} />
      </View>

      <View style={styles.fixToText}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.replace('Student Teacher Login')}>
          <Text style={styles.text1}>User Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.replace('Admin Login')}>
          <Text style={styles.text1}>Admin Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  logoStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingBottom: 60,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  button1: {
    marginTop: 0,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 3,
    paddingHorizontal: 25,
    paddingVertical: 2,
    borderRadius: 4,
    height: 60,
    borderColor: '#5177E7',
    borderWidth: 1.5,
  },
  text1: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#5177E7',
  },
});
