import React, { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
} from 'react-native';

import { Button } from 'react-native-paper';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';
import LoaderHook from '../../../../components/LoadingScreen/LoadingScreen';

// redux
import { useSelector } from 'react-redux';

import { useFocusEffect } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export default function AssignmentStudentDue({ navigation }) 
{
  const [searchQuery, setSearchQuery] = useState('');
  const [assignments, setAssignments] = useState([]);
  const userInfo = useSelector(state => state.userInfo);
  const institute = useSelector(state => state.institute)

  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        setLoadingScreen()
        try {
          let slug = `/note/assignment?batch=${userInfo.batch}&course=${userInfo.course}`;
          let token = await read('token');
          const response = await get(slug, token);
          setAssignments(response);
        } catch (err) {
          alert('Cannot fetch your assignments !!');
        }
        hideLoadingScreen()
      }
      fetchUser();

      return () => {
        isActive = false;
      };
    }, [])
  );

  function isAssignmentDone(assignment) {

    for (let i = 0; i < assignment.attemptedBy.length; i++) {
      if (assignment.attemptedBy[i] && assignment.attemptedBy[i].userId === userInfo._id) {

        return i;
      } else {
        return -1;
      }
    }
  }
  var [isPress, setIsPress] = React.useState(false);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'blue', // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('HELLO'), // <-- "onPress" is apparently required
  };

  const [activeTab, setActiveTab] = React.useState('Due');

  //const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  const [showContent, setShowContent] = React.useState('Due');

  function switchTab() {
    if (activeTab === 'Submitted') {
      setActiveTab('Due');
    } else {
      setActiveTab('Submitted');
    }
  }

  function Due() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        {loadingScreen}
        {filteredUsers.length > 0 ?
        (
        <ScrollView>
          <View flexDirection="column-reverse">
          {filteredUsers.map(assignments => (
                <View style={styles.section} key={assignments._id}>
                  <View style={styles.details}>
                    <View style={styles.userinhostels}>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontWeight: 'normal',
                            fontSize: 18,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {' '}
                          {assignments.title || 'Title Not Found'}
                        </Text>

                        {/* <Text style={styles.userstext}> Ph:9484422222</Text> */}
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: institute ? institute.themeColor : '#5177E7',
                            fontFamily: 'Poppins-Medium',
                          }}>
                          {'  '}
                          {assignments.subject.name || 'Subject name Not Found'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 12,
                            marginRight: 30,
                            fontFamily: 'Poppins-Regular',
                            color: '#505069',
                          }}>
                          {'  '}
                          {assignments.description || 'Description Not Found'}
                        </Text>

                        {/* <Text style={styles.userstext}>Graded</Text> */}
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.belowhr}>
                    <Text
                      style={{
                        color: '#58636D',
                        fontSize: 12,
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {'  '}Due:{'  '}
                      {assignments.submissionDateString.slice(0, 15) ||
                        'Subject name Not Found'}
                    </Text>

                    <Button
                      style={styles.button}
                      onPress={() => navigation.navigate('AssignmentSubmit', { assignments: assignments })}
                      labelStyle={{
                        color: 'white',
                        fontFamily: 'Poppins-Regular',
                        fontWeight: 'bold',
                      }}
                      color={institute ? institute.themeColor : 'blue'}
                      uppercase={false}
                      mode="contained">
                      Submit
                    </Button>
                  </View>
                </View>
              ),
            )}
            </View>
        </ScrollView>
        ):(
          <ScrollView>
            <View flexDirection="column-reverse">
          {assignments &&
            assignments.map(assignments =>
              isAssignmentDone(assignments) > -1 ? null : (
                <View style={styles.section} key={assignments._id}>
                  <View style={styles.details}>
                    <View style={styles.userinhostels}>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontWeight: 'normal',
                            fontSize: 18,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {' '}
                          {assignments.title || 'Title Not Found'}
                        </Text>

                        {/* <Text style={styles.userstext}> Ph:9484422222</Text> */}
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: institute ? institute.themeColor : '#5177E7',
                            fontFamily: 'Poppins-Medium',
                          }}>
                          {'  '}
                          {assignments.subject.name || 'Subject name Not Found'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 12,
                            marginRight: 30,
                            fontFamily: 'Poppins-Regular',
                            color: '#505069',
                          }}>
                          {'  '}
                          {assignments.description || 'Description Not Found'}
                        </Text>

                        {/* <Text style={styles.userstext}>Graded</Text> */}
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.belowhr}>
                    <Text
                      style={{
                        color: '#58636D',
                        fontSize: 12,
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {'  '}Due:{'  '}
                      {assignments.submissionDateString.slice(0, 15) ||
                        'Subject name Not Found'}
                    </Text>

                    <Button
                      style={styles.button}
                      onPress={() => navigation.navigate('AssignmentSubmit', { assignments: assignments })}
                      labelStyle={{
                        color: 'white',
                        fontFamily: 'Poppins-Regular',
                        fontWeight: 'bold',
                      }}
                      color={institute ? institute.themeColor : 'blue'}
                      uppercase={false}
                      mode="contained">
                      Submit
                    </Button>
                  </View>
                </View>
              ),
            )}
          </View>
          </ScrollView>
        )
        }
      </View>
    );
  }

  function Submitted() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <ScrollView>
          {assignments &&
            assignments.map(assignments =>
              !(isAssignmentDone(assignments) > -1) ? null : (
                <View style={styles.section} key={assignments._id}>
                  <View style={styles.details}>
                    <View style={styles.userinhostels}>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontWeight: 'normal',
                            fontSize: 18,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {' '}
                          {assignments.title || 'Title Not Found'}
                        </Text>

                      </TouchableOpacity>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: institute ? institute.themeColor : '#5177E7',
                            fontFamily: 'Poppins-Medium',
                          }}>
                          {'  '}
                          {assignments.subject.name || 'Subject name Not Found'}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#5177E7',
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {assignments.attemptedBy[isAssignmentDone(assignments)]
                            .marks || 'Marks Not Found'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 12,
                            marginRight: 30,
                            fontFamily: 'Poppins-Regular',
                            color: '#505069',
                          }}>
                          {'  '}
                          {assignments.description || 'Description Not Found'}
                        </Text>

                        {/* <Text style={styles.userstext}>Graded</Text> */}
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.belowhr}>
                    <Text
                      style={{
                        color: '#5177E7',
                        fontSize: 12,
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {'  '}Due:
                      {assignments.submissionDateString.slice(0, 15) ||
                        'Subject name Not Found'}
                    </Text>

                    <Button
                      style={styles.button}
                      labelStyle={{
                        color: 'white',
                        fontFamily: 'Poppins-Regular',
                        fontWeight: 'bold',
                      }}
                      uppercase={false}
                      onPress={() =>
                        Linking.openURL(
                          assignments.attemptedBy[isAssignmentDone(assignments)]
                            .url,
                        )
                      }
                      color={institute ? institute.themeColor : 'blue'}
                      mode="contained">
                      View
                    </Button>
                  </View>
                </View>
              ),
            )}
        </ScrollView>
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.maincontainer}>
        <View
          style={{
            backgroundColor: institute ? institute.themeColor : 'black',
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
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontStyle: 'normal',
                fontSize: 28,
                fontFamily: 'NunitoSans-Light',
                fontWeight: '600',
                alignSelf: 'center',
                paddingLeft: 30,
                color: 'white',
              }}>
              Assignments
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '90%',
            marginLeft: 25,
            marginBottom: 30,
            marginTop: 30,
          }}>
          {/* open search */}
          <View
            style={{
              marginTop: 10,
              justifyContent: 'space-between',
              width: '100%',
              flexDirection: 'row',
              ...styles.shadow,
            }}>
            <TextInput
              style={{ width: '80%', ...styles.text_input }}
              placeholder="Enter subject name"
              placeholderTextColor="grey"
              defaultValue={searchText}
              textContentType='name'
              onChangeText={(text) => {
                setSearchText(text);
                if (text === '') {
                  return setFilteredUsers([]);
                }
                const filtered_users = assignments.filter((assignments) =>
                assignments.title.toLowerCase().startsWith(text.toLowerCase())
                );
                setFilteredUsers(filtered_users);
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
{/* switch table for due and sumitted begins */}
        <View style={styles.switchTabsView}>
          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Due' ? 1.5 : 0,
              borderBottomColor:
                showContent == 'Due'
                  ? 'rgba(176, 67, 5, 1)'
                  : '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowContent('Due')}>
            <Text
              style={
                ([styles.switchText],
                  [
                    {
                      color:
                        showContent == 'Due'
                          ? 'rgba(176, 67, 5, 1)'
                          : '#58636D',
                    },
                    { fontWeight: 'bold' },
                  ])
              }
            >Due</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Submitted' ? 1.5 : 0,
              borderBottomColor:
                showContent == 'Submitted'
                  ? 'rgba(176, 67, 5, 1)'
                  : '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowContent('Submitted')}>
            <Text
              style={
                ([styles.switchText],
                  [
                    {
                      color:
                        showContent == 'Submitted'
                          ? 'rgba(176, 67, 5, 1)'
                          : '#58636D',
                    },
                    { fontWeight: 'bold' },
                  ])
              }
            >Submitted</Text>
          </TouchableOpacity>
        </View>
        {showContent === 'Due' ? <Due /> : <Submitted />}

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
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 2.0,
    elevation: 10,
    marginTop: 14,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 0,
    borderBottomColor: 'rgba(88, 99, 109, 0.45)',
    borderBottomWidth: 0.8,
  },
  userinhostels: {
    marginTop: 10,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 20,
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
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
  },
  maincontainer: {

    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
  button: {
    alignSelf: 'flex-end',
    marginTop: -8,
    color: 'white',
    padding: 2,
    paddingHorizontal: 1,
    borderRadius: 6,
  },

  text_input: {
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 50,
    fontSize: 16,
    minWidth: 171,
    backgroundColor: 'white',
    color: 'black'
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
});
