import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {Appbar} from 'react-native-paper';

//icons
import Icon from 'react-native-vector-icons/AntDesign';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ModalSelector from 'react-native-modal-selector';
// date picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// loading screen
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

// helpers
import post from '../../../services/helpers/request/post';
import read from '../../../services/localstorage/read';
import getEmployee from '../../../services/helpers/getList/getEmployee';

// redux
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native';

export default function Occurence2({navigation}) {
  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  const institute = useSelector(state => state.institute);

  //data to be created
  const [date, setDate] = React.useState('');
  const [employee, setemployee] = React.useState('');
  const [remarks, setremarks] = React.useState('');

  //modal data
  const [emp, setEmp] = React.useState([]);

  //date display
  const [datedisplay, setdatedisplay] = useState('');

  //date picker
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(4, 15);
  };
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = data => {
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

  // save details
  const handlesubmit = async () => {
    try {
      if (!date || !employee || !remarks) {
        alert('All fields are required!!');
        return;
      }
      let slug = `/occurrence`;
      let token = await read('token');
      let data = {
        date: date,
        employeeName: employee,
        remarks: remarks,
      };
      let response = await post(slug, data, token);
      alert('occurance created!');
    } catch (err) {
      alert('Cannot create occurance!' + err);
    }
  };

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
            Occurence Add
          </Text>
        </View>
      </View>
      <View style={{alignSelf: 'center', width: '90%'}}>
        <ModalSelector
          initValue="Name"
          onChange={option => {
            setemployee(option.key);
          }}
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
          onChangeText={remarks => {
            setremarks(remarks);
          }}
          style={styles.text_input}
        />

        <TouchableOpacity
          onPress={handlesubmit}
          style={{
            ...styles.btn,
            backgroundColor: institute ? institute.themeColor : '#5177E7',
          }}>
          <Text
            style={{
              flex: 0,
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
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
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
