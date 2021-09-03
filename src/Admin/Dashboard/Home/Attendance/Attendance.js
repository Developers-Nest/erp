import React, { useState, useEffect } from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ModalSelector from 'react-native-modal-selector';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

//icons
import Icon from 'react-native-vector-icons/AntDesign';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// redux
import { useSelector } from 'react-redux';

// helpers
import getBatch from '../../../../services/helpers/getList/getBatch';
import getSubject from '../../../../services/helpers/getList/getSubject';
import getCourse from '../../../../services/helpers/getList/getCourse';
import getMonth from '../../../../services/helpers/getList/getMonth';
import read from '../../../../services/localstorage/read';
import get from '../../../../services/helpers/request/get';
import patch from '../../../../services/helpers/request/patch';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

const AttendanceScreen2 = ({ navigation }) => {
  // current year and month
  var d = new Date();
  let year = d.getUTCFullYear();
  let month = d.getUTCMonth();

  // selected dropdown values
  const [course, setCourse] = useState(null);
  const [batch, setBatch] = useState(null);
  const [subject, setSubject] = useState(null);
  const [monthSelect, setMonthSelect] = useState(month);

  // dropdown values
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [months, setMonths] = useState(getMonth());

  // handle month model open
  const [openMonthSel, setOpenMonthSel] = useState(false);

  // attendance list
  const [studentList, setStudentList] = useState([]);
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  const [nameMethod, setNameMethod] = useState('Name');

  //for search
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  //theming
  const institute = useSelector(state => state.institute);

  // on load of the screen
  useEffect(async () => {
    showLoadingScreen();
    try {
      let cour = await getCourse();
      setCourses(cour);
    } catch (err) {
      alert('Cannot fetch courses!!');
    }
    hideLoadingScreen();
  }, []);

  // get list of batches
  const fetchBatches = async sc => {
    showLoadingScreen();
    setCourse(sc);
    try {
      let bat = await getBatch(sc);
      setBatches(bat);
    } catch (err) {
      alert('Cannot fetch Batches!!');
    }
    hideLoadingScreen();
  };

  // get list of subjects
  const fetchSubjects = async sb => {
    showLoadingScreen();
    setBatch(sb);
    try {
      let sub = await getSubject(course, sb);
      setSubjects(sub);
    } catch (err) {
      alert('Cannot fetch Subjects!!');
    }
    hideLoadingScreen();
  };

  // fetch list
  const fetchList = async (ss, sm = month) => {
    showLoadingScreen();
    setSubject(ss);
    try {
      let token = await read('token');
      let slug = `/student/attendance/monthly/?course=${course}&batch=${batch}&year=${year}&month=${sm}&subject=${ss}`;
      let response = await get(slug, token);
      if (response.length == 0) {
        alert('Inactive Month!!');
        hideLoadingScreen();
        return;
      }
      setStudentList(response[0].students);
    } catch (err) {
      alert('Cannot fetch List');
    }
    hideLoadingScreen();
  };

  // set month from dropdown
  const fetchMonthAtt = async sm => {
    try {
      await fetchList(subject, sm);
    } catch (err) {
      alert('Cannot fetch !!');
    }
  };

  const getAttPer = days => {
    let totalPresent = 0;
    let totalWorking = days.length;
    days.map(day => {
      if (day.present === 'present') totalPresent += 1;
    });
    let per = (totalPresent / totalWorking) * 100;
    return per.toFixed(2);
  };

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: 'rgba(249, 249, 249, 1)',
          flex: 1,
          // justifyContent: 'flex-start',
        }}>
        {loadingScreen}
        <View
          style={{
            backgroundColor: institute ? institute.themeColor : 'black',
            ...styles.header,
          }}>
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
              fontFamily: 'NunitoSans-Regular',
            }}>
            Student Attendance
          </Text>
        </View>

        {/* open list part */}
        <ScrollView>
          <View style={{ padding: 15 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 10,
                alignContent: 'flex-start',
                width: '100%',
              }}>
              <ModalSelector
                data={courses}
                initValue="Course"
                onChange={option => {
                  fetchBatches(option.key);
                }}
                style={styles.card}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
              <ModalSelector
                data={batches}
                initValue="Batch"
                onChange={option => {
                  fetchSubjects(option.key);
                }}
                style={styles.card}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
              <ModalSelector
                data={subjects}
                initValue="Subject"
                onChange={option => {
                  fetchList(option.key);
                }}
                style={styles.card}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
            </View>
            <ScrollView>
              <View style={{ marginTop: 20 }}>
                {/* <View style={{alignItems:'center'}}></View> */}
                <View style={{ padding: 5, alignItems: 'center' }}>
                  {/* open search */}
                  <View
                    style={{
                      justifyContent: 'space-around',
                      width: '95%',
                      flexDirection: 'row',
                      ...styles.shadow,
                    }}>

                    {searchText.length === 0 ? (
                      <FontAwesome5
                        name="search"
                        style={{
                          alignSelf: 'center',
                          fontSize: 14,
                          color: '#6A6A80',
                          marginLeft: 15,

                        }}
                      />
                    ) :
                      (
                        <TouchableOpacity
                          onPress={() => {

                            setSearchText('');
                            setFilteredUsers([]);
                          }}
                          style={{
                            alignSelf: 'center',
                          }}
                        >
                          <MaterialIcon name='cancel'
                            style={{
                              alignSelf: 'center',
                              fontSize: 24,
                              color: '#6A6A80',
                              marginLeft: 15,

                            }}
                          />
                        </TouchableOpacity>
                      )}
                    <TextInput
                      style={{ width: '70%', ...styles.text_input }}
                      placeholder="Enter student's name"
                      placeholderTextColor='grey'
                      color='black'
                      defaultValue={searchText}
                      textContentType='name'
                      onChangeText={(text) => {
                        setSearchText(text);
                        if (text === '') {
                          return setFilteredUsers([]);
                        }

                        const filtered_users = studentList.filter((st) =>
                          st.studentId.firstName.toLowerCase().startsWith(text.toLowerCase())
                        );
                        setFilteredUsers(filtered_users);

                      }}
                      returnKeyType='search'
                    />

                    <ModalSelector
                      data={months}
                      initValue={
                        <View
                          style={{
                            alignSelf: 'center',
                            flexDirection: 'column',
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
                          <Text
                            style={{
                              fontFamily: 'Poppins-Medium',
                              fontSize: 12,
                              color: '#6A6A80',
                            }}>
                            This Month
                          </Text>
                        </View>
                      }
                      onChange={option => {
                        fetchMonthAtt(option.key);
                      }}
                      visible={openMonthSel}
                      style={{}}
                      initValueTextStyle={styles.SelectedValueSmall}
                      selectTextStyle={styles.SelectedValueSmall}
                    />
                  </View>
                </View>

                <View style={{ padding: 10 }} />
                <View>
                  {filteredUsers.length > 0 ?
                    (
                      <ScrollView>
                        {studentList &&
                          filteredUsers.map(st => (
                            <View style={styles.section} key={st._id}>
                              <View style={styles.details}>
                                <View style={styles.userinhostels2}>
                                  <TouchableOpacity
                                    style={styles.differentusers}
                                    onPress={() => {
                                      setNameMethod('Name');
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 22,
                                        color: '#211C5A',
                                        fontFamily: 'Poppins-regular',
                                      }}>
                                      {' '}
                                      {st.studentId
                                        ? st.studentId.firstName
                                        : 'Not Found'}
                                    </Text>

                                    <Text
                                      style={{
                                        fontSize: 22,
                                        paddingTop: 20,
                                        color: '#000000',
                                        fontFamily: 'Poppins-regular',
                                      }}>
                                      {getAttPer(st.days)} %
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={styles.differentusers}>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        marginLeft: 5,
                                        color: institute
                                          ? institute.themeColor
                                          : '#6A6A80',
                                        fontFamily: 'Poppins-regular',
                                      }}>
                                      {''} Admission No: {st.studentAdmissionNumber}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          ))}
                      </ScrollView>
                    ) :
                    (
                      <ScrollView>
                        {studentList &&
                          studentList.map(st => (
                            <View style={styles.section} key={st._id}>
                              <View style={styles.details}>
                                <View style={styles.userinhostels2}>
                                  <TouchableOpacity
                                    style={styles.differentusers}
                                    onPress={() => {
                                      setNameMethod('Name');
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 22,
                                        color: '#211C5A',
                                        fontFamily: 'Poppins-regular',
                                      }}>
                                      {' '}
                                      {st.studentId
                                        ? st.studentId.firstName
                                        : 'Not Found'}
                                    </Text>

                                    <Text
                                      style={{
                                        fontSize: 22,
                                        paddingTop: 20,
                                        color: '#000000',
                                        fontFamily: 'Poppins-regular',
                                      }}>
                                      {getAttPer(st.days)} %
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={styles.differentusers}>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        marginLeft: 5,
                                        color: institute
                                          ? institute.themeColor
                                          : '#6A6A80',
                                        fontFamily: 'Poppins-regular',
                                      }}>
                                      {''} Admission No: {st.studentAdmissionNumber}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          ))}
                      </ScrollView>
                    )
                  }
                  {/* Cards end */}
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        <View style={{ padding: 7 }} />
        {/* close list part */}
      </View>
    </ScrollView>
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
    width: '99%',
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
    marginTop: 5,
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
    height: 69,
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

export default AttendanceScreen2;
