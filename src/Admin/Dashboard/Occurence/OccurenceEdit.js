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
import Icon from 'react-native-vector-icons/AntDesign';
import {Searchbar, Button, Appbar} from 'react-native-paper';

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

export default function OccurenceEdit({route, navigation}) {
  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  //edit values
  const [date, setdate] = React.useState(route.params.date);
  const [employeeID, setemployeeID] = React.useState(route.params.employeeID);
  const [employeeName, setemployeeName] = React.useState(
    route.params.employeeName,
  );
  const [remarks, setremarks] = React.useState(route.params.remarks);

  //date picker
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(0, 15);
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

  //modal data
  const [emp, setEmp] = React.useState([]);

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

  return (
    <ScrollView>
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Occurence Register" />
      </Appbar>
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
            initValue={employeeName}
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
            {datedisplay}
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
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '90%',
          margin: 10,
          flexDirection: 'row',
          //  alignContent:'center',
          justifyContent: 'center',
        }}>
        <TextInput
          multiline
          // mode='outlined'
          placeholder="Write your remarks"
          numberOfLines={20}
          value={remarks}
          // onChangeText={(Description) => { setDescription(Description) }}
          style={styles.text_input}
        />
      </View>

      <TouchableOpacity style={styles.btn}>
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
    backgroundColor: '#E5E5E5',
  },
  btn: {
    width: 80,
    height: 40,
    backgroundColor: '#5177E7',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    shadowColor: 'black',
    elevation: 5,
  },

  text_input: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    color: 'grey',
    marginLeft: 20,
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
