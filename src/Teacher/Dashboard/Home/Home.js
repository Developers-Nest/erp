import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';

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
import Subject from './Subject/Subject.js';
import CceMarks from './CCEMarks/CCEmarks';
import RecordedClasses from './Recorded Classes/RecordedClasses';

//navigations from home screen
import Notification from './Home/Notification';
import Notes from './Home/Notes';
import Timetable from './Home/Timetable';

// redux
import {useSelector} from 'react-redux';

let userInfo;

const Home = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [collapsed, setCollapsed] = React.useState(true);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  const onChangeSearch = query => setSearchQuery(query);

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
        <View>
          <Text style={styles.section_heading}>Upcoming Classes</Text>
        </View>
        <View style={{marginHorizontal: 30, ...styles.classes_cardWrapper}}>
          {[1, 2, 3].map((element, index) => {
            return (
              <View style={styles.shadow} key={index}>
                <TouchableOpacity
                  style={styles.classes_card}
                  onPress={() => navigation.navigate('Timetable')}>
                  <Text style={styles.classes_cardClass}>{'Class'}</Text>
                  <Text style={styles.classes_cardTime}>{'09:30-10:30'}</Text>
                  <Text style={styles.classes_cardBatch}>{'Batch'}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={{height: 30}}></View>
        <View>
          <Text style={styles.section_heading}>New Circular</Text>
        </View>
        <View style={{marginHorizontal: 30, ...styles.shadow}}>
          <View
            style={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomLeftRadius: collapsed ? 8 : 0,
              borderBottomRightRadius: collapsed ? 8 : 0,
              ...styles.collapsable_header,
            }}>
            <Text style={styles.collapsable_headerText}>Title</Text>
            {!collapsed ? (
              <TouchableOpacity
                style={styles.collapsable_IconContainer}
                onPress={toggleExpanded}>
                <FontAwesome5
                  name="chevron-up"
                  size={14}
                  style={{color: 'rgba(62, 104, 228, 0.9)'}}
                />
                <Text style={styles.collapsable_IconText}>Read Less</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.collapsable_IconContainer}
                onPress={toggleExpanded}>
                <FontAwesome5
                  name="chevron-down"
                  size={14}
                  style={{color: 'rgba(62, 104, 228, 0.9)'}}
                />
                <Text style={styles.collapsable_IconText}>Read More</Text>
              </TouchableOpacity>
            )}
          </View>
          <Collapsible
            collapsed={collapsed}
            align="center"
            style={styles.collapsable_contentWrapper}>
            <Text style={styles.collapsable_content}>
              Exams will be conducted via online mode. All the best. It is
              requested from the students to maintain the.
            </Text>
          </Collapsible>
        </View>
        <ScrollView
          contentContainerStyle={{...styles.card_Wrapper, marginHorizontal: 10}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={{marginHorizontal: 10}}>
            <Text style={styles.card_heading}>Assignment</Text>
            <View style={styles.shadow}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Assignment')}>
                <Text style={styles.card_row1}>Subject</Text>
                <Text style={styles.card_row2}>Title</Text>
                <Text style={styles.card_row3}>Due:21 May,2021</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={styles.card_heading}>Books</Text>
            <View style={styles.shadow}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Books')}>
                <Text style={styles.card_row1}>Name</Text>
                <Text style={styles.card_row2}>ID:451236</Text>
                <Text style={styles.card_row3}>Due:21 May,2021</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={styles.card_heading}>Notes</Text>
            <View style={styles.shadow}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Notes')}>
                <Text style={styles.card_row1}>Latest</Text>
                <Text style={styles.card_row2}>Batch and Course</Text>
                <Text style={styles.card_row3}>Chapter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
          headerTitle: userInfo ? `Hi ${userInfo.firstName}` : `Hi`,
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
      <Stack.Screen
        name="Notes"
        component={Notes}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Timetable" component={Timetable} />
    </Stack.Navigator>
  );
};

const DrawerNav = createDrawerNavigator();

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

function DrawerContent(props) {
  return (
    <View style={{flex: 1}}>
      <Drawer.Section>
        <Drawer.Item
          label={'Home'}
          style={{fontWeight: '100'}}
          onPress={() => props.navigation.navigate('Home')}
        />
        <Drawer.Item
          label={'Content Library'}
          onPress={() => props.navigation.navigate('Content Library')}
        />
        <Drawer.Item
          label={'Attendance'}
          onPress={() => props.navigation.navigate('Attendance')}
        />
        <Drawer.Item
          label={'Assignment'}
          onPress={() => props.navigation.navigate('Assignment')}
        />
        <Drawer.Item
          label={'Lesson Plan'}
          onPress={() => props.navigation.navigate('Lesson Plan')}
        />
        <Drawer.Item
          label={'Books'}
          onPress={() => props.navigation.navigate('Books')}
        />
        <Drawer.Item
          label={'Feedback'}
          onPress={() => props.navigation.navigate('Feedback')}
        />
        <Drawer.Item
          label={'Transport'}
          onPress={() => props.navigation.navigate('Transport')}
        />
        <Drawer.Item
          label={'CCE Marks'}
          onPress={() => props.navigation.navigate('Cce Marks')}
        />
        <Drawer.Item
          label={'Recorded Classes'}
          onPress={() => props.navigation.navigate('Recorded Classes')}
        />
      </Drawer.Section>
      <DrawerContentScrollView
        contentContainerStyle={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,

              backgroundColor: '#B04305',
              borderRadius: 6,
              marginLeft: 20,
              marginBottom: 34,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: 14,
                color: '#FFFFFF',
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
}

export default function Route() {
  userInfo = useSelector(state => state.userInfo);

  return (
    <DrawerNav.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}
      drawerStyle={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
      <DrawerNav.Screen name="Home" component={Home_Route} />
      <DrawerNav.Screen name="Content Library" component={ContentLibrary} />
      <DrawerNav.Screen name="Attendance" component={Attendance} />
      <DrawerNav.Screen name="Assignment" component={Assignment} />
      <DrawerNav.Screen name="Lesson Plan" component={LessonPlan} />
      <DrawerNav.Screen name="Books" component={Books} />
      <DrawerNav.Screen name="Feedback" component={Feedback} />
      <DrawerNav.Screen name="Transport" component={Transport} />
      <DrawerNav.Screen name="Cce Marks" component={CceMarks} />
      <DrawerNav.Screen name="Recorded Classes" component={RecordedClasses} />
      {/* <DrawerNav.Screen name="Cce Marks" component={CceMarks} /> */}
      {/* <DrawerNav.Screen name="Subject" component={Subject} /> */}
    </DrawerNav.Navigator>
  );
}

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
});
