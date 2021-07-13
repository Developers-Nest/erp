import React from 'react';

import {Button} from 'react-native-paper';
import {View, StyleSheet, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import Teacher from './src/Teacher/Teacher';
// import Student from './src/Student/Student';
import Login from './src/Login';
import StudentDashboard from './src/Student/Dashboard/Home/Home';
import TeacherDashboard from './src/Teacher/Dashboard/Home/Home';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Teacher Dashboard" component={TeacherDashboard} />
        <Stack.Screen name="Student Dashboard" component={StudentDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// function Login({navigation}) {
//   return (
//     <View>
//       <Button onPress={() => navigation.navigate('Teacher Login')}>
//         Teacher
//       </Button>
//       <Button onPress={() => navigation.navigate('Student Login')}>
//         Student
//       </Button>
//     </View>
//   );
// }
