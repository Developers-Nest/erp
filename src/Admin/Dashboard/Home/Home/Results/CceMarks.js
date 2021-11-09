import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Searchbar, Appbar, List, Button} from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector';

import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// helpers
import getBatch from '../../../../../services/helpers/getList/getBatch';
import getCourse from '../../../../../services/helpers/getList/getCourse';
import getSubject from '../../../../../services/helpers/getList/getSubject';
import getTerm from '../../../../../services/helpers/getList/getTerm';
import getAssessesment from '../../../../../services/helpers/getList/getAssessesment';
import get from '../../../../../services/helpers/request/get';
import read from '../../../../../services/localstorage/read';
import getExam from '../../../../../services/helpers/getList/getExam';

//loading screem
import LoadingScreen from '../../../../../components/LoadingScreen/LoadingScreen.js';

// redux
import {useSelector} from 'react-redux';

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
export default function CceMarksAdmin({navigation}) {
  // dropdown values
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [terms, setTerms] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [exams, setExams] = useState([]);

  // selected Values
  const [course, setCourse] = useState(null);
  const [batch, setBatch] = useState(null);
  const [subject, setSubject] = useState(null);
  const [term, setTerm] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [exam, setExam] = useState(null);

  // after fetching list
  const [fetched, setFetched] = useState(false);
  const [list, setList] = useState([]);

  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  //theming
  const institute = useSelector(state => state.institute);

  useEffect(async () => {
    showLoadingScreen();
    try {
      const response = await getCourse();
      setCourses(response);
    } catch (err) {
      alert('Cannot get Courses!');
    }

    try {
      const response = await getTerm();
      setTerms(response);
    } catch (err) {
      alert('Cannot get Terms!');
    }
    hideLoadingScreen();
  }, []);

  /////////// get dropdown values ///////////////
  const getBatches = async selectedCourse => {
    showLoadingScreen();
    try {
      await setCourse(selectedCourse);
      const response = await getBatch(selectedCourse);
      setBatches(response);
    } catch (err) {
      alert('Cannot get Batches');
    }
    hideLoadingScreen();
  };

  const getSubjects = async sb => {
    showLoadingScreen();
    try {
      await setBatch(sb);
      const response = await getSubject(course, sb);
      setSubjects(response);
    } catch (err) {
      alert('Cannot get Subjects');
    }
    hideLoadingScreen();
  };

  const getAssessesments = async st => {
    showLoadingScreen();
    try {
      await setTerm(st);
      const response = await getAssessesment(st);

      setAssessments(response);
    } catch (err) {
      alert('Cannot get Assessments!!');
    }
    hideLoadingScreen();
  };

  const getExams = async ss => {
    showLoadingScreen();
    try {
      await setSubject(ss);
      const response = await getExam(course, batch, ss, term, assessment);
      setExams(response);
      console.log(response);
    } catch (err) {
      alert('Cannot get your exams !!');
    }
    hideLoadingScreen();
  };

  ///////////// get dropdown values ends ///////////////

  const getList = async () => {
    showLoadingScreen();
    try {
      let slug = `/cce/exam/scholasticMark?course=${course}&batch=${batch}&examname=${exam}&term=${term}&subject=${subject}&assessment=${assessment}`;
      console.log(slug);
      let token = await read('token');
      let res = await get(slug, token);
      let response = res.students;
      let marksArray = [];
      response.map(data => {
        marksArray.push({
          // subjectName: data.subjectSub,
          studentAddNum: data.studentAdmissionNumber,
          mark: data.mark,
        });
      });
      setList(marksArray);
      setFetched(true);
    } catch (err) {
      alert('No Lists found!!' + err);
    }
    hideLoadingScreen();
  };

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Icon
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
          CCE Marks
        </Text>
      </View>
      {loadingScreen}
      <View
        style={{
          padding: 10,
        }}
      />
      <ScrollView>
        <List.Section
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          {/* course selector */}
          <ModalSelector
            data={courses}
            initValue="Course"
            onChange={async option => {
              await getBatches(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          {/* batch selector */}
          <ModalSelector
            data={batches}
            initValue="Batch"
            onChange={async option => {
              await getSubjects(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </List.Section>

        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          <View style={{padding: 8}} />
          {/* select term */}
          <ModalSelector
            data={terms}
            initValue="Term"
            onChange={async option => {
              await getAssessesments(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          <View style={{padding: 8}} />
          {/* select assessment */}
          <ModalSelector
            data={assessments}
            initValue="Assessments"
            onChange={async option => {
              setAssessment(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
          <View style={{padding: 8}} />
          {/* subject selector */}
          <ModalSelector
            data={subjects}
            initValue="Subjects"
            onChange={async option => {
              await getExams(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
          <View style={{padding: 8}} />
          {/* exam selector */}
          <ModalSelector
            data={exams}
            initValue="Exams"
            onChange={async option => {
              setExam(option.key1);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>

        <View
          style={{
            paddingTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button
            mode="contained"
            color={institute ? institute.themeColor : '#5177E7'}
            onPress={getList}
            style={{
              width: 90,
            }}>
            {' '}
            Get
          </Button>
        </View>
        <View style={{height: 20}} />
        {fetched
          ? list &&
            list.map(data => (
              <View key={data._id} style={{marginHorizontal: 10}}>
                <View style={{marginTop: 10, ...styles.shadow}}>
                  <View style={styles.card_top}>
                    <View>
                      <Text style={styles.card_title}>
                        {data.studentAddNum}
                      </Text>
                      <Text style={{color: 'blue', fontSize: 12}}>Remarks</Text>
                    </View>
                    <View style={styles.card_marks}>
                      <Text style={{color: 'white'}}>{data.mark}</Text>
                    </View>
                  </View>
                  {/* <View style={styles.card_middle}>
                    <Text>
                      {/* {data.subjectName} */}
                  {/* data
                    </Text>
                  </View> */}
                  <View style={styles.card_bottom}>
                    <Text style={{color: 'rgba(176, 67, 5, 1)', fontSize: 12}}>
                      Max:50
                    </Text>
                  </View>
                </View>
              </View>
            ))
          : null}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    height: 69,
    flexDirection: 'row',
  },
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
    shadowOffset: {width: 0, height: 1},
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
});
