import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {Text, Searchbar, Card, Button} from 'react-native-paper';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';

//drawer navigation
import Assignment from './Assignment/Assignment';
import Attendance from './Attendance/Attendance';
import Books from './Books/Books';
import ContentLibrary from './Content Library/ContentLibrary';
import Feedback from './Feedback/Feedback';
import LessonPlan from './Lesson Plan/LessonPlan';
import Transport from './Transport/Transport';

//navigations from home screen
import Notification from './Home/Notification';

const Home = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [collapsed, setCollapsed] = React.useState(true);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.main}>
        <Searchbar
          style={styles.search}
          placeholder="Live class, fees and more"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <View style={{marginTop: 30}}>
          <Text>Upcoming Classes</Text>
        </View>
        <View style={styles.classes}>
          {[1, 2, 3].map((element, index) => {
            return (
              <View style={styles.card} key={index}>
                <Text style={{fontSize: 20}}>{'Class'}</Text>
                <Text
                  style={{fontSize: 12, paddingVertical: 5, color: '#5177E7'}}>
                  {'09:30-10:30'}
                </Text>
                <Text>{'Batch'}</Text>
              </View>
            );
          })}
        </View>
        <View style={{marginTop: 30}}>
          <Text>New Circular</Text>
        </View>

        <TouchableOpacity onPress={toggleExpanded}>
          <Animatable.View
            duration={400}
            style={styles.collapsable_header}
            transition="backgroundColor">
            <Text>Title</Text>
            {!collapsed ? (
              <View style={styles.collapseIconContainer}>
                <FontAwesome5 name="chevron-up" size={14} />
                <Text style={styles.collapseIconText}>Read Less</Text>
              </View>
            ) : (
              <View style={styles.collapseIconContainer}>
                <FontAwesome5 name="chevron-down" size={14} />
                <Text style={styles.collapseIconText}>Read More</Text>
              </View>
            )}
          </Animatable.View>
        </TouchableOpacity>
        <Collapsible collapsed={collapsed} align="center">
          <Animatable.View
            duration={100}
            style={styles.content}
            transition="backgroundColor">
            <Text animation="bounceIn">
              Exams will be conducted via online mode. All the best. It is
              requested from the students to maintain the.
            </Text>
          </Animatable.View>
        </Collapsible>
        <SafeAreaView>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
            }}>
            {[1, 2, 3, 4].map((element, index) => {
              return (
                <View key={index} style={{marginRight: 20}}>
                  <Text
                    style={{
                      marginTop: 30,
                      alignSelf: 'center',
                      marginBottom: 0,
                    }}>
                    {'Assignment'}
                  </Text>
                  <View
                    style={{
                      ...styles.card,
                      paddingVertical: 30,
                      marginTop: 5,
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{color: 'rgba(25, 40, 57, 0.7)', fontSize: 20}}>
                      {'Subject'}
                    </Text>
                    <Text style={{fontSize: 12}}>{'Title'}</Text>
                    <Text
                      style={{
                        color: 'rgba(176, 67, 5, 0.75)',
                        fontSize: 12,
                        paddingTop: 10,
                      }}>
                      {'Due:21 May,2021'}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();

const Home_Route = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation, route}) => ({
          headerTitle: 'Hi Youuu',
          headerStyle: {
            height: 70,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notification');
              }}>
              <FontAwesome5
                name="bell"
                style={{
                  alignSelf: 'center',
                  fontSize: 25,
                  color: 'black',
                  paddingRight: 20,
                }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <FontAwesome5
                name="book"
                style={{
                  alignSelf: 'center',
                  fontSize: 25,
                  color: 'black',
                  paddingLeft: 20,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName === 'Home' ||
    routeName === 'Statistics' ||
    routeName === 'Classes' ||
    routeName === 'Profile' ||
    routeName === 'Message'
  ) {
    return true;
  }
  return false;
};

export default function Route() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home_Route} />
      <Drawer.Screen name="Content Library" component={ContentLibrary} />
      <Drawer.Screen name="Attendance" component={Attendance} />
      <Drawer.Screen name="Assignment" component={Assignment} />
      <Drawer.Screen name="Lesson Plan" component={LessonPlan} />
      <Drawer.Screen name="Books" component={Books} />
      <Drawer.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen name="Transport" component={Transport} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  header: {
    height: 65,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  searchbar: {
    width: '100%',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    shadowColor: '#999',
    marginTop: 10,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 2,
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'white',
  },

  cardDetails: {
    fontSize: 15,
    color: '#444',
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: 'black',
  },
  main: {
    flex: 1,
    paddingHorizontal: 30,
  },
  classes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  infoBox: {},

  contentBox: {
    position: 'relative',
    width: '100%',
    height: 70,
    marginTop: 20,
    margin: 5,
    borderWidth: 0.1,
    borderColor: '#00499F',
    borderRadius: 8,
    padding: 15,
    fontSize: 10,
  },
  miscBox: {
    position: 'relative',
    width: 70,
    height: 70,
    top: 100,
    margin: 5,
    borderWidth: 0.1,
    borderColor: '#00499F',
    borderRadius: 8,
    fontSize: 10,
    backgroundColor: 'red',
  },

  search: {
    marginTop: 20,
    borderWidth: 0.2,
    borderColor: '#58636D',
  },
  collapsable_header: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 10,
  },
  collapse_headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    padding: 10,
  },

  collapseIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  collapseIconText: {
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomEndRadius: 8,
  },
});
