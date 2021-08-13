import React, { useState,useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Evillcons from 'react-native-vector-icons/Feather';

import AntDesign from 'react-native-vector-icons/AntDesign'; //for users section icons

import { useSelector } from 'react-redux';
import LoaderHook from '../../../../components/LoadingScreen/LoadingScreen';
// helpers
import patch from '../../../../services/helpers/request/patch'
import deleteReq from '../../../../services/helpers/request/delete'
import read from '../../../../services/localstorage/read'
const HostelAllocationEdit = ({ route, navigation }) => {
  //theming
  const institute = useSelector(state => state.institute);

  const [user, setuser] = useState([]);
    const [hostel, setHostel] = useState({})


    const [selectedHostelName, setSelectedHostelName] = useState('')
    const [selectedHostelRoom, setSelectedHostelRoom] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('')
    const [selectedCourse, setSelectedCourse] = useState('')
    const [selectedBatch, setSelectedBatch] = useState('')
    const [selectedUser, setSelectedUser] = useState('')
    const [id, setId] = useState('')

  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

  useEffect(async () => {
      let hostel = route.params.hostel
     
setHostel(hostel)
setDate(hostel.hostelRegistartionDate)
setDate1(hostel.vacatingDate)
setId(hostel._id)
//       batch: "60d319d51f8c9327133b69b4"
// course: "60d319d01f8c9327133b69b3"
// createdAt: "2021-08-13T15:32:35.514Z"
// hostelName: "60f1bff8fa745420676693ec"
// hostelRegistartionDate: "2021-08-19T15:31:00.000Z"
// hostelRoom: "61112cd787cbdc129b7a9e13"
// hostelType: "60f1bfedfa745420676693e4"
// institution: "60d318e21f8c9327133b67e0"
// status: "Pending"
// updatedAt: "2021-08-13T15:32:35.514Z"
// user: "60ebbce6e8e48a2b402032c4"
// userType: "60d318e21f8c9327133b67e2"
// vacatingDate: "2021-08-28T15:31:00.000Z"
// __v: 0
// _id: "6116909358926e45a6d9c34f"
  }, [])

  

  let handleDelete = async () => {
      setLoadingScreen()
      try {
          let slug = `/hostel/hostelAllocation/${id}`
          let token = await read('token')
          let res = await deleteReq(slug, token)
          if (res.error) {
              alert(res.error)
          } else {
              alert('Deleted')
              navigation.navigate('AcademicsMain');
          }
      } catch (err) {
          alert('Cannot Delete !!')
      }
      hideLoadingScreen()
  }



  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [date, setDate] = React.useState('29 May 2021');

  const [isDatePickerVisible1, setDatePickerVisibility1] =
    React.useState(false);
  const [date1, setDate1] = React.useState('29 May 2021');

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };
  const handleConfirm1 = date1 => {
    // console.warn("A date has been picked: ", date1.toString());
    setDate1(
      date1.getDate() +
      ' ' +
      dateMonths[date1.getMonth() + 1] +
      ' ' +
      date1.getFullYear(),
    );
    hideDatePicker1();
  };

  let index = 0;
  const dateMonths = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'Aug',
    9: 'Sept',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    // console.warn("A date has been picked: ", date.toString());
    setDate(
      date.getDate() +
      ' ' +
      dateMonths[date.getMonth() + 1] +
      ' ' +
      date.getFullYear(),
    );
    hideDatePicker();
  };

  return (
    <View style={{ justifyContent: 'center', alignContent: 'center' }}>
      {/* header start */}

      <View
        style={{
          backgroundColor: institute ? institute.themeColor : '#FF5733',
          ...styles.header,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AllocatedListHostel');
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
          Hostel Allocation
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AllocatedListHostel')}
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}></TouchableOpacity>
      </View>

      {/* header ends */}

      <View style={{ justifyContent: 'space-around', alignContent: 'center' }}>
        <View style={{ width: '100%', paddingTop: 15, flexDirection: 'row' }}>
          <Text style={styles.section_heading}>Name</Text>
        </View>

        <View style={{ marginHorizontal: 10, ...styles.shadow }}>
          <View style={styles.search}>
            <TextInput
              style={{ ...styles.search_input, fontFamily: 'Poppins-Regular' }}
              placeholder="Search User's name to add"
              placeholderTextColor="grey"
              color="black"
            />
            <TouchableOpacity
              style={{
                alignSelf: 'center',
              }}>
              <Icon
                name="search-sharp"
                style={{
                  alignSelf: 'center',
                  fontSize: 25,
                  color: 'black',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: '100%', paddingTop: 15, flexDirection: 'row' }}>
          <Text style={styles.section_heading}>Hostel Type </Text>
          <Text style={styles.section_heading2}>Hostel Name</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <ModalSelector
           data={user}
           initValue={hostel.hostelType? hostel.hostelType.name: 'N/A'}
           onChange={option => {
               // setclass(option.key);
           }}
           disabled={true}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
          //selectTextStyle={styles.SelectedValueSmall}
          >
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
              <Text style={styles.text2}>Type</Text>
              <Evillcons
                size={25}
                color="#505069"
                name="chevron-down"
                style={{
                  marginLeft: 70,
                }}></Evillcons>
            </View>
          </ModalSelector>
          <TextInput
            style={styles.input}
            placeholder="Nilgiri"
            placeholderTextColor="grey"
            color="black"
            value={hostel.hostelName? hostel.hostelName.name: 'N/A'}
          />
        </View>
        <View style={{ width: '100%', paddingTop: 15, flexDirection: 'row' }}>
          <Text style={styles.section_heading}>Registration </Text>
          <Text style={styles.section_heading1}>Vacating</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.pickdate} onPress={showDatePicker}>
            <TextInput
              style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
              // placeholder={date}
              placeholderTextColor="grey"
              color="black"
              value={date}
              
              editable={false}
            />
            <Feather
              size={18}
              color="black"
              name="calendar"
              style={{
                marginTop: 16,
                marginRight: 0,
              }}></Feather>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              style={styles.pickdate}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.pickdate1} onPress={showDatePicker1}>
            <TextInput
              style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
              // placeholder={date1}
              placeholderTextColor="grey"
              color="black"
              value={date1}
              
              editable={false}
            />
            <Feather
              size={18}
              color="black"
              name="calendar"
              style={{
                marginTop: 16,
                marginRight: 0,
              }}></Feather>
            <DateTimePickerModal
              isVisible={isDatePickerVisible1}
              style={styles.pickdate}
              mode="date"
              onConfirm={handleConfirm1}
              onCancel={hideDatePicker1}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.fixToText}>
          <Pressable
            style={styles.button1}
            onPress={() => Alert.alert('Deleted')}>
            <Text style={styles.text1} onPress={handleDelete}>Delete</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => Alert.alert('Saved')}>
            <Text style={styles.text}>Save</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#5177E7',
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
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'left',
    color: 'rgba(88, 99, 109, 0.85)',
    paddingHorizontal: 15,
    marginBottom: 5,
  },

  search_input: {
    fontFamily: 'Poppins-Regular',
    borderRadius: 8,
    height: 50,
    fontSize: 15,

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
    marginLeft: 35,

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
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 27,
    padding: 10,
    backgroundColor: '#8a2be2',
    color: '#211C5A',
  },

  card: {
    width: 170,
    height: 50,

    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderColor: '#58636D',

    overflow: 'hidden',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 0.3,
    marginLeft: 15,
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

export default HostelAllocationEdit;
