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

//modal
import ModalSelector from 'react-native-modal-selector';

//icons
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

//redux
import {useSelector} from 'react-redux';

// loading screen
import LoadingScreen from '../../../../../components/LoadingScreen/LoadingScreen';

// helpers
import get from '../../../../../services/helpers/request/get';
import post from '../../../../../services/helpers/request/post';
import read from '../../../../../services/localstorage/read';
import getUsertypelist from '../../../../../services/helpers/getList/getUsertype';
import getCourse from '../../../../../services/helpers/getList/getCourse';
import getBatch from '../../../../../services/helpers/getList/getBatch';
import getStudents from '../../../../../services/helpers/getList/getStudents';

const IssuedBooksAdd = ({navigation}) => {
  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  //theming
  const institute = useSelector(state => state.institute);

  //modal selector values
  const [books, setBooks] = useState([]);
  const [users, setusers] = useState([]);

  //EMPLOYEE TYPE modal selector
  const [departments, setdepartments] = useState([]);
  const [employees, setemployees] = useState([]);

  //STUDENT TYPE modal selector
  const [courses, setcourses] = useState([]);
  const [batches, setbatches] = useState([]);
  const [students, setstudents] = useState([{key: 'hi', label: 'hi'}]);

  //data to be sent
  const [book, setBook] = useState();
  const [bookNo, setBookNo] = useState();
  const [user, setuser] = useState();
  const [userID, setuserID] = useState();
  const [department, setdepartment] = useState([]);
  const [employee, setemployee] = useState([]);
  const [due, setdue] = useState();
  const [issue, setissue] = useState();
  const [course, setcourse] = useState();
  const [batch, setbatch] = useState();
  const [student, setstudent] = useState([]);

  //on load
  useEffect(async () => {
    try {
      let slug = '/library/books';
      let token = await read('token');
      let res = await get(slug, token);
      let list = [];
      res &&
        res.map(cat => {
          list.push({
            label: cat.bookNumber + ' - ' + cat.title,
            key: cat._id,
            no: cat.bookNumber,
          });
        });
      console.log(list);
      setBooks(list);
    } catch (err) {
      alert('Cannot get Book categories!!');
    }
    try {
      let list = await getUsertypelist();
      setusers(list);
    } catch (err) {
      alert('Cannot fetch usertype list !!');
    }
  }, []);

  //EMPLOYEE Type fetch department
  let fetchDepartment = async (option, id) => {
    showLoadingScreen();
    try {
      setuser(option);
      setuserID(id);
      let slug = '/department';
      let token = await read('token');
      let res = await get(slug, token);
      let list = [];
      res &&
        res.map(cat => {
          list.push({
            label: cat.name,
            key: cat._id,
          });
        });
      console.log(list);
      setdepartments(list);
    } catch (err) {
      alert('Cannot fetch departmenr list !!');
    }
    hideLoadingScreen();
  };

  //EMPLOYEE Type fetch employees
  let fetchEmployees = async option => {
    showLoadingScreen();
    try {
      setdepartment(option);
      let slug = `/employee?department=${option}`;
      let token = await read('token');
      let res = await get(slug, token);
      let list = [];
      res &&
        res.map(cat => {
          list.push({
            label: cat.firstName + ' ' + cat.lastName,
            key: cat._id,
          });
        });
      console.log(list);
      setemployees(list);
    } catch (err) {
      alert('Cannot fetch employee list !!');
    }
    hideLoadingScreen();
  };

  //STUDENT Type fetch courses
  let fetchCourses = async (option, id) => {
    showLoadingScreen();
    try {
      setuser(option);
      setuserID(id);
      let list = await getCourse();
      setcourses(list);
    } catch (err) {
      alert('Cannot fetch courses list !!');
    }
    hideLoadingScreen();
  };

  //STUDENT Type fetch batches
  let fetchBatches = async option => {
    showLoadingScreen();
    try {
      setcourse(option);
      let list = await getBatch(option);
      setbatches(list);
    } catch (err) {
      alert('Cannot fetch batches list !!');
    }
    hideLoadingScreen();
  };

  //STUDENT Type fetch students
  let fetchStudents = async option => {
    showLoadingScreen();
    try {
      setbatch(option);
      let res = await getStudents(course, option);
      let list = [];

      res.map(cat => {
        list.push({
          label: cat.firstName,
          key: cat._id,
        });
      });
      console.log('students list', list);
      setstudents(list);
    } catch (err) {
      alert('Cannot fetch students list !!' + err);
    }
    hideLoadingScreen();
  };

  //date display
  const [datedisplayDue, setdatedisplayDue] = useState();
  const [datedisplayIssued, setdatedisplayIssued] = useState();

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

  let handleSubmit = async () => {
    try {
      let slug = '/library/issue';
      let token = await read('token');
      let data;
      if (user === 'Student')
        data = {
          batch: batch,
          bookName: book,
          bookNumber: bookNo,
          course: course,
          dueDate: due,
          issueDate: issue,
          returned: false,
          student: student,
          userId: student,
          userType: userID,
        };
      else
        data = {
          bookName: book,
          bookNumber: bookNo,
          department: department,
          dueDate: due,
          issueDate: issue,
          employee: employee,
          returned: false,
          userId: employee,
          userType: userID,
        };
      console.log('Issue Data ', data);
      let res = await post(slug, data, token);
      console.log('Issue Res ', res);
      alert('Issued!!');
    } catch (err) {
      alert('Cannot Save !!' + err);
    }
  };
  return (
    <View style={{justifyContent: 'center', alignContent: 'center'}}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.replace('LibraryMain');
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
          Issue Books
        </Text>
      </View>
      <ScrollView>
        <View style={{justifyContent: 'space-around', alignContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 15,
            }}>
            <ModalSelector
              data={books}
              initValue="Select Book"
              onChange={option => {
                setBook(option.key);
                setBookNo(option.no);
              }}
              style={styles.card}
              initValueTextStyle={styles.SelectedValue}
              selectTextStyle={styles.SelectedValue}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 15,
            }}>
            <ModalSelector
              data={users}
              initValue="Select User Type"
              onChange={option => {
                if (option.label === 'Student')
                  fetchCourses(option.key, option.id);
                else fetchDepartment(option.key, option.id);
              }}
              style={styles.card}
              initValueTextStyle={styles.SelectedValue}
              selectTextStyle={styles.SelectedValue}
            />
          </View>
          {user === 'Student' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingTop: 15,
                }}>
                <ModalSelector
                  data={courses}
                  initValue="Select course"
                  onChange={option => {
                    fetchBatches(option.key);
                  }}
                  style={styles.card}
                  initValueTextStyle={styles.SelectedValue}
                  selectTextStyle={styles.SelectedValue}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingTop: 15,
                }}>
                <ModalSelector
                  data={batches}
                  initValue="Select batch"
                  onChange={option => {
                    fetchStudents(option.key);
                  }}
                  style={styles.card}
                  initValueTextStyle={styles.SelectedValue}
                  selectTextStyle={styles.SelectedValue}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingTop: 15,
                }}>
                <ModalSelector
                  data={students}
                  initValue="Select student"
                  onChange={option => {
                    setstudent(option.key);
                  }}
                  style={styles.card}
                  initValueTextStyle={styles.SelectedValue}
                  selectTextStyle={styles.SelectedValue}
                />
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingTop: 15,
                }}>
                <ModalSelector
                  data={departments}
                  initValue="Select department"
                  onChange={option => {
                    fetchEmployees(option.key);
                  }}
                  style={styles.card}
                  initValueTextStyle={styles.SelectedValue}
                  selectTextStyle={styles.SelectedValue}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingTop: 15,
                }}>
                <ModalSelector
                  data={employees}
                  initValue="Select employee"
                  onChange={option => {
                    setemployee(option.key);
                  }}
                  style={styles.card}
                  initValueTextStyle={styles.SelectedValue}
                  selectTextStyle={styles.SelectedValue}
                />
              </View>
            </>
          )}

          {/* 3rd row starts */}
          <View style={{width: '100%', paddingTop: 15, flexDirection: 'row'}}>
            <Text style={styles.section_heading}>Issued On </Text>
            <Text style={styles.section_heading1}>Due On</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.pickdate} onPress={showDatePicker1}>
              <Text style={{marginTop: 15, marginLeft: 10,color:'black'}}>
                {datedisplayIssued}
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
                isVisible={isDatePickerVisibleIssue}
                style={styles.pickdate}
                mode="date"
                onConfirm={handleConfirmIssued}
                onCancel={hideDatePicker1}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickdate} onPress={showDatePicker2}>
              <Text style={{marginTop: 15, marginLeft: 10,color:'black'}}>
                {datedisplayDue}
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
                isVisible={isDatePickerVisibleDue}
                style={styles.pickdate}
                mode="date"
                onConfirm={handleConfirmDue}
                onCancel={hideDatePicker2}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.fixToText}>
            <TouchableOpacity style={{backgroundColor: institute? institute.themeColor: 'blue', ...styles.button}} onPress={handleSubmit}>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
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
    fontWeight: '200',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 30,
    paddingTop: 3,
    color: 'rgba(88, 99, 109, 0.85)',
  },

  card: {
    shadowColor: '#999',
    height: 50,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    width: '94%',
  },

  header: {
    height: 69,
    flexDirection: 'row',
  },
});

export default IssuedBooksAdd;
