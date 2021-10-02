import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import {CheckBox} from 'react-native-elements';

//selector
import ModalSelector from 'react-native-modal-selector';

//icons
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

//redux
import {useSelector} from 'react-redux';

//helpers
import getEmployee from '../../../../../services/helpers/getList/getEmployee';
import getDesignation from '../../../../../services/helpers/getList/getDesignation';
import get from '../../../../../services/helpers/request/get';
import post from '../../../../../services/helpers/request/post';
import read from '../../../../../services/localstorage/read';

//loading screen
import LoadingScreen from '../../../../../components/LoadingScreen/LoadingScreen';

const AddApplication = ({navigation}) => {
  //theming
  const institute = useSelector(state => state.institute);

  //for checkboxes
  const [checkBoxValue, setCheckBoxValue] = useState(false);

  //drop downs
  const [category, setcategory] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [duration, setDuration] = useState([
    {label: 'Single day', key: 'Single day'},
    {label: 'Multiple days', key: 'Multiple days'},
    {label: 'Half day', key: 'Half day'},
  ]);

  //user inputs
  const [cat, setcat] = useState([]);
  const [des, setDes] = useState([]);
  const [date1, setDate1] = useState(null);
  const [date, setDate] = useState(null);
  const [dur, setdur] = useState(null);
  const [empcode, setempcode] = useState(null);
  const [empid, setempid] = useState(null);
  const [reason, setreason] = useState('');

  //Date picker functions

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
  const handleConfirm = date => {
    setDate(date.toString());
    hideDatePicker();
  };

  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = date1 => {
    setDate(date.toString());
    hideDatePicker1();
  };

  //loading screen
  const [LoaadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen();

  useEffect(async () => {
    setLoadingScreen();
    try {
      let slug = `/designation`;
      let token = await read('token');
      let res = await getDesignation(slug, token);
      setDesignation(res);
    } catch (err) {
      alert('Cannot get list ' + err);
    }
    try {
      let slug = `/leavemanagement/category`;
      let token = await read('token');
      let res = await get(slug, token);
      console.log('Designation ', res);
      let categories = [];
      res.map(data => {
        categories.push({
          label: data.name,
          key: data._id,
        });
      });
      setcategory(categories);
    } catch (err) {
      alert('Cannot get list ' + err);
    }
    hideLoadingScreen();
  }, []);

  let fetchEmployees = async option => {
    setLoadingScreen();
    setDes(option);
    try {
      let slug = `/employee?designation=${option}`;
      let token = await read('token');

      let response = await get(slug, token);
      let list = [];
      response.map(employee => {
        list.push({
          key: employee.code,
          id: employee._id,
          label: employee.firstName + ' ' + employee.lastName,
        });
      });
      console.log(list);
      setEmployee(list);
    } catch (err) {
      alert('Cannot fetch employees! ' + err);
    }
    hideLoadingScreen();
  };

  let handleSubmit = async () => {
    setLoadingScreen();
    try {
      let slug = `/leavemanagement/application`;
      let token = await read('token');
      let data = {
        designation: des,
        duration: dur,
        empcode: empcode,
        employee: empid,
        fromDate: date,
        od: checkBoxValue,
        reason: reason,
        status: 'Awaiting Approval',
      };
      console.log(data);
      let res = await post(slug, data, token);
      if (res.error) {
        alert(res.error);
      } else {
        console.log('res', res);
        alert('Application created');
        navigation.replace('LeaveApplication');
      }
    } catch (err) {
      alert('Cannot create application! ' + err);
    }
    hideLoadingScreen();
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(249, 249, 249, 1)',
      }}>
      {LoaadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LeaveApplication');
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
          Add Application
        </Text>
      </View>

      <ScrollView>
        <View style={{justifyContent: 'space-around', alignContent: 'center'}}>
          {/* 1st new row */}
          <View style={{width: '100%', marginTop: 20, flexDirection: 'row'}}>
            <Text style={styles.section_heading}>Designation </Text>
            <Text style={styles.section_heading1}>Employee Name</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingHorizontal: 10}}>
              <ModalSelector
                data={designation}
                initValue="Designation"
                onChange={option => {
                  fetchEmployees(option.key);
                }}
                style={styles.card}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
            </View>
            <View style={{paddingHorizontal: 10}}>
              <ModalSelector
                data={employee}
                initValue="Employee"
                onChange={option => {
                  setempid(option.id);
                  setempcode(option.key);
                }}
                style={styles.card}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
            </View>
          </View>

          <View style={{width: '100%', marginTop: 20, flexDirection: 'row'}}>
            <Text style={styles.section_heading}>Leave Type </Text>
            <Text style={styles.section_heading1}>Leave Duration</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingHorizontal: 10}}>
              <ModalSelector
                data={category}
                initValue="category"
                onChange={option => {
                  setcat(option.key);
                }}
                style={styles.card}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
            </View>

            <View style={{paddingHorizontal: 10}}>
              <ModalSelector
                data={duration}
                initValue="duration"
                onChange={option => {
                  setdur(option.key);
                }}
                style={styles.card}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
            </View>
          </View>

          <View style={{width: '100%', paddingTop: 20, flexDirection: 'row'}}>
            <Text style={styles.section_heading}>From </Text>
            <Text style={styles.section_heading1}>To</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginHorizontal: 15, ...styles.pickdate}}
              onPress={showDatePicker}>
              <Text style={{marginTop: 15, marginLeft: 10}}>
                {parseDate(date) || 'Select Date'}
                {'  '}
              </Text>
              <Feather
                size={18}
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

            <View>
              <TextInput
                style={styles.Eventinput}
                placeholder="reason"
                placeholderTextColor="grey"
                color="black"
                value={reason}
                onChangeText={val => setreason(val)}
              />
            </View>
          </View>
          <View style={{height: 30}} />
          <CheckBox
            containerStyle={{marginTop: -9}}
            checked={checkBoxValue}
            title={'Apply for on Duty(OD)'}
            onPress={() => setCheckBoxValue(!checkBoxValue)}
          />

          <View style={styles.fixToText}>
            <Pressable
              style={{
                backgroundColor: institute ? institute.themeColor : '#5177E7',
                ...styles.button,
              }}
              onPress={handleSubmit}>
              <Text style={styles.text}>Save</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
  },

  button1: {
    marginTop: 0,
    marginBottom: 0,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
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
  text1: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#d2691e',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 4,
    elevation: 3,
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
    // borderColor: '#58636D',
    // borderRadius: 8,
    // borderWidth: 0.3,
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
  },
  section_heading4: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
    marginLeft: -100,

    color: 'rgba(88, 99, 109, 0.85)',
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
    borderRadius: 8,
    // borderColor: '#58636D',

    // borderWidth: 0.35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Poppins-Regular',
  },

  shadow: {
    elevation: 2,
    borderRadius: 0,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  pickdate: {
    width: 165,
    backgroundColor: '#FFFFFF',
    //marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  header: {
    height: 69,
    flexDirection: 'row',
  },

  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '200',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 30,
    // paddingTop: 3,

    color: 'rgba(88, 99, 109, 0.85)',
  },

  card: {
    shadowColor: '#000',
    height: 50,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 2,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    margin: 0,
    padding: 0,

    minWidth: '47%',
  },
  Eventinput: {
    width: 170,
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
    marginHorizontal: 15,
  },
});

export default AddApplication;
