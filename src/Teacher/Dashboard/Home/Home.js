import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Linking,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {Text, Searchbar, Card, Button, Drawer,Badge} from 'react-native-paper';
import {
  createDrawerNavigator,
  useIsDrawerOpen,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import {useNavigation} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';

//icons
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

//drawer navigation
import Assignment from './Assignment/Assignment';
import AttendanceStack from './Attendance/AttendanceStack';

// import Attendance from './Attendance/Attendance';
import Books from './Books/Books';
import ContentLibrary from './Content Library/ContentLibrary';
import Feedback from './Feedback/Feedback';
import LessonPlan from './Lesson Plan/LessonPlan';
import Transport from './Transport/Transport';
import Subject from './Subject/Subject.js';
import CceMarks from './CCEMarks/CCEmarks';
import RecordedClasses from './Recorded Classes/RecordedClasses';
import Report from './Report/Report';

//navigations from home screen
import Notification from './Home/Notification';
import Notes from './Home/Notes';
import Timetable from './Home/Timetable';

// redux
import {useSelector, useDispatch} from 'react-redux';
import {SETNOTICATIONS, NOTREADNOTIFICATIONS}  from '../../../reducers/actionType'

// helpers
import read from '../../../services/localstorage/read';
import get from '../../../services/helpers/request/get';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import write from '../../../services/localstorage/write';

let userInfo;

const Home = ({navigation}) => {
  let institute = useSelector(state => state.institute);
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = React.useState('');
  const [collapsed, setCollapsed] = React.useState(true);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  const onChangeSearch = query => setSearchQuery(query);
  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen();

  const [UpcomingClasses, setUpcomingClasses] = useState([]);

  const [circulars, setCirculars] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [notifications, setNotifications] = useState([])
  
  // unread notifications count
  let notReadNotifications = useSelector(state => state.count)

  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(0, 15);
  };

  useEffect(async () => {
    setLoadingScreen();
    try {
      let slug = `/timetable/upcomingTimetable`;
      let token = await read('token');
      let response = await get(slug, token);
      console.log('Response ', response);
      setUpcomingClasses(response);
    } catch (err) {
      alert('Cannot fetch your Upcoming Timetable !!');
    }

    try {
      let slug = '/note/assignment';
      let token = await read('token');
      const response = await get(slug, token);
      setAssignments(response);
    } catch (err) {
      alert('Cannot fetch your assignments !!');
    }

    try {
      let slug = '/subject';
      let token = await read('token');
      const response = await get(slug, token);
      setSubjects(response);
    } catch (err) {
      alert('Cannot fetch your assignments !!');
    }

    try {
      let token = await read('token');
      let slug = `/circular?department=${userInfo.department}`;
      let res = await get(slug, token);
      let circularArray = [];
      res.map(cir => {
        circularArray.push({
          title: cir.circularsubject,
          content: cir.circularContent,
          time: parseDate(cir.circularDate),
        });
      });
      setCirculars(circularArray);
    } catch (err) {
      alert('Cannot fetch circular!!');
    }

    try {
      let getUserType = () => {
        if (typeof(userInfo.userType) === 'string') {
          return userInfo.userType;
        } else {
          return userInfo.userType._id;
        }
      };

      let slug = `/notification?userType=${getUserType()}&department=${userInfo.department}`;
      let token = await read('token');
      let res = await get(slug, token);
      let Content = [];
      let currentUser = userInfo._id
      let count = 0
      await res.map(noti => {
        let found=false
        noti && noti.isReadBy.map((read)=>{
          if(read==currentUser){
            found=true
          }
        })
        if(!found) count+=1
        Content.push({
          title: noti.title,
          content: noti.message,
          type: 'News',
          _id: noti._id,
          isRead: found?true:false 
        });
        console.log('Count ', count)
      });

      dispatch({
        type: NOTREADNOTIFICATIONS,
        count: count
      })

      setNotifications(Content);
      
      // notification count in redux store
      dispatch({
        type: SETNOTICATIONS,
        notificatons: Content
      })

    } catch (err) {
      console.log('Notification error ', err)
      alert('Cannot get Notifications!!');
    }
    hideLoadingScreen();
    console.log('Not Read Notifications ', notReadNotifications)
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
              fontSize: 30,
              color: 'black',
              marginTop:5,
              color: institute ? institute.themeColor : 'black',
            }}
            
          />
          <Badge 
            style={{backgroundColor: institute? institute.themeColor : 'blue',marginBottom:35,marginRight:10}}>
              {notReadNotifications}
            </Badge>

        </TouchableOpacity>
      </View>
      <View style={{height: 20}}></View>
      <View style={{marginHorizontal: 30, ...styles.shadow}}>
        <View style={styles.search}>
          <TextInput
            style={{...styles.search_input}}
            placeholder="Live class, fees and more"
            placeholderTextColor="black"
          />

          <TouchableOpacity
            style={{
              alignSelf: 'center',
            }}>
            <IonIcon
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
        <TouchableOpacity onPress={() => navigation.navigate('Timetable')}>
          <Text style={styles.section_heading}>Upcoming Classes</Text>
        </TouchableOpacity>
        <View style={{marginHorizontal: 30, ...styles.classes_cardWrapper}}>
          {UpcomingClasses.length === 0 ? (
            <Text>No upcoming classes</Text>
          ) : (
            UpcomingClasses &&
            UpcomingClasses.map(
              UpcomingClass =>
                UpcomingClass.days[0] &&
                UpcomingClass.days[0].periods.map(period => (
                  <View style={styles.shadow} key={UpcomingClass._id}>
                    <TouchableOpacity
                      style={styles.classes_card}
                      onPress={() => navigation.navigate('Timetable')}>
                      <Text style={styles.classes_cardClass}>
                        {period.subject.toUpperCase()}
                      </Text>
                      <Text
                        style={styles.classes_cardTime}
                        style={{
                          color: institute
                            ? institute.themeColor
                            : 'black' || 'blue',
                        }}>
                        {`${period.startTime} - ${period.endTime}`}
                      </Text>
                      <Text style={styles.classes_cardBatch}>
                        {UpcomingClass.batch.batchName}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )),
            )
          )}
        </View>
        <View style={{height: 30}}></View>
        <View>
          <Text style={styles.section_heading}>New Circular</Text>
        </View>
        {circulars && circulars.length > 0 ? (
          circulars.map(circular => (
            <View style={{marginHorizontal: 30, ...styles.shadow}}>
              <View
                style={{
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  borderBottomLeftRadius: collapsed ? 8 : 0,
                  borderBottomRightRadius: collapsed ? 8 : 0,
                  ...styles.collapsable_header,
                }}>
                <Text style={styles.collapsable_headerText}>
                  {circular.title}
                </Text>
                {!collapsed ? (
                  <TouchableOpacity
                    style={styles.collapsable_IconContainer}
                    onPress={toggleExpanded}>
                    <FontAwesome5
                      name="chevron-up"
                      size={14}
                      style={{color: institute ? institute.themeColor : 'rgba(62, 104, 228, 0.9)'}}
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
                      style={{color: institute ? institute.themeColor : 'rgba(62, 104, 228, 0.9)'}}
                    />
                    <Text style={styles.collapsable_IconText}>
                      Read More
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <Collapsible
                collapsed={collapsed}
                align="center"
                style={styles.collapsable_contentWrapper}>
                <Text style={styles.collapsable_content}>
                {circular.content}
                </Text>
              </Collapsible>
            </View>
          ))
        ) : (
          <Text style={{marginLeft: 30}}>No Active Circulars</Text>
        )}

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
                      {assignment.subject
                        ? assignment.subject.name.toUpperCase()
                        : 'N/A'}
                    </Text>
                    <Text style={styles.card_row2}>
                      {assignment.title ? assignment.title : 'N/A'}
                    </Text>
                    <Text
                      style={
                        (styles.card_row3,
                        {color: institute ? institute.themeColor : 'blue'})
                      }>
                      Due:{' '}
                      {assignment.submissionDate
                        ? assignment.submissionDate.slice(0, 10)
                        : 'N/A'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>

        <ScrollView
          contentContainerStyle={{...styles.card_Wrapper, marginHorizontal: 10}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {subjects &&
            subjects.map(subject => (
              <View style={{marginHorizontal: 10}} key={subject._id}>
                <Text style={styles.card_heading}>Subjects</Text>
                <View style={styles.shadow}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('Notes')}>
                    <Text style={styles.card_row1}>
                      {subject.name ? subject.name.toUpperCase() : null}
                    </Text>
                    <Text style={styles.card_row2}>
                      Code: {subject.code ? subject.code : null}
                    </Text>
                    <Text
                      style={
                        (styles.card_row3,
                        {color: institute ? institute.themeColor : 'blue'})
                      }>
                      Desc:{' '}
                      {subject.description ? subject.description[5] : 'N/A'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>

        <ScrollView
          contentContainerStyle={{...styles.card_Wrapper, marginHorizontal: 10}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={{marginHorizontal: 10}}>
            <Text style={styles.card_heading}>Books</Text>
            <View style={styles.shadow}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Books')}>
                <Text style={styles.card_row1}>Name</Text>
                <Text style={styles.card_row2}>ID:451236</Text>
                <Text
                  style={
                    (styles.card_row3,
                    {color: institute ? institute.themeColor : 'blue'})
                  }>
                  Due:21 May,2021
                </Text>
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
        // options={({navigation, route}) => ({
        //   headerTitle: userInfo ? `Hi ${userInfo.firstName}` : `Hi`,
        //   headerStyle: {
        //     height: 70,
        //   },
        //   headerTitleStyle: {
        //     fontSize: 25,
        //   },
        //   headerRight: () => (

        //   ),
        //   headerLeft: () => (

        //   ),
        // })}
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
  let institute = useSelector(state => state.institute);
  const handleLogout = async () => {
    // const navigation = useNavigation();
    try {
      let res = await write('token', 'null');
      if (res) {
        props.navigation.replace('Role Based Login');
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
          label={({focused, color}) => (
            <Text style={styles.drawer_item}>Content Library</Text>
          )}
          onPress={() => props.navigation.navigate('Content Library')}
        />
        <DrawerItem
          label={({focused, color}) => (
            <Text style={styles.drawer_item}>Attendance</Text>
          )}
          onPress={() => props.navigation.navigate('AttendanceStack')}
        />
        <DrawerItem
          label={({focused, color}) => (
            <Text style={styles.drawer_item}>Assignment</Text>
          )}
          onPress={() => props.navigation.navigate('Assignment')}
        />
        <DrawerItem
          label={({focused, color}) => (
            <Text style={styles.drawer_item}>Lesson Plan</Text>
          )}
          onPress={() => props.navigation.navigate('Lesson Plan')}
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
            <Text style={styles.drawer_item}>CCE Marks</Text>
          )}
          onPress={() => props.navigation.navigate('Cce Marks')}
        />
        <DrawerItem
          style={styles.item}
          label={({focused, color}) => (
            <Text style={styles.drawer_item}>Recorded Classes</Text>
          )}
          onPress={() => props.navigation.navigate('Recorded Classes')}
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
              margin: 20,
              marginLeft: 40,
              backgroundColor: institute ? institute.themeColor : 'black',
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
  userInfo = useSelector(state => state.userInfo);
  return (
    <DrawerNav.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}
      drawerStyle={
        {
          // backgroundColor: 'rgba(255, 255, 255, 0.8)',
          // marginTop: 69,
        }
      }>
      <DrawerNav.Screen name="Home" component={Home_Route} />
      <DrawerNav.Screen name="Content Library" component={ContentLibrary} />
      <DrawerNav.Screen name="AttendanceStack" component={AttendanceStack} />
      <DrawerNav.Screen name="Assignment" component={Assignment} />
      <DrawerNav.Screen name="Lesson Plan" component={LessonPlan} />
      <DrawerNav.Screen name="Books" component={Books} />
      <DrawerNav.Screen name="Feedback" component={Feedback} />
      <DrawerNav.Screen name="Transport" component={Transport} />
      <DrawerNav.Screen name="Cce Marks" component={CceMarks} />
      <DrawerNav.Screen name="Recorded Classes" component={RecordedClasses} />
      <DrawerNav.Screen name="Report" component={Report} />
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
    color: 'black'
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
    width: 110,
    height: 120,
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
    // color: 'rgba(176, 67, 5, 0.75)',
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
