import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
} from 'react-native';

import {RadioButton, Button} from 'react-native-paper';

//selector
import ModalSelector from 'react-native-modal-selector';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

//date picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//helpers
import get from '../../../../services/helpers/request/get';

//localstorage
import read from '../../../../services/localstorage/read';

//loading screen
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

//redux
import {useSelector} from 'react-redux';

export default function AddEvents({navigation}) {
  //institute
  const institute = useSelector(state => state.institute);

  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  //data for event creation
  const [eventname, SetEventname] = React.useState('');
  const [Organizer, SetOrganizer] = React.useState('');
  const [des, setDescription] = useState('');
  const [start, setstart] = useState();
  const [end, setend] = useState();

  //drop down selected values
  const [eventFor, setEventFor] = useState('');
  const [eventType, setEventType] = React.useState('');

  //modal selector values
  const [eventTypes, setEventTypes] = useState([
    {key: '610c4ac2066c057a9116408e', label: 'event1'},
  ]);
  const [eventForList, setEventForList] = useState([
    {key: 'Selected Batch', label: 'Selected Batch'},
    {key: 'Selected Department', label: 'Selected Department'},
    {key: 'Common To All', label: 'Common To All'},
  ]);

  //date picker
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(0, 15);
  };

  //date display
  const [startDisplay, setStartDisplay] = useState();
  const [endDisplay, setEndDisplay] = useState();

  //picker visibility
  const [isDatePickerVisibleStart, setDatePickerVisibilityStart] =
    React.useState(false);
  const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] =
    React.useState(false);

  const showDatePicker1 = () => {
    setDatePickerVisibilityStart(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibilityStart(false);
  };

  const showDatePicker2 = () => {
    setDatePickerVisibilityEnd(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibilityEnd(false);
  };

  const handleConfirmStart = data => {
    setStartDisplay(parseDate(data.toString()));
    setstart(data.toString());
    hideDatePicker1();
  };

  const handleConfirmEnd = data => {
    setEndDisplay(parseDate(data.toString()));
    setend(data.toString());
    hideDatePicker2();
  };
  const [checked, setChecked] = React.useState(true);

  // // on load of the screen
  // useEffect(async () => {
  //   showLoadingScreen();
  //   try {
  //     let token = await read('token');
  //     let response = await get('/event/types', token);
  //     setEventTypes(response);
  //     console.log(response);
  //   } catch (err) {
  //     alert('Cannot fetch events : ' + err);
  //   }
  //   hideLoadingScreen();
  // }, []);

  return (
    <ScrollView style={styles.container}>
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
              onChangeText={value => SetEventname(value)}
              value={eventname}
              placeholder="Enter name"
              placeholderTextColor={'grey'}
              multiline={true}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            height: 80,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#58636D',
                padding: 10,
              }}>
              Is Holiday?
            </Text>

            <RadioButton
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)}
            />
          </View>
          {checked ? null : (
            <View>
              <Text style={{fontFamily: 'Poppins-Regular', color: '#58636D'}}>
                Event Type
              </Text>
              <ModalSelector
                data={eventTypes}
                initValue="Type"
                onChange={option => {
                  setEventType(option.key);
                }}
                style={{width: 150}}
              />
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
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
              multiline={true}
            />
          </View>
          <View>
            <Text style={{fontFamily: 'Poppins-Regular', color: '#58636D'}}>
              Event For
            </Text>
            <ModalSelector
              data={eventForList}
              initValue="Type"
              onChange={option => {
                setEventFor(option.key);
              }}
              style={{width: 150}}></ModalSelector>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 30}}>
        <TouchableOpacity style={styles.pickdate} onPress={showDatePicker1}>
          <Text style={{marginTop: 15, marginLeft: 10, color: 'black'}}>
            {startDisplay}
            {'  '}
          </Text>
          <Feather
            size={18}
            color="black"
            name="calendar"
            style={{
              marginTop: 16,
              marginRight: 0,
            }}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisibleStart}
            style={styles.pickdate}
            mode="date"
            onConfirm={handleConfirmStart}
            onCancel={hideDatePicker1}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickdate} onPress={showDatePicker2}>
          <Text style={{marginTop: 15, marginLeft: 10, color: 'black'}}>
            {endDisplay}
            {'  '}
          </Text>
          <Feather
            size={18}
            color="black"
            name="calendar"
            style={{
              marginTop: 16,
              marginRight: 0,
            }}></Feather>
          <DateTimePickerModal
            isVisible={isDatePickerVisibleEnd}
            style={styles.pickdate}
            mode="date"
            onConfirm={handleConfirmEnd}
            onCancel={hideDatePicker2}
          />
        </TouchableOpacity>
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
    borderWidth: 0.5,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    width: 150,
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 15,
    padding: 10,
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

  pickdate: {
    width: 100,
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
});
