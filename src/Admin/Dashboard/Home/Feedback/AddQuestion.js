import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Evillcons from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign'; //for users section icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import get from '../../../../services/helpers/request/get';
import post from '../../../../services/helpers/request/post';
import read from '../../../../services/localstorage/read';
import LoaderHook from '../../../../components/LoadingScreen/LoadingScreen';

import {useSelector} from 'react-redux';

const AddQuestion = ({navigation}) => {
  //theming
  const institute = useSelector(state => state.institute);

  //text input
  const [feedbackquestion, setfeedbackquestion] = useState('');

  //fetch from type api
  const [feedbacktypes, setfeedbacktypes] = useState([]);

  //modal selector values,no values fetched in api ,const label and keys made
  const [statuses, setstatuses] = useState([
    {label: 'Active', key: 'Active'},
    {label: 'Deactive', key: 'Deactive'},
  ]);

  //data to be sent
  const [feedbacktype, setfeedbacktype] = useState();
  const [status, setstatus] = useState();

  //loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoaderHook();

  //on save button press action
  let handleSubmit = async () => {
    showLoadingScreen();
    try {
      let slug = '/feedback/question?';
      let token = await read('token');
      let data = {
        question: feedbackquestion,
        feedbacktype: feedbacktype,
        status: status,
      };
      let res = await post(slug, data, token);
      if (res.error) {
        alert(res.error);
      } else if (res._id) {
        alert('Feeback Question Added!!');
      }
    } catch (err) {
      alert('Unable to add Question !!' + err);
    }
    hideLoadingScreen();
  };

  //on load
  useEffect(async () => {
    try {
      let slug = '/feedback/type?';
      let token = await read('token');
      let res = await get(slug, token);
      let list = [];

      res &&
        res.map(res => {
          list.push({
            label: res.feedbacktype,
            key: res._id,
          });
        });
      setfeedbacktypes(list);
    } catch (err) {
      alert('Cannot get feedback types!!');
    }
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : '#FF5733',
          ...styles.header,
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FeedbackMain');
            }}>
            <AntDesign
              size={24}
              color="white"
              name="left"
              style={{
                alignSelf: 'center',

                fontSize: 25,
                color: 'white',
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontStyle: 'normal',
              fontFamily: 'NunitoSans-Regular',
              fontSize: 28,
              fontWeight: '600',
              alignSelf: 'center',
              marginLeft: 10,
              color: 'white',
            }}>
            Add Question
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('QuestionList')}
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: 15,
            }}>
            <MaterialCommunityIcon
              name="eye"
              color="#900"
              style={{
                fontSize: 30,
                color: 'white',
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
              }}>
              VIEW LIST
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {loadingScreen}
        <View style={{justifyContent: 'space-around', alignContent: 'center'}}>
          <View style={{width: '100%', paddingTop: 15, flexDirection: 'row'}}>
            <Text style={styles.section_heading}>Add Feedback Type</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <ModalSelector
              data={feedbacktypes}
              onChange={option => {
                setfeedbacktype(option.key);
              }}
              initValue="Annual feedback forum"
              style={styles.card}
              initValueTextStyle={styles.SelectedValue}
              selectTextStyle={styles.SelectedValue}
            />
          </View>

          <View>
            <Text style={styles.section_heading}> Feedback Question </Text>
          </View>

          <View>
            <TextInput
              style={{
                borderRadius: 8,
                borderWidth: 0.2,
                backgroundColor: '#FFFFFF',
                marginHorizontal: 15,
                paddingBottom: 120,
                elevation: 3,
                padding: 15,
              }}
              placeholder="Write your feedback question here"
              placeholderTextColor="grey"
              color="black"
              onChangeText={val => setfeedbackquestion(val)}></TextInput>
          </View>

          <View style={{width: '100%', paddingTop: 15, flexDirection: 'row'}}>
            <Text style={styles.section_heading}>Status</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <ModalSelector
              data={statuses}
              onChange={option => {
                setstatus(option.key);
              }}
              initValue="Active"
              style={styles.card}
              initValueTextStyle={styles.SelectedValue}
              selectTextStyle={styles.SelectedValue}
            />
          </View>

          <View style={styles.fixToText}>
            <Pressable
              style={{
                backgroundColor: institute ? institute.themeColor : '#5177E7',
                ...styles.button,
              }}
              onPress={handleSubmit}>
              <Text style={styles.text}>Save</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },

  input1: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    color: '#505069',
    paddingHorizontal: 20,
  },

  text2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
    marginLeft: 10,
    letterSpacing: 0.25,
    color: '#505069',
    justifyContent: 'center',
  },
  button1: {
    marginTop: 0,
    marginBottom: 0,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    padding: 3,
    paddingHorizontal: 25,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 30,
    height: 46,
    borderColor: '#d2691e',
    borderWidth: 1.5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 4,
    elevation: 3,
  },

  text1: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#d2691e',
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '500',
    letterSpacing: 0.25,
    color: 'white',
  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
    margin: 40,
  },
  search: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderColor: '#58636D',
    borderRadius: 8,
    borderWidth: 0.3,
  },

  section_heading: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'left',
    color: 'rgba(88, 99, 109, 0.85)',
    paddingHorizontal: 15,
    marginBottom: 5,
    marginTop: 20,
  },

  search_input: {
    fontFamily: 'Poppins-Regular',
    borderRadius: 8,
    height: 50,
    fontSize: 15,

    color: '#505069',
    paddingTop: 5,
    paddingHorizontal: 0,
    width: '90%',
    textAlign: 'left',
  },
  section_heading1: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
    color: 'rgba(88, 99, 109, 0.85)',

    marginBottom: 5,
    marginRight: 20,
  },
  section_heading2: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
    marginRight: 35,
    marginLeft: 0,

    color: 'rgba(88, 99, 109, 0.85)',
  },
  pickdate1: {
    width: 120,
    height: 50,
    backgroundColor: 'white',
    borderColor: '#58636D',
    borderRadius: 8,
    borderWidth: 0.3,
    marginLeft: 22,
    marginRight: 12,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  input: {
    flex: 1,
    height: 50,
    margin: 12,
    width: 120,
    marginTop: 0,
    marginBottom: 0,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderColor: '#58636D',
    borderRadius: 8,
    borderWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Poppins-Regular',
    marginLeft: 0,
  },

  pickdate: {
    width: 120,
    fontFamily: 'Poppins-Regular',
    height: 50,
    backgroundColor: 'white',
    borderColor: '#58636D',
    borderRadius: 8,
    borderWidth: 0.3,
    marginLeft: 12,
    marginRight: 0,
    paddingHorizontal: 20,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SelectedValue: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '200',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 30,
    paddingTop: 3,
    color: 'rgba(88, 99, 109, 0.85)',
  },

  card: {
    shadowColor: '#999',
    height: 50,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    width: '94%',
  },

  card1: {
    width: 170,
    height: 50,

    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderColor: '#58636D',

    overflow: 'hidden',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 0.3,
    marginLeft: 10,
    marginRight: 20,

    //flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,

    justifyContent: 'space-between',
    color: '#211C5A',
  },

  header: {
    height: 69,
    flexDirection: 'row',
  },
});

export default AddQuestion;
