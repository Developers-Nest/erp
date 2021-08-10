import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';
import {
  Card,
  Button,
} from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector';

import AntDesign from 'react-native-vector-icons/AntDesign';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';
import getBatch from '../../../../services/helpers/getList/getBatch';
import getCourse from '../../../../services/helpers/getList/getCourse';
import getSubject from '../../../../services/helpers/getList/getSubject';

// date picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DocumentPickerHandle from 'react-native-document-picker';
import formDataPatch from '../../../../services/helpers/request/formDataPatch'
import deleteReq from '../../../../services/helpers/request/delete'

import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

// redux
import { useSelector } from 'react-redux';

export default function EditAssignments({ route, navigation }) {

  // input values
  const [topic, setTopic] = useState(null);
  const [discription, setDiscription] = useState(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateString, setDateString] = useState(
    new Date(1598051730000).toString(),
  );
  const [showdatePicker, setShowDatePicker] = useState(false);
  const [file, setFile] = useState(null);
  const [key, setKey] = useState(null)
  const [id, setId] = useState(null)

  //theming
  const institute = useSelector(state => state.institute);

  // data array
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // selected values
  const [batch, setBatch] = useState(null);
  const [course, setCourse] = useState(null);
  const [subject, setSubject] = useState(null);

  // already Selected values
  const [sbatch, setsBatch] = useState(null);
  const [scourse, setsCourse] = useState(null);
  const [ssubject, setsSubject] = useState(null);

  // loading screem
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  useEffect(async () => {
    showLoadingScreen()
    try {
      const { assignment } = route.params
      setsCourse(assignment.course.courseName)
      setsBatch(assignment.batch.batchName)
      setsSubject(assignment.subject.name)

      setCourse(assignment.course._id)
      setBatch(assignment.batch._id)
      setSubject(assignment.subject._id)

      setTopic(assignment.title)
      setDiscription(assignment.description)
      setDateString(assignment.submissionDateString);
      setDate(assignment.submissionDate);
      setFile(assignment.url)
      setKey(assignment.key)
      setId(assignment._id)
    } catch (err) {
      alert('Got Invalid Assignment Data!!')
      navigation.navigate('Assignment Due')
      hideLoadingScreen()
    }
    try {
      let courseArray = await getCourse();
      setCourses(courseArray);
    } catch (err) {
      alert('Error in Getting Your Courses!!');
    }
    hideLoadingScreen()
  }, []);

  let getBatches = async () => {
    showLoadingScreen()
    try {
      let batchArray = await getBatch(course);
      setBatches(batchArray);
    } catch (err) {
      alert('Cannot get your Batches!!');
    }
    hideLoadingScreen()
  };

  let getSubjects = async () => {
    showLoadingScreen()
    try {
      let subjectArray = await getSubject(course, batch);
      setSubjects(subjectArray);
    } catch (err) {
      alert('Cannot get your Subjects!!');
    }
    hideLoadingScreen()
  };

  let handleDatePicker = async date => {
    showLoadingScreen()
    await setDateString(date.toString());
    await setDate(date.toString());
    setShowDatePicker(false);
    hideLoadingScreen();
  };

  const filePicker = async () => {
    const res = await DocumentPickerHandle.pick({
      type: [DocumentPickerHandle.types.pdf],
    })
    setFile(res)

    //  -- do not remove following 2 lines (for debugging) -- 
    // const fileName = res.uri.replace("file://", "")
    // setFile(fileName)

  };

  // handle form submission
  let handleSubmit = async () => {
    showLoadingScreen()

    if (!topic || !discription || !file || !course || !batch || !subject || !date || !dateString) {
      alert('All Fields are required!!')
      hideLoadingScreen()
      return
    }

    try {
      let slug = `/note/assignment/${id}`;
      let token = await read('token');

      if (file != null) {

        const data = new FormData();
        data.append('title', topic);
        data.append('description', discription);
        data.append('file', file);
        data.append('course', course);
        data.append('batch', batch);
        data.append('subject', subject);
        data.append('submissionDate', date);
        data.append('submissionDateString', dateString);

        let response = await formDataPatch(slug, data, token)

        if (response.url) {
          alert('Assignment Updated!!')
        } else {
          throw new Error('Cannot upload file')
        }
      } else {
        throw new Error('File not selected!!')
      }

    } catch (err) {
      alert('Cannot create Assignment! ' + err);
    }
    navigation.navigate('Assignment Due')
    hideLoadingScreen()
  };

  let handleDelete = async () => {
    showLoadingScreen()
    try {
      let token = await read('token')
      let slug = `/note/assignment/${id}`
      let res = await deleteReq(slug, token)
      alert('Assignment Deleted')
    } catch (err) {
      alert('Cannot Delete!!' + err)
    }
    navigation.navigate('Assignment Due')
    hideLoadingScreen()
  }

  return (
    <View style={{ backgroundColor: 'rgba(249, 249, 249, 1)', height: '100%' }}>
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Assignment Due')}>
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
          Edit Assignment
        </Text>
      </View>
      <View style={{ padding: 10 }} />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <ModalSelector
            data={courses}
            initValue={scourse}
            onChangeText={option => {
              setCourse(option.key);
              getBatches();
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          <ModalSelector
            data={batches}
            initValue={sbatch}
            onChangeText={option => {
              setBatch(option.key);
              getSubjects();
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          <ModalSelector
            data={subjects}
            initValue={ssubject}
            onChangeText={option => {
              setSubject(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>

        <View style={{ padding: 10 }} />
        <View
          style={{
            paddingLeft: 11,
            paddingRight: 11,
          }}>
          <Card style={styles.card1}>
            <Card.Content>
              <TextInput placeholder="Topic"
                placeholderTextColor="grey"
                color="black"
                value={topic}
                onChangeText={val => setTopic(val)}
              />
              <View style={{ padding: 2 }} />
              <View style={{ borderWidth: 0.2 }} />
              <View style={{ padding: 10 }} />
              <TextInput
                placeholder="Discription (optional)"
                placeholderTextColor="grey"
                color="black"
                value={discription}
                onChangeText={val => setDiscription(val)}
              />
              <View style={{ padding: 40 }} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                {/* date picker */}
                <Button
                  icon="calendar"
                  mode="contained"
                  color="white"
                  onPress={() => setShowDatePicker(true)}>
                  {dateString ? dateString.slice(0, 10) : 'Set Deadline'}
                </Button>

                <DateTimePickerModal
                  isVisible={showdatePicker}
                  mode="date"
                  onConfirm={handleDatePicker}
                  onCancel={() => setShowDatePicker(!showdatePicker)}
                />

                <View style={{ padding: 10 }} />
                {
                  file ? (
                    <Button
                      mode="contained"
                      color={file ? "green" : "white"}
                      onPress={() => Linking.openURL(file)}>
                      {file ? key.slice(0, 5) + '...' : 'Add File'}
                    </Button>
                  ) : (null)
                }
                <Button
                  mode="contained"
                  color={file && file.name ? "green" : "white"}
                  onPress={() => filePicker()}>
                  {file && file.name ? file.name : 'Add File'}
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
        <View style={{ padding: 20 }} />
        <View
          style={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Button
            mode="contained"
            color={institute ? institute.themeColor : "#5177E7"}
            onPress={handleSubmit}
            style={{
              width: 90,
            }}>
            Save
          </Button>

          <Button
            mode="outlined"
            color="rgba(176, 67, 5, 1)"
            onPress={handleDelete}
            style={{
              width: 90,
              borderWidth: 1,
              borderColor: 'rgba(176, 67, 5, 1)',
            }}>
            Delete
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 69,
    flexDirection: 'row',
  },
  card1: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
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
  card_picker: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    minWidth: 110,
    elevation: 3,
  },
});
