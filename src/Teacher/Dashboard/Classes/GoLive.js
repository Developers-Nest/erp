import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import {Button, Card} from 'react-native-paper';

//selector
import ModalSelector from 'react-native-modal-selector';

// date picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// helpers
import post from '../../../services/helpers/request/post';
import read from '../../../services/localstorage/read';
import getBatch from '../../../services/helpers/getList/getBatch';
import getCourse from '../../../services/helpers/getList/getCourse';
import getSubject from '../../../services/helpers/getList/getSubject';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

// redux
import {useSelector} from 'react-redux';

export default function OnlineLecture({navigation}) {
  //theme
  let institute = useSelector(state => state.institute);

  // input variables
  const [url, setUrl] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  // dropdown selected
  const [course, setCourse] = useState(null);
  const [batch, setBatch] = useState(null);

  // dropdown values
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  // date time picker handle
  const [showdatePicker, setShowDatePicker] = useState(false);
  const [showtimePicker, setShowTimePicker] = useState(false);

  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  // Recurrence Days
  const [recDays, setRecDays] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  });

  useEffect(async () => {
    showLoadingScreen();
    try {
      const response = await getCourse();
      setCourses(response);
    } catch (err) {
      alert('Cannot get Courses!');
    }
    hideLoadingScreen();
  }, []);

  // handle date select
  let handleSubmit = async sd => {
    showLoadingScreen();
    await setDate(sd.toString());
    setShowDatePicker(false);
    hideLoadingScreen();
  };

  // handle time select
  let handleSubmit2 = async sd => {
    showLoadingScreen();
    await setTime(sd.toString());
    setShowTimePicker(false);
    hideLoadingScreen();
  };

  // get all batches
  const getBatches = async selectedCourse => {
    showLoadingScreen();
    try {
      await setCourse(selectedCourse);
      const response = await getBatch(selectedCourse);
      setBatches(response);
    } catch (err) {
      alert('Cannot get Batches');
    }
    hideLoadingScreen();
  };

  const handleSaveClass = async () => {
    showLoadingScreen();
    if (!batch || !course || !date || !time || !url || !description) {
      alert('All fields are required!!');
      hideLoadingScreen();
      return;
    }
    try {
      let slug = `/liveclass`;
      let token = await read('token');

      let daysArray = [];
      Object.keys(recDays).map(day => {
        daysArray.push({
          name: day,
          checked: recDays[day],
          duration: '',
        });
      });

      let data = {
        batch: batch,
        course: course,
        date: date,
        time: time,
        url: url,
        meetingType: 'Other',
        zoomId: '',
        days: daysArray,
        name: description,
      };
      let response = await post(slug, data, token);
      if (response.error) {
        alert(response.error);
      } else if (response._id) {
        alert('Class Added!');
        navigation.replace('Lectures');
      }
    } catch (err) {
      alert('Cannot Add this Claas!');
    }
    hideLoadingScreen();
  };

  return (
    <View style={styles.container}>
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Lectures');
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
            fontFamily: 'NunitoSans-Regular',
          }}>
          Go Live
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}>
          {/* course selector */}
          <ModalSelector
            data={courses}
            initValue="Course"
            onChange={option => {
              getBatches(option.key);
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
              setBatch(option.key);
            }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>

        {/* input details */}
        <Card style={styles.card1}>
          <Card.Content>
            <TextInput
              placeholder="URL"
              placeholderTextColor="grey"
              style={{
                textAlignVertical: 'top',
                borderBottomWidth: 0.5,
                fontSize: 15,
                color: 'black',
              }}
              onChangeText={val => setUrl(val)}
            />

            <TextInput
              placeholder="Description"
              multiline={true}
              numberOfLines={4}
              placeholderTextColor="grey"
              style={{
                textAlignVertical: 'top',
                marginTop: 5,
                height: 150,
                fontSize: 15,
                color: 'black',
              }}
              onChangeText={val => setDescription(val)}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              {/* date picker */}
              <Button
                icon="calendar"
                mode="contained"
                color="white"
                style={{margin: 2}}
                onPress={() => setShowDatePicker(true)}>
                {date ? date.slice(0, 10) : 'DATE'}
              </Button>

              <DateTimePickerModal
                isVisible={showdatePicker}
                mode="date"
                onConfirm={handleSubmit}
                onCancel={() => setShowDatePicker(!showdatePicker)}
              />
              <View style={{width: 40}}></View>
              {/* time picker */}
              <Button
                icon="calendar"
                mode="contained"
                color="white"
                style={{margin: 2}}
                onPress={() => setShowTimePicker(true)}>
                {time ? time.slice(15, 21) : 'TIME'}
              </Button>

              <DateTimePickerModal
                isVisible={showtimePicker}
                mode="time"
                onConfirm={handleSubmit2}
                onCancel={() => setShowTimePicker(!showtimePicker)}
              />
            </View>
          </Card.Content>
        </Card>

        <Text
          style={{
            fontSize: 17,
            fontFamily: 'Poppins-Regular',
            paddingLeft: 15,
            marginTop: 20,
          }}>
          Reccurence Days
        </Text>
        <View style={styles.Week}>
          {Object.keys(recDays).map(day => (
            <View style={{marginTop: 15}} key={day}>
              <TouchableOpacity
                onPress={() => {
                  setRecDays(prevRecDays => {
                    return {
                      ...prevRecDays,
                      [day]: !recDays[[day]],
                    };
                  });
                }}>
                <View
                  style={{
                    backgroundColor:
                      recDays[day] == true ? '#1F7C17' : '#58636D',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    width: 90,
                    height: 40,
                  }}>
                  <Text style={{color: 'white'}}>{day}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            mode="contained"
            style={{
              backgroundColor: institute ? institute.themeColor : 'blue',
              ...styles.submitButton,
            }}
            onPress={handleSaveClass}>
            Go Live
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  header: {
    height: 65,
    flexDirection: 'row',
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
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    width: 125,
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    paddingTop: 3,
    color: '#211C5A',
  },
  card1: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  Week: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  submitButton: {
    margin: 20,
    width: 100,
  },
});
