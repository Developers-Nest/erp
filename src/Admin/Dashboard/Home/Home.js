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
import HomeScreen2 from './HomeScreen2';
import HomeScreen1 from './HomeScreen1';
import Swiper from 'react-native-swiper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
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

//drawer navigation
import Books from './Books/Books';
import ContentLibrary from './Content Library/ContentLibrary';
import Feedback from './Feedback/Feedback';
import LessonPlan from './Lesson Plan/LessonPlan';
import Transport from './Transport/Transport';
import Subject from './Subject/Subject.js';
import CceMarks from './CCEMarks/CCEmarks';
import RecordedClasses from './Recorded Classes/RecordedClasses';
import Report from './Report/Report';
import Occurence from '../Occurence/Occurence';

//navigations from home screen second screen
import SettingUsers from './Home/Settings';
import Timetable from './Home/Timetable';
import Library from './Home/Library';
import Attendance from './Attendance/Attendance';

//helpers
import write from '../../../services/localstorage/write';
// redux
// import { useSelector } from 'react-redux';

// let userInfo;

var styles1 = {
  wrapper: {},
  slide1: {flex: 1},
  slide2: {flex: 1},
};

const Home = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [collapsed, setCollapsed] = React.useState(true);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Swiper style={styles1.wrapper} showsButtons loop={false}>
      <View style={styles1.slide1}>
        <HomeScreen2 />
      </View>
      <View style={styles1.slide2}>
        <HomeScreen1 />
      </View>
    </Swiper>
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
          headerTitle: 'Hi Saawan!',
          headerStyle: {
            height: 70,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
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
              <MaterialIcon
                name="align-horizontal-left"
                style={{
                  alignSelf: 'center',
                  fontSize: 35,
                  color: 'black',
                  paddingLeft: 20,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingUsers}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Timetable"
        component={Timetable}
        options={{headerShown: false}}
      />
      {/* library */}
      <Stack.Screen
        name="Library"
        component={Library}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Attendance"
        component={Attendance}
        options={{headerShown: false}}
      />
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
  const handleLogout = async () => {
    // const navigation = useNavigation();
    try {
      let res = await write('token', 'null');
      if (res) {
        props.navigation.navigate('Role Based Login');
      } else throw new Error('Cannot Logout!!');
    } catch (err) {
      alert('Cannot Logout!!' + err);
    }
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <Drawer.Item
          label={'Home'}
          style={{fontWeight: '100'}}
          onPress={() => props.navigation.navigate('Home')}
        />
        <Drawer.Item
          label={'Academics'}
          onPress={() => props.navigation.navigate('Content Library')}
        />
        <Drawer.Item
          label={'Hostel'}
          onPress={() => props.navigation.navigate('Attendance')}
        />
        <Drawer.Item
          label={'Events'}
          onPress={() => Alert.alert('Add Events screen')}
        />
        <Drawer.Item
          label={'Bulk SMS'}
          onPress={() => Alert.alert('Add SMS screen')}
        />
        <Drawer.Item
          label={'Task Manager'}
          onPress={() => Alert.alert('Add Task Manager screen')}
        />

        <Drawer.Item
          label={'Payment Slip'}
          onPress={() => Alert.alert('Add Payment slip screen')}
        />

        <Drawer.Item
          label={'Quick Payment'}
          onPress={() => Alert.alert('Add quick payment screen')}
        />

        <Drawer.Item
          label={'Lesson Plan'}
          onPress={() => props.navigation.navigate('Lesson Plan')}
        />
        <Drawer.Item
          label={'Online Exams'}
          onPress={() => props.navigation.navigate('Books')}
        />
        <Drawer.Item
          label={'Feedback'}
          onPress={() => props.navigation.navigate('Feedback')}
        />
        <Drawer.Item
          label={'Occurrence'}
          onPress={() => props.navigation.navigate('Occurence')}
        />
        <Drawer.Item
          label={'Placement Details'}
          onPress={() => Alert.alert('Add Placement Details')}
        />
        <Drawer.Item
          label={'Report'}
          onPress={() => props.navigation.navigate('Report')}
        />

        {/*        
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
        <Drawer.Item
          label={'Report'}
          onPress={() => props.navigation.navigate('Report')}
        /> */}

        <TouchableOpacity>
          <Button
            style={{
              fontFamily: 'Poppins-Regular',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: 14,
              width: 100,
              margin: 20,
              marginLeft: 40,
              // backgroundColor: institute ? institute.themeColor : 'black',
              backgroundColor: 'dodgerblue',
              borderRadius: 6,
            }}
            onPress={handleLogout}
            mode="contained">
            Logout
          </Button>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
}

export default function Route() {
  // userInfo = useSelector(state => state.userInfo);

  return (
    <DrawerNav.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}
      drawerStyle={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
      <DrawerNav.Screen name="Home" component={Home_Route} />
      <DrawerNav.Screen name="Content Library" component={ContentLibrary} />
      <DrawerNav.Screen name="Attendance" component={Attendance} />
      {/* <DrawerNav.Screen name="Assignment" component={Assignment} /> */}
      <DrawerNav.Screen name="Lesson Plan" component={LessonPlan} />
      <DrawerNav.Screen name="Books" component={Books} />
      <DrawerNav.Screen name="Feedback" component={Feedback} />
      <DrawerNav.Screen name="Transport" component={Transport} />
      <DrawerNav.Screen name="Cce Marks" component={CceMarks} />
      <DrawerNav.Screen name="Recorded Classes" component={RecordedClasses} />
      <DrawerNav.Screen name="Report" component={Report} />
      <DrawerNav.Screen name="Occurence" component={Occurence} />
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
