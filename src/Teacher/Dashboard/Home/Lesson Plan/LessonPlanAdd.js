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
import getBatch from '../../../../services/helpers/getList/getBatch'
import getCourse from '../../../../services/helpers/getList/getCourse'
import getSubject from '../../../../services/helpers/getList/getSubject'
import post from '../../../../services/helpers/request/post'
import read from '../../../../services/localstorage/read'

// loading screem
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen.js'

// redux
import { useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'

export default function LessonPlanAdd({ navigation }) {
  const [course, setCourse] = useState([])
  const [batch, setBatch] = useState([])
  const [subject, setSubject] = useState([])

  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [lectureCode, setlectureCode] = useState(null)
  const [description, setDescription] = useState(null)
  const [url, setUrl] = useState(null)
  const [topic, setTopic] = useState(null)

  // loading screen
  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen()

  const BatchData = async idx => {
    setLoadingScreen()
    try {
      setSelectedCourse(idx)
      let batchdata = await getBatch(idx)
      setBatch(batchdata)
    } catch (err) {
      console.log('Batch data', err)
    }
    hideLoadingScreen()
  }
  const SubjectData = async (batch) => {
    setLoadingScreen()
    try {
      setSelectedBatch(batch)
      let subjectdata = await getSubject(selectedCourse, batch)
      setSubject(subjectdata)
    } catch (err) {
      console.log('subject data', err)
    }
    hideLoadingScreen()
  }

  const addPlan = async () => {
    if (!selectedCourse || !selectedBatch || !selectedSubject || !lectureCode || !description || !url || !topic) {
      alert('All fields are Mandatory!!')
      return
    }

    try {
      const token = await read('token')
      let slug = '/lessonplanning'
      let data = {
        list: [{
          batch: [selectedBatch],
          code: lectureCode,
          description: description,
          subject: selectedSubject,
          topic: topic,
          url: url,
          course: selectedCourse
        }]
      }
      const response = await post(slug, data, token)
      if (response.message === "Added") {
        alert('Lesson Plan Added!!')
      } else throw new Error('Cannot Add')
    } catch (err) {
      alert('Error: ' + err)
    }
  }
  useEffect(async () => {
    setLoadingScreen()

    try {
      let coursedata = await getCourse()
      setCourse(coursedata)
    } catch (err) {
      console.log('Use Effect Error ', err)
    }
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
            Add Lesson Plan
          </Text>
        </View>
        <View style={{ padding: 15 }} />
        <View style={styles.Drop}>
          <ModalSelector
            data={course}
            initValue="Course"
            onChange={crs => {
              BatchData(crs.key)
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          <ModalSelector
            data={batch}
            initValue="Batch"
            onChange={bth => {
              SubjectData(bth.key)
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          <ModalSelector
            data={subject}
            initValue="Subject"
            onChange={sbj => {
              setSelectedSubject(sbj.key)
            }}
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
              multiline={true}
              onChangeText={txt => setlectureCode(txt)}
              numberOfLines={10}
              placeholder="Lecture Code"
              right={<TextInput.Affix text="/100" />}
            />
            <TextInput
              style={{
                height: 80,
                textAlignVertical: 'top',
                backgroundColor: 'white',
              }}
              multiline={true}
              onChangeText={txt => setTopic(txt)}
              numberOfLines={10}
              placeholder="Topic"
              right={<TextInput.Affix text="/100" />}
            />
            <TextInput
              style={{
                height: 80,
                textAlignVertical: 'top',
                backgroundColor: 'white',
              }}
              onChangeText={txt => setUrl(txt)}
              multiline={true}
              numberOfLines={10}
              placeholder="URL"
              right={<TextInput.Affix text="/100" />}
            />
            <TextInput
              style={{
                height: 80,
                textAlignVertical: 'top',
                backgroundColor: 'white',
              }}
              multiline={true}
              onChangeText={desc => setDescription(desc)}
              numberOfLines={10}
              placeholder="Description"
              right={<TextInput.Affix text="/100" />}
            />
          </Card.Content>
        </Card>

        <View
          style={{ justifyContent: 'center', marginTop: 20, flexDirection: 'row' }}>
          <View style={{ width: 50 }}></View>
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
