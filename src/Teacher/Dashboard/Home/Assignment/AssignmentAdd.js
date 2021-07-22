// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import {Card, Button} from 'react-native-paper';
// import ModalSelector from 'react-native-modal-selector';

// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// // date picker
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// // helpers
// import get from '../../../../services/helpers/request/get';
// import read from '../../../../services/localstorage/read';
// import getBatch from '../../../../services/helpers/getList/getBatch';
// import getCourse from '../../../../services/helpers/getList/getCourse';
// import getSubject from '../../../../services/helpers/getList/getSubject';
// import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
// import patch from '../../../../services/helpers/request/patch';
// import post from '../../../../services/helpers/request/post';

// // redux
// import {useSelector} from 'react-redux';

// //file picker
// import FilePickerManager from 'react-native-file-picker';

// export default function AddAssignments({navigation}) {
//   //theming
//   const institute = useSelector(state => state.institute);

//   // data array
//   const [batches, setBatches] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [subjects, setSubjects] = useState([]);

//   // selected values
//   const [batch, setBatch] = useState(null);
//   const [course, setCourse] = useState(null);
//   const [subject, setSubject] = useState(null);
//   const [date, setDate] = useState(new Date(1598051730000));
//   const [dateString, setDateString] = useState(
//     new Date(1598051730000).toString(),
//   );

//   // input values
//   const [title, setTitle] = useState('');
//   const [desc, setDesc] = useState('');

//   const [showdatePicker, setShowDatePicker] = useState(false);

//   // loading screem
//   const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

//   useEffect(async () => {
//     showLoadingScreen();
//     try {
//       let courseArray = await getCourse();
//       setCourses(courseArray);
//     } catch (err) {
//       alert('Error in Getting Your Courses!!');
//     }
//     hideLoadingScreen();
//   }, []);

//   let getBatches = async sc => {
//     showLoadingScreen();
//     setCourse(sc);
//     try {
//       let batchArray = await getBatch(sc);
//       setBatches(batchArray);
//     } catch (err) {
//       alert('Cannot get your Batches!!');
//     }
//     hideLoadingScreen();
//   };

//   let getSubjects = async sb => {
//     showLoadingScreen();
//     setBatch(sb);
//     try {
//       let subjectArray = await getSubject(course, sb);
//       setSubjects(subjectArray);
//     } catch (err) {
//       alert('Cannot get your Subjects!!');
//     }
//     hideLoadingScreen();
//   };

//   let handleDatePicker = async date => {
//     showLoadingScreen();
//     console.log('Date ', date);
//     await setDateString(date.toString());
//     await setDate(date.toString());
//     setShowDatePicker(false);
//     hideLoadingScreen();
//   };
//   // handle form submission
//   let handleSubmit = async () => {
//     try {
//       let slug = `/note/addAssignment`;
//       console.log('Assignment slug ', slug);
//       let token = await read('token');
//       let data = {
//         title: title,
//         description: desc,
//         file: File,
//         course: course,
//         batch: batch,
//         subject: subject,
//         submissionDate: date,
//         submissionDateString: dateString,
//       };
//       console.log('data ', data);
//       let response = await patch(slug, data, token);
//       console.log('response ', response);
//     } catch (err) {
//       alert('Cannot create Assignment! ' + err);
//     }
//   };

//   const [File, setFile] = React.useState(null);

//   const filePicker = () => {
//     FilePickerManager.showFilePicker(null, response => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled file picker');
//       } else if (response.error) {
//         console.log('FilePickerManager Error: ', response.error);
//       } else {
//         setFile(response);
//       }
//     });
//   };

