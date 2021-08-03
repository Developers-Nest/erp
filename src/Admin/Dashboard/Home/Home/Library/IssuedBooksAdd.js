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

// helpers
import get from '../../../../../services/helpers/request/get';
import post from '../../../../../services/helpers/request/post';
import read from '../../../../../services/localstorage/read';
import getUsertypelist from '../../../../../services/helpers/getList/getUsertype';
import getCourse from '../../../../../services/helpers/getList/getCourse';
import getBatch from '../../../../../services/helpers/getList/getBatch';
import getStudents from '../../../../../services/helpers/getList/getStudents';

const IssuedBooksAdd = ({navigation}) => {
  //theming
  const institute = useSelector(state => state.institute);
  const [books, setBooks] = useState([]);
  const [user, setuser] = useState([
    {label: 'Fiction', key: 'Fiction'},
    {label: 'Philosophy', key: 'Philosophy'},
    {label: 'history', key: 'History'},
  ]);
  const [department, setdepartment] = useState([
    {label: 'Fiction', key: 'Fiction'},
    {label: 'Philosophy', key: 'Philosophy'},
    {label: 'history', key: 'History'},
  ]);
  const [employee, setemployee] = useState([
    {label: 'Fiction', key: 'Fiction'},
    {label: 'Philosophy', key: 'Philosophy'},
    {label: 'history', key: 'History'},
  ]);
  const [Usertypelist, setUsertypelist] = useState([]);
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
          });
        });
      console.log(list);
      setBooks(list);
    } catch (err) {
      alert('Cannot get Book categories!!');
    }
    try {
      let list = await getUsertypelist();
      setuser(list);
    } catch (err) {
      alert('Cannot fetch usertype list !!\n' + err);
    }
  }, []);

  let fetchUserType = async () => {
    showLoadingScreen();

    hideLoadingScreen();
  };

  //   let handleSubmit = async () => {
  //     try {
  //         let slug = '/library/books'
  //         let token = await read('token')
  //         let data = {
  //             author: author,
  //             billNumber: billNo,
  //             bookNumber: bookNo,
  //             category: bookCategory,
  //             condition: bookCondition,
  //             copies: copies,
  //             cost: bookCost,
  //             edition: edition,
  //             inbn: isbn,
  //             language: language,
  //             position: position,
  //             publisher: publisher,
  //             purchaseDate: date,
  //             shelf: shelf,
  //             title: title
  //         }
  //         console.log('Books Data ', data)
  //         let res = await post(slug, data, token)
  //         console.log('Book Res ', res)
  //     } catch (err) {
  //         alert('Cannot Save !!' + err)
  //     }
  // }

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [date, setDate] = React.useState('29 May 2021');
  const [dateissued, setDateissued] = React.useState('21 May 2021');
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
    // console.warn("A date has been picked: ", date.toString());
    setDate(
      date.getDate() +
        ' ' +
        dateMonths[date.getMonth() + 1] +
        ' ' +
        date.getFullYear(),
    );
    hideDatePicker();
  };
  const handleConfirmissued = dateissued => {
    // console.warn("A date has been picked: ", dateissued.toString());
    setDateissued(
      dateissued.getDate() +
        ' ' +
        dateMonths[dateissued.getMonth() + 1] +
        ' ' +
        dateissued.getFullYear(),
    );
    hideDatePicker();
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
            navigation.navigate('LibraryMain');
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
          {/* <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>Vechile No.</Text>
                </View> */}

          <View
            style={{marginHorizontal: 10, paddingTop: 20, ...styles.shadow}}>
            <View style={styles.search}>
              <TextInput
                style={{
                  marginTop: 10,
                  ...styles.search_input,
                  fontFamily: 'Poppins-Regular',
                }}
                placeholder="Enter book name or ID here"
                placeholderTextColor="grey"
                color="black"
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
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 15,
            }}>
            <ModalSelector
              data={books}
              initValue="Select User Type"
              onChange={option => {
                // setclass(option.key);
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
              data={user}
              initValue="Select User Type"
              onChange={option => {
                // setclass(option.key);
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
              data={department}
              initValue="Select department Type"
              onChange={option => {
                // setclass(option.key);
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
              data={employee}
              initValue="Select employee Type"
              onChange={option => {
                // setclass(option.key);
              }}
              style={styles.card}
              initValueTextStyle={styles.SelectedValue}
              selectTextStyle={styles.SelectedValue}
            />
          </View>
          {/* 3rd row starts */}
          <View style={{width: '100%', paddingTop: 15, flexDirection: 'row'}}>
            <Text style={styles.section_heading}>Issued On </Text>
            <Text style={styles.section_heading1}>Due On</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.pickdate} onPress={showDatePicker}>
              <TextInput
                style={{marginLeft: 0, fontFamily: 'Poppins-Regular'}}
                placeholder={dateissued}
                placeholderTextColor="grey"
                color="black"
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
                onConfirm={handleConfirmissued}
                onCancel={hideDatePicker}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickdate} onPress={showDatePicker}>
              <TextInput
                style={{marginLeft: 0, fontFamily: 'Poppins-Regular'}}
                placeholder={date}
                placeholderTextColor="grey"
                color="black"
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
          </View>
          <View style={styles.fixToText}>
            <Pressable style={styles.button}>
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
  // SelectedValue: {
  //     fontFamily: 'Poppins-Regular',
  //     fontStyle: 'normal',
  //     fontWeight: 'normal',
  //     fontSize: 18,
  //     lineHeight: 27,
  //     padding: 10,
  //     color: 'rgba(88, 99, 109, 0.85)',
  //   },
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
    // justifyContent: 'center',
    // alignContent:'center',
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
