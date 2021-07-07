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
              fontFamily: 'NunitoSans-Light',
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
            }}>
            Statistics
          </Text>
          {/* <View>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="bell"
                style={{
                  alignSelf: 'center',
                  fontSize: 30,
                  color: 'black',
                  paddingHorizontal: 20,
                  paddingTop: 20,
                }}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.heading}>Attendance</Text>
          <TouchableOpacity>
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
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#333',
  },

  switchTabsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginTop: 20,
  },

  switchText: {
    fontSize: 14,
    color: 'black',
    paddingHorizontal: 9,
    paddingVertical: 2,
    fontFamily: 'Poppins',
    fontWeight: '600',
    height: 21,
  },

  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },

  header: {
    height: 69,
    backgroundColor: 'white',
    flexDirection: 'row',
  },

  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  image: {
    minWidth: '100%',
    resizeMode: 'cover',
    height: 250,
  },
  heading: {
    padding: 10,
  },
});
