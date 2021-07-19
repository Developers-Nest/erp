import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {Text} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {createStackNavigator} from '@react-navigation/stack';

import ExamReport from './ExamReport/ExamReport';
import Attendance from '../Home/Attendance/Attendance.js';
const Statistics = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome5
            name="chevron-left"
            style={{
              alignSelf: 'center',
              fontSize: 25,
              color: 'black',
              paddingLeft: 20,
              paddingTop: 20,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontStyle: 'normal',
              fontSize: 28,
              fontFamily: 'NunitoSans-Regular',
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
            }}>
            Statistics
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.heading}>Attendance</Text>
          <TouchableOpacity
          onPress={() => {
            // console.log("att");
            navigation.navigate('Attendance');
          }}>
            <Image
              style={styles.image}
              
              source={{
                uri: 'https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
              }}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Reports</Text>
          <TouchableOpacity
            onPress={() => {
              // console.log("report")
              navigation.navigate('Exam Report');
            }}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();

export default function Statistics_Routes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Statistics" component={Statistics} />
      <Stack.Screen name="Exam Report" component={ExamReport} />
      <Stack.Screen name="Attendance" component={Attendance} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  header: {
    height: 69,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  image: {
    minWidth: '100%',
    resizeMode: 'cover',
    height: 250,
  },
  heading: {
    padding: 15,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    color: '#211C5A',
  },
});
