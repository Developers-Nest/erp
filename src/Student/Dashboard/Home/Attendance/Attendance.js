import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  RadioButton,
} from 'react-native-paper';

//navigation
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

//icons
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//selector
import ModalSelector from 'react-native-modal-selector';

// redux
import {useSelector} from 'react-redux';

//helpers
import getMonth from '../../../../services/helpers/getList/getMonth';
import getYear from '../../../../services/helpers/getList/getYear';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import read from '../../../../services/localstorage/read';
import get from '../../../../services/helpers/request/get';

const Stack = createStackNavigator();

export default function Attendance({navigation}) {
  //initial value
  var d = new Date();
  let currentyear = d.getUTCFullYear();
  let currentmonth = d.getUTCMonth();

  //loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  //list values
  const [months, setMonths] = useState(getMonth());
  const [years, setYears] = useState(getYear());

  //selected values
  const [yearSelected, setyearSelected] = useState(currentyear);
  const [monthSelected, setmonthSelected] = useState(currentmonth);

  const [days, setdays] = useState([]);
  const [admNo, setadmNo] = useState();

  const userInfo = useSelector(state => state.userInfo);

  // on load of the screen
  useEffect(async () => {
    showLoadingScreen();
    try {
      let token = await read('token');
      let slug = `/student/attendance/monthly/?course=${userInfo.course}&year=${yearSelected}&month=${monthSelected}`;
      console.log('student attendance slug', slug);

      let response = await get(slug, token);
      console.log('student attendance', response);
      setdays([]);
      if (response.length == 0) {
        alert('Inactive Month!!');
        hideLoadingScreen();
        return;
      }
      response[0] &&
        response[0].students.map(student =>
          student.studentId && student.studentId._id === userInfo._id
            ? setdays(student.days) && setadmNo(student.studentAdmissionNumber)
            : null,
        );
    } catch (err) {
      alert('Cannot fetch List ' + err);
    }
    hideLoadingScreen();
  }, [yearSelected, monthSelected]);

  return (
    <View
      style={{
        backgroundColor: '#E5E5E5',
        flex: 1,
        justifyContent: 'flex-start',
      }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Icon
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
        <Text
          style={{
            fontStyle: 'normal',
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
            color: 'white',
          }}>
          Attendance
        </Text>
      </View>

      <View style={{padding: 7}} />

      <View
        style={{
          marginBottom: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          margin: 20,
        }}>
        <View style={{marginTop: 10, width: 150, ...styles.card}}>
          <ModalSelector
            data={years}
            onChange={option => {
              setyearSelected(option.key + 2020);
            }}
            initValue="This Year"
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>

        <View style={{marginTop: 10, width: 150, ...styles.card}}>
          <ModalSelector
            data={months}
            onChange={option => {
              setmonthSelected(option.key);
            }}
            initValue="This Month"
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>
      </View>

      <ScrollView>
        {days.length == 0 ? (
          <Text style={{alignSelf: 'center'}}>
            No attendance listed this month
          </Text>
        ) : (
          days.map(day => (
            <View style={styles.section} key={day._id}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <TouchableOpacity style={styles.differentusers}>
                    <Text style={{fontSize: 22, color: '#211C5A'}}>
                      {'Day: '}
                      {day && day.name}
                    </Text>

                    <Text
                      style={{fontSize: 22, paddingTop: 22, color: '#000000'}}>
                      {day.present === 'present' ? 'Present' : 'Absent'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.differentusers}>
                    <Text
                      style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
                      Roll No.
                      {admNo}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const AttendanceScreen2 = ({navigation}) => {};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 2,
    marginTop: 10,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 0,
    paddingBottom: 10,
    borderBottomColor: '#333',
    // borderBottomWidth: 1,
  },
  userinhostels: {
    marginTop: 1,
    marginHorizontal: 10,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    justifyContent: 'space-between',
  },
  userstext: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '300',
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
    //borderBottomWidth:1,
  },
  search: {
    backgroundColor: 'white',
    color: 'black',
  },
  switchTabsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  switchText: {
    fontSize: 14,
    color: '#58636D',
    paddingHorizontal: 5,
  },
  maincontainer: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  card: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    minWidth: '30%',
  },

  Drop: {
    marginTop: 5,
    flexDirection: 'row',

    justifyContent: 'space-evenly',
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 30,
    paddingTop: 3,
    color: '#211C5A',
  },

  // container: {
  //   paddingTop: 10,
  //   flex: 1,
  //   backgroundColor: '#E5E5E5',
  // },
  // section: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   backgroundColor: '#fff',
  //   shadowColor: '#333',
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.2,
  //   elevation: 2,
  //   marginTop: 14,
  //   borderRadius: 12,
  //   paddingLeft: 10,
  //   paddingRight: 10,
  //   marginHorizontal: 20,
  // },

  // details: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   marginTop: 3,
  //   paddingBottom: 10,
  //   borderBottomColor: '#333',
  //   // borderBottomWidth: 1,
  // },
  // userinhostels: {
  //   marginTop: 10,
  // },
  // differentusers: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 2,
  //   justifyContent: 'space-between',
  // },
  // userstext: {
  //   fontSize: 16,
  //   paddingVertical: 4,
  //   fontWeight: '300',
  // },
  // belowhr: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   marginTop: 10,
  //   justifyContent: 'space-between',
  //   paddingBottom: 10,
  //   borderBottomColor: '#333',
  //   //borderBottomWidth:1,
  // },
  // search: {
  //   backgroundColor: 'white',
  //   color: 'black',
  // },
  // switchTabsView: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 40,
  // },
  // switchText: {
  //   fontSize: 14,
  //   color: '#58636D',
  //   paddingHorizontal: 5,
  // },
  // maincontainer: {
  //   paddingTop: 10,
  //   flex: 1,
  //   backgroundColor: '#E5E5E5',
  // },
  // card: {
  //   shadowColor: '#999',
  //   shadowOffset: {width: 0, height: 1},
  //   shadowOpacity: 0.5,
  //   shadowRadius: 12,
  //   elevation: 5,
  //   backgroundColor: 'white',
  //   borderColor: '#ccc',
  //   borderWidth: 1,
  //   borderBottomLeftRadius: 12,
  //   borderBottomRightRadius: 12,
  //   borderTopRightRadius: 12,
  //   borderTopLeftRadius: 12,
  //   overflow: 'hidden',
  //   justifyContent: 'center',
  //   margin: 0,
  //   padding: 0,
  //   minWidth: '30%',
  // },
  // Drop: {
  //   marginTop: 5,
  //   flexDirection: 'row',

  //   justifyContent: 'space-evenly',
  // },
  header: {
    height: 65,
    marginTop: 0,
    backgroundColor: 'rgba(0, 73, 159, 1)',
    flexDirection: 'row',
  },
});
