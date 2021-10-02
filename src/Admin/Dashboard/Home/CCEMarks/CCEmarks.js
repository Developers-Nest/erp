import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Button,
} from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector';

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
          // data={courses}
          initValue="Course"
          // onChange={async (option) => {
          //   await getBatches(option.key)
          // }}
          style={{
            width: 150,
          }} />


        {/* batch selector */}
        <ModalSelector
          // data={batches}
          initValue="Batch"
          // onChange={async (option) => {
          //   await getSubjects(option.key)
          // }}
          style={{
            width: 150,
          }} />
      </List.Section>

      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}>

        {/* select term */}
        <ModalSelector
          // data={terms}
          initValue="Term"
          // onChange={async (option) => {
          //   await getAssessesments(option.key)
          // }}
          style={{
            width: "100%",
          }} />


        {/* select assessment */}
        <ModalSelector
          // data={assessments}
          initValue="Assessments"
          // onChange={async (option) => {
          //   setAssessment(option.key)
          // }}
          style={{
            width: "100%",
          }} />

        {/* subject selector */}
        <ModalSelector
          // data={subjects}
          initValue="Subjects"
          // onChange={async (option) => {
          //   await getExams(option.key)
          // }}
          style={{
            width: "100%",
          }} />

        {/* exam selector */}
        <ModalSelector
          // data={exams}
          initValue="Exams"
          // onChange={async (option) => {
          //   setExam(option.key)
          // }}
          style={{
            width: "100%",
          }} />
      </View>

      <View
        style={{
          paddingTop: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          mode="contained"
          color="#5177E7"
          // onPress={getList}
          style={{
            width: 90,
          }}>
          {' '}
          Get
        </Button>
      </View>
      {/* {
        fetched ? (
          list && list.map((data) => ( */}
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
                {/* <View style={styles.card_bottom}>
                  <Text style={{ color: 'rgba(176, 67, 5, 1)', fontSize: 12 }}>
                    Max:21/30
                  </Text>
                </View> */}
              </View>
            </View>
          {/* ))
        ) : (null)
      } */}

    </View>
  );
}
const styles = StyleSheet.create({
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
