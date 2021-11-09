import React, {useState, useEffect} from 'react';

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
import {Button, RadioButton} from 'react-native-paper';

//icons
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// redux
import {useSelector} from 'react-redux';

// helpers
import getMonth from '../../../../../services/helpers/getList/getMonth';
import getYear from '../../../../../services/helpers/getList/getYear';
import read from '../../../../../services/localstorage/read';
import get from '../../../../../services/helpers/request/get';
import patch from '../../../../../services/helpers/request/patch';
import LoadingScreen from '../../../../../components/LoadingScreen/LoadingScreen';

const EmployeeAttendance = ({navigation}) => {
  // current year and month
  var d = new Date();
  let currentyear = d.getUTCFullYear();
  let currentmonth = d.getUTCMonth();

  // selected dropdown values
  const [department, setDepartment] = useState(null);
  const [monthSelected, setmonthSelected] = useState(currentmonth);
  const [yearSelected, setyearSelected] = useState(currentyear);

  // dropdown values
  const [departments, setDepartments] = useState([]);
  const [months, setMonths] = useState(getMonth());
  const [years, setYears] = useState(getYear());

  // handle month model open
  const [openMonthSel, setOpenMonthSel] = useState(false);

  // attendance list
  const [employeeList, setemployeeList] = useState([]);

  //loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  //theming
  const institute = useSelector(state => state.institute);

  // on load of the screen
  useEffect(async () => {
    showLoadingScreen();
    try {
      let token = await read('token');
      let response = await get('/department', token);
      let list = [];
      response.map(data => {
        list.push({
          label: data.name,
          key: data._id,
        });
      });
      setDepartments(list);
    } catch (err) {
      alert('Cannot fetch dept!!' + err);
    }
    hideLoadingScreen();
  }, []);

  // fetch list
  const fetchList = async month => {
    showLoadingScreen();
    try {
      setmonthSelected(month);

      let token = await read('token');
      let slug = `/employee/attendance/monthly/?department=${department}&year=${yearSelected}&month=${month}`;
      let response = await get(slug, token);
      if (response.length == 0) {
        alert('Inactive Month!!');
        hideLoadingScreen();
        return;
      }
      setemployeeList(response[0].employees);
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
    console.log('Days', days);
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
                paddingTop: 25,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontStyle: 'normal',
              fontSize: 28,
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 10,
              color: 'white',
              fontFamily: 'NunitoSans-Regular',
            }}>
            Employee Attendance
          </Text>
        </View>

        {/* open list part */}
        <ScrollView>
          <View style={{padding: 15}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 10,
                alignContent: 'flex-start',
                width: '100%',
              }}>
              <ModalSelector
                data={departments}
                initValue="Department"
                onChange={option => {
                  setDepartment(option.key);
                }}
                style={styles.card}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
              <ModalSelector
                data={years}
                initValue={'Year'}
                onChange={option => {
                  setyearSelected(option.key + 2020);
                }}
                style={styles.card}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
              <ModalSelector
                data={months}
                initValue={'Month'}
                onChange={option => {
                  fetchList(option.key);
                }}
                style={styles.card}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
            </View>
            <ScrollView>
              <View style={{marginTop: 20}}>
                {/* <View style={{alignItems:'center'}}></View> */}
                {/* <View style={{padding: 5, alignItems: 'center'}}>
                  {/* open search 
                  <View
                    style={{
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
                        marginLeft: 10,
                        marginTop: 3,
                      }}
                    />
                    <TextInput
                      style={{width: '70%', ...styles.text_input}}
                      placeholder="Enter student's name"
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
                </View> */}

                <View style={{padding: 10}} />

                {employeeList &&
                  employeeList.map(emp => (
                    <View style={styles.section} key={emp._id}>
                      <View style={styles.details}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('EmpAttendance', {
                              days: emp.days,
                              name: emp.employeeId.firstName,
                            });
                          }}
                          style={styles.userinhostels2}>
                          <View style={styles.differentusers}>
                            <Text
                              style={{
                                fontSize: 22,
                                color: '#211C5A',
                                fontFamily: 'Poppins-regular',
                              }}>
                              {' '}
                              {emp.employeeId
                                ? emp.employeeId.firstName
                                : 'Not Found'}
                            </Text>

                            <Text
                              style={{
                                fontSize: 22,
                                paddingTop: 20,
                                color: '#000000',
                                fontFamily: 'Poppins-regular',
                              }}>
                              {getAttPer(emp.days)} %
                            </Text>
                          </View>
                          <View style={styles.differentusers}>
                            <Text
                              style={{
                                fontSize: 14,
                                marginLeft: 5,
                                color: institute
                                  ? institute.themeColor
                                  : '#6A6A80',
                                fontFamily: 'Poppins-regular',
                              }}>
                              {''} {emp.employeeCode}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}

                {/* Cards end */}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        <View style={{padding: 7}} />
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
    shadowOffset: {width: 0, height: 1},
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
    shadowOffset: {width: 0, height: 1},
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
    shadowOffset: {width: 0, height: 1},
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
  card_title: {fontSize: 18},
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

export default EmployeeAttendance;
