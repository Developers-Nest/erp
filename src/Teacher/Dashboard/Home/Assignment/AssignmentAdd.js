import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import {
  Card,
  Button,
} from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector'

// date picker
import DateTimePickerModal from "react-native-modal-datetime-picker";


// helpers
import get from '../../../../services/helpers/request/get'
import read from '../../../../services/localstorage/read'
import getBatch from '../../../../services/helpers/getList/getBatch'
import getCourse from '../../../../services/helpers/getList/getCourse'
import getSubject from '../../../../services/helpers/getList/getSubject'
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen'


export default function AddAssignments() {

  const [Chapter, setChapter] = useState("Chapter's name");
  const [Topic, setTopic] = useState('Topic:');
  const [Discription, setDiscription] = useState('Discription:')

  // data array
  const [batches, setBatches] = useState([])
  const [courses, setCourses] = useState([])
  const [subjects, setSubjects] = useState([])

  // selected values
  const [batch, setBatch] = useState(null)
  const [course, setCourse] = useState(null)
  const [subject, setSubject] = useState(null)
  const [date, setDate] = useState(new Date(1598051730000))

  // input values
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)

  const [showdatePicker, setShowDatePicker] = useState(false)

  // loading screem
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen()

  useEffect(async () => {
    showLoadingScreen()
    try {
      let courseArray = await getCourse()
      setCourses(courseArray)
    } catch (err) {
      alert('Error in Getting Your Courses!!')
    }
    hideLoadingScreen()
  }, [])

  let getBatches = async (sc) => {
    showLoadingScreen()
    setCourse(sc)
    try {
      let batchArray = await getBatch(sc)
      setBatches(batchArray)
    } catch (err) {
      alert('Cannot get your Batches!!')
    }
    hideLoadingScreen()
  }

  let getSubjects = async (sb) => {
    showLoadingScreen()
    setBatch(sb)
    try {
      let subjectArray = await getSubject(course, sb)
      setSubjects(subjectArray)
    } catch (err) {
      alert('Cannot get your Subjects!!')
    }
    hideLoadingScreen()
  }

  // handle form submission
  let handleSubmit = async(sd) => {
    showLoadingScreen()
    console.log("Date ", sd)
    await setDate(sd.toString())
    setShowDatePicker(false)
    hideLoadingScreen()
  }

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={{ padding: 10 }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
          {loadingScreen}
        <ModalSelector
          data={courses}
          initValue="Course"
          onChange={(option) => {
            getBatches(option.key)
          }}
          style={{
            width: 120,
          }} />

        <ModalSelector
          data={batches}
          initValue="Batch"
          onChange={(option) => {
            getSubjects(option.key)
          }}
          style={{
            width: 120,
          }} />

        <ModalSelector
          data={subjects}
          initValue="Subject"
          onChange={(option) => { setSubject(option.key) }}
          style={{
            width: 120,
          }} />

      </View>

      <View style={{ padding: 10 }} />
      <View
        style={{
          paddingLeft: 11,
          paddingRight: 11,
        }}>

        <Card>
          <Card.Content>
            <View style={{
              flexDirection: "row"
            }}>

              <TextInput
                placeholder="Chapter's name "
                onChange={(val) => setChapter(val)} />
              {/* <View style={{paddingLeft:10}} /> */}
            </View>
            <View style={{ padding: 2 }} />
            <View style={{ borderWidth: 0.2 }} />
            <View style={{ padding: 10 }} />
            <TextInput
              placeholder="Topic "
              onChange={(val) => setTopic(val)} />
            <View style={{ padding: 2 }} />
            <View style={{ borderWidth: 0.2 }} />
            <View style={{ padding: 10 }} />
            <TextInput
              placeholder="Discription (optional) "
              onChange={(val) => setDiscription(val)} />
            <View style={{ padding: 80 }} />
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
                Set Deadline
              </Button>

              <DateTimePickerModal
                isVisible={showdatePicker}
                mode="date"
                onConfirm={handleSubmit}
                onCancel={()=>setShowDatePicker(!showdatePicker)}
              />

              <View style={{ padding: 10 }} />
              <Button
                mode="contained"
                color="white"
                onPress={() => console.log('Pressed')}>
                Add file
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
      <View style={{ padding: 30 }} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={{
            width: 90,
          }}
          onPress={handleSubmit}>
          {' '}
          Save
        </Button>
      </View>
    </View>
  );
}
