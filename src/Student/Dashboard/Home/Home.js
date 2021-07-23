import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking,
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

//icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

//drawer navigation
import AssignmentStudent from './AssignmentStudent/AssignmentStudent';
import Attendance from './Attendance/Attendance';
import Books from './Books/Books';
import ContentStack from './Content Library/ContentStack';
import Feedback from './Feedback/Feedback';
import Fees from './Fees/Fees';
import Transport from './Transport/Transport';
import Subject from './Subject/Subject.js';
import Report from './Report/Report';

//navigations from home screen
import Notification from './Home/Notification';
import Notes from './Home/Notes';
import Timetable from './Home/Timetable';

// redux
import {useSelector} from 'react-redux';

// helpers
import read from '../../../services/localstorage/read';
import write from '../../../services/localstorage/write';
import get from '../../../services/helpers/request/get';

// loadingScreen
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

let parseDate = myDate => {
  let d = new Date(myDate);
  return d.toString().slice(0, 15);
};

let userInfo;

const Home = ({navigation}) => {
  let institute = useSelector(state => state.institute);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [collapsed, setCollapsed] = React.useState(true);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  const onChangeSearch = query => setSearchQuery(query);

  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen();

  const [assignments, setAssignements] = useState([]);
  const [books, setBooks] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(async () => {
    try {
      let slug = '/note/studentAssignment';
      let token = await read('token');
      const res = await get(slug, token);
      console.log('Assignments ', res);
      setAssignements(res);
    } catch (err) {
      alert('Cannot fetch Assignements!!');
    }

    try {
      let slug = '/note';
      let token = await read('token');
      const ress = await get(slug, token);
      console.log('Notes ', ress);
      setNotes(ress);
    } catch (err) {
      alert('Cannot fetch Notes!!');
    }
  }, []);

  return (
    <View style={styles.container}>
      {loadingScreen}
      <View style={styles.header}>
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
              paddingTop: 20,
              color: institute ? institute.themeColor : 'black',
            }}
          />
          {/* <FontAwesome5
            name="book"
            style={{
              alignSelf: 'center',
              fontSize: 25,
              color: 'black',
              paddingLeft: 20,
              paddingTop: 20,
              color: institute ? institute.themeColor : 'black',
            }}
          /> */}
        </TouchableOpacity>
        <Text
          style={{
            fontStyle: 'normal',
            fontSize: 28,
            fontFamily: 'NunitoSans-Regular',
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
            color: institute ? institute.themeColor : 'black',
          }}>
          {userInfo ? `Hi ${userInfo.firstName}` : `Hi`}
        </Text>

        <TouchableOpacity
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Notification')}>
          <FontAwesome5
            name="bell"
            style={{
              alignSelf: 'center',
              fontSize: 25,
              color: 'black',
              paddingRight: 20,
              color: institute ? institute.themeColor : 'black',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{paddingTop: 10}}></View>
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
              <TouchableOpacity
                style={styles.shadow}
                key={index}
                onPress={() => navigation.navigate('Timetable')}>
                <View style={styles.classes_card}>
                  <Text style={styles.classes_cardClass}>{'Class'}</Text>
                  <Text style={styles.classes_cardTime}>{'09:30-10:30'}</Text>
                  <Text style={styles.classes_cardBatch}>{'Batch'}</Text>
                </View>
              </TouchableOpacity>
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

        {/* assignment section */}
        <ScrollView
          contentContainerStyle={{...styles.card_Wrapper, marginHorizontal: 10}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {assignments &&
            assignments.map(assignment => (
              <View style={{marginHorizontal: 10}} key={assignment._id}>
                <Text style={styles.card_heading}>Assignment</Text>
                <View style={styles.shadow}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => Linking.openURL(assignment.url)}>
                    <Text style={styles.card_row1}>
                      {assignment.subject ? assignment.subject.name : null}
                    </Text>
                    <Text style={styles.card_row2}>{assignment.title}</Text>
                    <Text style={styles.card_row3}>
                      Due: {parseDate(assignment.submissionDate).slice(0, 10)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>

        {/* books section */}
        <ScrollView
          contentContainerStyle={{...styles.card_Wrapper, marginHorizontal: 10}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {notes &&
            notes.map(note => (
              <View style={{marginHorizontal: 10}} key={note._id}>
                <Text style={styles.card_heading}>Notes</Text>
                <View style={styles.shadow}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => Linking.openURL(note.url)}>
                    <Text style={styles.card_row1}>{note.title}</Text>
                    <Text style={styles.card_row2}>
                      {note.subject ? note.subject.name : null}
                    </Text>
                    <Text style={styles.card_row3}>
                      {note.course ? note.course.courseName : null}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>

        {/* books section */}
        <ScrollView
          contentContainerStyle={{...styles.card_Wrapper, marginHorizontal: 10}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={{marginHorizontal: 10}}>
            <Text style={styles.card_heading}>Fees</Text>
            <View style={styles.shadow}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Fees')}>
                <Text style={styles.card_row1}>Books</Text>
                <Text style={styles.card_row2}>New Book</Text>
                <Text style={styles.card_row3}>Due:21 May,2021</Text>
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
        options={{headerShown: false}}
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
      <Stack.Screen
        name="Timetable"
        component={Timetable}
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
        <DrawerItem
          style={styles.item}
          label={({focused, color}) => (
            <Text style={styles.drawer_item}>Home</Text>
          )}
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          style={styles.item}
          label={({focused, color}) => (
            <Text style={styles.drawer_item}>Content Library</Text>
          )}
          onPress={() => props.navigation.navigate('ContentStack')}
        />
        <DrawerItem
          style={styles.item}
          label={({focused, color}) => (
            <Text style={styles.drawer_item}>Attendance</Text>
          )}
          onPress={() => props.navigation.navigate('Attendance')}
        />
        <DrawerItem
          style={styles.item}
          label={({focused, color}) => (
            <Text style={styles.drawer_item}>Fees</Text>
          )}
          onPress={() => props.navigation.navigate('Fees')}
        />
        <DrawerItem
          style={styles.item}
          label={({focused, color}) => (
            <Text style={styles.drawer_item}>Assignment</Text>
          )}
          onPress={() => props.navigation.navigate('AssignmentStudent')}
        />
        <DrawerItem
          label={({focused, color}) => (
            <Text style={styles.drawer_item}>Books</Text>
          )}
          onPress={() => props.navigation.navigate('Books')}
        />
        <DrawerItem
          label={({focused, color}) => (
            <Text style={styles.drawer_item}>Feedback</Text>
          )}
          onPress={() => props.navigation.navigate('Feedback')}
        />
        <DrawerItem
          label={({focused, color}) => (
            <Text style={styles.drawer_item}>Transport</Text>
          )}
          onPress={() => props.navigation.navigate('Transport')}
        />
        <DrawerItem
          label={({focused, color}) => (
            <Text style={styles.drawer_item}>Report</Text>
          )}
          onPress={() => props.navigation.navigate('Report')}
        />
        <TouchableOpacity>
          <Button
            style={{
              fontFamily: 'Poppins-Regular',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: 14,
              width: 100,
              backgroundColor: 'red',
              margin: 20,
              marginLeft: 40,
              backgroundColor: '#B04305',
              borderRadius: 6,
            }}
            mode="contained"
            onPress={handleLogout}>
            Logout
          </Button>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
}

export default function Route() {
  userInfo = useSelector(state => state.userInfo);
  institute = useSelector(state => state.institute);
  return (
    <DrawerNav.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      <DrawerNav.Screen name="Home" component={Home_Route} />
      <DrawerNav.Screen name="ContentStack" component={ContentStack} />
      <DrawerNav.Screen name="Attendance" component={Attendance} />
      <DrawerNav.Screen
        name="AssignmentStudent"
        component={AssignmentStudent}
      />
      <DrawerNav.Screen name="Books" component={Books} />
      <DrawerNav.Screen name="Fees" component={Fees} />
      <DrawerNav.Screen name="Feedback" component={Feedback} />
      <DrawerNav.Screen name="Transport" component={Transport} />
      <DrawerNav.Screen name="Report" component={Report} />
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
  header: {
    height: 69,
    backgroundColor: 'rgba(249, 249, 249, 1)',
    flexDirection: 'row',
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
  drawer_item: {
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    paddingLeft: 30,
    padding: 0,
    margin: 0,
  },
  item: {padding: 0, margin: 0},
});
