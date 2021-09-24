import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

//icons
import Icon from 'react-native-vector-icons/AntDesign';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Searchbar, Button, Appbar} from 'react-native-paper';

import ModalSelector from 'react-native-modal-selector';
// date picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// loading screen
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

// helpers
import patch from '../../../services/helpers/request/patch';
import read from '../../../services/localstorage/read';
import getEmployee from '../../../services/helpers/getList/getEmployee';

// redux
import {useSelector} from 'react-redux';

export default function OccurenceEdit({route, navigation}) {
  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  const institute = useSelector(state => state.institute);

  //edit values
  const [id, setID] = React.useState(route.params.id);
  const [v, setv] = React.useState(route.params.v);
  const [institution, setinstitution] = React.useState(
    route.params.institution,
  );

  const [date, setDate] = React.useState(route.params.date);
  const [employeeID, setemployeeID] = React.useState(route.params.employeeID);
  const [employeeName, setemployeeName] = React.useState(
    route.params.employeeName,
  );
  const [remarks, setremarks] = React.useState(route.params.remarks);

  //date picker
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(4, 15);
  };

  //date display
  const [datedisplay, setdatedisplay] = useState(parseDate(route.params.date));

  //date picker
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

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = data => {
    console.warn('A date has been picked: ', date.toString());
    setdatedisplay(parseDate(data.toString()));
    setDate(
      data.getFullYear() +
        '-' +
        twodigit(data.getMonth() + 1) +
        '-' +
        twodigit(data.getDate()) +
        'T' +
        +twodigit(data.getHours()) +
        ':' +
        twodigit(data.getMinutes()) +
        ':' +
        twodigit(data.getSeconds()) +
        '.' +
        threedigit(data.getMilliseconds()) +
        'Z',
    );
    hideDatePicker();
  };

  const twodigit = num => {
    return ('0' + num).slice(-2);
  };
  const threedigit = num => {
    return ('00' + num).slice(-3);
  };
  // save details
  const HandleSubmit = async () => {
    try {
      let slug = `/occurrence/${id}`;
      console.log('Occurance slug', slug);
      let token = await read('token');
      let data = {
        date: date,
        employeeName: employeeID,
        institution: institution,
        remarks: remarks,
        id: id,
        __v: v,
      };
      console.log(data);
      let response = await patch(slug, data, token);
      alert('occurance updated!');
      navigation.replace('Occurence');
    } catch (err) {
      alert('Cannot update occurance!' + err);
    }
  };

  //modal data
  const [emp, setEmp] = React.useState([]);

  //on load
  useEffect(async () => {
    showLoadingScreen();
    try {
      let list = await getEmployee();

      setEmp(list);
    } catch (err) {
      alert('Cannot fetch employee list !!\n' + err);
    }
    hideLoadingScreen();
  }, []);

  return (
    <ScrollView>
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity onPress={() => navigation.replace('Occurence')}>
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontStyle: 'normal',
              fontSize: 28,
              fontFamily: 'NunitoSans-Light',
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 20,
              color: 'white',
            }}>
            Occurence Edit
          </Text>
        </View>
      </View>
      <View style={{alignSelf: 'center', width: '90%'}}>
        <ModalSelector
          initValue={employeeName}
          style={{
            width: '100%',
            marginTop: 10,
            alignSelf: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            shadowOpacity: 5,
            elevation: 3,
          }}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
          onChange={option => {
            setemployeeID(option.key);
          }}
          data={emp}
        />

        <TouchableOpacity style={styles.pickdate} onPress={showDatePicker}>
          <Text style={{marginTop: 20, marginLeft: 10}}>
            {datedisplay || 'Select Date'}
            {'  '}
          </Text>
          <Icon
            size={24}
            color="black"
            name="calendar"
            style={{
              padding: 16,
            }}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            style={styles.pickdate}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </TouchableOpacity>

        <TextInput
          multiline
          placeholder="Write your remarks"
          numberOfLines={20}
          value={remarks}
          onChangeText={remarks => {
            setremarks(remarks);
          }}
          style={styles.text_input}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: institute ? institute.themeColor : 'blue',
          ...styles.btn,
        }}
        onPress={HandleSubmit}>
        <Text
          style={{
            flexDirection: 'row',
            marginTop: 8,
            marginLeft: 22,
            fontSize: 18,
            // padding:5,
            color: 'white',
          }}>
          {'Save'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
  btn: {
    width: 80,
    height: 40,
    borderRadius: 5,
    elevation: 5,
    alignSelf: 'center',
    margin: 10,
  },

  text_input: {
    padding: 20,
    backgroundColor: 'white',
    fontFamily: 'Poppins-Regular',
    borderRadius: 10,
    textAlignVertical: 'top',
    elevation: 3,
    color: 'black',
  },
  pickdate: {
    width: 155,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 20,
    paddingTop: 3,
    color: '#211C5A',
  },
});
