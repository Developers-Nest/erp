import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

//modal selector
import ModalSelector from 'react-native-modal-selector';

//icons
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

//date time picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//redux
import { useSelector } from 'react-redux';


const AddVisitorsHostel = ({ navigation }) => {
  //theming
  const institute = useSelector(state => state.institute);
// dropdown values
const [userType, setUserType] = useState([])

const [courses, setCourses] = useState([])
const [batches, setBatches] = useState([])
const [users, setUsers] = useState([])
const [departments, setDepartments] = useState([])

const [usersObject, setUsersObject] = useState([])
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [date, setDate] = React.useState('29 May 2021');
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
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('VisitorsList');
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
          Add Visitors
        </Text>
      </View>
      <ScrollView>
        <View style={{ justifyContent: 'space-around', alignContent: 'center' }}>
        
        <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>User Type</Text>
                </View>
                <View style={{ marginHorizontal: 10, ...styles.shadow }}>
                    <ModalSelector
                        initValue="User Type"
                        style={styles.card2}
                        data={userType}
                        initValueTextStyle={styles.SelectedValueSmall}
                        // onChange={option => {
                        //     setSelectedUserType(option.label)
                        //     setSelectedUserTypeId(option.key)
                        // }}
                    />
                </View>

                {/* {
                    selectedUserType === 'Student' ? ( */}
                        <View>
                            <View style={{ width:'100%',paddingTop: 15, flexDirection: 'row' }}>
                                <Text style={styles.section_heading}>Course </Text>
                                <Text style={styles.section_heading4}>Batch</Text>
                                <Text style={styles.section_heading3}>Student</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }} >
                                <ModalSelector
                                    initValue="Course"
                                    style={styles.card3}
                                    initValueTextStyle={styles.SelectedValueSmall}
                                    data={courses}
                                    // onChange={option => {
                                    //     fetchBatches(option.key)
                                    // }}
                                />
                                <ModalSelector
                                    initValue="Batch"
                                    style={styles.card3}
                                    initValueTextStyle={styles.SelectedValueSmall}
                                    data={batches}
                                    // onChange={option => {
                                    //     fetchStudents(option.key)
                                    // }}
                                />
                                <ModalSelector
                                    initValue="Student"
                                    style={styles.card5}
                                    initValueTextStyle={styles.SelectedValueSmall}
                                    data={users}
                                    // onChange={option => {
                                    //     setSelectedUser(option.key)
                                    // }}
                                />
                            </View>
                        </View>
                {/* //     ) : (null)
                // }


                // {
                //     selectedUserType === 'Teacher' ? ( */}
                        <View>
                            <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                                <Text style={styles.section_heading}>Department </Text>
                                <Text style={styles.section_heading3}>Employee</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }} >
                                <ModalSelector
                                    initValue="Department"
                                    style={styles.card}
                                    initValueTextStyle={styles.SelectedValueSmall}
                                    data={departments}
                                    // onChange={option => {
                                    //     fetchEmployees(option.key)
                                    // }}
                                />
                                <ModalSelector
                                    initValue="Employee"
                                    style={styles.card1}
                                    initValueTextStyle={styles.SelectedValueSmall}
                                    data={users}
                                    // onChange={option => {
                                    //     setSelectedUser(option.key)
                                    // }}
                                />
                            </View>
                        </View>
                {/* //     ) : (null)
                // } */}
        
          {/* <View style={{ width: '100%', paddingTop: 15, flexDirection: 'row' }}>
            <Text style={styles.section_heading}>Vehicle No.</Text>
          </View>

          <View style={{ marginHorizontal: 10, ...styles.shadow }}>
            <View style={styles.search}>
              <TextInput
                style={styles.search_input}
                placeholder="Search User's name to add"
                placeholderTextColor='grey'
                color='black'
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
          </View> */}

          <View style={{ width: '100%', paddingTop: 15, flexDirection: 'row' }}>
            <Text style={styles.section_heading}>Visitor's Name </Text>
            <Text style={styles.section_heading2}>Relation</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TextInput style={styles.input}
              placeholderTextColor='grey'
              color='black'
              placeholder="Shian Manzoor" />
            <TextInput style={styles.input}
              placeholderTextColor='grey'
              color='black'
              placeholder="Brother" />
          </View>
          <View style={{ width: '100%', paddingTop: 15, flexDirection: 'row' }}>
            <Text style={styles.section_heading}>Date </Text>
            <Text style={styles.section_heading1}>Time</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.pickdate} onPress={showDatePicker}>
              <TextInput
                style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                placeholder={date}
                placeholderTextColor='grey'
                color='black'
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
            <TouchableOpacity style={styles.pickdate1}>
              <TextInput
                style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                placeholder="13.00"
                placeholderTextColor='grey'
                color='black'
              />
              <Feather
                size={18}
                color="black"
                name="calendar"
                style={{
                  marginTop: 16,
                  marginRight: 0,
                }}></Feather>
            </TouchableOpacity>
          </View>
          <View style={styles.fixToText}>
            <Pressable style={styles.button} onPress={() => console.log('Pressed')}>
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
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
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

    paddingVertical: 10,
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
    marginRight: 20,
    marginLeft:55,


    color: 'rgba(88, 99, 109, 0.85)',

    width:'33%'

},
section_heading3: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
    marginRight: 20,
    marginLeft:0,


    color: 'rgba(88, 99, 109, 0.85)',

    width:'33%'

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
    marginRight: 20,
    marginLeft:55,


    color: 'rgba(88, 99, 109, 0.85)',

    width:'33%'

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
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 30,
    paddingTop: 3,
    color: 'grey',
  },

  card: {
    width:'48%',
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
    marginLeft: 10,
    marginRight:0,
    //flexDirection: 'row',
    justifyContent: 'space-between'
},

card1: {
    width:'45%',
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
    marginLeft: 12,
    marginRight:0,
    //flexDirection: 'row',
    justifyContent: 'space-between'
},

card2: {
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
    justifyContent: 'space-between'
},

card3: {
    width:'33%',
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
    marginLeft: 7,
    marginRight:0,
    //flexDirection: 'row',
    justifyContent: 'space-between'
},
card4:{
width:'28%',
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
marginLeft: 5,
marginRight:0,
//flexDirection: 'row',
justifyContent: 'space-between'
},

card5: {
width:'28%',
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
marginLeft: 7,
marginRight:0,
//flexDirection: 'row',
justifyContent: 'space-between'
},



  header: {
    height: 69,
    flexDirection: 'row',
  },
});

export default AddVisitorsHostel;
