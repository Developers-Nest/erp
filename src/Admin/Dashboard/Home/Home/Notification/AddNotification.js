import React, { useEffect, useState } from 'react';
import { Button, TextInput, Title } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

// redux
import { useSelector } from 'react-redux';

import ModalSelector from 'react-native-modal-selector';
import { color } from 'react-native-elements/dist/helpers';

// helpers
import getUserType from '../../../../../services/helpers/getList/getUsertype'
import getCourse from '../../../../../services/helpers/getList/getCourse'
import getBatch from '../../../../../services/helpers/getList/getBatch'
import get from '../../../../../services/helpers/request/get'
import post from '../../../../../services/helpers/request/post'
import read from '../../../../../services/localstorage/read'
import LoaderHook from '../../../../../components/LoadingScreen/LoadingScreen';

export default function AddNotification({ navigation }) {
  //theming
  const institute = useSelector(state => state.institute);

  // selected values
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');
  const [suserTypeId, setSUserTypeId] = useState(null)
  const [suserType, setSUserType] = useState('')
  const [sdepartment, setSDepartment] = useState('')
  const [sbatch, setSBatch] = useState('')
  const [sCourse, setSCourse] = useState('')

  // dropdown values
  const [userTypes, setUserTypes] = useState([])
  const [department, setDepartment] = useState([])
  const [batch, setBatch] = useState([])
  const [course, setCourse] = useState([])

  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

  useEffect(async () => {
    setLoadingScreen()
    try {
      let res = await getUserType()
      setUserTypes(res)

      let slug = '/department'
      let token = await read('token')
      let res2 = await get(slug, token)
      let dep = []
      res2 && res2.map((d) => {
        dep.push({
          label: d.name,
          key: d._id
        })
      })
      setDepartment(dep)

      let res3 = await getCourse()
      setCourse(res3)

    } catch (err) {
      alert('Cannot get user types!!')
    }
    hideLoadingScreen()
  }, [])

  let fetchBatch = async (sc) => {
    setLoadingScreen()
    try {
      setSCourse(sc)
      let res = await getBatch(sc)
      setBatch(res)
    } catch (err) {
      alert('Cannot get batch')
    }
    hideLoadingScreen()
  }

  let addNotification = async () => {
    setLoadingScreen()
    try {
      let token = await read('token')
      let slug = '/notification'
      let data = {}
      if(suserType === "Student"){
        data = {
          message: description,
          title: text,
          userType: suserTypeId,
          batch: sbatch,
          course: sCourse
        }
      } else if (suserType === "Teacher"){
        data = {
          department: sdepartment,
          message: description,
          title: text,
          userType: suserTypeId,
        }
      }

      let res = await post(slug, data, token)
      if(res.error){
        alert(res.error)
      } else if(res._id) {
        alert('Notification Sent!!')
      }
    } catch (err) {
      alert('Error!')
    }
    hideLoadingScreen()
  }

  return (
    <View style={styles.container}>
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NotificationMain');
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
            fontFamily: 'NunitoSans-Regular',
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
            color: 'white',
          }}>
          Add Notification
        </Text>
      </View>
      <ScrollView>
        <Text style={{ marginLeft: 20, fontFamily: 'Poppins-Regular' }}>Title</Text>
        <View style={styles.titleInput}>
          <TextInput
            placeholder="Enter Title"
            placeholderTextColor="grey"
            color="black"
            multiline={true}
            onChangeText={text => setText(text)}
            placeholderTextColor={'grey'}
            mode={'flat'}
            style={{ ...styles.text_input }}

          />
        </View>

        <Text style={{ marginLeft: 20, fontFamily: 'Poppins-Regular', marginTop: 10 }}>Messages</Text>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              width: '90%',
              marginTop: 0,
              alignSelf: 'center',
              ...styles.shadow,
            }}>

            <TextInput
              multiline
              // mode='outlined'
              placeholder="Your Message Here"
              placeholderTextColor="grey"
              color="black"
              numberOfLines={10}
              onChangeText={Description => {
                setDescription(Description);
              }}
              placeholderTextColor={'grey'}
              style={{ ...styles.text_input }}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={{ margin: 20 }} >
          <Text style={{ fontFamily: 'Poppins-Regular', }}>Usertype</Text>
          <ModalSelector
            data={userTypes}
            initValue="User Type"
            onChange={option => {
              setSUserTypeId(option.id)
              setSUserType(option.label)
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>
        {
          suserType === "Student" ? (
            <View>
              <View style={{ margin: 20 }} >
                <Text style={{ fontFamily: 'Poppins-Regular', }}>Course</Text>
                <ModalSelector
                  data={course}
                  initValue="Course"
                  onChange={option => {
                    fetchBatch(option.key)
                  }}
                  style={styles.card_picker}
                  initValueTextStyle={styles.SelectedValueSmall}
                  selectTextStyle={styles.SelectedValueSmall}
                />
              </View>
              <View style={{ margin: 20 }} >
                <Text style={{ fontFamily: 'Poppins-Regular', }}>Batch</Text>
                <ModalSelector
                  data={batch}
                  initValue="Batch"
                  onChange={option => {
                    setSBatch(option.key)
                  }}
                  style={styles.card_picker}
                  initValueTextStyle={styles.SelectedValueSmall}
                  selectTextStyle={styles.SelectedValueSmall}
                />
              </View>
            </View>
          ) : (null)
        }

        {
          suserType === "Teacher" ? (
            <View style={{ margin: 20 }} >
              <Text style={{ fontFamily: 'Poppins-Regular', }}>Department</Text>
              <ModalSelector
                data={department}
                initValue="User Type"
                onChange={option => {
                  setSDepartment(option.key)
                }}
                style={styles.card_picker}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
            </View>
          ) : (null)
        }
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
          <Button
            onPress={addNotification}
            labelStyle={{ color: 'white' }}
            uppercase={false}
            color={institute ? institute.themeColor : '#5177E7'}
            mode="contained">
            Save
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text_input: {
    backgroundColor: 'white',
    fontFamily: 'Poppins-Regular',

  },
  Modal: {
    borderWidth: 1

  },
  titleInput: {
    marginRight: 20,
    marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1.0,
    elevation: 5,
    borderRadius: 8,
    padding: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1.0,
    elevation: 5,
    borderRadius: 8,
    padding: 1,
  },

  header: {
    height: 69,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
    alignContent: 'center',
  },

  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    paddingTop: 3,
    color: '#211C5A',
    textAlign: 'left'
  },
  card_picker: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    elevation: 5,
  },
});
