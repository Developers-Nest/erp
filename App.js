import React from 'react';

import {Button} from 'react-native-paper';
import {View, StyleSheet, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Teacher from './src/Teacher/Teacher';
import Student from './src/Student/Student';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Teacher Login" component={Teacher} />
        <Stack.Screen name="Student Login" component={Student} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Login({navigation}) {
  return (
    <View>
      <Button onPress={() => navigation.navigate('Teacher Login')}>
        Teacher
      </Button>
      <Button onPress={() => navigation.navigate('Student Login')}>
        Student
      </Button>
    </View>
  );
}
