import * as React from 'react';

import {TextInput} from 'react-native-paper';
import Icon5 from 'react-native-vector-icons/AntDesign';

import IconPhysics1 from 'react-native-vector-icons/Entypo';
import IconPhysics2 from 'react-native-vector-icons/Ionicons';
import IconEnglish2 from 'react-native-vector-icons/Feather';
import IconEnglish1 from 'react-native-vector-icons/MaterialCommunityIcons';

import IconBio1 from 'react-native-vector-icons/FontAwesome5';
import IconBio2 from 'react-native-vector-icons/FontAwesome5';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import LecturesScreen from './LecturesScreen';
import GoLiveScreen from './GoLive';

import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lectures"
        component={LecturesScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Lectures',
          // headerStyle: {
          //   backgroundColor: '#f4511e',
          // },
          headerRight: () => (
            <Icon
              name="add-circle"
              size={30}
              color="#900"
              onPress={() => navigation.navigate('GoLive')}
            />
          ),
        })}
      />
      <Stack.Screen name="GoLive" component={GoLiveScreen} />
    </Stack.Navigator>
  );
}
