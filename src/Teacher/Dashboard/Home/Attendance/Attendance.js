import React, { useState, useEffect } from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import ModalSelector from 'react-native-modal-selector';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,

  RadioButton,
} from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// helpers
import getBatch from '../../../../services/helpers/getList/getBatch'
import getSubject from '../../../../services/helpers/getList/getSubject'
import getCourse from '../../../../services/helpers/getList/getCourse'
import read from '../../../../services/localstorage/read'
import get from '../../../../services/helpers/request/get'
import patch from '../../../../services/helpers/request/patch'
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen'


const Stack = createStackNavigator();

export default function Attendance() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AttendanceScreen1" component={AttendanceScreen1} />
      <Stack.Screen name="AttendanceScreen2" component={AttendanceScreen2} />
    </Stack.Navigator>
  );
}

const AttendanceScreen1 = ({ navigation }) => {

  const [checked, setChecked] = React.useState('first');

  // after fetch
  const [fetched, setFetched] = useState(false)
  const [studentsList, setStudentsList] = useState({})

  // selected values
  const [course, setCourse] = useState(null);
  const [batch, setBatch] = useState(null);
  const [subject, setSubject] = useState(null);

  // for interaction with api
  const [timeStamp, setTimeStamp] = useState('')
  const [day, setDay] = useState('')
  const [studentObject, setStudentObject] = useState({})


  // dropdown values
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen()

  // values after fetch
  let attendanceId

  // on load of the screen
  useEffect(async () => {
    showLoadingScreen()
    try {
      let cour = await getCourse()
      setCourses(cour)
    } catch (err) {
      alert('Cannot fetch courses!!')
    }
    hideLoadingScreen()

  }, [])

  // get list of batches
  const fetchBatches = async (sc) => {
    showLoadingScreen()
    setCourse(sc)
    try {
      let bat = await getBatch(sc)
      setBatches(bat)
    } catch (err) {
      alert('Cannot fetch Batches!!')
    }
    hideLoadingScreen()
  }

  // get list of subjects
  const fetchSubjects = async (sb) => {
    showLoadingScreen()
    setBatch(sb)
    try {
      let sub = await getSubject(course, sb)
      setSubjects(sub)
    } catch (err) {
      alert('Cannot fetch Subjects!!')
    }
    hideLoadingScreen()
  }

  // get list of students after selecting subject
  const getList = async (sb) => {
    showLoadingScreen()
    setSubject(sb)
    try {
      let timeStamp = new Date().getTime()
      console.log('TimeStamp ', timeStamp)
      setTimeStamp('1626287400000')
      // todo change timstamp
      let slug = `/student/attendance/?course=${course}&batch=${batch}&timestamp=1626287400000&subject=${sb}`
      let token = await read('token')
      let res = await get(slug, token)
      console.log('List response ', res)
      setStudentObject(res)
      attendanceId = res._id  // will be used during list submission
      setDay(res.day)
      let students = res.students
      let studentsMap = {}
      students.map((student)=>{
        studentsMap[student._id] = {
          studentName : student.firstName,
          admissionNumber : student.studentAdmissionNumber,
          present: student.present
        }
      })
      console.log('Students ', studentsMap)
      setStudentsList(studentsMap)
      setFetched(true)
    } catch (err) {
      alert('Cannot get list !!')
    }
    hideLoadingScreen()
  }


  // update attendance status of student
  const toggleAttendance = (studentId, currentStatus)=>{
    let updatedStatus
    if(currentStatus === 'present') updatedStatus = 'absent'
    else updatedStatus = 'present'

    setStudentsList(previousList => {
      return {
        ... previousList,
        [studentId]: {
          ... previousList[studentId],
          present: updatedStatus
        }
      }
    })
  }

  // save list
  const handleSaveList = async()=>{
    try{
      let slug = `/student/attendance/${attendanceId}`
      let token = await read('token')
      let list = []
      studentObject.students.map((student)=>{
        list.push({
          firstName: student.firstName,
          lastName: student.lastName,
          lateArrival: student.lateArrival,
          present: studentsList[student._id].present,
          remarks: student.remarks,
          studentAdmissionNumber: student.studentAdmissionNumber,
          studentId: student.studentId._id
        })
      })
      console.log('Patch List ', list)
      let data = {
        course: course,
        batch: batch,
        subject: subject,
        timestamp: timeStamp,
        day: day,
        list: list
      }
      console.log('Data in Patch ', data)
      let response = await patch(slug, data, token)
      console.log('Response after patch ', response)
      alert('List Updated!')
    } catch(err){
      alert('Cannot update List!')
    }
  }

  return (
    <View
      style={{
        backgroundColor: '#E5E5E5',
        flex: 1,
      }}>
      {loadingScreen}
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
            fontFamily: 'NunitoSans-Regular'
          }}>
          Attendance
        </Text>
        <View style={{ flex: 1, marginLeft: 20 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AttendanceScreen2');
            }}>
            <MaterialCommunityIcon
              size={24}
              color="white"
              name="eye"
              style={{
                alignSelf: 'center',
                fontSize: 25,
                color: 'white',
                paddingLeft: 20,
                paddingTop: 15,
              }}
            />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Poppins-Regular', color: '#fff' }}>{'     '}{'       '}{'    '}{'   '}View</Text>
        </View>
      </View>

      <View style={{ padding: 15 }}>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            alignContent: 'flex-start',
            width: '99%'
          }}>

          {/* course selector */}
          <ModalSelector
            data={courses}
            initValue="Class"
            onChange={option => {
              fetchBatches(option.key)
            }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          {/* batch selector */}
          <ModalSelector
            data={batches}
            initValue="Batch"
            onChange={option => {
              fetchSubjects(option.key)
            }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          {/* subject selector */}
          <ModalSelector
            data={subjects}
            initValue="Subject"
            onChange={option => {
              getList(option.key)
            }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

        </View>
        {
          fetched ? (
            <ScrollView>
              <View style={{ marginTop: 6, marginBottom: 150 }}>
                <View style={{ padding: 5, justifyContent: 'center' }} />

                {/* open search */}
                <View
                  style={{
                    //make search and card inline
                    marginLeft: 5,
                    justifyContent: 'space-between',
                    width: '95%',
                    flexDirection: 'row',
                    ...styles.shadow,
                  }}>
                  <FontAwesome5
                    name="search"
                    style={{
                      alignSelf: 'center',
                      fontSize: 11,
                      color: '#6A6A80',
                    }} />
                  <TextInput
                    style={{ width: '80%', ...styles.text_input }}
                    underlineColorAndroid='transparent'
                    placeholder="Enter student's name"
                  />
                  <TouchableOpacity
                    style={{
                      alignSelf: 'center',
                    }}>
                    <FontAwesome5
                      name="filter"
                      style={{
                        alignSelf: 'center',
                        fontSize: 21,
                        color: '#6A6A80',
                      }}

                    />
                  </TouchableOpacity>
                </View>

                <View style={{ padding: 10 }} />


                {/* starting of Card loop-section,scroll for more number of cards */}
                <ScrollView>
                  {
                    Object.keys(studentsList).map((studentId) => (
                      <View style={styles.section} key={studentId}>
                        <View style={styles.details}>
                          <View style={styles.userinhostels}>
                            <TouchableOpacity style={styles.differentusers}>
                              <Text style={{ fontSize: 22, color: '#211C5A', fontFamily: 'Poppins-Regular' }}>{studentsList[studentId].studentName}</Text>
                              <View style={{ marginRight: 20 }}>
                                <RadioButton
                                  value="first"
                                  status={ studentsList[studentId].present === 'present' ? 'checked' : 'unchecked'}
                                  onPress={() => toggleAttendance(studentId, studentsList[studentId].present)}
                                />
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.differentusers}>
                              <Text style={{ fontSize: 14, color: '#6A6A80', fontFamily: 'Poppins-Medium' }}>
                                {'  '}Admission No. {studentsList[studentId].admissionNumber}
                              </Text>

                              <Text style={{ fontSize: 12, color: '#6A6A80', fontFamily: 'Poppins-Medium' }}>
                                {new Date().toISOString().slice(0, 10)}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ))
                  }

                </ScrollView>
                {/* Cards end */}

                <Button onPress={handleSaveList}>Send</Button>

              </View>
            </ScrollView>

          ) : (null)
        }

      </View>

      <View style={{ padding: 7 }} />

      {/* close list part */}

      {/* Cards end */}
    </View>
  );
};



