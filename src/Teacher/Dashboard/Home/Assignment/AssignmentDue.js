import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';


import { useFocusEffect } from '@react-navigation/native';


import { Searchbar, Button } from 'react-native-paper';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';

import LoaderHook from '../../../../components/LoadingScreen/LoadingScreen';

// redux
import { useSelector } from 'react-redux';

export default function AssignmentsDue({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [assignments, setAssignments] = useState([]);

  const onChangeSearch = query => setSearchQuery(query);

  //for search
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true
      const fetchData = async () => {
        setLoadingScreen()
        try {
          let slug = '/note/assignment';
          let token = await read('token');
          const response = await get(slug, token);
          setAssignments(response);
        } catch (err) {
          alert('Cannot fetch your assignments !!');
        }
        hideLoadingScreen()
      }

      fetchData()

      return () => {
        isActive = false
      };
    }, [])
  );

  //theming
  const institute = useSelector(state => state.institute);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.maincontainer}>
        <View
          style={{
            backgroundColor: institute ? institute.themeColor : 'black',
            ...styles.header,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
              fontFamily: 'NunitoSans-Regular',
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
              color: 'white',
            }}>
            Assignment
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Assignment Add')}
            style={{
              justifyContent: 'flex-end',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
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
          </TouchableOpacity>
        </View>

        <View
          style={{

            alignItems: 'center',
            marginBottom: 30,
            marginTop: 30,
          }}>
          {/* open search */}
          <View style={{ width: '90%', alignItems: 'center' }}>
            <View
              style={{
                justifyContent: 'space-between',
                width: '95%',
                flexDirection: 'row',
                ...styles.shadow,
              }}>


              <TextInput
                style={{ width: '80%', ...styles.text_input }}
                placeholder="Enter subject topic"
                placeholderTextColor='grey'
                defaultValue={searchText}
                textContentType='name'
                onChangeText={(text) => {
                  setSearchText(text);
                  if (text === '') {
                    return setFilteredUsers([]);
                  }
                  const filtered_users = assignments.filter((assignment) =>
                    assignment.title.toLowerCase().startsWith(text.toLowerCase())
                  );
                  setFilteredUsers(filtered_users);
                }}
                returnKeyType='search'
              />
              {searchText.length === 0 ? (
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                  }}
                >
                  <Ionicons
                    name="search-sharp"
                    style={{
                      alignSelf: 'center',
                      fontSize: 30,
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
            {/* close search */}
          </View>
        </View>
        <View style={styles.container}>
        {loadingScreen}
          {filteredUsers.length > 0 ?
            (
              <ScrollView>
                {assignments &&
                  filteredUsers.map(assignment => (
                    <View style={styles.section} key={assignment._id}>
                      <View style={styles.details}>
                        <View style={styles.userinhostels}>
                          <View style={styles.differentusers}>
                            <Text
                              style={{
                                fontSize: 18,
                                color: '#211C5A',
                                fontFamily: 'Poppins-Regular',
                                marginHorizontal: -5,
                              }}>
                              {' '}
                              {/* Title */}
                              {assignment.title || 'Title Not Found'}
                            </Text>

                            <TouchableOpacity
                              style={{ flexDirection: 'row' }}
                              onPress={() =>
                                navigation.navigate('Assignment Edit', {
                                  assignment: assignment,
                                })
                              }>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: '#211C5A',
                                  fontFamily: 'Poppins-Medium',
                                }}>
                                Edit
                              </Text>
                              <Icon
                                size={12}
                                color="#211C5A"
                                name="edit"
                                style={{ paddingTop: 2, paddingRight: 10 }}
                              />
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity style={styles.differentusers}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#5177E7',
                                fontFamily: 'Poppins-Medium',
                              }}>
                              {assignment.course && assignment.course.courseName} -
                              {assignment.batch && assignment.batch.batchName}
                            </Text>

                          </TouchableOpacity>
                          <TouchableOpacity style={styles.differentusers}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#505069',
                                fontFamily: 'Poppins-Regular',
                              }}>

                              {assignment.description || 'Description Not Found'}
                            </Text>


                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.belowhr}>
                        <View style={{ flexDirection: 'column' }}>

                          <Text
                            style={{
                              color: '#B04305',
                              fontSize: 12,
                              marginTop: 10,
                              fontFamily: 'Poppins-Medium',
                            }}>
                            Due:{' '}
                            {assignment.submissionDateString.slice(0, 15) ||
                              'Submission date Not Found'}
                          </Text>
                        </View>
                        <View>
                          <Button
                            style={styles.button}
                            onPress={() =>
                              Alert.alert('Assignment Successfully sent')
                            }
                            color={institute ? institute.themeColor : 'blue'}
                            labelStyle={{ color: 'white' }}
                            uppercase={false}
                            mode="contained">
                            Send
                          </Button>
                        </View>
                      </View>
                    </View>
                  ))}
                <View style={{ height: 20 }} />
              </ScrollView>

            ) : (
              <ScrollView>
                {assignments &&
                  assignments.map(assignment => (
                    <View style={styles.section} key={assignment._id}>
                      <View style={styles.details}>
                        <View style={styles.userinhostels}>
                          <View style={styles.differentusers}>
                            <Text
                              style={{
                                fontSize: 18,
                                color: '#211C5A',
                                fontFamily: 'Poppins-Regular',
                                marginHorizontal: -5,
                              }}>
                              {' '}
                              {/* Title */}
                              {assignment.title || 'Title Not Found'}
                            </Text>

                            <TouchableOpacity
                              style={{ flexDirection: 'row' }}
                              onPress={() =>
                                navigation.navigate('Assignment Edit', {
                                  assignment: assignment,
                                })
                              }>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: '#211C5A',
                                  fontFamily: 'Poppins-Medium',
                                }}>
                                Edit
                              </Text>
                              <Icon
                                size={12}
                                color="#211C5A"
                                name="edit"
                                style={{ paddingTop: 2, paddingRight: 10 }}
                              />
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity style={styles.differentusers}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#5177E7',
                                fontFamily: 'Poppins-Medium',
                              }}>
                              {assignment.course && assignment.course.courseName} -
                              {assignment.batch && assignment.batch.batchName}
                            </Text>

                          </TouchableOpacity>
                          <TouchableOpacity style={styles.differentusers}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#505069',
                                fontFamily: 'Poppins-Regular',
                              }}>

                              {assignment.description || 'Description Not Found'}
                            </Text>


                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.belowhr}>
                        <View style={{ flexDirection: 'column' }}>

                          <Text
                            style={{
                              color: '#B04305',
                              fontSize: 12,
                              marginTop: 10,
                              fontFamily: 'Poppins-Medium',
                            }}>
                            Due:{' '}
                            {assignment.submissionDateString.slice(0, 15) ||
                              'Submission date Not Found'}
                          </Text>
                        </View>
                        <View>
                          <Button
                            style={styles.button}
                            onPress={() =>
                              Alert.alert('Assignment Successfully sent')
                            }
                            color={institute ? institute.themeColor : 'blue'}
                            labelStyle={{ color: 'white' }}
                            uppercase={false}
                            mode="contained">
                            Send
                          </Button>
                        </View>
                      </View>
                    </View>
                  ))}
                <View style={{ height: 20 }} />
              </ScrollView>

            )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
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
    borderBottomColor: '#333',
    borderBottomWidth: 0.5,
  },
  userinhostels: {
    marginTop: 10,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
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
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  text_input: {
    paddingHorizontal: 20,
    borderRadius: 10,

    height: 50,
    fontSize: 16,
    minWidth: 171,
    color: 'black',
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
  button: {
    color: '#F9F9F9',
    paddingHorizontal: 5,
    borderRadius: 5,
    height: 40,
    lineHeight: 20
  },
});
