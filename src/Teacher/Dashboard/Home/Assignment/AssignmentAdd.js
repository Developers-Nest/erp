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


export default function AddAssignments() {

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
      let token = await read('token')
      let response = await get('/course', token)
      let courseArray = []
      response.map((data)=>{
        courseArray.push({
          label: data.courseName,
          key: data._id
        })
      })
      setCourses(courseArray)
    } catch (err) {
      alert('Error in Getting Your Courses!!')
    }

  }, [])

  let getBatches = async ()=>{

    try{
      let slug = `/batch?course=${course}`
      let token = await read('token')
      let response = await get(slug, token)
      console.log("Batch ", response)
      let batchArray = []
        response.map((data)=>{
          batchArray.push({
            label: data.batchName,
            key: data._id
          })
        })

      setBatches(batchArray)
    } catch(err){
      alert('Cannot get your Batches!!')
    }
    
  
  }

  let getSubjects = async ()=>{

    try{
      let slug = `/subject/assign?course=${course}&batch=${batch}`
      let token = await read('token')
      let response = await get(slug, token)
      let subjectArray = []
      response.map((data)=>{
          subjectArray.push({
            label: data.subject,
            key: data.subjectId
          })
      })
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
            <Title>
            <TextInput
              label="Title"
              value={title}
              onChange={text => setTitle(text)}
            />
            </Title>
            <View style={{ padding: 2 }} />
            <View style={{ borderWidth: 0.5 }} />
            <View style={{ padding: 10 }} />
            <View style={{ padding: 2 }} />
            <View style={{ borderWidth: 0.5 }} />
            <View style={{ padding: 10 }} />
            <Paragraph>
            <TextInput
              label="Description"
              value={desc}
              onChange={desc => setDesc(desc)}
            />
            </Paragraph>
            <View style={{ padding: 80 }} />
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
          }}>
          {' '}
          Save
        </Button>
      </View>
    </View>
  );
}
