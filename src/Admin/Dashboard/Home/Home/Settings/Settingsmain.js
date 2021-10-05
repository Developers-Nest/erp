import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

//dropdown
import ModalSelector from 'react-native-modal-selector';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

//checkbox
import { CheckBox, Modal } from 'react-native-elements';

//redux
import { useSelector } from 'react-redux';

//helpers
import LoadingScreen from '../../../../../components/LoadingScreen/LoadingScreen';
import get from '../../../../../services/helpers/request/get';
import post from '../../../../../services/helpers/request/post';
import read from '../../../../../services/localstorage/read';
import getCourse from '../../../../../services/helpers/getList/getCourse';
import getBatch from '../../../../../services/helpers/getList/getBatch';

export default function Settingsmain({ navigation }) {
  const [showContent, setShowContent] = React.useState('Users');
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [modalVisible, setModalVisible] = useState(false)

  //theming
  const institute = useSelector(state => state.institute);

  function Visitors() {

    const [visitors, setVisitors] = React.useState([]);

    // loading screen
    const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen();

    useEffect(async () => {
      setLoadingScreen();
      try {
        let token = await read('token');

        //get details
        const slug = '/visitors';
        const response = await get(slug, token);

        setVisitors(response);
      } catch (err) {
        alert('Cannot Login !!' + err);
      }
      hideLoadingScreen();
    }, []);

    return (
      <View style={styles.container}>
        <ScrollView>
          {/* new section */}
          {visitors.map(visitor => {
            return (
              <View style={styles.section} key={visitor._id}>
                {loadingScreen}
                <View style={styles.details}>
                  <View style={styles.userinhostels}>
                    <View style={styles.differentusers}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: institute ? institute.themeColor : '#FF5733',
                          fontFamily: 'Poppins-Regular',
                          marginHorizontal: -5,
                        }}>
                        {' '}
                        {visitor.name}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.differentusers}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#58636D',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {visitor.category}
                      </Text>

                    </TouchableOpacity>
                    <View style={styles.differentusers}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#505069',
                          fontFamily: 'OpenSans-Regular',
                        }}>
                        {visitor.whomToMeet}
                      </Text>

                      {/* <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() => navigation.navigate('EditVisitors')}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: institute ? institute.themeColor : '#211C5A',
                            fontFamily: 'Poppins-Regular',
                          }}>
                          Edit
                        </Text>
                        <Icon
                          size={12}
                          color={institute ? institute.themeColor : '#FF5733'}
                          name="edit"
                          style={{ paddingTop: 2, paddingRight: 10 }}
                        />
                      </TouchableOpacity> */}

                    </View>
                  </View>
                </View>

                <View style={styles.belowhr}>
                  <Text
                    style={{
                      color: institute ? institute.themeColor : '#FF5733',
                      fontSize: 12,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {visitor.purpose}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  function Users() {

    // dropdown values
    const [userType, setUserType] = useState([]);
    const [department, setDepartment] = useState([]);
    const [courses, setCourses] = useState([])
    const [batches, setBatches] = useState([])

    // selected values
    const [isSelectAll, setIsSelectAll] = useState(false)
    const [sUserType, setSuserType] = useState('')
    const [sUserId, setSuserId] = useState('')
    const [sDepartment, setSdepartment] = useState('')
    const [scourse, setScourse] = useState('')
    const [sbatch, setSbatch] = useState('')

    // options
    const [emailText, setEmailText] = useState('motha')

    // users
    const [users, setUsers] = useState([])

    //for checkboxes
    const [checkBoxValue, setCheckBoxValue] = useState({});

    // loading screen
    const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen();

    useEffect(async () => {
      setLoadingScreen()
      try {
        let slug = '/usertype'
        let token = await read('token')
        let res = await get(slug, token)
        let userTypeArray = []
        res && res.map((user) => {
          userTypeArray.push({
            key: user._id,
            label: user.name
          })
        })
        setUserType(userTypeArray)
      } catch (err) {
        alert('Cannot get Usertypes!!')
      }

      try {
        let res = await getCourse()
        setCourses(res)
      } catch (err) {
        alert('Cannot get Courses!!')
      }

      try {
        let slug = '/department'
        let token = await read('token')
        let res = await get(slug, token)
        let departmentArray = []
        res && res.map((user) => {
          departmentArray.push({
            key: user._id,
            label: user.name
          })
        })
        setDepartment(departmentArray)
      } catch (err) {
        alert('Cannot get Departments!!')
      }
      hideLoadingScreen()
    }, [])

    let fetchBatch = async (idx) => {
      setLoadingScreen()
      try {
        setScourse(idx)
        let res = await getBatch(idx)
        setBatches(res)
      } catch (err) {
        alert('Cannot get Batches!!')
      }
      hideLoadingScreen()
    }

    let fetchUsers = async (idx) => {
      setLoadingScreen()
      let slug
      if (sUserType === "Student") {
        setSbatch(idx)
        slug = `/settings/user?userType=${sUserId}&course=${scourse}&batch=${idx}`
      } else if (sUserType === "Teacher") {
        setSdepartment(idx)
        slug = `/settings/user?userType=${sUserId}&department=${idx}`
      }

      try {
        let token = await read('token')
        let res = await get(slug, token)
        let checkBoxMap = {}
        res && res.map((user) => {
          checkBoxMap[user._id] = false
        })
        setUsers(res)
        setCheckBoxValue(checkBoxMap)
      } catch (err) {
        alert('Cannot get Users!!')
      }
      hideLoadingScreen()
    }

    let toggleCheckBox = (userId) => {
      setCheckBoxValue(prevRecDays => {
        return {
          ...prevRecDays,
          [userId]: !checkBoxValue[[userId]],
        };
      });
    }

    let selectAll = () => {
      Object.entries(checkBoxValue).forEach(([userId, value]) => {
        setCheckBoxValue(prevRecDays => {
          return {
            ...prevRecDays,
            [userId]: !isSelectAll,
          };
        });
      });
      setIsSelectAll(!isSelectAll)
    }

    let sendEmail = async () => {
      setLoadingScreen()
      if (users && users.length == 0) {
        hideLoadingScreen()
        return
      }
      try {
        let token = await read('token')
        let slug = '/settings/user/email'

        let list = []
        Object.entries(checkBoxValue).forEach(([userId, value]) => {
          if (checkBoxValue[userId]) list.push(userId)
        });

        let data = {
          emailText: emailText,
          list: list
        }

        let res = await post(slug, data, token)
        if (res.error) {
          alert(res.error)
        } else if (res.message) {
          alert('Email Sent!!')
        }

      } catch (err) {
        alert('Cannot Send Email')
      }
      hideLoadingScreen()
    }

    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
            alignItems: 'center',

          }}>
          {loadingScreen}
          <ModalSelector
            data={userType}
            initValue="Usertype"
            onChange={option => {
              setSuserType(option.label)
              setSuserId(option.key)
            }}
            style={styles.cardusertype}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          {
            sUserType === "Student" ? (

              <>
                <ModalSelector
                  data={courses}
                  initValue="Course"
                  onChange={option => {
                    fetchBatch(option.key)
                  }}
                  style={styles.card}
                  initValueTextStyle={styles.SelectedValueSmall}
                  selectTextStyle={styles.SelectedValueSmall}
                />

                <ModalSelector
                  data={batches}
                  initValue="Batches"
                  onChange={option => {
                    fetchUsers(option.key)
                  }}
                  style={styles.card}
                  initValueTextStyle={styles.SelectedValueSmall}
                  selectTextStyle={styles.SelectedValueSmall}
                />
              </>

            ) : (null)
          }

          {
            sUserType === "Teacher" ? (
              <ModalSelector
                data={department}
                initValue="Department"
                onChange={option => {
                  fetchUsers(option.key)
                }}
                style={styles.carddept}
                initValueTextStyle={styles.SelectedValuedept}
                selectTextStyle={styles.SelectedValuedept}
              />
            ) : (null)
          }

        </View>
        <ScrollView>
          {/* //for logo inside bubble */}
          <View style={{ height: 20 }} />
          {/* <View style={{  padding: 30 }}> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'column',
                marginLeft: 25,
              }}>

              <TouchableOpacity style={styles.iconbubble} onPress={sendEmail}>
                <MaterialCommunityIcon size={38.5} color="black" name="gmail" />
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    color: '#505069',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 12.8855,
                  }}>
                  {'      '}Email
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={styles.iconbubble}>
                <MaterialCommunityIcon
                  size={38.5}
                  color="black"
                  name="chat-processing"
                />
              </View>
              <View>
                <Text
                  style={{
                    color: '#505069',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 12.8855,
                  }}>
                  {'        '}SMS
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'column' }}>
              <View style={styles.iconbubble}>
                <MaterialCommunityIcon size={38.5} color="black" name="lock" />
              </View>
              <View>
                <Text
                  style={{
                    color: '#505069',
                    fontFamily: 'Poppins-Regular',
                    marginRight: 3,
                    fontSize: 12.8855,
                  }}>
                  Reset Password
                </Text>
              </View>
            </View>
          </View>

          {/* all icons and text placed above*/}
          <View style={{ height: 30 }} />
          <CheckBox
            containerStyle={{ marginTop: -9 }}
            checked={isSelectAll}
            title={'Select All'}
            onPress={selectAll}
          />

          {/* new card start */}
          {
            users && users.map((user) => (
              <View style={styles.section} key={user._id}>
                <View style={styles.details2}>
                  <View style={styles.userinhostels}>
                    <View style={styles.differentusers}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#211C5A',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {' '}
                        {user.firstName}
                      </Text>
                    </View>
                    <View style={styles.differentusers}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#58636D',
                          fontFamily: 'Poppins-Regular',
                          marginTop: -15,
                        }}>
                        {''} {user.email}
                      </Text>
                      <CheckBox
                        containerStyle={{ marginTop: -9 }}
                        checked={checkBoxValue[user._id]}
                        onPress={() => toggleCheckBox(user._id)}
                      />
                      {/* <Text style={{fontSize:12,color:'blue'}}> Not Graded</Text> */}
                    </View>
                    <TouchableOpacity style={styles.differentusers}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#58636D',
                          fontFamily: 'Poppins-Regular',
                          marginTop: -15,
                        }}>
                        {''} {user.code}
                      </Text>

                      {/* <Text style={styles.userstext}>Graded</Text> */}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            ))
          }


          {/* new card ends */}
        </ScrollView>
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.maincontainer}>
        {/* header start */}

        <View
          style={{
            backgroundColor: institute ? institute.themeColor : '#FF5733',
            // backgroundColor:'blue',
            ...styles.header,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
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
                marginTop: 22,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontStyle: 'normal',
              fontFamily: 'NunitoSans-Regular',
              fontSize: 28,
              fontWeight: '600',
              alignSelf: 'center',
              marginLeft: 30,
              color: 'white',
            }}>
            Settings
          </Text>
          {showContent === 'Users' ? null : (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddVisitors')}
              style={{
                justifyContent: 'flex-end',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 5,
                }}>
                <Ionicons
                  name="add-circle"
                  color="#900"
                  style={{
                    fontSize: 35,
                    color: 'white',
                    paddingRight: 20,
                  }}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 12,
                  }}>
                  Add Visitors
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* header ends */}


        <ScrollView>
          {/* tabs section open */}

          <View style={{ height: 30 }} />

          <View style={styles.switchTabsView}>
            <TouchableOpacity
              style={{
                borderBottomWidth: showContent == 'Users' ? 1 : 1,
                borderBottomColor: showContent == 'Users' ? 'rgba(176, 67, 5, 1)' : '#58636D',
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowContent('Users')}>
              <Text style={[styles.switchText], [{ color: showContent == 'Users' ? 'rgba(176, 67, 5, 1)' : '#58636D' }, { fontWeight: 'bold' }]}>Users</Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: showContent == 'Visitors' ? 1 : 1,
                borderBottomColor: showContent == 'Visitors' ? 'rgba(176, 67, 5, 1)' : '#58636D',
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowContent('Visitors')}>
              <Text style={[styles.switchText], [{ color: showContent == 'Visitors' ? 'rgba(176, 67, 5, 1)' : '#58636D' }, { fontWeight: 'bold' }]}>Visitors</Text>
            </TouchableOpacity>
          </View>
          {showContent === 'Users' ? <Users /> : <Visitors />}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    elevation: 5,
    marginTop: 14,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: '#333',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },

  details2: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 6,
    paddingBottom: 10,
    borderBottomColor: '#333',
    paddingHorizontal: 20,
  },

  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
    //borderBottomWidth:1,
  },
  // userinhostels: {
  //   marginBottom: 10,
  // },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userstext: {
    fontSize: 16,
    // paddingVertical: 4,
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
    marginBottom: 10,
  },
  switchText: {
    fontSize: 14,

    paddingHorizontal: 5,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
  },
  maincontainer: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },

  switchTextDue: {
    fontSize: 14,
    color: '#B04305',
    paddingHorizontal: 5,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
  },

  text_input: {
    paddingHorizontal: 20,
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

  header: {
    height: 69,
    flexDirection: 'row',
    alignContent: 'center',
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
  SelectedValuedept: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 30,
    paddingTop: 3,
    color: '#211C5A',

  },
  //for users

  iconbubble: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 1000,
    // alignSelf: 'center',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1.41,
    elevation: 5,
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

    width: 120,
    elevation: 3,
  },

  cardusertype: {
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

    width: 120,
    elevation: 3,
  },
  carddept: {
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

    width: 140,
    elevation: 3,
  },
});
