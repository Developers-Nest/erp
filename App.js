import React from 'react';

import {Button} from 'react-native-paper';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  TextInput,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';

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
          style={styles.button}
          onPress={() => navigation.replace('Admin Login')}>
          <Text style={styles.text}>Admin Login</Text>
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

  button1: {
    marginTop: 0,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5177E7',
    alignSelf: 'flex-end',
    padding: 3,
    paddingHorizontal: 25,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 30,
    height: 60,
    borderColor: '#5177E7',
    borderWidth: 1.5,
  },
  text1: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
  logoStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingBottom: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#5177E7',
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '500',
    letterSpacing: 0.25,
    color: 'white',
  },
});
