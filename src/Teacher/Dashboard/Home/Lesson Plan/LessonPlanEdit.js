import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import {
  Button,
  Card,
  TextInput,
} from 'react-native-paper'

//icons
import AntDesign from 'react-native-vector-icons/AntDesign'
import ModalSelector from 'react-native-modal-selector'

// helpers
import patch from '../../../../services/helpers/request/patch'
import read from '../../../../services/localstorage/read'
import deleteReq from '../../../../services/helpers/request/delete'

// loading screem
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen.js'

// redux
import { useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'

export default function LessonPlanAdd({ route,  navigation }) {

  const [course, setCourse] = useState('Select Me!')
  const [batch, setBatch] = useState('Select Me!')
  const [subject, setSubject] = useState('Select Me!')

  const [planObject, setPlanObject] = useState({})
  const [planId, setPlanId] = useState(null)
  const [lectureCode, setlectureCode] = useState(null)
  const [description, setDescription] = useState(null)
  const [url, setUrl] = useState(null)
  const [topic, setTopic] = useState(null)

  // loading screen
  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen()

  const addPlan = async () => {
    if (!course || !batch || !subject) {
      alert('All fields are Mandatory!!')
      return
    }

    try{
      let token = await read('token')
      let slug = `/lessonplanning/${planId}`
      let data = planObject
      data.topic = topic
      data.url = url
      data.description = description
      data.code = lectureCode
      let response = await patch(slug, data, token)
      alert('Updated Lesson Plan')
      navigation.navigate('Lesson Plan')
    } catch(err){
      alert('Cannot Delete!! '+ err)
    }
  }

  const deletePlan = async()=>{
    setLoadingScreen()
    try{
      let token = await read('token')
      let slug = `/lessonplanning/${planId}`
      let response = await deleteReq(slug, token)
      alert('Lesson Plan Deleted!!')
      navigation.navigate('Lesson Plan')
    } catch(err){
      alert('Cannot Delete!! '+ err)
    }
    hideLoadingScreen()
    navigation.navigate('Lesson Plan')
  }

  useEffect(async () => {
    setLoadingScreen()
    const {lessonPlan} = route.params
    console.log('Lesson Plan ', lessonPlan)
    setPlanObject(lessonPlan)
    setPlanId(lessonPlan._id)
    setBatch(lessonPlan.batch.batchName)
    setCourse(lessonPlan.course.courseName)
    setSubject(lessonPlan.subject.name)
    setUrl(lessonPlan.url)
    setlectureCode(lessonPlan.code)
    setTopic(lessonPlan.topic)
    setDescription(lessonPlan.description)

    hideLoadingScreen()
  }, [])

  //theming
  const institute = useSelector(state => state.institute)

  return (
    <View style={styles.container}>
        <View
          style={{
            backgroundColor: institute ? institute.themeColor : 'black',
            ...styles.header,
          }}>
          {loadingScreen}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Lesson Plan')
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
            Edit Lesson Plan
          </Text>
        </View>
        <View style={{ padding: 15 }} />
        <View style={styles.Drop}>
          <ModalSelector
            initValue={course}
            data={[
              {label: 'Class1', key: 'Class1'},
            ]}
            disabled={true}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          <ModalSelector
            initValue={batch}
            disabled={true}
            data={[
              {label: 'Class1', key: 'Class1'},
            ]}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          <ModalSelector
            initValue={subject}
            disabled={true}
            data={[
              {label: 'Class1', key: 'Class1'},
            ]}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>
        <ScrollView>
        <View style={{ padding: 15 }} />
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              style={{
                height: 80,
                textAlignVertical: 'top',
                backgroundColor: 'white',
              }}
              value={lectureCode}
              multiline={true}
              onChangeText={txt => setlectureCode(txt)}
              numberOfLines={10}
              placeholder="Lecture Code"
            />
            <TextInput
              style={{
                height: 80,
                textAlignVertical: 'top',
                backgroundColor: 'white',
              }}
              value={topic}
              multiline={true}
              onChangeText={txt => setTopic(txt)}
              numberOfLines={10}
              placeholder="Topic"
            />
            <TextInput
              style={{
                height: 80,
                textAlignVertical: 'top',
                backgroundColor: 'white',
              }}
              value={url}
              onChangeText={txt => setUrl(txt)}
              multiline={true}
              numberOfLines={10}
              placeholder="URL"
            />
            <TextInput
              style={{
                height: 80,
                textAlignVertical: 'top',
                backgroundColor: 'white',
              }}
              value={description}
              multiline={true}
              onChangeText={desc => setDescription(desc)}
              numberOfLines={10}
              placeholder="Description"
            />
          </Card.Content>
        </Card>

        <View
          style={{ justifyContent: 'space-evenly', marginTop: 20, flexDirection: 'row' }}>
          <Button mode="contained" onPress={deletePlan} style={{ backgroundColor: institute.themeColor }}>
            Delete
          </Button>
          <Button mode="contained" onPress={addPlan} style={{ backgroundColor: institute.themeColor }}>
            Save
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
  Drop: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    // height: 310,
  },
  Week: {
    marginTop: 5,
    flexDirection: 'row',
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
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',

    minWidth: 110,
    elevation: 3,
  },
})
