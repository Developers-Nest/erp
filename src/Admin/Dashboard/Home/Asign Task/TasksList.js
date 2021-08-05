import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';

import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ModalSelector from 'react-native-modal-selector';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {auto} from 'async';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//redux
import {useSelector} from 'react-redux';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';

export default function TasksList({navigation}) {
    //theming
    const institute = useSelector(state => state.institute);

  const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
  const [Time, setTime] = React.useState('15:00');
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

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleConfirm = date => {
    // console.warn("A date has been picked: ", date.toString());
    setTime(
      Time.getTime() +
        ' ' +
        TimeMonths[Time.getHour() + 1] +
        ':' +
        Time.getMinute(),
    );
    hideTimePicker();
  };

  //parse date
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(0, 15);
  };

  //data
  const [tasks, setTasks] = useState([]);

  //on load
  useEffect(async () => {
    let slug = '/task';
    const token = await read('token');
    const response = await get(slug, token);
    console.log(response);
    setTasks(response);
  }, []);
  return (
    <View style={styles.backgroung}>
      <View
        style={{backgroundColor: institute ? institute.themeColor : '#FF5733',
        ...styles.header,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
            color: 'white',
          }}>
          Task's List
        </Text>
        <View style={{flex: 1, marginLeft: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTask')}
            style={{
              justifyContent: 'center',
              flex: 1,
              alignItems: 'center',
              alignSelf: 'flex-end',
              marginTop:5,
              paddingRight: 20,
            }}>
            <IonIcon size={30} color="white" name="add-circle-outline" />
          </TouchableOpacity>
        </View>
      </View>
      {/* <Appbar>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Tasks List" />
        </Appbar> */}
      <ScrollView>
        <View style={{padding: 10}} />

        <View style={{marginHorizontal: 15, ...styles.shadow}}>
          <View style={styles.search}>
            <TextInput
              style={{...styles.search_input}}
              placeholder="Enter the driver name here"
              placeholderTextColor="grey"
              
            />
            <TouchableOpacity
              style={{
                alignSelf: 'center',
              }}>
              <Icon
                name="search-sharp"
                style={{
                  alignSelf: 'center',
                  fontSize: 30,
                  color: 'black',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{padding: 10}} />

        {tasks &&
          tasks.map(task => (
            <View style={styles.section}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <View style={styles.differentusers}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#211C5A',
                        fontFamily: 'Poppins-Regular',
                        marginHorizontal: -5,
                      }}>
                      {task.task}
                    </Text>
                  </View>
                  <View style={{padding: 5}} />
                  <View style={styles.differentusers}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: '#58636D',
                        fontFamily: 'Poppins-Regular',
                        marginHorizontal: -5,
                      }}>
                      {task.userType}
                    </Text>
                    <Text
                      style={{
                        color: '#B04305',
                        fontSize: 13,
                        fontFamily: 'Poppins-Medium',
                        fontWeight: 'bold',
                      }}>
                      {task.priority}
                      {' Priority'}
                    </Text>
                  </View>
                  <View style={{padding: 3}} />
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#58636D',
                      fontFamily: 'Poppins-Regular',
                      marginHorizontal: -5,
                    }}>
                    {task.description}
                  </Text>
                </View>
              </View>

              <View style={styles.belowhr}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: '#211C5A',
                      fontSize: 15,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {parseDate(task.taskDate)}
                  </Text>
                  <Text
                    style={{
                      position: 'relative',
                      right: 20,
                      top: 5,
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#5177E7',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {task.status}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('EditTask')}
                    style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#211C5A',
                        fontFamily: 'Poppins-Medium',
                      }}>
                      Edit
                    </Text>

                    <MaterialCommunityIcon
                      size={15}
                      color="#211C5A"
                      name="square-edit-outline"
                      style={{paddingTop: 2, paddingRight: 10}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{padding: 10}} />
              </View>
            </View>
          ))}

        <View style={{padding: 20}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroung: {
    backgroundColor: '#E5E5E5',
    height: '100%',
    flex: 1,
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
  search: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderColor: '#00499F',
    borderRadius: 8,
  },
  search_input: {
    borderRadius: 8,
    height: 59,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    paddingTop: 15,
    paddingHorizontal: 10,
    width: '90%',
    color:'black'
  },
  shadow: {
    elevation: 5,
    borderRadius: 8,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    elevation: 5,
    marginTop: 14,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 15,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 0,
    borderBottomColor: '#333',
    borderBottomWidth: 0.5,
  },
  userinhostels: {
    marginTop: 10,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    justifyContent: 'space-between',
  },
});
