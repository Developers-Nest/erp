import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
} from 'react-native';

import {Button} from 'react-native-paper';

import ModalSelector from 'react-native-modal-selector';
//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';

export default function AddEvents({navigation}) {
  const institute = useSelector(state => state.institute);

  //data to be created
  const [event, SetEvent] = React.useState('');
  const [Organizer, SetOrganizer] = React.useState('');
  const [des, setDescription] = useState('');

  //date picker
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(0, 15);
  };

  const [isDatePickerVisibleIssue, setDatePickerVisibilityIssue] =
    React.useState(false);
  const [isDatePickerVisibleDue, setDatePickerVisibilityDue] =
    React.useState(false);

  const [date, setDate] = React.useState();
  const [dateissued, setDateissued] = React.useState();

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

  const showDatePicker1 = () => {
    setDatePickerVisibilityIssue(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibilityIssue(false);
  };

  const showDatePicker2 = () => {
    setDatePickerVisibilityDue(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibilityDue(false);
  };

  const handleConfirmIssued = data => {
    setdatedisplayIssued(parseDate(data.toString()));
    setissue(
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
    console.log('A date has been picked: ', issue);
    hideDatePicker1();
  };

  const handleConfirmDue = data => {
    setdatedisplayDue(parseDate(data.toString()));
    setdue(
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
    console.log('A date has been picked: ', due);
    hideDatePicker2();
  };

  const twodigit = num => {
    return ('0' + num).slice(-2);
  };
  const threedigit = num => {
    return ('00' + num).slice(-3);
  };

  return (
    <ScrollView style={styles.container}>
      {/* header start */}

      <View
        style={{
          backgroundColor: institute ? institute.themeColor : '#FF5733',
          ...styles.header,
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Events');
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
        </View>
        <Text
          style={{
            fontStyle: 'normal',
            fontFamily: 'NunitoSans-Regular',
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 20,
            color: 'white',
          }}>
          Add Events
        </Text>
      </View>
      {/* header ends */}

      <View style={styles.Eventbox}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontFamily: 'Poppins-Regular', color: '#58636D'}}>
              Event Name
            </Text>
            <TextInput
              style={styles.Eventinput}
              onChangeText={value => SetEvent(value)}
              value={event}
              placeholder="Enter name"
              placeholderTextColor={'grey'}
              numberOfLines={2}
              multiline={true}
            />
          </View>
          <View>
            <Text style={{fontFamily: 'Poppins-Regular', color: '#58636D'}}>
              Event Type
            </Text>
            <ModalSelector style={{width: 150}}></ModalSelector>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontFamily: 'Poppins-Regular', color: '#58636D'}}>
              Organizer Name
            </Text>
            <TextInput
              style={styles.Eventinput}
              onChangeText={value => SetOrganizer(value)}
              value={Organizer}
              placeholder="Enter name"
              placeholderTextColor={'grey'}
              numberOfLines={2}
              multiline={true}
            />
          </View>
          <View>
            <Text style={{fontFamily: 'Poppins-Regular', color: '#58636D'}}>
              Event For
            </Text>
            <ModalSelector style={{width: 150}}></ModalSelector>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text>Organizer Name</Text>
            <TextInput
              style={styles.Eventinput}
              SetEvent={SetEvent}
              value={event}
              placeholder="Enter name"
              placeholderTextColor={'grey'}
              numberOfLines={2}
              multiline={true}
            />
          </View>
          <View>
            <Text>Event For</Text>
            <ModalSelector style={{width: 150}}></ModalSelector>
          </View>
        </View>
      </View>
      <TextInput
        placeholder="Write description here "
        onChangeText={value => setDescription(value)}
        value={des}
        style={styles.feedbox}
        //   numberOfLines={10}
        multiline={true}
        placeholderTextColor="grey"
      />

      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <Button
          mode="contained"
          style={styles.ButtonView}
          color="#5177E7"
          onPress={() => console.log('Pressed')}>
          Save
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
  Eventbox: {
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  Eventinput: {
    height: 41,
    borderWidth: 0.5,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    minWidth: 150,
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 15,
  },
  feedbox: {
    margin: 20,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: 'black',
    borderRadius: 12,
    height: 200,
  },
  ButtonView: {
    width: 100,
  },
});
