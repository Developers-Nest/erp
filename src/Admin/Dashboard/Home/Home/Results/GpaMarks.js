import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';

import { useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import ModalSelector from 'react-native-modal-selector';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

export default function GpaMarks({ navigation }) {
  const [Subject, setSubject] = useState([])
  const [AssesmentName, setAssesmentName] = useState([])
  const [Term, setTerm] = useState([])
  const [ExamName, setExamName] = useState([]);
  const institute = useSelector(state => state.institute);
  return (
    <View style={{ backgroundColor: '#F9F9F9', height: '100%' }}>
      <View style={{ backgroundcolor: 'white' }}>

        {/* <Appbar.Header backgroundColor="white">
      <Appbar.BackAction onPress={() => {navigation.navigate('Home')}} />
      <Appbar.Content title="GPA Marks" />
      <Appbar.Action icon="information" onPress={() => {navigation.navigate('CceMarks')}} />
    </Appbar.Header> */}
        <View
          style={{
            backgroundColor: institute ? institute.themeColor : 'black',
            ...styles.header,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <AntDesign
                size={24}
                color="white"
                name="left"
                style={{
                  alignSelf: 'center',
                  fontSize: 25,
                  color: 'white',
                  // paddingLeft: 10,
                  // paddingTop: 23,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontStyle: 'normal',
                fontSize: 28,
                fontWeight: '600',
                alignSelf: 'center',
                paddingLeft: 10,
                color: 'white',
                fontFamily: 'NunitoSans-Regular',
              }}>
              GPA Marks
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('CceMarks')}
            style={{
              justifyContent: 'flex-end',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: 5,
              }}>
              <Icon
                name="add-circle"
                color="#900"
                style={{
                  fontSize: 35,
                  color: 'white',
                  paddingRight: 20,
                }}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  paddingRight: 20,
                }}>
                Add
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={{ padding: 15 }}>

          {/* select Subject */}
          <ModalSelector
            data={Subject}
            initValue="Subject"
            //   onChange={async (option) => {
            //     setAssessment(option.key)
            //   }}
            style={styles.card_picker1}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall} />

          <View style={{ padding: 8 }} />
          {/* select assessment Name */}
          <ModalSelector
            data={AssesmentName}
            initValue="Assessment Name"
            //   onChange={async (option) => {
            //     setAssessment(option.key)
            //   }}
            style={styles.card_picker1}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall} />
          <View style={{ padding: 8 }} />
          {/* subject selector */}
          <ModalSelector
            data={Term}
            initValue="Term"
            //   onChange={async (option) => {
            //     await getExams(option.key)
            //   }}
            style={styles.card_picker1}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall} />
          <View style={{ padding: 8 }} />
          {/* exam selector */}
          <ModalSelector
            data={ExamName}
            initValue="Exam Name"
            //   onChange={async (option) => {
            //     setExam(option.key)
            //   }}
            style={styles.card_picker1}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall} />
          <View style={{ justifyContent: "center", alignItems: "center", padding: 30 }}>
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
          <View style={{ marginTop: 10, ...styles.shadow }}>
            <View style={styles.card_top}>
              <View>
                <Text style={styles.card_title}>
                  {/* {data.studentAddNum} */}
                </Text>
                <Text style={{ color: 'blue', fontSize: 12 }}>Remarks</Text>
              </View>
              <View style={styles.card_marks}>
                <Text style={{ color: 'white' }}>
                  {/* {data.mark}*/}/50
                </Text>
              </View>
            </View>
            <View style={styles.card_middle}>
              <Text>
                {/* {data.subjectName} */}
              </Text>
            </View>
            <View style={styles.card_bottom}>
              <Text style={{ color: 'rgba(176, 67, 5, 1)', fontSize: 12 }}>
                Max:21/30
              </Text>
            </View>
          </View>
          <View style={{ padding: 30 }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
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
  card_picker1: {
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
  header: {
    height: 69,
    flexDirection: 'row',
  },
});