//   return (
//     <View style={{    backgroundColor: 'rgba(249, 249, 249, 1)', flex: 1}}>
//       <View
//         style={{
//           backgroundColor: institute ? institute.themeColor : 'black',
//           ...styles.header,
//         }}>
//         <TouchableOpacity onPress={() => navigation.navigate('Assignment Due')}>
//           <AntDesign
//             size={24}
//             color="white"
//             name="left"
//             style={{
//               alignSelf: 'center',
//               fontSize: 25,
//               color: 'white',
//               paddingLeft: 20,
//               paddingTop: 20,
//             }}
//           />
//         </TouchableOpacity>
//         <Text
//           style={{
//             fontStyle: 'normal',
//             fontSize: 28,
//             fontFamily: 'NunitoSans-Regular',
//             fontWeight: '600',
//             alignSelf: 'center',
//             paddingLeft: 30,
//             color: 'white',
//           }}>
//           Add Assignment
//         </Text>
//       </View>
//       <View style={{padding: 10}} />
//       <ScrollView>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-evenly',
//         }}>
//         {loadingScreen}
//         <ModalSelector
//           data={courses}
//           initValue="Course"
//           onChange={option => {
//             getBatches(option.key);
//           }}
//           style={{
//             width: 120,
//           }}
//         />

//         <ModalSelector
//           data={batches}
//           initValue="Batch"
//           onChange={option => {
//             getSubjects(option.key);
//           }}
//           style={{
//             width: 120,
//           }}
//         />

//         <ModalSelector
//           data={subjects}
//           initValue="Subject"
//           onChange={option => {
//             setSubject(option.key);
//           }}
//           style={{
//             width: 120,
//           }}
//         />
//       </View>

//       <View style={{padding: 10}} />
//       <View
//         style={{
//           paddingLeft: 11,
//           paddingRight: 11,
//         }}>
//         <Card style={styles.card1}>
//           <Card.Content>
//             <View
//               style={{
//                 flexDirection: 'row',
//               }}>
//               <TextInput
//                 placeholder="Assignment Title"
//                 onChangeText={title => setTitle(title)}
//                 defaultValue={title}
//               />
//               {/* <View style={{paddingLeft:10}} /> */}
//             </View>
//             <View style={{padding: 2}} />
//             <View style={{borderWidth: 0.2}} />
//             <View style={{padding: 10}} />
//             <TextInput placeholder="Topic " />
//             <View style={{padding: 2}} />
//             <View style={{borderWidth: 0.2}} />
//             <View style={{padding: 10}} />

//             <TextInput
//               placeholder="Discription"
//               onChangeText={val => setDesc(val)}
//               defaultValue={desc}
//             />
//             <View style={{padding: 40}} />

//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-around',
//               }}>
//               {/* date picker */}
//               <Button
//                 icon="calendar"
//                 mode="contained"
//                 color="white"
//                 onPress={() => setShowDatePicker(true)}>
//                 Set Deadline
//               </Button>

//               <DateTimePickerModal
//                 isVisible={showdatePicker}
//                 mode="date"
//                 onConfirm={handleDatePicker}
//                 onCancel={() => setShowDatePicker(!showdatePicker)}
//               />

//               <View style={{padding: 10}} />
//               <Button
//                 mode="contained"
//                 color="white"
//                 onPress={() => filePicker()}>
//                 Add file
//               </Button>
//             </View>
//           </Card.Content>
//         </Card>
//       </View>
//       <View style={{padding: 20}} />
//       <View
//         style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Button
//           mode="contained"
//           onPress={() => console.log('Pressed')}
//           style={{
//             width: 90,
//           }}
//           onPress={handleSubmit}>
//           {' '}
//           Save
//         </Button>
//       </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     height: 69,
//     flexDirection: 'row',
//   },
//   card1: {

//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 1,
//     shadowRadius: 12,
//     elevation: 5,

//   },
// });

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Card, Button} from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

// date picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';
import getBatch from '../../../../services/helpers/getList/getBatch';
import getCourse from '../../../../services/helpers/getList/getCourse';
import getSubject from '../../../../services/helpers/getList/getSubject';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import patch from '../../../../services/helpers/request/patch';
import post from '../../../../services/helpers/request/post';

// redux
import {useSelector} from 'react-redux';

//file picker
import FilePickerManager from 'react-native-file-picker';

