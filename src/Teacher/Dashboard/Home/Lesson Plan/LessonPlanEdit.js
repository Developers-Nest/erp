import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  Button,
  List,
  Card,
  Title,
  Paragraph,
  TextInput,
} from 'react-native-paper';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import ModalSelector from 'react-native-modal-selector';

// helpers
import getBatch from '../../../../services/helpers/getList/getBatch';
import getCourse from '../../../../services/helpers/getList/getCourse';
import getSubject from '../../../../services/helpers/getList/getSubject';
import getTerm from '../../../../services/helpers/getList/getTerm';
import getAssessesment from '../../../../services/helpers/getList/getAssessesment';
import get from '../../../../services/helpers/request/get';
import patch from '../../../../services/helpers/request/patch';
import read from '../../../../services/localstorage/read';
import getExam from '../../../../services/helpers/getList/getExam';

// redux
// import {USERINFO} from '../src/reducers/actionType';
import {USERINFO} from '../../../../reducers/actionType';

// loading screem
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen.js';

export default function LessonPlanAdd({navigation}) {
  const [expanded, setExpanded] = React.useState(true);
  const [text, setText] = React.useState('');
  const handlePress = () => setExpanded(!expanded);
  const [course, setCourse] = useState([]);
  const [batch, setBatch] = useState([]);
  const [subject, setSubject] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [lectureCode, setlectureCode] = useState(null);
  const [description, setDescription] = useState(null);
  const [url, setUrl] = useState(null);
  const [topic, setTopic] = useState(null);

  // loading screen
  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen();

  const dispatch = useDispatch();
  // const getCourse = () =>{
  //   console.log("getcourse")
  //   console.log(response)
  // }
  const BatchData = async idx => {
    // console.log("called")

    setLoadingScreen();
    try {
      let batchdata = await getBatch(idx);
      setBatch(batchdata);
      // console.log(batchdata)
    } catch (err) {
      console.log('Batch data', err);
    }
    hideLoadingScreen();
  };
  const SubjectData = async (idx, batch) => {
    setLoadingScreen();
    try {
      // console.log(idx,batch)
      let subjectdata = await getSubject(idx, batch);
      setSubject(subjectdata);
    } catch (err) {
      console.log('subject data', err);
    }
    hideLoadingScreen();
  };

  const updatePlan = async () => {
    console.log(selectedCourse);
    console.log(selectedBatch[selectedCourse.key]);
    console.log(selectedSubject);
    try {
      // const token = await read('token')
      // const response = await patch(selectedSubject.key, token)
      console.log(response);
    } catch (e) {
      console.log('update Plan', e);
    }
  };
  useEffect(async () => {
    setLoadingScreen();
    // check for token from local storage
    try {
      let coursedata = await getCourse();
      setCourse(coursedata);
    } catch (err) {
      // token not found
      // ask user to login
      console.log('Use Effect Error ', err);
    }
    hideLoadingScreen();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {loadingScreen}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Lesson Plan');
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
      <View style={styles.Drop}>
        <ModalSelector
          data={course}
          initValue="Course"
          onChange={crs => {
            setSelectedCourse(crs);
            BatchData(crs.key);
          }}
        />

        <ModalSelector
          data={batch}
          initValue="Batch"
          onChange={bth => {
            setSelectedBatch(bth);
            SubjectData(selectedCourse.key, bth.key);
          }}
        />

        <ModalSelector
          data={subject}
          initValue="Subject"
          onChange={sbj => {
            setSelectedSubject(sbj);
          }}
        />
      </View>
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
            onChangeText={desc => setDescription(desc)}
            numberOfLines={10}
            placeholder="Description"
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
          {/* <TouchableOpacity
            onPress={() => {
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 70,
                alignSelf: 'flex-end',
              }}>
              <List.Item
                style={{
                  width: 100,
                  borderWidth: 0.3,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderTopLeftRadius: 5,
                }}
                title="Add Link"
              />
            </View>
          </TouchableOpacity> */}
        </Card.Content>
      </Card>
      <View
        style={{justifyContent: 'center', marginTop: 50, flexDirection: 'row'}}>
        <Button mode="outlined" onPress={() => {}}>
          Delete
        </Button>
        <View style={{width: 50}}></View>
        <Button mode="contained" onPress={() => updatePlan()}>
          Save
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  header: {
    height: 69,
    backgroundColor: 'rgba(0, 73, 159, 1)',
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
});
