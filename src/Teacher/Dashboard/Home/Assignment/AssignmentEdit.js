import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ScrollViewBase,
} from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';
import getBatch from '../../../../services/helpers/getList/getBatch';
import getCourse from '../../../../services/helpers/getList/getCourse';
import getSubject from '../../../../services/helpers/getList/getSubject';
import {red100, white} from 'react-native-paper/lib/typescript/styles/colors';

// redux
import {useSelector} from 'react-redux';

export default function EditAssignments({navigation}) {
  const [Chapter, setChapter] = useState("Chapter's name");
  const [Topic, setTopic] = useState('Topic:');
  const [Discription, setDiscription] = useState('Discription:');

  //theming
  const institute = useSelector(state => state.institute);

  // data array
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // selected values
  const [batch, setBatch] = useState(null);
  const [course, setCourse] = useState(null);
  const [subject, setSubject] = useState(null);

  // input values
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);

  useEffect(async () => {
    try {
      let courseArray = await getCourse();
      setCourses(courseArray);
    } catch (err) {
      alert('Error in Getting Your Courses!!');
    }
  }, []);

  let getBatches = async () => {
    try {
      let batchArray = await getBatch(course);
      setBatches(batchArray);
    } catch (err) {
      alert('Cannot get your Batches!!');
    }
  };

  let getSubjects = async () => {
    try {
      let subjectArray = await getSubject(course, batch);
      setSubjects(subjectArray);
    } catch (err) {
      alert('Cannot get your Subjects!!');
    }
  };

  return (
    <View style={{backgroundColor: 'rgba(249, 249, 249, 1)', height: '100%'}}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Assignment Due')}>
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
            fontFamily: 'NunitoSans-Regular',
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
            color: 'white',
          }}>
          Edit Assignment
        </Text>
      </View>
      <View style={{padding: 10}} />
      <ScrollView>
              <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <ModalSelector
          data={courses}
          initValue="Course"
          onChange={option => {
            setCourse(option.key);
            getBatches();
          }}
          style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
        />

        <ModalSelector
          data={batches}
          initValue="Batch"
          onChange={option => {
            setBatch(option.key);
            getSubjects();
          }}
          style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
        />

        <ModalSelector
          data={subjects}
          initValue="Subject"
          onChange={option => {
            setSubject(option.key);
          }}
          style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
        />
      </View>

      <View style={{padding: 10}} />
      <View
        style={{
          paddingLeft: 11,
          paddingRight: 11,
        }}>
        <Card style={styles.card1}>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TextInput
                placeholder="Chapter's name "
                onChange={val => setChapter(val)}
              />
              {/* <View style={{paddingLeft:10}} /> */}
            </View>
            <View style={{padding: 2}} />
            <View style={{borderWidth: 0.2}} />
            <View style={{padding: 10}} />
            <TextInput placeholder="Topic " onChange={val => setTopic(val)} />
            <View style={{padding: 2}} />
            <View style={{borderWidth: 0.2}} />
            <View style={{padding: 10}} />
            <TextInput
              placeholder="Discription (optional) "
              onChange={val => setDiscription(val)}
            />
            <View style={{padding: 40}} />
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
              <View style={{padding: 10}} />
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
      <View style={{padding: 20}} />
      <View
        style={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
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

        <Button
          mode="contained"
          color="#ff0000"
          onPress={() => console.log('Pressed')}
          style={{
            width: 90,
          }}>
          {' '}
          Delete
        </Button>
      </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 69,
    flexDirection: 'row',
  },
  card1: {
  
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
   
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
