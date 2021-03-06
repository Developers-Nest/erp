import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
} from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


//helpers
import get from '../../../../services/helpers/request/get';
import deleteReq from '../../../../services/helpers/request/delete';

//localstorage
import read from '../../../../services/localstorage/read';

//loading screen
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// redux
import { useSelector } from 'react-redux';

export default function EventScreen({ navigation }) {
  const [type, setType] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [events, setEvents] = useState([]);

  //screen reload
  const [reload, setreload] = React.useState(true);

  //theming
  const institute = useSelector(state => state.institute);

  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  //date
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(0, 15);
  };

  //for search
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);


  // on load of the screen
  useEffect(async () => {
    showLoadingScreen();
    try {
      let token = await read('token');
      let response = await get('/event', token);
      setEvents(response);
    } catch (err) {
      alert('Cannot fetch events : ' + err);
    }
    hideLoadingScreen();
  }, [reload]);

  const HandleDelete = async id => {
    try {
      let slug = `/event/${id}`;
      let token = await read('token');
      const response = await deleteReq(slug, token);
      setreload(!reload);
    } catch (err) {
      alert('Cannot delete event!!' + err);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: 'rgba(249, 249, 249, 1)',
      }}>
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : '#FF5733',
          ...styles.header,
        }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
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
              }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontStyle: 'normal',
            fontFamily: 'NunitoSans-Regular',
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 20,
            color: 'white',
          }}>
          Events
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddEvents')}
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
              
            }}>
            <Ionicons
              name="add-circle"
              color="#900"
              style={{
                fontSize: 30,
                color: 'white',
                marginRight: 12,
                marginTop: 4,
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                marginRight: 15,
              }}>
              Add Events
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.search}>
        <TextInput
          style={{ ...styles.search_input }}
          placeholder="Enter Events name Here"
          placeholderTextColor="grey"
          defaultValue={searchText}
          textContentType='name'
          onChangeText={(text) => {
            setSearchText(text);
            if (text === '') {
              return setFilteredUsers([]);
            }
            const filtered_users = events.filter((event) =>
              event.name.toLowerCase().startsWith(text.toLowerCase())
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
            <FontAwesome5Icon
              name="search"
              style={{
                alignSelf: 'center',
                fontSize: 30,
                color: 'black',
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
      <View style={{ paddingBottom: 10 }}>

        {filteredUsers.length > 0 ?
          (
            <ScrollView>
              <View flexDirection="column-reverse">
              {events &&
                filteredUsers.map(event => (
                  <View style={styles.shadow} key={event._id}>
                    <View style={styles.EventCard}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 15,
                          marginLeft: 10,
                          marginRight: 10,
                        }}>
                        <Text
                          style={{ fontSize: 18, fontWeight: '400', color: '#211C5A' }}>
                          {event.name}
                        </Text>
                        <View>
                          <TouchableWithoutFeedback
                            style={{ flexDirection: 'row', alignContent: 'flex-end' }}
                            onPress={() => {
                              navigation.navigate('EditEvent', {
                                id: event._id,
                                v: event.__v,
                                eventname: event.name,
                                Organizer: event.organizer,
                                des: event.description,
                                start: event.startDate,
                                end: event.endDate,
                                eventFor: event.eventFor,
                                eventType: event.type && event.type._id,
                                eventTypeName: event.type && event.type.name,
                                course: event.course && event.course._id,
                                coursename: event.course && event.course.courseName,
                                batch: event.batch && event.batch._id,
                                batchname: event.batch && event.batch.batchName,
                                department: event.department && event.department._id,
                                departmentname:
                                  event.department && event.department.name,
                                holiday: event.holiday,
                              });
                            }}>
                            <FontAwesome5Icon
                              name="edit"
                              style={{
                                alignSelf: 'center',
                                fontSize: 15,
                                color: institute ? institute.themeColor : '#211C5A',
                                marginRight: 2,
                              }}
                            />
                            <Text
                              style={{
                                color: institute ? institute.themeColor : '#211C5A',
                              }}>
                              Edit
                            </Text>
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback
                            style={{ flexDirection: 'row', alignContent: 'flex-end' }}
                            onPress={() => {
                              HandleDelete(event._id);
                            }}>
                            <AntDesign
                              size={12}
                              color="#211C5A"
                              name="delete"
                              style={{ paddingTop: 2 }}
                            />
                            <Text
                              style={{
                                color: institute ? institute.themeColor : '#211C5A',
                              }}>
                              Delete
                            </Text>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                      <View style={{ marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ color: '#211C5A' }}>
                          {event.eventFor === 'Selected Batch'
                            ? 'Batch: ' +
                            (event.course && event.course.courseName) +
                            ', ' +
                            (event.batch && event.batch.batchName)
                            : event.eventFor === 'Selected Department'
                              ? 'Department: ' +
                              (event.department && event.department.name)
                              : event.eventFor}
                        </Text>
                        <Text style={{ color: '#211C5A', marginBottom: 0 }}>
                          {event.description}
                        </Text>
                        <View
                          style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                            borderTopWidth: 0.5,
                          }}>
                          <Text style={{ color: '#211C5A', marginTop: 5 }}>
                            {'From: '}
                            {parseDate(event.startDate)}
                          </Text>
                          <Text style={{ color: '#211C5A', marginTop: 5 }}>
                            {'To: '}
                            {parseDate(event.endDate)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
                </View>
              <View style={{ height: 10 }} />
            </ScrollView>
          ) : (
            <ScrollView>
              <View flexDirection="column-reverse">
              {events &&
                events.map(event => (
                  <View style={styles.shadow} key={event._id}>
                    <View style={styles.EventCard}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 15,
                          marginLeft: 10,
                          marginRight: 10,
                        }}>
                        <Text
                          style={{ fontSize: 18, fontWeight: '400', color: '#211C5A' }}>
                          {event.name}
                        </Text>
                        <View>
                          <TouchableWithoutFeedback
                            style={{ flexDirection: 'row', alignContent: 'flex-end' }}
                            onPress={() => {
                              navigation.navigate('EditEvent', {
                                id: event._id,
                                v: event.__v,
                                eventname: event.name,
                                Organizer: event.organizer,
                                des: event.description,
                                start: event.startDate,
                                end: event.endDate,
                                eventFor: event.eventFor,
                                eventType: event.type && event.type._id,
                                eventTypeName: event.type && event.type.name,
                                course: event.course && event.course._id,
                                coursename: event.course && event.course.courseName,
                                batch: event.batch && event.batch._id,
                                batchname: event.batch && event.batch.batchName,
                                department: event.department && event.department._id,
                                departmentname:
                                  event.department && event.department.name,
                                holiday: event.holiday,
                              });
                            }}>
                            <FontAwesome5Icon
                              name="edit"
                              style={{
                                alignSelf: 'center',
                                fontSize: 15,
                                color: institute ? institute.themeColor : '#211C5A',
                                marginRight: 2,
                              }}
                            />
                            <Text
                              style={{
                                color: institute ? institute.themeColor : '#211C5A',
                              }}>
                              Edit
                            </Text>
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback
                            style={{ flexDirection: 'row', alignContent: 'flex-end' }}
                            onPress={() => {
                              HandleDelete(event._id);
                            }}>
                            <AntDesign
                              size={12}
                              color="#211C5A"
                              name="delete"
                              style={{ paddingTop: 2 }}
                            />
                            <Text
                              style={{
                                color: institute ? institute.themeColor : '#211C5A',
                              }}>
                              Delete
                            </Text>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                      <View style={{ marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ color: '#211C5A' }}>
                          {event.eventFor === 'Selected Batch'
                            ? 'Batch: ' +
                            (event.course && event.course.courseName) +
                            ', ' +
                            (event.batch && event.batch.batchName)
                            : event.eventFor === 'Selected Department'
                              ? 'Department: ' +
                              (event.department && event.department.name)
                              : event.eventFor}
                        </Text>
                        <Text style={{ color: '#211C5A', marginBottom: 0 }}>
                          {event.description}
                        </Text>
                        <View
                          style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                            borderTopWidth: 0.5,
                          }}>
                          <Text style={{ color: '#211C5A', marginTop: 5 }}>
                            {'From: '}
                            {parseDate(event.startDate)}
                          </Text>
                          <Text style={{ color: '#211C5A', marginTop: 5 }}>
                            {'To: '}
                            {parseDate(event.endDate)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
                </View>
              <View style={{ height: 10 }} />
            </ScrollView>
          )
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 69,
    flexDirection: 'row',
  },
  search: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderColor: '#00499F',
    borderRadius: 10,
    margin: 20,
    borderWidth: 0.2,
  },
  search_input: {
    borderRadius: 10,
    height: 59,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    width: '90%',
    color: 'black',
  },
  EventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 7,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 12,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    padding: 0,

    elevation: 5,
  },
});
