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

  // selected Values
  const [course, setCourse] = useState(null)
  const [batch, setBatch] = useState(null)
  const [subject, setSubject] = useState(null)
  const [term, setTerm] = useState(null)
  const [assessment, setAssessment] = useState(null)

  // after fetching list
  const [fetched, setFetched] = useState(false)
  const [list, setList] = useState([])

  useEffect(async () => {
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

  }, [])


  ///////////// get dropdown values ///////////////
  const getBatches = async (selectedCourse) => {
    try {
      await setCourse(selectedCourse)
      const response = await getBatch(selectedCourse)
      setBatches(response)
    } catch (err) {
      alert('Cannot get Batches')
    }
  }

  const getSubjects = async (sc) => {
    console.log("Selected Subject ", sc)

    try {
      await setBatch(sc)
      const response = await getSubject(course, batch)
      console.log("Subjects response ", response)
      setSubjects(response)
    } catch (err) {
      alert('Cannot get Subjects')
    }
  }

  const getAssessesments = async (st) => {
    try {
      await setTerm(st)
      console.log("Selected term ", st)
      const response = await getAssessesment(st)

      setAssessments(response)
    } catch (err) {
      alert('Cannot get Assessments!!')
    }
  }

  ///////////// get dropdown values ends ///////////////

  const getList = async () => {

    try{
      const slug = `/cce/exam/scholasticMark?
        course=${course}&batch=${batch}&examname=60e69d016c02fa225d45f1a2
        &term=${term}&subject=${subject}
        &assessment=${assessment}`
      const token = await read('token')
      const response = await get(slug, token)
      console.log("List ", response)
      setFetched(true)

    } catch(err){
      alert('Cannot fetch list!!')
    }
  }


  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <Appbar>
        <Appbar.BackAction onPress={() => { }} />
        <Appbar.Content title="CCE Marks" />
        <Appbar.Action icon="information" onPress={() => { }} />
      </Appbar>
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
          style={{
            width: 150,
          }} />


        {/* batch selector */}
        <ModalSelector
          data={batches}
          initValue="Batch"
          onChange={async (option) => {
            await getSubjects(option.key)
          }}
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
          data={terms}
          initValue="Term"
          onChange={async (option) => {
            await getAssessesments(option.key)
          }}
          style={{
            width: "100%",
          }} />


        {/* select assessment */}
        <ModalSelector
          data={assessments}
          initValue="Assessments"
          onChange={async (option) => {
            setAssessment(option.key)
          }}
          style={{
            width: "100%",
          }} />

        {/* subject selector */}
        <ModalSelector
          data={subjects}
          initValue="Subjects"
          onChange={async (option) => {
            setSubject(option.key)
          }}
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
                  <Text style={styles.card_title}>Title</Text>
                  <Text style={{ color: 'blue', fontSize: 12 }}>Remarks</Text>
                </View>
                <View style={styles.card_marks}>
                  <Text style={{ color: 'white' }}>18/30</Text>
                </View>
              </View>
              <View style={styles.card_middle}>
                <Text>
                  There are some issues on the writing methods of the answers.Try to
                  improve them.
                </Text>
              </View>
              <View style={styles.card_bottom}>
                <Text style={{ color: 'rgba(176, 67, 5, 1)', fontSize: 12 }}>
                  Max:21/30
                </Text>
              </View>
            </View>
          </View>
        ) : (null)
      }

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