const AttendanceScreen2 = ({ navigation }) => {

  const [value, setValue] = useState(null);
  const [course, setcourse] = useState(null);
  const [courses, setcourses] = useState([
    { label: 'Class1', key: 'Class1' },
    { label: 'Class2', key: 'Class2' },
    { label: 'Class3', key: 'Class3' },
  ]);

  // const [open2, setOpen2] = useState(null);
  const [batch, setbatch] = useState(null);
  const [batches, setbatches] = useState([
    { label: 'Batch1', key: 'Batch1' },
    { label: 'Batch2', key: 'Batch2' },
    { label: 'Batch3', key: 'Batch3' },
  ]);

  // const [open3, setOpen3] = useState(null);
  const [subject, setsubject] = useState(null);
  const [subjects, setsubjects] = useState([
    { label: 'Subject1', key: 'Subject1' },
    { label: 'Subject2', key: 'Subject2' },
    { label: 'Subject3', key: 'Subject3' },
  ]);



  const [nameMethod, setNameMethod] = useState('Name');

  return (
    <View
      style={{
        backgroundColor: '#E5E5E5',
        flex: 1,
        // justifyContent: 'flex-start',
      }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AttendanceScreen1');
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
            fontFamily: 'NunitoSans-Regular'
          }}>
          Attendance
        </Text>

      </View>

      {/* open list part */}
      <View style={{ padding: 15 }}>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            alignContent: 'flex-start',
            width: '99%'
          }}>
          {/* <DropDownPicker
            zIndex={1000}
            open={open1}
            value={value1}
            items={items1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setItems1}
            style={styles.shadow}
            containerStyle={{ width: '30%' }}
            placeholder="Class"
          />
          <DropDownPicker
            zIndex={1000}
            defaultIndex={0}
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            style={styles.shadow}
            containerStyle={{ width: '30%' }}
            placeholder="Batch"
          />
          <DropDownPicker
            zIndex={1000}
            defaultIndex={0}
            open={open3}
            value={value3}
            items={items3}
            setOpen={setOpen3}
            setValue={setValue3}
            setItems={setItems3}
            style={{
              ...styles.shadow,
            }}
            containerStyle={{ width: '30%' }}
            placeholder="Subject"
          /> */}

          <ModalSelector
            data={courses}
            initValue="Class1"
            onChange={option => {
              // setclass(option.key);
            }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
          <ModalSelector
            data={batches}
            initValue="Batch1"
            onChange={option => {
              // setbatch(option.key);
            }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
          <ModalSelector
            data={subjects}
            initValue="Subject1"
            onChange={option => {
              // setsubject(option.key);
            }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

        </View>
        <ScrollView>
          {/* {value !== null &&
            value1 !== null &&
            value2 !== null &&
            value3 !== null ? (
            <AttendancePart2 />
          ) : (
            <AttendancePart2 />
          )} */}

          <AttendancePart2 />
        </ScrollView>
      </View>
      <View style={{ padding: 7 }} />

      {/* close list part */}

    </View>
  );
};


const AttendancePart2 = () => {

  const [nameMethod, setNameMethod] = useState('Name');

  return (

    <View style={{ marginTop: 6 }}>

      <View style={{ padding: 5, justifyContent: 'center' }} />
      {/* open search */}
      <View
        style={{
          marginLeft: 5,
          justifyContent: 'space-around',
          width: '95%',
          flexDirection: 'row',
          ...styles.shadow,
        }}>
        <FontAwesome5
          name="search"
          style={{
            alignSelf: 'center',
            fontSize: 11,
            color: '#6A6A80',
          }} />
        <TextInput
          style={{ width: '70%', ...styles.text_input }}
          placeholder="Enter student's name"
        />
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            flexDirection: 'column'
          }}>

          <FontAwesome5
            name="calendar"
            style={{
              alignSelf: 'center',
              // paddingRight:20,
              // marginRight:20,
              fontSize: 20,
              color: '#6A6A80',
            }}

          />
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#6A6A80' }}>This Month</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 10 }} />


      {/* starting of Card loop-section,scroll for more number of cards */}
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels2}>
              <TouchableOpacity
                style={styles.differentusers}
                onPress={() => {
                  setNameMethod('Name');
                }}>
                <Text style={{ fontSize: 22, color: '#211C5A', fontFamily: 'Poppins-regular' }}> Balram</Text>

                <Text style={{ fontSize: 22, paddingTop: 20, color: '#000000', fontFamily: 'Poppins-regular' }}>

                  78%
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{ fontSize: 14, marginLeft: 5, color: '#6A6A80', fontFamily: 'Poppins-regular' }}>
                  {''} Roll No.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels2}>
              <TouchableOpacity
                style={styles.differentusers}
                onPress={() => {
                  setNameMethod('Name');
                }}>
                <Text style={{ fontSize: 22, color: '#211C5A', fontFamily: 'Poppins-regular' }}> Balram</Text>

                <Text style={{ fontSize: 22, paddingTop: 20, color: '#000000', fontFamily: 'Poppins-regular' }}>

                  78%
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{ fontSize: 14, marginLeft: 5, color: '#6A6A80', fontFamily: 'Poppins-regular' }}>
                  {''} Roll No.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


      </ScrollView>
      {/* Cards end */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,

    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    // shadowColor: '#333',
    // shadowOffset: {
    //   width: 3,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 10,
    borderRadius: 12,


    padding: 10,
    marginLeft: 2,
    marginVertical: 15,
    width: '99%'
  },

  details: {
    display: 'flex',
    flexDirection: 'column',

    borderBottomColor: '#333',

  },
  userinhostels: {
    marginTop: 1,
    marginHorizontal: 10,
  },
  userinhostels2: {
    marginTop: -3,
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

    fontWeight: '300',
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



  text_input: {
    paddingHorizontal: 10,
    borderRadius: 10,
    // backgroundColor: 'rgba(249, 249, 249, 1)',
    height: 50,
    fontSize: 16,
    minWidth: 171,
    backgroundColor: 'white',
  },
  shadow: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
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
    minWidth: 110,
  },

  text_input2: {
    paddingHorizontal: 10,
    borderRadius: 10,
    // backgroundColor: 'rgba(249, 249, 249, 1)',
    height: 50,
    fontSize: 16,
    minWidth: 171,
    backgroundColor: 'white',
  },
  shadow2: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
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
    minWidth: 110,
  },
  Drop: {
    marginTop: 5,
    flexDirection: 'row',

    justifyContent: 'space-evenly',
  },

  header: {
    height: 65,
    marginTop: 0,
    backgroundColor: 'rgba(0, 73, 159, 1)',
    flexDirection: 'row',
  },
  card: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',

    minWidth: 110,
    elevation: 3,
  },
  card_title: { fontSize: 18 },
  card_marks: {
    justifyContent: 'center',
    backgroundColor: ' rgba(88, 99, 109, 1)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: 'white',
  },
  card_top: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card_middle: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  card_bottom: {
    borderTopColor: 'rgba(88, 99, 109, 0.45)',
    borderTopWidth: 1,
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 20,
  },
  courses_card: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  courses_cardClass: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#58636D',
  },
  courses_cardTime: {
    fontSize: 12,
    color: '#5177E7',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  courses_cardBatch: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    paddingVertical: 5,
    color: '#58636D',
  },
  SelectedValue: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 27,
    padding: 10,
    color: '#211C5A',
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

});
