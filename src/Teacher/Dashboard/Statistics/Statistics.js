import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {Text} from 'react-native-paper';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

//stack navigation
import {createStackNavigator} from '@react-navigation/stack';
import ExamReport from './ExamReport/ExamReport';
import Attendance from '../Home/Attendance/AttendanceScreen2';

// redux
import {useSelector} from 'react-redux';

const Statistics = ({navigation}) => {
  //theming
  const institute = useSelector(state => state.institute);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <AntDesign
            size={24}
            color="white"
            name="left"
            style={{
              alignSelf: 'center',
              fontSize: 25,
              color: 'white',
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
              fontFamily: 'NunitoSans-Light',
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
              color: 'white',
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
              navigation.navigate('Attendance Report');
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
      <Stack.Screen name="Attendance Report" component={Attendance} />
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
