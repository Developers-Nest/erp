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

//modal selector
import ModalSelector from 'react-native-modal-selector';

//icons
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

//date time picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//redux
import {useSelector} from 'react-redux';

//helpers
import LoadingScreen from '../../../../../components/LoadingScreen/LoadingScreen';
import read from '../../../../../services/localstorage/read';
import post from '../../../../../services/helpers/request/post';
import get from '../../../../../services/helpers/request/get';

const AddVisitors = ({navigation}) => {
  //theming
  const institute = useSelector(state => state.institute);

  //selector data
  const [categories, setCategories] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [students, setStudents] = useState([]);

  //form data
  const [category, setCategory] = useState();
  const [purpose, setPurpose] = useState();
  const [whomToMeet, setWhomToMeet] = useState('');
  const [name, setName] = useState('');
  const [mobNo, setMobNo] = useState();
  const [student, setStudent] = useState('');

  // loading screen
  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen();

  //on load
  useEffect(async () => {
    setLoadingScreen();
    // category
    try {
      let t = await read('token');
      let r = await read('role');
      const slug = '/visitors/category';
      const response = await get(slug, t);
      let list = [];
      response.map(category => list.push({key: category, label: category}));
      setCategories(list);
    } catch (err) {
      alert('Cannot fetch category !!' + err);
    }
    //purposes
    try {
      let t = await read('token');
      let r = await read('role');
      const slug = '/visitors/purpose';
      const response = await get(slug, t);
      let list = [];
      response.map(purpose => list.push({key: purpose, label: purpose}));
      setPurposes(list);
    } catch (err) {
      alert('Cannot fetch purpose !!' + err);
    }
    //students
    try {
      let t = await read('token');
      let r = await read('role');
      const slug = '/student/course';
      const response = await get(slug, t);
      let list = [];
      let index = 1;
      response.map(student =>
        list.push({
          key: student._id,
          label: student.firstName + ' ' + student.lastName,
        }),
      );
      setStudents(list);
    } catch (err) {
      alert('Cannot fetch Students !!' + err);
    }
    hideLoadingScreen();
  }, []);

  // save details
  const HandleAdd = async () => {
    try {
      let slug = `/visitors/add`;
      console.log('Visitor add slug', slug);
      let token = await read('token');
      let data = {
        category: category,
        purpose: purpose,
        name: name,
        user: student,
        whomToMeet: whomToMeet,
      };
      console.log(data);
      let response = await post(slug, data, token);
      alert('Visitor created!');
    } catch (err) {
      alert('Cannot create occurance!' + err);
    }
  };

  //date picker
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
    // console.warn('A date has been picked: ', date.toString());
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
            navigation.navigate('SettingUsers');
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
        <View style={{justifyContent: 'space-around', alignContent: 'center'}}>
          <View style={{width: '100%', marginTop: 20, flexDirection: 'row'}}>
            <Text style={styles.section_heading}>Category </Text>
            <Text style={styles.section_heading1}>Purpose</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingHorizontal: 10}}>
              <ModalSelector
                data={categories}
                initValue="Student"
                onChange={option => {
                  setCategory(option.label);
                }}
                style={styles.card}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
            </View>

            <View style={{paddingHorizontal: 10}}>
              <ModalSelector
                data={purposes}
                initValue="Casual Meet"
                onChange={option => {
                  setPurpose(option.label);
                }}
                style={styles.card}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
            </View>
          </View>

          <View style={{width: '100%', paddingTop: 15, flexDirection: 'row'}}>
            <Text style={styles.section_heading}>Visitor's Name </Text>
            <Text style={styles.section_heading1}>Phone Number</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholderTextColor="grey"
              style={[styles.input, styles.shadow]}
              placeholder="Shian Manzoor"
              onChangeText={name => {
                setName(name);
              }}
            />
            <TextInput
              placeholderTextColor="grey"
              style={[styles.input, styles.shadow]}
              placeholder="Brother"
            />
          </View>
          <View style={{width: '100%', paddingTop: 15, flexDirection: 'row'}}>
            <Text style={styles.section_heading}>Student </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingHorizontal: 10}}>
              <ModalSelector
                data={students}
                initValue="Student"
                onChange={option => {
                  setStudent(option.label);
                }}
                style={styles.card}
                initValueTextStyle={styles.SelectedValueSmall}
                selectTextStyle={styles.SelectedValueSmall}
              />
            </View>
          </View>
          <View style={{width: '100%', paddingTop: 15, flexDirection: 'row'}}>
            <Text style={styles.section_heading}>Whom To Meet</Text>
            <Text style={styles.section_heading2}>Date</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholderTextColor="grey"
              style={[styles.input, styles.shadow]}
              onChangeText={who => setWhomToMeet(who)}
              placeholder="Safi Ahmed"
            />
            <TouchableOpacity
              style={[styles.pickdate, styles.shadow]}
              onPress={showDatePicker}>
              <TextInput
                style={{marginLeft: 0, fontFamily: 'Poppins-Regular'}}
                placeholder={date}
                placeholderTextColor="grey"
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
            <TouchableOpacity style={[styles.button]} onPress={HandleAdd}>
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
    //color:institute ? institute.themeColor : "#5177E7",
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
    width: 120,
    fontFamily: 'Poppins-Regular',
    height: 50,
    backgroundColor: 'white',
    borderColor: '#58636D',
    borderRadius: 8,
    // borderWidth: 0.3,
    marginLeft: 12,
    marginRight: 10,
    paddingHorizontal: 20,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  header: {
    height: 69,
    flexDirection: 'row',
  },
  SelectedValue: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 27,
    padding: 10,
    color: 'rgba(88, 99, 109, 0.85)',
  },
  SelectedValueSmall: {
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

    minWidth: '48%',
  },
});

export default AddVisitors;
