import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';


//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

//selector
import ModalSelector from 'react-native-modal-selector';

// redux
import { useSelector } from 'react-redux';

//helpers
import getMonth from '../../../../services/helpers/getList/getMonth';
import getYear from '../../../../services/helpers/getList/getYear';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import read from '../../../../services/localstorage/read';
import get from '../../../../services/helpers/request/get';

export default function Attendance({ navigation }) {
  //theming
  const institute = useSelector(state => state.institute);

  //loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  //list values
  const [months, setMonths] = useState(getMonth());
  const [years, setYears] = useState(getYear());

  //selected values
  const [yearSelected, setyearSelected] = useState(null);
  const [monthSelected, setmonthSelected] = useState(null);

  const [days, setdays] = useState([]);
  const [admNo, setadmNo] = useState();

  const userInfo = useSelector(state => state.userInfo);

  // on load of the screen
  useEffect(async () => {
    showLoadingScreen();
    try {
      if (yearSelected != null && monthSelected != null) {
        let token = await read('token');
        let slug = `/student/attendance/monthly/?course=${userInfo.course}&year=${yearSelected}&month=${monthSelected}`;

        let response = await get(slug, token);
        setdays([]);
        if (response.length == 0) {
          alert('Inactive Month!!');
          hideLoadingScreen();
          return;
        }

        const studentFound = student => {
          setadmNo(student.studentAdmissionNumber);
          setdays(student.days);
        };
        response[0] &&
          response[0].students.map(student =>
            student.studentId && student.studentId._id === userInfo._id
              ? studentFound(student)
              : null,
          );
      }
    } catch (err) {
      alert('Cannot fetch List ' + err);
    }
    hideLoadingScreen();
  }, [yearSelected, monthSelected]);

  let fetchAttendance = async type => { };
  return (
    <View
      style={{
        backgroundColor: 'rgba(249, 249, 249, 1)',
        flex: 1,
        justifyContent: 'flex-start',
      }}>
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
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

      <View
        style={{
          marginBottom: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          margin: 20,
        }}>
{/* year selector */}
        <View style={{ marginTop: 10, width: 150, ...styles.card }}>
          <ModalSelector
            data={years}
            onChange={option => {
              setyearSelected(option.key + 2020);
            }}
            initValue="Select Year"
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>

        <View style={{ marginTop: 10, width: 150, ...styles.card }}>
          <ModalSelector
            data={months}
            onChange={option => {
              setmonthSelected(option.key);
            }}
            initValue="Select Month"
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>
      </View>
{/* Month selector */}
      <ScrollView>
        {days.length == 0 ? (
          yearSelected == null || monthSelected == null ? (
            <Text style={{ alignSelf: 'center' }}>{'Select date and month'}</Text>
          ) : (
            <Text style={{ alignSelf: 'center' }}>
              {'No attendance listed this month'}
            </Text>
          )
        ) : (
          days.map(day => (
            <View style={styles.section} key={day._id}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <TouchableOpacity style={styles.differentusers}>
                    <Text style={{ fontSize: 18,fontFamily: 'Poppins-Regular', color: '#211C5A' }}>
                      {'Day: '}
                      {day && day.name}
                    </Text>

                    <Text
                      style={{ fontSize: 18,fontFamily: 'Poppins-Regular', paddingTop: 22, color: '#000000' }}>
                      {day.present === 'present' ? 'Present' : 'Absent'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.differentusers}>
                    <Text
                      style={{ fontSize: 14, marginLeft: 5, color: '#6A6A80' }}>
                      {'Admission Number: '}
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

const AttendanceScreen2 = ({ navigation }) => { };

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    elevation: 5,
    marginVertical: 10,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 0,
    paddingBottom: 10,
    borderBottomColor: '#333',
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
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  card: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius:12,
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
    fontSize: 16,
    lineHeight: 30,
    paddingTop: 2,
    color: '#211C5A',
  },
});