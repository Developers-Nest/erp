import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
} from 'react-native';

import { RadioButton, Button } from 'react-native-paper';

//checkbox
import { CheckBox } from 'react-native-elements';

//selector
import ModalSelector from 'react-native-modal-selector';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

//date picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//helpers
import get from '../../../../services/helpers/request/get';
import post from '../../../../services/helpers/request/post';
import getBatch from '../../../../services/helpers/getList/getBatch';
import getCourse from '../../../../services/helpers/getList/getCourse';

//localstorage
import read from '../../../../services/localstorage/read';

//loading screen
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

//redux
import { useSelector } from 'react-redux';

export default function AddEvents({ navigation }) {
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

  //students event dropdown
  const [courses, setcourses] = useState();
  const [batches, setbatches] = useState();

  //students event data
  const [course, setcourse] = useState();
  const [batch, setbatch] = useState();

  //students event dropdown
  const [department, setdepartment] = useState();

  //faculty event data
  const [departments, setdepartments] = useState();

  //department checkboxes
  const [checkBoxValueDept, setcheckBoxValueDept] = useState({});

  //batch checkbox
  const [checkBoxValueBatch, setcheckBoxValueBatch] = useState({});

  //modal selector values
  const [eventTypes, setEventTypes] = useState([]);
  const [eventForList, setEventForList] = useState([
    { key: 'Selected Batch', label: 'Selected Batch' },
    { key: 'Selected Department', label: 'Selected Department' },
    { key: 'Common To All', label: 'Common To All' },
  ]);

  //date picker
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(4, 15);
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

  // on load of the screen
  useEffect(async () => {
    showLoadingScreen();
    try {
      let token = await read('token');
      let response = await get('/event/eventTypes', token);
      let list = [];
      response.map(type => list.push({ key: type._id, label: type.name }));
      setEventTypes(list);
      console.log(response);
    } catch (err) {
      alert('Cannot fetch events : ' + err);
    }
    hideLoadingScreen();
  }, []);

  // save details
  const handlesubmit = async () => {
    showLoadingScreen();
    try {
      let slug = `/event`;
      let token = await read('token');
      let data;
      if (checked) {
        if(!des || !end || !eventFor || !checked || !eventFor || !Organizer || !start || !eventname){
          alert('All fields are required!!')
          hideLoadingScreen()
          return
        }
        if (eventFor === 'Common To All') {
          data = {
            batch: [],
            course: '',
            department: [],
            description: des,
            endDate: end,
            eventFor: eventFor,
            holiday: checked,
            name: eventname,
            organizer: Organizer,
            startDate: start,
          };
        } else if (eventFor === 'Selected Department') {
          let dept = [];
          Object.entries(checkBoxValueDept).forEach(([userId, value]) => {
            if (checkBoxValueDept[userId]) dept.push(userId);
          });

          // atleast one department should be selected
          if(dept.length == 0){
            alert('Select a department!!')
            hideLoadingScreen()
            return
          }
          data = {
            batch: [],
            course: '',
            department: dept,
            description: des,
            endDate: end,
            eventFor: eventFor,
            holiday: checked,
            name: eventname,
            organizer: Organizer,
            startDate: start,
          };
        } else if (eventFor === 'Selected Batch') {
          let batch = [];
          Object.entries(checkBoxValueBatch).forEach(([Id, value]) => {
            if (checkBoxValueBatch[Id]) batch.push(Id);
          });
          if(batch.length == 0){
            alert('Select a batch!!')
            hideLoadingScreen()
            return
          }
          data = {
            batch: batch,
            course: course,
            department: [],
            description: des,
            endDate: end,
            eventFor: eventFor,
            holiday: checked,
            name: eventname,
            organizer: Organizer,
            startDate: start,
          };
        }
      } else {
        if(!des || !end || !eventFor || !checked || !eventFor || !Organizer || !start || !eventname){
          alert('All fields are required!!')
          hideLoadingScreen()
          return
        }
        if (eventFor === 'Common To All') {
          data = {
            batch: [],
            course: '',
            department: [],
            description: des,
            endDate: end,
            eventFor: eventFor,
            holiday: checked,
            name: eventname,
            organizer: Organizer,
            startDate: start,
            type: eventType,
          };
        } else if (eventFor === 'Selected Department') {
          let dept = [];
          Object.entries(checkBoxValueDept).forEach(([userId, value]) => {
            if (checkBoxValueDept[userId]) dept.push(userId);
          });
          // atleast one department should be selected
          if(dept.length == 0){
            alert('Select a department!!')
            hideLoadingScreen()
            return
          }
          data = {
            batch: [],
            course: '',
            department: dept,
            description: des,
            endDate: end,
            eventFor: eventFor,
            holiday: checked,
            name: eventname,
            organizer: Organizer,
            startDate: start,
            type: eventType,
          };
        } else if (eventFor === 'Selected Batch') {
          let batch = [];
          Object.entries(checkBoxValueBatch).forEach(([Id, value]) => {
            if (checkBoxValueBatch[Id]) batch.push(Id);
          });
          // atleast one department should be selected
          if(batch.length == 0){
            alert('Select a batch!!')
            hideLoadingScreen()
            return
          }
          data = {
            batch: batch,
            course: course,
            department: [],
            description: des,
            endDate: end,
            eventFor: eventFor,
            holiday: checked,
            name: eventname,
            organizer: Organizer,
            startDate: start,
            type: eventType,
          };
        }
      }
      let response = await post(slug, data, token);
      if (response.error) {
        alert(response.error)
      } else {
        navigation.replace('Events');
        alert('Event created!');
      }
    } catch (err) {
      alert('Cannot create event!' + err);
    }
    hideLoadingScreen()
  };

  const HandleEventForSelection = async evefor => {
    showLoadingScreen();

    try {
      setEventFor(evefor);

      if (evefor === 'Selected Batch') {
        try {
          let response = await getCourse();
          setcourses(response);
          console.log(response);
        } catch (err) {
          alert('Cannot fetch courses : ' + err);
        }
      } else if (evefor === 'Selected Department') {
        try {
          let token = await read('token');
          let response = await get('/department', token);
          let checkBoxMapDept = {};
          console.log('dept', response);
          response &&
            response.map(data => {
              checkBoxMapDept[data._id] = false;
            });
          setcheckBoxValueDept(checkBoxMapDept);
          setdepartments(response);
        } catch (err) {
          alert('Cannot fetch dept!!' + err);
        }
      }
    } catch (err) {
      alert('Error!' + err);
    }
    hideLoadingScreen();
  };

  const fetchBatches = async course => {
    showLoadingScreen();

    try {
      setcourse(course);
      let response = await getBatch(course);
      let checkBoxMapBatch = {};
      response &&
        response.map(data => {
          checkBoxMapBatch[data.key] = false;
        });
      setcheckBoxValueBatch(checkBoxMapBatch);
      setbatches(response);
      console.log(response);
    } catch (err) {
      alert('Cannot fetch batches : ' + err);
    }
    hideLoadingScreen();
  };

  //dept
  let toggleCheckBoxDept = Id => {
    setcheckBoxValueDept(prev => {
      return {
        ...prev,
        [Id]: !checkBoxValueDept[[Id]],
      };
    });
  };

  //batch
  let toggleCheckBoxBatch = Id => {
    setcheckBoxValueBatch(prev => {
      return {
        ...prev,
        [Id]: !checkBoxValueBatch[[Id]],
      };
    });
  };

  return (
    <ScrollView style={styles.container}>
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : '#FF5733',
          ...styles.header,
        }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
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
            <Text style={{ fontFamily: 'Poppins-Regular', color: '#58636D' }}>
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
              color={institute ? institute.themeColor : null}
            />
          </View>
          {checked ? null : (
            <View>
              <Text style={{ fontFamily: 'Poppins-Regular', color: '#58636D' }}>
                Event Type
              </Text>
              <ModalSelector
                data={eventTypes}
                initValue="Event Type"
                onChange={option => {
                  setEventType(option.key);
                }}
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 150,
                  height: 50,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  shadowColor: 'black',
                  shadowOpacity: 5,
                  elevation: 1,
                }}
                initValueTextStyle={styles.SelectedValue}
                selectTextStyle={styles.SelectedValue}
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
            <Text style={{ fontFamily: 'Poppins-Regular', color: '#58636D' }}>
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
            <Text style={{ fontFamily: 'Poppins-Regular', color: '#58636D' }}>
              Event For
            </Text>
            <ModalSelector
              data={eventForList}
              initValue="Event For"
              onChange={option => {
                HandleEventForSelection(option.key);
              }}
              style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                width: 150,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                shadowColor: 'black',
                shadowOpacity: 5,
                elevation: 1,
              }}
              initValueTextStyle={styles.SelectedValue}
              selectTextStyle={styles.SelectedValue}
            />
          </View>
        </View>

        {eventFor === 'Selected Batch' ? (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{ fontFamily: 'Poppins-Regular', color: '#58636D' }}>
                Course
              </Text>
              <ModalSelector
                data={courses}
                initValue="Course"
                onChange={option => {
                  fetchBatches(option.key);
                }}
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 150,
                  height: 50,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  shadowColor: 'black',
                  shadowOpacity: 5,
                  elevation: 1,
                }}
                initValueTextStyle={styles.SelectedValue}
                selectTextStyle={styles.SelectedValue}
              />
            </View>
            <View>
              <Text style={{ fontFamily: 'Poppins-Regular', color: '#58636D' }}>
                Batch
              </Text>
              <ScrollView
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  shadowColor: 'black',
                  shadowOpacity: 5,
                  elevation: 3,
                  borderWidth: 0,
                  padding: 10,
                  width: 150,
                }}>
                {batches &&
                  batches.map(batch => (
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        backgroundColor: 'white',
                      }}
                      key={batch.key}>
                      <Text
                        style={{
                          color: '#58636D',
                          fontFamily: 'Poppins-Regular',
                          paddingVertical: 10,
                        }}>
                        {''} {batch.label}
                      </Text>
                      <CheckBox
                        containerStyle={{ padding: 5 }}
                        checked={checkBoxValueBatch[batch.key]}
                        onPress={() => toggleCheckBoxBatch(batch.key)}
                        checkedColor={
                          institute ? institute.themeColor : 'black'
                        }
                      />
                      {/* <Text style={{fontSize:12,color:'blue'}}> Not Graded</Text> */}
                    </View>
                  ))}
              </ScrollView>
            </View>
          </View>
        ) : null}
        {eventFor === 'Selected Department' ? (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{ fontFamily: 'Poppins-Regular', color: '#58636D' }}>
                Department
              </Text>
              <ScrollView
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  shadowColor: 'black',
                  shadowOpacity: 5,
                  elevation: 3,
                  borderWidth: 0,
                  padding: 10,
                  width: 150,
                }}>
                {departments &&
                  departments.map(dept => (
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        backgroundColor: 'white',
                      }}
                      key={dept._id}>
                      <Text
                        style={{
                          color: '#58636D',
                          fontFamily: 'Poppins-Regular',
                          paddingVertical: 10,
                        }}>
                        {''} {dept.name}
                      </Text>
                      <CheckBox
                        containerStyle={{ padding: 5 }}
                        checked={checkBoxValueDept[dept._id]}
                        onPress={() => toggleCheckBoxDept(dept._id)}
                        checkedColor={
                          institute ? institute.themeColor : 'black'
                        }
                      />
                    </View>
                  ))}
              </ScrollView>
            </View>
          </View>
        ) : null}
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          margin: 20,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{ fontFamily: 'Poppins-Regular', color: '#58636D' }}>
            Start Date
          </Text>
          <TouchableOpacity style={styles.pickdate} onPress={showDatePicker1}>
            <Text style={{ marginTop: 15, marginLeft: 10, color: 'black' }}>
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
              mode="date"
              onConfirm={handleConfirmStart}
              onCancel={hideDatePicker1}
              style={{
                marginTop: 10,
                borderWidth: 0,
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontFamily: 'Poppins-Regular', color: '#58636D' }}>
            End Date
          </Text>
          <TouchableOpacity style={styles.pickdate} onPress={showDatePicker2}>
            <Text style={{ marginTop: 15, marginLeft: 10, color: 'black' }}>
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
              }}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisibleEnd}
              mode="date"
              onConfirm={handleConfirmEnd}
              onCancel={hideDatePicker2}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 10,
        }}>
        <Text style={{ fontFamily: 'Poppins-Regular', color: '#58636D' }}>
          Description
        </Text>
        <TextInput
          placeholder="Write description here "
          onChangeText={value => setDescription(value)}
          value={des}
          style={styles.feedbox}
          //   numberOfLines={10}
          multiline={true}
          placeholderTextColor="grey"
        />
      </View>

      <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <Button
          mode="contained"
          style={styles.ButtonView}
          color={institute ? institute.themeColor : '#5177E7'}
          onPress={handlesubmit}>
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
    width: 150,
    borderWidth: 0.5,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 5,
    elevation: 3,
    borderWidth: 0,
    padding: 10,
    height: 50,
  },
  feedbox: {
    backgroundColor: 'white',
    textAlignVertical: 'top',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: 'black',
    borderRadius: 12,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 5,
    elevation: 3,
    borderWidth: 0,
    padding: 10,
  },

  ButtonView: {
    width: 100,
    marginVertical: 15,
  },

  SelectedValue: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15,
    padding: 3,
    color: '#211C5A',
  },

  pickdate: {
    width: 150,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 5,
    elevation: 3,
    borderWidth: 0,
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
