import React, { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable'


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

// redux
import { useSelector } from 'react-redux';

import get from '../../../../../services/helpers/request/get'
import patch from '../../../../../services/helpers/request/patch'
import read from '../../../../../services/localstorage/read'

import LoadingScreen from '../../../../../components/LoadingScreen/LoadingScreen'

export default function LeaveManager({ navigation }) {
  const [showContent, setShowContent] = React.useState('Unreviewed');
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [loaadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen()

  //theming
  const institute = useSelector(state => state.institute);

  const [leaves, setLeaves] = useState([])
  //for search
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(async () => {
    setLoadingScreen()
    try {
      let token = await read('token')
      let slug = '/leavemanagement/application'
      let res = await get(slug, token)
      if (res.error) {
        alert(res.error)
      } else {
        console.log('Leaves ', res)
        setLeaves(res)
      }
    } catch (err) {
      alert('Cannot get list ' + err)
    }
    hideLoadingScreen()
  }, [])

  let updateLeave = async (leaveId, status) => {
    setLoadingScreen()
    try {
      let slug = `/leavemanagement/application/${leaveId}`
      let token = await read('token')
      let data = {
        status: status
      }
      let res = await patch(slug, data, token)
      console.log(res.status)
      alert('Status ', res.status)
      if (res.status) {
        let leavesArray = []
        leaves.map((leave) => {
          if (leave._id == leaveId) {
            leavesArray.push({
              ...leave,
              status: res.status
            })
          } else leavesArray.push(leave)
        })
        setLeaves(leavesArray)
        alert('Status ' + res.status)
      }
    } catch (err) {
      alert('Cannot Update! ' + err)
    }
    hideLoadingScreen()
  }

  function Unreviewed() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    // reject
    const RightActions = (id, status) => {
      return (
        <TouchableOpacity
          onPress={() => {
            updateLeave(id, status)
          }}>
          <View style={styles.iconbubblereject}>
            <FontAwesome5
              size={38.5}
              color="white"
              name="trash-alt"
            />

            <Text style={{ color: 'white' }}>Reject</Text>
          </View>
        </TouchableOpacity>
      )
    }

    // accept
    const LeftActions = (id, status) => {
      return (
        <TouchableOpacity
          onPress={() => {
            updateLeave(id, status)
          }}
        >
          <View style={styles.iconbubbleapprove}>
            <FontAwesome5
              size={38.5}
              color="white"
              name="check-circle"
            />
            <Text style={{ color: 'white' }}>Approve</Text>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        {filteredUsers.length > 0 ?
          (
            <ScrollView>
              {
                leaves && filteredUsers.map((leave) => (
                  leave.status === "Awaiting Approval" ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }} key={leave._id}>
                      <Swipeable renderLeftActions={() => LeftActions(leave._id, 'Approved')} renderRightActions={() => RightActions(leave._id, 'Rejected')}>
                        <View style={styles.section}>
                          <View style={styles.details}>
                            <View style={styles.userinhostels}>
                              <View style={styles.differentusers}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: '#211C5A',
                                    fontFamily: 'Poppins-Regular',
                                    marginHorizontal: -5,
                                    marginRight: 80,
                                    // paddingRight:50
                                  }}>
                                  {' '}
                                  Code: {leave.empcode}
                                </Text>

                                <View
                                  style={{ flexDirection: 'row' }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: '#211C5A',
                                      fontFamily: 'Poppins-Medium',
                                    }}>
                                    Remaining Leave: {leave.count}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.differentusers}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: '#505069',
                                    fontFamily: 'Poppins-Regular',
                                  }}>
                                  Leave Type: {leave.leaveCategory ? leave.leaveCategory.name : 'N/A'}
                                </Text>
                              </View>
                              <View style={styles.differentusers}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: '#505069',
                                    fontFamily: 'Poppins-Regular',
                                  }}>
                                  Reason: {leave.reason}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={styles.belowhr}>
                            <View style={{ flexDirection: 'column' }}>
                              <Text style={{
                                fontFamily: 'Poppins-Regular', fontWeight: '500',
                                fontSize: 12, lineHeight: 18, color: '#211C5A'
                              }}
                              >
                                {'  '}  From: {''}{leave.fromDate ? leave.fromDate.slice(0, 10) : 'N/A'}
                                {/* {assignment.submissionDateString ||
                            'Submission date Not Found'} */}
                              </Text>

                            </View>
                            <View >
                              <Text style={{
                                fontFamily: 'Poppins-Regular', fontWeight: '500',
                                fontSize: 12, lineHeight: 18, color: '#211C5A'
                              }}
                              > {'  '}  To: {''}{leave.toDate ? leave.toDate.slice(0, 10) : 'N/A'}</Text>
                            </View>
                          </View>
                        </View>
                      </Swipeable>
                    </View>
                  ) : (null)))
              }
            </ScrollView>
          ) : (
            <ScrollView>
              {
                leaves && leaves.map((leave) => (
                  leave.status === "Awaiting Approval" ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }} key={leave._id}>
                      <Swipeable renderLeftActions={() => LeftActions(leave._id, 'Approved')} renderRightActions={() => RightActions(leave._id, 'Rejected')}>
                        <View style={styles.section}>
                          <View style={styles.details}>
                            <View style={styles.userinhostels}>
                              <View style={styles.differentusers}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: '#211C5A',
                                    fontFamily: 'Poppins-Regular',
                                    marginHorizontal: -5,
                                    marginRight: 80,
                                    // paddingRight:50
                                  }}>
                                  {' '}
                                  Code: {leave.empcode}
                                </Text>

                                <View
                                  style={{ flexDirection: 'row' }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: '#211C5A',
                                      fontFamily: 'Poppins-Medium',
                                    }}>
                                    Remaining Leave: {leave.count}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.differentusers}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: '#505069',
                                    fontFamily: 'Poppins-Regular',
                                  }}>
                                  Leave Type: {leave.leaveCategory ? leave.leaveCategory.name : 'N/A'}
                                </Text>
                              </View>
                              <View style={styles.differentusers}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: '#505069',
                                    fontFamily: 'Poppins-Regular',
                                  }}>
                                  Reason: {leave.reason}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={styles.belowhr}>
                            <View style={{ flexDirection: 'column' }}>
                              <Text style={{
                                fontFamily: 'Poppins-Regular', fontWeight: '500',
                                fontSize: 12, lineHeight: 18, color: '#211C5A'
                              }}
                              >
                                {'  '}  From: {''}{leave.fromDate ? leave.fromDate.slice(0, 10) : 'N/A'}
                                {/* {assignment.submissionDateString ||
                            'Submission date Not Found'} */}
                              </Text>

                            </View>
                            <View >
                              <Text style={{
                                fontFamily: 'Poppins-Regular', fontWeight: '500',
                                fontSize: 12, lineHeight: 18, color: '#211C5A'
                              }}
                              > {'  '}  To: {''}{leave.toDate ? leave.toDate.slice(0, 10) : 'N/A'}</Text>
                            </View>
                          </View>
                        </View>
                      </Swipeable>
                    </View>
                  ) : (null)))
              }
            </ScrollView>
          )
        }
      </View>
    );
  }

  function Reviewed() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        {filteredUsers.length > 0 ?
          (
            <ScrollView>
              {
                leaves && filteredUsers.map((leave) => (
                  leave.status != "Awaiting Approval" ? (
                    <View style={styles.sectionreviewed} key={leave._id}>
                      <View style={styles.details}>
                        <View style={styles.userinhostels}>
                          <View style={styles.differentusers}>
                            <Text
                              style={{
                                fontSize: 18,
                                color: '#211C5A',
                                fontFamily: 'Poppins-Regular',
                                marginHorizontal: -5,
                                // marginRight:100,
                                paddingRight: 50
                              }}>
                              {' '}
                              Code: {leave.empcode}
                            </Text>

                            <View
                              style={{ flexDirection: 'row' }}
                            >
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: 'black',
                                  fontFamily: 'Poppins-Medium',
                                }}>
                                Status: {leave.status}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.differentusers}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#505069',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              Leave Type: {leave.leaveCategory ? leave.leaveCategory.name : 'N/A'}
                            </Text>
                          </View>
                          <View style={styles.differentusers}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#505069',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              Reason: {leave.reason}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.belowhr}>
                        <View style={{ flexDirection: 'column' }}>
                          <Text style={{
                            fontFamily: 'Poppins-Regular', fontWeight: '500',
                            fontSize: 12, lineHeight: 18, color: '#211C5A'
                          }}
                          >
                            {'  '}  From: {''}{leave.fromDate ? leave.fromDate.slice(0, 10) : 'N/A'}

                          </Text>

                        </View>
                        <View >
                          <Text style={{
                            fontFamily: 'Poppins-Regular', fontWeight: '500',
                            fontSize: 12, lineHeight: 18, color: '#211C5A'
                          }}
                          > {'  '}  To: {''}{leave.toDate ? leave.toDate.slice(0, 10) : 'N/A'}</Text>
                        </View>
                      </View>
                    </View>
                  ) : (null)))
              }
            </ScrollView>
          ) : (
            <ScrollView>
              {
                leaves && leaves.map((leave) => (
                  leave.status != "Awaiting Approval" ? (
                    <View style={styles.sectionreviewed} key={leave._id}>
                      <View style={styles.details}>
                        <View style={styles.userinhostels}>
                          <View style={styles.differentusers}>
                            <Text
                              style={{
                                fontSize: 18,
                                color: '#211C5A',
                                fontFamily: 'Poppins-Regular',
                                marginHorizontal: -5,
                                // marginRight:100,
                                paddingRight: 50
                              }}>
                              {' '}
                              Code: {leave.empcode}
                            </Text>

                            <View
                              style={{ flexDirection: 'row' }}
                            >
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: 'black',
                                  fontFamily: 'Poppins-Medium',
                                }}>
                                Status: {leave.status}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.differentusers}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#505069',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              Leave Type: {leave.leaveCategory ? leave.leaveCategory.name : 'N/A'}
                            </Text>
                          </View>
                          <View style={styles.differentusers}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#505069',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              Reason: {leave.reason}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.belowhr}>
                        <View style={{ flexDirection: 'column' }}>
                          <Text style={{
                            fontFamily: 'Poppins-Regular', fontWeight: '500',
                            fontSize: 12, lineHeight: 18, color: '#211C5A'
                          }}
                          >
                            {'  '}  From: {''}{leave.fromDate ? leave.fromDate.slice(0, 10) : 'N/A'}

                          </Text>

                        </View>
                        <View >
                          <Text style={{
                            fontFamily: 'Poppins-Regular', fontWeight: '500',
                            fontSize: 12, lineHeight: 18, color: '#211C5A'
                          }}
                          > {'  '}  To: {''}{leave.toDate ? leave.toDate.slice(0, 10) : 'N/A'}</Text>
                        </View>
                      </View>
                    </View>
                  ) : (null)))
              }
            </ScrollView>
          )
        }
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.maincontainer}>
        {loaadingScreen}
        {/* header start */}

        <View
          style={{
            backgroundColor: institute ? institute.themeColor : '#FF5733',
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
                paddingTop: 20,
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
              paddingLeft: 30,
              color: 'white',
            }}>
            Leave Manager
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LeaveApplication')}
            style={{
              justifyContent: 'flex-end',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 5 }}>
              {/* <Ionicons
                  name="add-circle"
                  color="#900"
                  style={{
                    fontSize: 35,
                    color: 'white',
                    paddingRight: 20,
                  }}
                /> */}
              <MaterialIcon
                name="align-horizontal-left"
                color="#900"
                style={{
                  fontSize: 35,
                  color: 'white',
                  paddingRight: 20,
                }}
              />


            </View>
          </TouchableOpacity>
        </View>

        {/* header ends */}


        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
            marginTop: 20,
          }}>
          <View style={{ alignItems: 'center', width: '90%' }}>
            {/* open search */}
            <View
              style={{
                marginTop: 10,
                //make search and card in same line
                marginLeft: 5,
                justifyContent: 'space-between',
                width: '95%',
                flexDirection: 'row',
                ...styles.shadow,
              }}>
              <TextInput
                style={{ width: '80%', ...styles.text_input }}
                placeholder="Enter user's name here"
                placeholderTextColor="grey"
                color='black'
                defaultValue={searchText}
                textContentType='name'
                onChangeText={(text) => {
                  setSearchText(text);
                  if (text === '') {
                    return setFilteredUsers([]);
                  }
                  if (showContent === 'Unreviewed') {
                    const filtered_users = leaves.filter((material) =>
                      material.empcode.toLowerCase().startsWith(text.toLowerCase())
                    );
                    setFilteredUsers(filtered_users);
                  }
                  if (showContent === 'Reviewed') {
                    const filtered_users = leaves.filter((video) =>
                      video.empcode.toLowerCase().startsWith(text.toLowerCase())
                    );
                    setFilteredUsers(filtered_users);
                  }
                }}
                returnKeyType='search'
              />
              {searchText.length === 0 ? (
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                  }}>
                  <FontAwesome5
                    name="search"
                    style={{
                      alignSelf: 'center',
                      fontSize: 21,
                      color: '#505069',
                    }}
                  />
                </TouchableOpacity>

              ) : (
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
                      color: '#505069',
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* close search */}

        {/* tabs section open */}
        <ScrollView>
          <View style={styles.switchTabsView}>
            <TouchableOpacity
              style={{
                borderBottomWidth: showContent == 'Unreviewed' ? 1 : 0,
                borderBottomColor: '#58636D',
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowContent('Unreviewed')}>
              <Text style={styles.switchText}>Unreviewed</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: showContent == 'Reviewed' ? 1 : 0,
                borderBottomColor: '#58636D',
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowContent('Reviewed')}>
              <Text style={styles.switchText}>Reviewed</Text>
            </TouchableOpacity>
          </View>
          {showContent === 'Unreviewed' ? <Unreviewed /> : <Reviewed />}
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
    marginTop: 5,
    borderRadius: 8,
    paddingHorizontal: 10,
    // marginLeft:5,
    // marginRight:5,
    // paddingLeft: 10,
    // paddingRight: 10,

    marginHorizontal: 20,
    marginBottom: 20
  },

  sectionreviewed: {
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
    marginVertical: 10,
    // paddingBottom: 10,
    borderBottomColor: '#333',
    paddingHorizontal: 10,
    borderBottomWidth: 0.5
  },
  //   userinhostels: {
  //     marginBottom: 10,
  //   },
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
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    // marginTop: 10,
    justifyContent: 'space-between',
    marginBottom: 20,
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
    marginBottom: 10,
  },
  switchText: {
    fontSize: 14,
    color: '#58636D',
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
    // paddingHorizontal: 20,
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
  iconbubblereject: {
    marginTop: 5,
    width: 80,
    height: 110,
    backgroundColor: 'red',
    // borderRadius: 1000,
    // alignSelf: 'center',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1.41,
    elevation: 5
  },

  iconbubbleapprove: {
    marginTop: 5,
    width: 80,
    height: 110,
    backgroundColor: 'green',
    // borderRadius: 1000,
    // alignSelf: 'center',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1.41,
    elevation: 5
  },

  header: {
    height: 69,
    flexDirection: 'row',
  },
});
