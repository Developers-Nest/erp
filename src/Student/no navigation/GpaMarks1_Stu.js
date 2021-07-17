import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';

import DropDownPicker from 'react-native-dropdown-picker';
import ModalSelector from 'react-native-modal-selector';

export default function GpaMarksStudent2()
{
    const [Subject, setSubject] = useState([])
    const [AssesmentName, setAssesmentName] = useState([])
    const [Term, setTerm] = useState([])
    const [ExamName, setExamName] = useState([])
  return (
    <View style={{backgroundColor: '#F9F9F9', height: '100%'}}>
      <View style={{ backgroundcolor:'white'}}>

      <Appbar.Header backgroundColor="white">
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content title="GPA Marks" />
      <Appbar.Action icon="information" />
    </Appbar.Header>
      </View>
      <View style={{padding: 10}} />

        {/* select Subject */}
        <ModalSelector
          data={Subject}
          initValue="Subject"
          onChange={async (option) => {
            setAssessment(option.key)
          }}
          style={styles.card,{
            width: "100%",
          }} />
      
      <View style={{padding:8}}/>
        {/* select assessment Name */}
        <ModalSelector
          data={AssesmentName}
          initValue="Assessment Name"
          onChange={async (option) => {
            setAssessment(option.key)
          }}
          style={styles.card,{
            width: "100%",
          }} />
        <View style={{padding:8}}/>
        {/* subject selector */}
        <ModalSelector
          data={Term}
          initValue="Term"
          onChange={async (option) => {
            await getExams(option.key)
          }}
          style={styles.card, styles.shadow,{
            width: "100%",
          }} />
        <View style={{padding:8}}/>
        {/* exam selector */}
        <ModalSelector
          data={ExamName}
          initValue="Exam Name"
          onChange={async (option) => {
            setExam(option.key)
          }}
          style={styles.card,{
            width: "100%",
          }} />
      <View style={{justifyContent:"center",alignItems:"center",padding:30}}>
            <Button
            mode="contained"
            color="#5177E7"
            onPress={() => console.log('Pressed')}
            style={{
                width: 90,
            }}>
            {' '}
            Get
            </Button>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
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