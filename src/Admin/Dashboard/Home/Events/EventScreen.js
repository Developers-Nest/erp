import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
} from 'react-native';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

//selector
import ModalSelector from 'react-native-modal-selector';

//helpers
import get from '../../../../services/helpers/request/get';

//localstorage
import read from '../../../../services/localstorage/read';

//loading screen
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

// redux
import {useSelector} from 'react-redux';

export default function EventScreen({navigation}) {
  const [type, setType] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [events, setEvents] = useState([]);

  //theming
  const institute = useSelector(state => state.institute);

  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  //date
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(0, 15);
  };

  // on load of the screen
  useEffect(async () => {
    showLoadingScreen();
    try {
      let token = await read('token');
      let response = await get('/event', token);
      setEvents(response);
      console.log(response);
    } catch (err) {
      alert('Cannot fetch events : ' + err);
    }
    hideLoadingScreen();
  }, []);

  return (
    <ScrollView style={{backgroundColor: 'rgba(249, 249, 249, 1)', flex: 1}}>
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : '#FF5733',
          ...styles.header,
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
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
              marginRight: 5,
            }}>
            <Ionicons
              name="add-circle"
              color="#900"
              style={{
                fontSize: 30,
                color: 'white',
                marginRight: 20,
                marginTop: 10,
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                marginRight: 20,
              }}>
              Add Events
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.search}>
        <TextInput
          style={{...styles.search_input}}
          placeholder="Enter Events name Here"
          placeholderTextColor="grey"
        />

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
      </View>
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
                  style={{fontSize: 18, fontWeight: '400', color: '#211C5A'}}>
                  {event.name}
                </Text>
                <TouchableWithoutFeedback
                  style={{flexDirection: 'row', alignContent: 'flex-end'}}
                  onPress={() => {
                    navigation.navigate('EditEvent');
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
              </View>
              <View style={{marginLeft: 10, marginRight: 10}}>
                <Text style={{color: '#211C5A'}}>
                  {event.eventFor === 'Common To All'
                    ? event.eventFor
                    : 'Batch: ' +
                      event.course.courseName +
                      ', ' +
                      event.batch.batchName}
                </Text>
                <Text style={{color: '#211C5A', marginBottom: 0}}>
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
                  <Text style={{color: '#211C5A', marginTop: 5}}>
                    {'From: '}
                    {parseDate(event.startDate)}
                  </Text>
                  <Text style={{color: '#211C5A', marginTop: 5}}>
                    {'To: '}
                    {parseDate(event.endDate)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
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
    borderRadius: 8,
    height: 59,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    width: '90%',
    color: 'black',
  },
  EventCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 7,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
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
