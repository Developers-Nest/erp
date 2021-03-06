import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Button,
} from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector'

// helpers
import getBatch from '../../../../services/helpers/getList/getBatch'
import getCourse from '../../../../services/helpers/getList/getCourse'
import getSubject from '../../../../services/helpers/getList/getSubject'
import getTerm from '../../../../services/helpers/getList/getTerm'
import getAssessesment from '../../../../services/helpers/getList/getAssessesment'
import get from '../../../../services/helpers/request/get'
import read from '../../../../services/localstorage/read'
import getExam from '../../../../services/helpers/getList/getExam'

// loading screem
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen.js'

const MySearchbar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};
export default function CceMarks() {

  // dropdown values
  const [batches, setBatches] = useState([])
  const [courses, setCourses] = useState([])
  const [subjects, setSubjects] = useState([])
  const [terms, setTerms] = useState([])
  const [assessments, setAssessments] = useState([])
  const [exams, setExams] = useState([])

  // selected Values
  const [course, setCourse] = useState(null)
  const [batch, setBatch] = useState(null)
  const [subject, setSubject] = useState(null)
  const [term, setTerm] = useState(null)
  const [assessment, setAssessment] = useState(null)
  const [exam, setExam] = useState(null)

  // after fetching list
  const [fetched, setFetched] = useState(false)
  const [list, setList] = useState([])

  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen()

  useEffect(async () => {
    showLoadingScreen()
    try {
      const response = await getCourse()
      console.log("Courses CCE ", response)
      setCourses(response)
    } catch (err) {
      alert('Cannot get Courses!')
    }

    try {
      const response = await getTerm()
      console.log("Terms ", response)
      setTerms(response)
    } catch (err) {
      alert('Cannot get Terms!')
    }
    hideLoadingScreen()
  }, [])


  ///////////// get dropdown values ///////////////
  const getBatches = async (selectedCourse) => {
    showLoadingScreen()
    try {
      await setCourse(selectedCourse)
      const response = await getBatch(selectedCourse)
      setBatches(response)
    } catch (err) {
      alert('Cannot get Batches')
    }
    hideLoadingScreen()
  }

  const getSubjects = async (sc) => {
    showLoadingScreen()
    try {
      await setBatch(sc)
      const response = await getSubject(course, batch)
      console.log("Subjects response ", response)
      setSubjects(response)
    } catch (err) {
      alert('Cannot get Subjects')
    }
    hideLoadingScreen()
  }

  const getAssessesments = async (st) => {
    showLoadingScreen()
    try {
      await setTerm(st)
      console.log("Selected term ", st)
      const response = await getAssessesment(st)

      setAssessments(response)
    } catch (err) {
      alert('Cannot get Assessments!!')
    }
    hideLoadingScreen()
  }

  const getExams = async (ss) => {
    showLoadingScreen()
    try {
      await setSubject(ss)
      console.log("Selected exam ", ss)
      const response = await getExam(course, batch, subject, term, assessment)
      console.log('Exams ', response)
      setExams(response)
    } catch (err) {
      alert('Cannot get your exams !!')
    }
    hideLoadingScreen()
  }

  ///////////// get dropdown values ends ///////////////

  const getList = async () => {
    showLoadingScreen()
    try {

      let slug = `/cce/exam/scholasticMark?course=${course}&batch=${batch}&examname=${exam}&term=${term}&subject=${subject}&assessment=${assessment}`
      let token = await read('token')
      let res = await get(slug, token)
      console.log("Marks list ", res)
      res = res.students
      let marksArray = []
      res.map((data) => {
        marksArray.push({
          subjectName: data.subjectSub,
          studentAddNum: data.studentAdmissionNumber,
          mark: data.mark
        })
      })
      setList(res)
      setFetched(true)

    } catch (err) {
      alert('No Lists found!!')
    }
    hideLoadingScreen()
  }


  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <Appbar>
        <Appbar.BackAction onPress={() => { }} />
        <Appbar.Content title="CCE Marks" />
        <Appbar.Action icon="information" onPress={() => { }} />
      </Appbar>
      {loadingScreen}
      <View
        style={{
          padding: 10,
        }}
      />
      <List.Section
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>

        {/* course selector */}
        <ModalSelector
          data={courses}
          initValue="Course"
          onChange={async (option) => {
            await getBatches(option.key)
          }}
          style={styles.card,{
            width: 150,
          }} />


        {/* batch selector */}
        <ModalSelector
          data={batches}
          initValue="Batch"
          onChange={async (option) => {
            await getSubjects(option.key)
          }}
          style={styles.card,{
            width: 150,
          }} />
      </List.Section>

      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <View style={{padding:8}}/>
        {/* select term */}
        <ModalSelector
          data={terms}
          initValue="Term"
          onChange={async (option) => {
            await getAssessesments(option.key)
          }}
          style={styles.card,{
            width: "100%",
          }} />

        <View style={{padding:8}}/>
        {/* select assessment */}
        <ModalSelector
          data={assessments}
          initValue="Assessments"
          onChange={async (option) => {
            setAssessment(option.key)
          }}
          style={styles.card,{
            width: "100%",
          }} />
        <View style={{padding:8}}/>
        {/* subject selector */}
        <ModalSelector
          data={subjects}
          initValue="Subjects"
          onChange={async (option) => {
            await getExams(option.key)
          }}
          style={styles.card, styles.shadow,{
            width: "100%",
          }} />
        <View style={{padding:8}}/>
        {/* exam selector */}
        <ModalSelector
          data={exams}
          initValue="Exams"
          onChange={async (option) => {
            setExam(option.key)
          }}
          style={styles.card,{
            width: "100%",
          }} />
      </View>

      <View
        style={{
          paddingTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          mode="contained"
          color="#5177E7"
          onPress={getList}
          style={{
            width: 90,
          }}>
          {' '}
          Get
        </Button>
      </View>
      {
        fetched ? (
          list && list.map((data) => (
            <View>
              <View
                style={{
                  padding: 5,
                }}>
                <MySearchbar />
              </View>
              <View
                style={{
                  padding: 5,
                }}></View>
              <View style={{ marginTop: 10, ...styles.shadow }}>
                <View style={styles.card_top}>
                  <View>
                    <Text style={styles.card_title}>{data.studentAddNum}</Text>
                    <Text style={{ color: 'blue', fontSize: 12 }}>Remarks</Text>
                  </View>
                  <View style={styles.card_marks}>
                    <Text style={{ color: 'white' }}>{data.mark}/50</Text>
                  </View>
                </View>
                <View style={styles.card_middle}>
                  <Text>
                    {data.subjectName}
                  </Text>
                </View>
               </View>
            </View>
          ))
        ) : (null)
      }

    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
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
  shadow: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    minWidth: 110,
  },
  card_top: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card_middle: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  card_bottom: {
    borderTopColor: 'rgba(88, 99, 109, 0.45)',
    borderTopWidth: 1,
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 20,
  },
  card_marks: {
    backgroundColor: '#58636D',
    borderRadius: 2,
    width: 61,
    textAlign: 'center',
    justifyContent: 'center',
    paddingLeft: 11,
  },
});
