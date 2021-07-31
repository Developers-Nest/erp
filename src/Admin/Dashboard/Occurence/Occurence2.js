import React, {useEffect} from 'react';
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
import Icon from 'react-native-vector-icons/AntDesign';

import ModalSelector from 'react-native-modal-selector';
// date picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// loading screen
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

// helpers
import get from '../../../services/helpers/request/get';
import post from '../../../services/helpers/request/post';
import read from '../../../services/localstorage/read';
import getCourse from '../../../services/helpers/getList/getCourse';
import getBatch from '../../../services/helpers/getList/getBatch';

// redux
import {useSelector} from 'react-redux';

export default function Occurence2({navigation}) {
  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  //data to be created
  const [date, setDate] = React.useState('17 July 2021');
  const [employee, setemployee] = React.useState(null);
  const [remarks, setremarks] = React.useState('');

  //modal data
  const [emp, setEmp] = React.useState([]);

  //date picker
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
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
    console.warn('A date has been picked: ', date.toString());
    // setDate(
    //   date.getDate() +
    //     ' ' +
    //     dateMonths[date.getMonth()] +
    //     ' ' +
    //     date.getFullYear(),
    // );
    hideDatePicker();
  };

  //on load
  useEffect(async () => {
    showLoadingScreen();
    try {
      let slug = `/employee`;
      let token = await read('token');
      let response = await get(slug, token);
      console.log('Response ', response);
      let list = [];
      response.map(employee => {
        list.push({
          key: employee._id,
          label: employee.firstName,
        });
      });
      setEmp(list);
    } catch (err) {
      alert('Cannot fetch employee list !!\n' + err);
    }
    hideLoadingScreen();
  }, []);

  // save details
  const handlesubmit = async () => {
    try {
      let slug = `/occurrence`;
      console.log('Occurance slug', slug);
      let token = await read('token');
      let data = {
        date: date,
        employeeName: employee,
        remarks: remarks,
      };
      console.log(data);
      let response = await post(slug, data, token);
      alert('occurance created!');
    } catch (err) {
      alert('Cannot create occurance!' + err);
    }
  };

  return (
    <View>
      <View
        style={{
          width: '90%',
          margin: 10,
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignContent: 'space-between',
          justifyContent: 'flex-start',
        }}>
        <View style={styles.pickdate}>
          <ModalSelector
            initValue="Name"
            onChange={option => {
              setemployee(option.key);
            }}
            style={{
              marginTop: 10,
              width: 100,
              shadowOpacity: 0,
              borderWidth: 0,
            }}
            data={emp}
          />
          <Icon
            size={24}
            color="black"
            name="down"
            style={{
              marginTop: 16,
              marginRight: 10,
            }}></Icon>
        </View>
        <TouchableOpacity style={styles.pickdate} onPress={showDatePicker}>
          <Text style={{marginTop: 20, marginLeft: 10}}>
            {date}
            {'  '}
          </Text>
          <Icon
            size={24}
            color="black"
            name="calendar"
            style={{
              marginTop: 16,
              marginRight: 10,
            }}></Icon>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            style={styles.pickdate}
            mode="date"
            onChange={value => setDate(value.toString())}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '90%',
          margin: 10,
          flex: 1,
          flexDirection: 'row',
          //  alignContent:'center',
          justifyContent: 'center',
          marginTop: 100,
        }}>
        <TextInput
          multiline
          // mode='outlined'
          placeholder="Write your remarks"
          numberOfLines={20}
          // value={Description}
          onChangeText={remarks => {
            setremarks(remarks);
          }}
          style={styles.text_input}
        />
      </View>
      <View
        style={{
          alignContent: 'space-between',
          position: 'absolute',
          marginTop: 340,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignContent: 'center',
          marginLeft: 20,
        }}>
        <TouchableOpacity
          style={{
            ...styles.btn,
            alignSelf: 'flex-start',
            marginLeft: 100,
            backgroundColor: 'white',
            borderColor: '#B04305',
            borderWidth: 1,
          }}>
          <Text
            style={{
              flex: 0,
              flexDirection: 'row',
              marginTop: 8,
              color: '#B04305',
              marginLeft: 15,
              fontSize: 18,
              // padding:5,
            }}>
            {'Delete'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlesubmit}
          style={{
            ...styles.btn,
            alignSelf: 'flex-end',
            backgroundColor: '#5177E7',
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  btn: {
    width: 80,
    height: 40,
    marginLeft: 20,
    borderRadius: 5,
    shadowColor: 'black',
    elevation: 5,
  },

  text_input: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 200,
    alignSelf: 'center',
    width: '90%',
    color: 'grey',
    marginLeft: 20,
    marginTop: 150,
    padding: 20,
    backgroundColor: 'white',
    fontFamily: 'Poppins-Regular',
    borderRadius: 10,
    textAlignVertical: 'top',
    shadowColor: 'black',
    elevation: 3,
  },
  pickdate: {
    width: 155,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 5,
    elevation: 3,
    borderWidth: 0,
    marginLeft: 28,
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