export default function AddAssignments({navigation}) {
  //theming
  const institute = useSelector(state => state.institute);

  // data array
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // selected values
  const [batch, setBatch] = useState(null);
  const [course, setCourse] = useState(null);
  const [subject, setSubject] = useState(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateString, setDateString] = useState(
    new Date(1598051730000).toString(),
  );

  // input values
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const [showdatePicker, setShowDatePicker] = useState(false);

  // loading screem
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  useEffect(async () => {
    showLoadingScreen();
    try {
      let courseArray = await getCourse();
      setCourses(courseArray);
    } catch (err) {
      alert('Error in Getting Your Courses!!');
    }
    hideLoadingScreen();
  }, []);

  let getBatches = async sc => {
    showLoadingScreen();
    setCourse(sc);
    try {
      let batchArray = await getBatch(sc);
      setBatches(batchArray);
    } catch (err) {
      alert('Cannot get your Batches!!');
    }
    hideLoadingScreen();
  };

  let getSubjects = async sb => {
    showLoadingScreen();
    setBatch(sb);
    try {
      let subjectArray = await getSubject(course, sb);
      setSubjects(subjectArray);
    } catch (err) {
      alert('Cannot get your Subjects!!');
    }
    hideLoadingScreen();
  };

  let handleDatePicker = async date => {
    showLoadingScreen();
    console.log('Date ', date);
    await setDateString(date.toString());
    await setDate(date.toString());
    setShowDatePicker(false);
    hideLoadingScreen();
  };
  // handle form submission
  let handleSubmit = async () => {
    try {
      let slug = `/note/addAssignment`;
      console.log('Assignment slug ', slug);
      let token = await read('token');
      let data = {
        title: title,
        description: desc,
        file: File,
        course: course,
        batch: batch,
        subject: subject,
        submissionDate: date,
        submissionDateString: dateString,
      };
      console.log('data ', data);
      let response = await patch(slug, data, token);
      console.log('response ', response);
    } catch (err) {
      alert('Cannot create Assignment! ' + err);
    }
  };

  const [File, setFile] = React.useState(null);

  const filePicker = () => {
    FilePickerManager.showFilePicker(null, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      } else {
        setFile(response);
      }
    });
  };

  return (
    <View style={{backgroundColor: 'rgba(249, 249, 249, 1)', flex: 1}}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Assignment Due')}>
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
            fontFamily: 'NunitoSans-Regular',
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
            color: 'white',
          }}>
          Add Assignment
        </Text>
      </View>
      <View style={{padding: 10}} />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          {loadingScreen}
          <ModalSelector
            data={courses}
            initValue="Course"
            onChange={option => {
              getBatches(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          <ModalSelector
            data={batches}
            initValue="Batch"
            onChange={option => {
              getSubjects(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          <ModalSelector
            data={subjects}
            initValue="Subject"
            onChange={option => {
              setSubject(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>

        <View style={{padding: 10}} />
        <View
          style={{
            paddingLeft: 11,
            paddingRight: 11,
          }}>
          <Card style={styles.card1}>
            <Card.Content>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TextInput
                  placeholder="Assignment Title"
                  onChangeText={title => setTitle(title)}
                  defaultValue={title}
                />
                {/* <View style={{paddingLeft:10}} /> */}
              </View>
              <View style={{padding: 2}} />
              <View style={{borderWidth: 0.2}} />
              <View style={{padding: 10}} />
              <TextInput placeholder="Topic " />
              <View style={{padding: 2}} />
              <View style={{borderWidth: 0.2}} />
              <View style={{padding: 10}} />

              <TextInput
                placeholder="Discription"
                onChangeText={val => setDesc(val)}
                defaultValue={desc}
              />
              <View style={{padding: 40}} />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                {/* date picker */}
                <Button
                  icon="calendar"
                  mode="contained"
                  color="white"
                  onPress={() => setShowDatePicker(true)}>
                  Set Deadline
                </Button>

                <DateTimePickerModal
                  isVisible={showdatePicker}
                  mode="date"
                  onConfirm={handleDatePicker}
                  onCancel={() => setShowDatePicker(!showdatePicker)}
                />

                <View style={{padding: 10}} />
                <Button
                  mode="contained"
                  color="white"
                  onPress={() => filePicker()}>
                  Add file
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
        <View style={{padding: 20}} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{
              width: 90,
            }}
            onPress={handleSubmit}>
            {' '}
            Save
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 69,
    flexDirection: 'row',
  },
  card1: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
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

    minWidth: 110,
    elevation: 3,
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 30,
    paddingTop: 3,
    color: '#211C5A',
  },
});
