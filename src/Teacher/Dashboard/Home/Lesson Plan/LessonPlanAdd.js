import React, {useState} from 'react';
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

import ModalSelector from 'react-native-modal-selector';
import loadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

// redux
import {useSelector} from 'react-redux';

export default function LessonPlanAdd({navigation}) {
  const [expanded, setExpanded] = React.useState(true);
  const [text, setText] = React.useState('');
  const handlePress = () => setExpanded(!expanded);

  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // selected values
  const [batch, setBatch] = useState(null);
  const [course, setCourse] = useState(null);
  const [subject, setSubject] = useState(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateString, setDateString] = useState(
    new Date(1598051730000).toString(),
  );

  //theming
  const institute = useSelector(state => state.institute);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
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
          Add Lesson Plan
        </Text>
      </View>
      <View style={{padding:15}} />
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
            alignContent: 'flex-start',
            width: '100%',
          }}>
          {/* course selector */}
          <ModalSelector
            data={courses}
            initValue="Class"
            onChange={option => {
              fetchBatches(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          {/* batch selector */}
          <ModalSelector
            data={batches}
            initValue="Batch"
            onChange={option => {
              fetchSubjects(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          {/* subject selector */}
          <ModalSelector
            data={subjects}
            initValue="Subject"
            onChange={option => {
              getList(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>
        <View style={{padding:15}}/>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={{fontSize: 16, fontFamily: 'Poppins-Regular'}}>
            Chapter: Newton's Law of motion
          </Title>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.5,
            }}
          />
          <Title style={{fontSize: 16, fontFamily: 'Poppins-Regular'}}>
            Topic: First law of motion
          </Title>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.5,
            }}
          />
          <TextInput
            style={{
              height: 80,
              textAlignVertical: 'top',
              backgroundColor: 'white',
            }}
            multiline={true}
            numberOfLines={10}
            placeholder="Description (optional)"
            right={<TextInput.Affix text="/100" />}
          />
          <TouchableOpacity
            onPress={() => {
              /* do this */
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
          </TouchableOpacity>
        </Card.Content>
      </Card>
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Button mode="contained" onPress={() => {}}>
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
    height: 310,
  },
  Week: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
