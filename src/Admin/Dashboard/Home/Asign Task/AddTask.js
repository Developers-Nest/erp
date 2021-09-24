import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';

import ModalSelector from 'react-native-modal-selector';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//checkbox
import {CheckBox} from 'react-native-elements';

// loading screen
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

// helpers
import get from '../../../../services/helpers/request/get';
import post from '../../../../services/helpers/request/post';
import read from '../../../../services/localstorage/read';
import getEmployee from '../../../../services/helpers/getList/getEmployee';
import getUsertypelist from '../../../../services/helpers/getList/getUsertype';
import getCourse from '../../../../services/helpers/getList/getCourse';
import getBatch from '../../../../services/helpers/getList/getBatch';
import getStudents from '../../../../services/helpers/getList/getStudents';

// redux
import {useSelector} from 'react-redux';

export default function AddTask({navigation}) {
  //theming
  const institute = useSelector(state => state.institute);

  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  //modal lists
  const [Priority, setPriority] = useState([
    {key: 'low', label: 'Low'},
    {key: 'medium', label: 'Medium'},
    {key: 'high', label: 'High'},
  ]);

  const [Usertypelist, setUsertypelist] = useState([]);
  const [Statuses, setUserStatuses] = useState([
    {key: 'open', label: 'Open'},
    {key: 'close', label: 'Close'},
  ]);

  //data
  const [Usertype, setUserType] = useState('');
  const [Usertypeid, setUserTypeID] = useState('');
  const [Status, setUserStatus] = useState('');
  const [PrioritySelected, setPrioritySelected] = useState('');
  const [desc, setDesc] = useState('');
  const [name, setName] = useState('');

  //student modal lists
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);

  //student data
  const [course, setCourse] = useState([]);
  const [batch, setBatch] = useState([]);
  const [selectedStudents, setselectedStudents] = useState([]);

  //student checkboxes
  const [checkBoxValueStud, setcheckBoxValueStud] = useState({});

  //student
  let toggleCheckBoxStud = Id => {
    setcheckBoxValueStud(prev => {
      return {
        ...prev,
        [Id]: !checkBoxValueStud[[Id]],
      };
    });
  };

  //teacher list
  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);

  //teacher data
  const [department, setDepartment] = useState('');
  const [selectedTeachers, setselectedTeachers] = useState([]);

  //teacher checkboxes
  const [checkBoxValueTeacher, setcheckBoxValueTeacher] = useState({});

  //teacher
  let toggleCheckBoxTeacher = Id => {
    setcheckBoxValueTeacher(prev => {
      return {
        ...prev,
        [Id]: !checkBoxValueTeacher[[Id]],
      };
    });
  };

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [date, setDate] = React.useState();

  //date picker
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(4, 15);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    // console.warn("A date has been picked: ", date.toString());
    setDate(date.toString());
    hideDatePicker();
  };

  //modal data
  const [emp, setEmp] = React.useState([]);

  //on load
  useEffect(async () => {
    showLoadingScreen();
    try {
      let list = await getUsertypelist();
      setUsertypelist(list);
      console.log(list);
    } catch (err) {
      alert('Cannot fetch usertype list !!\n' + err);
    }
    hideLoadingScreen();
  }, []);

  // handle student type
  const handlestudentcourses = async option => {
    showLoadingScreen();
    try {
      console.log('user', option);
      setUserType(option.key);
      setUserTypeID(option.id);
      let list = await getCourse();
      setCourses(list);
    } catch (err) {
      alert('Cannot fetch course list !!\n' + err);
    }
    hideLoadingScreen();
  };

  const handlestudentbatches = async option => {
    showLoadingScreen();

    try {
      setCourse(option);
      let list = await getBatch(option);
      setBatches(list);
    } catch (err) {
      alert('Cannot fetch batch list !!\n' + err);
    }
    hideLoadingScreen();
  };

  const handlestudentStudents = async option => {
    showLoadingScreen();

    try {
      setBatch(option);
      let list = await getStudents(course, option);
      console.log(list);
      let checkBoxMapStud = {};
      list &&
        list.map(data => {
          checkBoxMapStud[data.key] = false;
        });
      setcheckBoxValueStud(checkBoxMapStud);
      setStudents(list);
    } catch (err) {
      alert('Cannot fetch batch list !!\n' + err);
    }
    hideLoadingScreen();
  };

  // handle teacher type
  const handleTeacherdept = async option => {
    showLoadingScreen();
    try {
      setUserType(option.key);
      setUserTypeID(option.id);
      let token = await read('token');
      let response = await get('/department', token);
      let list = [];
      response.map(dept => list.push({key: dept._id, label: dept.name}));
      setDepartments(list);
    } catch (err) {
      alert('Cannot fetch course list !!\n' + err);
    }
    hideLoadingScreen();
  };

  const handleTeacherTeachers = async option => {
    showLoadingScreen();
    try {
      setDepartment(option);
      let slug = `/employee?department=${option}&userType=${Usertypeid}`;
      let token = await read('token');
      let list = await get(slug, token);
      let checkBoxMapTeacher = {};
      list &&
        list.map(data => {
          checkBoxMapTeacher[data.key] = false;
        });
      setcheckBoxValueTeacher(checkBoxMapTeacher);
      setTeachers(list);
    } catch (err) {
      alert('Cannot fetch course list !!\n' + err);
    }
    hideLoadingScreen();
  };

  // save details
  const handlesubmit = async () => {
    showLoadingScreen();
    try {
      let slug = `/task/add`;
      let token = await read('token');
      let data;

      if (Usertype === 'Student') {
        let students = [];
        Object.entries(checkBoxValueStud).forEach(([userId, value]) => {
          if (checkBoxValueStud[userId]) students.push(userId);
        });

        if (
          !batch ||
          !course ||
          !desc ||
          !PrioritySelected ||
          !Status ||
          !name ||
          !date ||
          !Usertypeid
        ) {
          alert('All fields are required!!');
          hideLoadingScreen();
          return;
        }

        data = {
          batch: batch,
          course: course,
          description: desc,
          priority: PrioritySelected,
          status: Status,
          task: name,
          taskDate: date,
          user: students,
          userType: Usertypeid,
        };
        console.log(data);
      } else if (Usertype === 'Teacher') {
        let teachers = [];
        Object.entries(checkBoxValueTeacher).forEach(([userId, value]) => {
          if (checkBoxValueTeacher[userId]) teachers.push(userId);
        });

        if (
          !department ||
          !desc ||
          !PrioritySelected ||
          !Status ||
          !name ||
          !date ||
          !Usertypeid
        ) {
          alert('All fields are required!!');
          hideLoadingScreen();
          return;
        }

        data = {
          department: department,
          description: desc,
          priority: PrioritySelected,
          status: Status,
          task: name,
          taskDate: date,
          user: teachers,
          userType: Usertypeid,
        };
        console.log(data);
      }
      else{
        alert('All fields are required!!');
        hideLoadingScreen();
        return;
      }

      let response = await post(slug, data, token);
      if (response.error) {
        alert(response.error);
        console.log(response);
      } else {
        navigation.replace('TasksList');
        alert('Task created!');
      }
    } catch (err) {
      alert('Cannot create Task!' + err);
    }
    hideLoadingScreen();
  };

  return (
    <View style={styles.backgroung}>
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : '#FF5733',
          ...styles.header,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('TasksList')}>
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
          Assign Task
        </Text>
      </View>
      <ScrollView>
        <View style={{padding: 5}} />

        <View
          style={{
            width: '100%',
            paddingTop: 10,
            paddingLeft: '8%',
            flexDirection: 'row',
          }}>
          <Text style={styles.section_heading3}>Add Task's Name</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingBottom: 10,
            paddingHorizontal: 10,
          }}>
          <View style={styles.Card3}>
            <View style={styles.CardContent}>
              <TextInput
                placeholder="Name of the task"
                placeholderTextColor="grey"
                color="black"
                onChangeText={text => setName(text)}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            paddingTop: 10,
            paddingLeft: '8%',
            flexDirection: 'row',
          }}>
          <Text style={styles.section_heading3}>Description</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingHorizontal: 10,
            paddingBottom: 10,
          }}>
          <View style={styles.Card3}>
            <View style={styles.CardContent}>
              <TextInput
                placeholder="Write the description here . . . ."
                placeholderTextColor="grey"
                color="black"
                onChangeText={text => setDesc(text)}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            paddingTop: 10,
            flexDirection: 'row',
            alignContent: 'flex-start',
            justifyContent: 'space-evenly',
          }}>
          <Text style={styles.section_heading}>Priority </Text>
          <Text style={styles.section_heading1}>Date</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 25,
          }}>
          <ModalSelector
            data={Priority}
            initValue="Active"
            onChange={async option => {
              await setPrioritySelected(option.key);
            }}
            style={{
              backgroundColor: 'white',
              justifyContent: 'center',
              width: 150,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              shadowColor: 'black',
              shadowOpacity: 5,
              elevation: 3,
            }}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
          <View>
            <TouchableOpacity style={styles.pickdate} onPress={showDatePicker}>
              <Text style={{marginTop: 15, marginLeft: 20, color: 'black'}}>
                {(date && parseDate(date)) || 'Choose date'}
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
                style={{
                  marginTop: 10,
                  borderWidth: 0,
                }}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{padding: 10}} />

        <View
          style={{
            width: '100%',
            paddingTop: 10,
            flexDirection: 'row',
            alignContent: 'flex-start',
            justifyContent: 'space-evenly',
          }}>
          <Text style={styles.section_heading}>Usertypelist </Text>
          <Text style={styles.section_heading1}>Status</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 25,
          }}>
          <ModalSelector
            data={Usertypelist}
            initValue="Teacher"
            onChange={async option => {
              if (option.label === 'Student') {
                await handlestudentcourses(option);
              } else await handleTeacherdept(option);
            }}
            style={{
              backgroundColor: 'white',
              justifyContent: 'center',
              width: 150,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              shadowColor: 'black',
              shadowOpacity: 5,
              elevation: 3,
            }}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
          <ModalSelector
            data={Statuses}
            initValue="Status"
            onChange={async option => {
              await setUserStatus(option.key);
            }}
            style={{
              backgroundColor: 'white',
              justifyContent: 'center',
              width: 150,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              shadowColor: 'black',
              shadowOpacity: 5,
              elevation: 3,
            }}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>
        {Usertype === 'Student' && (
          <>
            <View
              style={{
                width: '100%',
                paddingTop: 20,
                flexDirection: 'row',
                alignContent: 'flex-start',
                justifyContent: 'space-evenly',
              }}>
              <Text style={styles.section_heading}>Choose Course </Text>
              <Text style={styles.section_heading1}>Choose Batch</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 25,
              }}>
              <ModalSelector
                data={courses}
                initValue="course"
                onChange={async option => {
                  await handlestudentbatches(option.key);
                }}
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 150,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  shadowColor: 'black',
                  shadowOpacity: 5,
                  elevation: 3,
                }}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
              <ModalSelector
                data={batches}
                initValue="batch"
                onChange={async option => {
                  await handlestudentStudents(option.key);
                }}
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 150,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  shadowColor: 'black',
                  shadowOpacity: 5,
                  elevation: 3,
                }}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
            </View>
            <View
              style={{
                width: '100%',
                paddingTop: 20,
                paddingHorizontal: 25,
              }}>
              <Text style={styles.section_heading}>Choose Student </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 25,
              }}>
              <View style={styles.section}>
                {students &&
                  students.map(student => (
                    <View style={styles.details} key={student._id}>
                      <View style={styles.userinhostels}>
                        <TouchableOpacity style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {student.firstName + ' ' + student.lastName ||
                              'Name Not Found'}
                          </Text>
                          <View style={{marginRight: 20}}>
                            <CheckBox
                              containerStyle={{padding: 5}}
                              checked={checkBoxValueStud[student._id]}
                              onPress={() => toggleCheckBoxStud(student._id)}
                              checkedColor={
                                institute ? institute.themeColor : 'black'
                              }
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          </>
        )}
        {Usertype === 'Teacher' && (
          <>
            <View
              style={{
                width: '100%',
                paddingTop: 10,
                flexDirection: 'row',
                alignContent: 'flex-start',
                justifyContent: 'space-evenly',
              }}>
              <Text style={styles.section_heading}>Choose Department </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 25,
              }}>
              <ModalSelector
                data={departments}
                initValue="Department"
                onChange={async option => {
                  await handleTeacherTeachers(option.key);
                }}
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 150,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  shadowColor: 'black',
                  shadowOpacity: 5,
                  elevation: 3,
                }}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
            </View>
            <View
              style={{
                width: '100%',
                paddingTop: 10,
                flexDirection: 'row',
                alignContent: 'flex-start',
                justifyContent: 'space-evenly',
              }}>
              <Text style={styles.section_heading}>Choose Teachers </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 25,
              }}>
              {teachers &&
                teachers.map(teacher => (
                  <View style={styles.section} key={teacher._id}>
                    <View style={styles.details}>
                      <View style={styles.userinhostels}>
                        <TouchableOpacity style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 22,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {teacher.firstName + ' ' + teacher.lastName ||
                              'Name Not Found'}
                          </Text>
                          <View style={{marginRight: 20}}>
                            <CheckBox
                              containerStyle={{padding: 5}}
                              checked={checkBoxValueTeacher[teacher._id]}
                              onPress={() => toggleCheckBoxTeacher(teacher._id)}
                              checkedColor={
                                institute ? institute.themeColor : 'black'
                              }
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          </>
        )}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <Button
            style={{width: 90}}
            color={institute ? institute.themeColor : '#5177E7'}
            mode="contained"
            onPress={handlesubmit}>
            SAVE
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroung: {
    backgroundColor: 'rgba(249, 249, 249, 1)',
    height: '100%',
    flex: 1,
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#58636D',

    color: '#F9F9F9',
    padding: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 30,
    paddingTop: 3,
    color: '#505069',
  },
  section_heading: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    width: 160,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'left',
    color: 'rgba(88, 99, 109, 0.85)',

    marginBottom: 5,
  },
  section_heading1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    width: 160,
    paddingLeft: 10,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'left',
    color: 'rgba(88, 99, 109, 0.85)',

    marginBottom: 5,
  },
  section_heading2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    width: 210,
    paddingLeft: '0%',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'left',
    color: 'rgba(88, 99, 109, 0.85)',
    marginBottom: 5,
  },
  section_heading3: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    width: 210,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'left',
    color: 'rgba(88, 99, 109, 0.85)',
    marginBottom: 5,
  },
  card_picker: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    elevation: 3,
    width: '40%',
  },
  Card: {
    backgroundColor: 'white',
    width: '40%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: '#00499F',
    borderRadius: 8,
  },
  Card1: {
    backgroundColor: 'white',
    width: '30%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: '#00499F',
    borderRadius: 8,
  },
  Card2: {
    backgroundColor: 'white',
    width: '50%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: '#00499F',
    borderRadius: 8,
  },
  Card3: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: '#00499F',
    borderRadius: 8,
    elevation: 3,
  },
  CardContent: {
    borderRadius: 8,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    width: '90%',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 10,
    borderRadius: 12,

    padding: 10,
    marginLeft: 2,
    marginHorizontal: 15,
    width: '99%',
  },

  details: {
    display: 'flex',
    flexDirection: 'column',

    borderBottomColor: '#333',
  },
  userinhostels: {
    marginTop: 1,
    marginHorizontal: 10,
  },
  userinhostels2: {
    marginTop: -3,
    marginHorizontal: 10,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    justifyContent: 'space-between',
  },
});
