
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Text,
  TextInput,
  Appbar,
  Card,
  Button,
  Title,
  Paragraph,
} from 'react-native-paper';

//selector
import ModalSelector from 'react-native-modal-selector';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// redux
import {useSelector} from 'react-redux';

export default function FeedbackMain({navigation}) {
  const [type, setType] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  //theming
  const institute = useSelector(state => state.institute);

  return (
    <View style={{backgroundColor: '#E5E5E5'}}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
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
          Feedback
        </Text>
      </View>
      <View style={{padding: 10}} />
      <View style={{paddingHorizontal: 20}}>
        <View>
          <ModalSelector
            data={type}
            initValue="Type"
            onChange={option => {
              getSubjects(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>
        <View style={{padding: 10}} />
        <Card>
          <Card.Content>
            <Title>Questionnarie</Title>
            <View style={{padding: 2}} />
            <Paragraph>
              This feedback is about the form that was given to you yesterday
              dealing with one of the issues of teachers.
            </Paragraph>
          </Card.Content>
        </Card>
        <View style={{padding: 10}} />
        <Card style={{height: 200}}>
          <Card.Content>
            <TextInput
              placeholder="Write down your feedback question here..... "
              onChange={val => setDiscription(val)}
              style={{backgroundColor: 'white'}}
            />
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 69,
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
