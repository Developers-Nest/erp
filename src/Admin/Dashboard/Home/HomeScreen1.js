import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';

import Iconc from 'react-native-vector-icons/Foundation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import IconBio1 from 'react-native-vector-icons/FontAwesome5';
import IconBio2 from 'react-native-vector-icons/FontAwesome5';

import * as Animatable from 'react-native-animatable';
import {Text, Searchbar, Card, Button, Drawer} from 'react-native-paper';
import {
  createDrawerNavigator,
  useIsDrawerOpen,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
const HomeScreen1 = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{height: 20}}></View>
      <View style={{marginHorizontal: 30, ...styles.shadow}}>
        <View style={styles.search}>
          <TextInput
            style={{...styles.search_input}}
            placeholder="Live class, fees and more"
          />

          <TouchableOpacity
            style={{
              alignSelf: 'center',
            }}>
            <Icon
              name="search-sharp"
              style={{
                alignSelf: 'center',
                fontSize: 30,
                color: 'black',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.main}>
        <View style={{height: 30}}></View>

        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}>
          {/* 
        1st row started */}
          <TouchableOpacity
            style={styles.section}
            onPress={() => navigation.navigate('Notification')}>
            <View style={{alignItems: 'center'}}>
              <IonIcon size={36.83} color="#0066DA" name="library-outline" />

              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular',
                }}>
                Library
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.section}>
            <View style={{alignItems: 'center'}}>
              <SimpleLineIcon size={38} color="#0066DA" name="graduation" />

              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular',
                }}>
                Students
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcon
                size={36.83}
                color="#0066DA"
                name="briefcase-outline"
              />

              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular',
                }}>
                Employees
              </Text>
            </View>
          </View>
          {/* 
      1st row ended */}
          {/* 
2nd row started */}

          <View style={styles.section}>
            <View style={{alignItems: 'center'}}>
              <IonIcon size={36.83} color="#34A853" name="bus" />

              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular',
                }}>
                Transport
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcon
                size={36.83}
                color="#34A853"
                name="calendar-clock"
              />

              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular',
                }}>
                Time Table
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={{alignItems: 'center'}}>
              <IonIcon size={36.83} color="#34A853" name="settings-outline" />

              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular',
                }}>
                Settings
              </Text>
            </View>
          </View>

          {/* 
2nd row ended */}

          {/* 3rd row started */}

          <View style={styles.section}>
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcon
                size={36.83}
                color="#FCBC05"
                name="clipboard-outline"
              />

              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular',
                }}>
                Assignment
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={{alignItems: 'center'}}>
              <EntypoIcon size={36.83} color="#FCBC05" name="text-document" />

              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular',
                }}>
                Content Library
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={{alignItems: 'center'}}>
              <IonIcon size={36.83} color="#FCBC05" name="book-outline" />

              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular',
                }}>
                Exams
              </Text>
            </View>
          </View>

          {/* 3rd row ended */}

          {/* 4th row starts */}

          <View style={styles.section}>
            <View style={{alignItems: 'center'}}>
              <FeatherIcon size={36.83} color="#8A06CD" name="calendar" />

              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular',
                }}>
                Attendance
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={{alignItems: 'center'}}>
              <IonIcon size={36.83} color="#8A06CD" name="document-outline" />

              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular',
                }}>
                Leave
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={{alignItems: 'center'}}>
              <FeatherIcon size={36.83} color="#8A06CD" name="book" />

              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular',
                }}>
                Results
              </Text>
            </View>
          </View>

          {/* 4th row ends */}
        </View>
        <View style={{height: 30}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  main: {
    flex: 1,
  },
  search: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderColor: '#00499F',
    borderRadius: 8,
  },
  search_input: {
    borderRadius: 8,
    height: 59,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    paddingTop: 15,
    paddingHorizontal: 10,
    width: '90%',
  },
  section_heading: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'left',
    color: 'rgba(88, 99, 109, 0.85)',
    paddingHorizontal: 30,
    marginBottom: 5,
  },
  shadow: {
    elevation: 5,
    borderRadius: 8,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  classes_cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  classes_card: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  classes_cardClass: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#58636D',
  },
  classes_cardTime: {
    fontSize: 12,
    color: '#5177E7',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  classes_cardBatch: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    paddingVertical: 5,
    color: '#58636D',
  },

  collapsable_header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  collapsable_headerText: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 17,
    color: '#211C5A',
  },

  collapsable_IconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  collapsable_IconText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#58636D',
  },

  collapsable_content: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 11,
    color: '#00499F',
  },
  collapsable_contentWrapper: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  card: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 150,
    paddingVertical: 35,
  },
  card_heading: {
    paddingLeft: 20,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'left',
    color: 'rgba(88, 99, 109, 0.85)',
    paddingHorizontal: 30,
    marginBottom: 5,
  },
  card_row1: {
    color: 'rgba(25, 40, 57, 0.7)',
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  card_row2: {
    color: 'rgba(88, 99, 109, 1)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  card_row3: {
    paddingTop: 5,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    color: 'rgba(176, 67, 5, 0.75)',
  },
  card_Wrapper: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 30,
  },
  section: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',

    paddingHorizontal: 13,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 10,
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 10,
    width: 100,
    height: 100,
    //new added
    alignSelf: 'center',
    //new added to move english down
    paddingTop: 20,
  },

  details: {
    alignContent: 'center',
    flexDirection: 'column',

    borderBottomColor: '#333',
    // borderBottomWidth:1,
  },

  userinhostels: {
    //  paddingVertical:20,
  },

  //different users for two columns
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //for row spacing between two rows:done finally
    paddingBottom: 10,
  },
  userstext: {
    fontSize: 16,
    // paddingVertical:4,
    fontWeight: '300',
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
  },
});
export default HomeScreen1;