import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector'

// helpers
import get from '../../../../services/helpers/request/get'
import read from '../../../../services/localstorage/read'
import getBatch from '../../../../services/helpers/getList/getBatch'
import getCourse from '../../../../services/helpers/getList/getCourse'
import getSubject from '../../../../services/helpers/getList/getSubject'


export default function AddAssignments() {

  const [Chapter, setChapter]=useState("Chapter's name");
  const [Topic, setTopic]=useState('Topic:');
  const [Discription, setDiscription]=useState('Discription:')

  // data array
  const [batches, setBatches] = useState([])
  const [courses, setCourses] = useState([])
  const [subjects, setSubjects] = useState([])

  // selected values
  const [batch, setBatch] = useState(null)
  const [course, setCourse] = useState(null)
  const [subject, setSubject] = useState(null)

  // input values
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)

  useEffect(async () => {

    try {
      let courseArray = await getCourse()
      setCourses(courseArray)
    } catch (err) {
      alert('Error in Getting Your Courses!!')
    }

  }, [])

  let getBatches = async ()=>{

    try{
      let batchArray = await getBatch(course)
      setBatches(batchArray)
    } catch(err){
      alert('Cannot get your Batches!!')
    }
    
  }

  let getSubjects = async ()=>{

    try{
      let subjectArray = await getSubject(course, batch)
      setSubjects(subjectArray)
    } catch(err){
      alert('Cannot get your Subjects!!')
    }
  
  }

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={{ padding: 10 }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>

        <ModalSelector
          data={courses}
          initValue="Course"
          onChange={(option) => { 
            setCourse(option.key) 
            getBatches()
          }} 
          style={{
            width: 120,
          }}/>

        <ModalSelector
          data={batches}
          initValue="Batch"
          onChange={(option) => { 
            setBatch(option.key) 
            getSubjects()
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
          }}/>

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
                flexDirection:"row"
            }}>

            <TextInput 
            placeholder="Chapter's name "
            onChange={(val)=>setChapter(val)}/>
            {/* <View style={{paddingLeft:10}} /> */}
            </View>
            <View style={{ padding: 2 }} />
            <View style={{ borderWidth: 0.2 }} />
            <View style={{ padding: 10 }} />
            <TextInput 
            placeholder="Topic "
            onChange={(val)=>setTopic(val)} />
            <View style={{ padding: 2 }} />
            <View style={{ borderWidth: 0.2 }} />
            <View style={{ padding: 10 }} />
            <TextInput 
            placeholder="Discription (optional) "
            onChange={(val)=>setDiscription(val)}/>
            <View style={{ padding: 40 }} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Button
                icon="calendar"
                mode="contained"
                color="white"
                onPress={() => console.log('Pressed')}>
                13:00{' '}
              </Button>
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
      <View style={{ padding: 20 }} />
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
          }}>
          {' '}
          Save
        </Button>
      </View>
    </View>
  );
}
