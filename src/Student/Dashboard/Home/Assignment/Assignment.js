import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {
  event,
  onChange,
  setValue,
  target,
  value,
} from 'react-native-reanimated';
import {Searchbar} from 'react-native-paper';
// import HeaderAllocatedList from '../shared/headerallocatedlist';
// import {AntDesign} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import AssignmentDue from './AssignmentDue';
import AssignmentAdd from './AssignmentAdd';
import AssignmentEdit from './AssignmentEdit';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Assignment Due"
        component={AssignmentDue}
        options={({navigation, route}) => ({
          headerTitle: 'Assignment Due',
          // headerStyle: {
          //   backgroundColor: '#f4511e',
          // },
          headerRight: () => (
            <Icon
              name="add-circle"
              size={30}
              color="#900"
              onPress={() => navigation.navigate('Assignment Add')}
            />
          ),
        })}
      />
      <Stack.Screen name="Assignment Add" component={AssignmentAdd} />
      <Stack.Screen name="Assignment Edit" component={AssignmentEdit} />
    </Stack.Navigator>
  );
}
