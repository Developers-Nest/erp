import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector';

import AntDesign from 'react-native-vector-icons/AntDesign';

// date picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import DocumentPickerHandle from 'react-native-document-picker';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';
import getBatch from '../../../../services/helpers/getList/getBatch';
import getCourse from '../../../../services/helpers/getList/getCourse';
import getSubject from '../../../../services/helpers/getList/getSubject';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import post from '../../../../services/helpers/request/post';
import RNFetchBlob from 'rn-fetch-blob'
import formDataPost from '../../../../services/helpers/request/formDataPost'


// redux
import { useSelector } from 'react-redux';


const RNFS = require("react-native-fs");



export default function AddAssignments({ navigation }) {
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
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateString, setDateString] = useState(
    new Date(1598051730000).toString(),
  );

  // input values
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const [showdatePicker, setShowDatePicker] = useState(false);

  const [file, setFile] = React.useState(null);

  // loading screem
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  useEffect(async () => {
    showLoadingScreen();
    try {
      let courseArray = await getCourse();
      setCourses(courseArray);
    } catch (err) {
      alert('Error in Getting Your Courses!!');
    }
    hideLoadingScreen();
  }, []);

  let getBatches = async sc => {
    showLoadingScreen();
    setCourse(sc);
    try {
      let batchArray = await getBatch(sc);
      setBatches(batchArray);
    } catch (err) {
      alert('Cannot get your Batches!!');
    }
    hideLoadingScreen();
  };

  let getSubjects = async sb => {
    showLoadingScreen();
    setBatch(sb);
    try {
      let subjectArray = await getSubject(course, sb);
      setSubjects(subjectArray);
    } catch (err) {
      alert('Cannot get your Subjects!!');
    }
    hideLoadingScreen();
  };

  let handleDatePicker = async date => {
    showLoadingScreen();
    console.log('Date ', date);
    await setDateString(date.toString());
    await setDate(date.toString());
    setShowDatePicker(false);
    hideLoadingScreen();
  };
  // handle form submission
  let handleSubmit = async () => {
    showLoadingScreen()

    if(!title || !desc || !file || !course || !batch || !subject || !date || !dateString ){
      alert('All Fields are required!!')
      hideLoadingScreen()
      return
    }

    try {
      let slug = `/note/addAssignment`;
      console.log('Assignment slug ', slug);
      let token = await read('token');

      console.log('File ', file)
      if (file != null) {

        const data = new FormData();
        data.append('title', title);
        data.append('description', desc);
        data.append('file', file);
        data.append('course', course);
        data.append('batch', batch);
        data.append('subject', subject);
        data.append('submissionDate', date);
        data.append('submissionDateString', dateString);

        let response = await formDataPost(slug, data, token)
        console.log("Response ", response)

        if (response.url) {
          console.log('Response ', response)
          alert('Assignment Uploaded!!')
        } else {
          console.log('Cannot upload file '+ response)
          throw new Error('Cannot upload file')
        }
      } else {
        throw new Error('File not selected!!')
      }

    } catch (err) {
      alert('Cannot create Assignment! ' + err);
    }

    hideLoadingScreen()
  };

  const filePicker = async () => {

    const res = await DocumentPickerHandle.pick({
      type: [DocumentPickerHandle.types.pdf],
    })
    console.log('Response ', res)
    setFile(res)

    //  -- do not remove following 2 lines (for debugging) -- 
    // const fileName = res.uri.replace("file://", "")
    // setFile(fileName)

  };

  return (
    <View style={{ backgroundColor: 'rgba(249, 249, 249, 1)', flex: 1 }}>
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
          Add Assignment
        </Text>
      </View>
      <View style={{ padding: 10 }} />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          {loadingScreen}
          <ModalSelector
            data={courses}
            initValue="Course"
            onChange={option => {
              getBatches(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          <ModalSelector
            data={batches}
            initValue="Batch"
            onChange={option => {
              getSubjects(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          <ModalSelector
            data={subjects}
            initValue="Subject"
            onChange={option => {
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
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TextInput
                  placeholder="Assignment Title"
                  onChangeText={title => setTitle(title)}
                  placeholderTextColor="grey"
                  color="black"
                  defaultValue={title}
                />
                {/* <View style={{paddingLeft:10}} /> */}
              </View>
              <View style={{ padding: 2 }} />
              <View style={{ borderWidth: 0.2 }} />
              <View style={{ padding: 10 }} />
              {/* <TextInput placeholder="Topic " />
              <View style={{padding: 2}} />
              <View style={{borderWidth: 0.2}} />
              <View style={{padding: 10}} /> */}

              <TextInput
                placeholder="Discription"
                onChangeText={val => setDesc(val)}
                placeholderTextColor="grey"
                color="black"
                defaultValue={desc}
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
                <Button
                  mode="contained"
                  color={file ? "green" : "white"}
                  onPress={() => filePicker()}>
                  {file ? file.name : 'Add File'}
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
        <View style={{ padding: 20 }} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button
            mode="contained"
            style={{
              width: 90,
            }}
            color={institute? institute.themeColor: 'blue'}
            onPress={handleSubmit}>
            {' '}
            Save
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
  card_picker: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    minWidth: 110,
    elevation: 3,
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
