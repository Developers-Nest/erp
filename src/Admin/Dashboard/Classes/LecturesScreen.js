// import  React ,{useState}from 'react';

// import ModalSelector from 'react-native-modal-selector';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import Icon from 'react-native-vector-icons/Foundation';
// import EntypoIcon from 'react-native-vector-icons/Entypo';
// import IconPhysics2 from 'react-native-vector-icons/Ionicons';
// import IconEnglish2 from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// import IconBio1 from 'react-native-vector-icons/FontAwesome5';
// import IconBio2 from 'react-native-vector-icons/FontAwesome5';

// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   ImageBackground,
//   Button,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   Keyboard,
//   TextInput,

// } from 'react-native';

// export default function LecturesScreen() {
//   const[showContent,setShowContent]=useState('Due');

//   const [activeTab, setActiveTab] = useState('Due');

//   const [searchQuery, setSearchQuery] = useState('');

//   const onChangeSearch = query => setSearchQuery(query);

//   const [value, setValue] = useState(null);
//   const [course, setcourse] = useState(null);
//   const [courses, setcourses] = useState([
//     { label: 'Class1', key: 'Class1' },
//     { label: 'Class2', key: 'Class2' },
//     { label: 'Class3', key: 'Class3' },
//   ]);

//   // const [open2, setOpen2] = useState(null);
//   const [batch, setbatch] = useState(null);
//   const [batches, setbatches] = useState([
//     { label: 'Batch1', key: 'Batch1' },
//     { label: 'Batch2', key: 'Batch2' },
//     { label: 'Batch3', key: 'Batch3' },
//   ]);

//   // const [open3, setOpen3] = useState(null);
//   const [subject, setsubject] = useState(null);
//   const [subjects, setsubjects] = useState([
//     { label: 'Subject1', key: 'Subject1' },
//     { label: 'Subject2', key: 'Subject2' },
//     { label: 'Subject3', key: 'Subject3' },
//   ]);

//   function Live() {
//     const [searchQuery, setSearchQuery] = useState('');

//     const onChangeSearch = query => setSearchQuery(query);

//     return (
//       <View style={styles.container}>
//         <ScrollView>
//           <View
//             style={{
//               flexDirection: 'row',
//               flexWrap: 'wrap',
//               justifyContent: 'center',
//             }}>
//             <View style={styles.section}>
//               <View style={styles.details}>
//                 <View style={styles.userinhostels}>
//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text
//                       style={{
//                         fontWeight: 'normal',
//                         fontSize: 22,
//                         color: ' rgba(25, 40, 57, 0.7)',
//                         fontFamily:'Poppins-Medium'
//                       }}>

//                       English
//                     </Text>

//                     <MaterialCommunityIcon
//                       size={27}
//                       color="rgba(25, 40, 57, 0.63)"
//                       name="alpha-a"
//                       style={{paddingLeft: 7}}
//                     />
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text style={styles.teacher}>Teacher</Text>
//                     <View style={{flexDirection: 'column'}}>
//                       <IconEnglish2
//                         size={24}
//                         color="#B04305"
//                         name="radio"
//                         style={{paddingLeft: 7}}
//                       />
//                       <Text
//                         style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
//                         {' '}{' '}{' '}
//                         Class
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//             <View style={styles.section}>
//               <View style={styles.details}>
//                 <View style={styles.userinhostels}>
//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text
//                       style={{
//                         fontWeight: 'normal',
//                         fontSize: 22,
//                         fontFamily:'Poppins-Medium',
//                         color: ' rgba(25, 40, 57, 0.7)',
//                       }}>
//                       {' '}
//                       Hindi
//                     </Text>

//                     <MaterialCommunityIcon
//                       size={27}
//                       color="rgba(25, 40, 57, 0.63)"
//                       name="alpha-a"
//                       style={{paddingLeft: 7}}
//                     />
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text style={styles.teacher}>Teacher</Text>
//                     <View style={{flexDirection: 'column'}}>
//                       <Icon
//                         size={24}
//                         color="#1F7C17"
//                         name="clipboard-notes"
//                         style={{paddingLeft: 7}}
//                       />
//                       <Text
//                         style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
//                         {' '}{' '}
//                         Test
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.section}>
//               <View style={styles.details}>
//                 <View style={styles.userinhostels}>
//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text
//                       style={{
//                         fontWeight: 'normal',
//                         fontSize: 22,
//                         color: ' rgba(25, 40, 57, 0.7)',
//                         fontFamily:'Poppins-Medium'
//                       }}>
//                       {' '}
//                       Physics
//                     </Text>

//                     <EntypoIcon
//                       size={27}
//                       color="rgba(25, 40, 57, 0.63)"
//                       name="tree"
//                       style={{paddingLeft: 7}}
//                     />
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text style={styles.teacher}>Teacher</Text>
//                     <View style={{flexDirection: 'column'}}>
//                       <IconPhysics2
//                         size={24}
//                         color="#EFB086"
//                         name="ios-hand-left"
//                         style={{paddingLeft: 7}}
//                       />
//                       <Text
//                         style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
//                         {' '}
//                         Doubts
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.section}>
//               <View style={styles.details}>
//                 <View style={styles.userinhostels}>
//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text
//                       style={{
//                         fontWeight: 'normal',
//                         fontSize: 22,
//                         color: ' rgba(25, 40, 57, 0.7)',
//                         fontFamily:'Poppins-Medium'
//                       }}>
//                       {' '}
//                       Biology
//                     </Text>

//                     <IconBio1
//                       size={27}
//                       color="greyrgba(25, 40, 57, 0.63)"
//                       name="microscope"

//                     />
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text style={styles.teacher}>Teacher</Text>
//                     <View style={{flexDirection: 'column'}}>
//                       <IconBio2
//                         size={24}
//                         color="rgba(93, 109, 116, 1)"
//                         name="chalkboard-teacher"

//                       />
//                       <Text
//                         style={{fontSize: 10,  fontFamily:'Poppins-Medium',color: 'rgba(25, 40, 57, 0.9)'}}>
//                         {' '}{' '}{' '}
//                         Viva
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//             <View style={styles.section}>
//               <View style={styles.details}>
//                 <View style={styles.userinhostels}>
//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text
//                       style={{
//                         fontWeight: 'normal',
//                         fontSize: 22,
//                         color: ' rgba(25, 40, 57, 0.7)',
//                         fontFamily:'Poppins-Medium'
//                       }}>

//                       Maths
//                     </Text>

//                     <MaterialCommunityIcon
//                       size={27}
//                       color="rgba(25, 40, 57, 0.63)"
//                       name="function-variant"
//                       style={{paddingLeft: 7}}
//                     />
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text style={styles.teacher}>Teacher</Text>
//                     <View style={{flexDirection: 'column'}}>
//                       <IconEnglish2
//                         size={24}
//                         color="#B04305"
//                         name="radio"
//                         style={{paddingLeft: 7}}
//                       />
//                       <Text
//                         style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
//                         {' '}{' '}{' '}
//                         Class
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//             <View style={styles.section}>
//               <View style={styles.details}>
//                 <View style={styles.userinhostels}>
//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text
//                       style={{
//                         fontWeight: 'normal',
//                         fontSize: 22,
//                         color: ' rgba(25, 40, 57, 0.7)',
//                         fontFamily:'Poppins-Medium'
//                       }}>

//                       Chemistry
//                     </Text>

//                     <MaterialCommunityIcon
//                       size={27}
//                       color="rgba(25, 40, 57, 0.63)"
//                       name="molecule"
//                       style={{paddingLeft: 7}}
//                     />
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text style={styles.teacher}>Teacher</Text>
//                     <View style={{flexDirection: 'column'}}>
//                       <EntypoIcon
//                         size={24}
//                         color="#3854B7"
//                         name="lab-flask"
//                         style={{paddingLeft: 7}}
//                       />
//                       <Text
//                         style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
//                         {' '}{' '}{' '}{'  '}
//                         Lab
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </View>
//     );
//   }

//   function Recorded() {
//     const [searchQuery, setSearchQuery] =useState('');

//     const onChangeSearch = query => setSearchQuery(query);

//     return (
//       <View style={styles.container}>
//         <ScrollView>
//           <View
//             style={{
//               flexDirection: 'row',
//               flexWrap: 'wrap',
//               justifyContent: 'center',
//             }}>
//             <View style={styles.section}>
//               <View style={styles.details}>
//                 <View style={styles.userinhostels}>
//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text
//                       style={{
//                         fontWeight: 'normal',
//                         fontSize: 22,
//                         color: ' rgba(25, 40, 57, 0.7)',
//                         fontFamily:'Poppins-Medium'
//                       }}>

//                       English
//                     </Text>

//                     <MaterialCommunityIcon
//                       size={27}
//                       color="rgba(25, 40, 57, 0.63)"
//                       name="alpha-a"
//                       style={{paddingLeft: 7}}
//                     />
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text style={styles.teacher}>Teacher</Text>
//                     <View style={{flexDirection: 'column'}}>
//                       <IconEnglish2
//                         size={24}
//                         color="#B04305"
//                         name="radio"
//                         style={{paddingLeft: 7}}
//                       />
//                       <Text
//                         style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
//                         {' '}{' '}{' '}
//                         Class
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//             <View style={styles.section}>
//               <View style={styles.details}>
//                 <View style={styles.userinhostels}>
//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text
//                       style={{
//                         fontWeight: 'normal',
//                         fontSize: 22,
//                         fontFamily:'Poppins-Medium',
//                         color: ' rgba(25, 40, 57, 0.7)',
//                       }}>
//                       {' '}
//                       Hindi
//                     </Text>

//                     <MaterialCommunityIcon
//                       size={27}
//                       color="rgba(25, 40, 57, 0.63)"
//                       name="alpha-a"
//                       style={{paddingLeft: 7}}
//                     />
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text style={styles.teacher}>Teacher</Text>
//                     <View style={{flexDirection: 'column'}}>
//                       <Icon
//                         size={24}
//                         color="#1F7C17"
//                         name="clipboard-notes"
//                         style={{paddingLeft: 7}}
//                       />
//                       <Text
//                         style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
//                         {' '}{' '}
//                         Test
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.section}>
//               <View style={styles.details}>
//                 <View style={styles.userinhostels}>
//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text
//                       style={{
//                         fontWeight: 'normal',
//                         fontSize: 22,
//                         color: ' rgba(25, 40, 57, 0.7)',
//                         fontFamily:'Poppins-Medium'
//                       }}>
//                       {' '}
//                       Physics
//                     </Text>

//                     <EntypoIcon
//                       size={27}
//                       color="rgba(25, 40, 57, 0.63)"
//                       name="tree"
//                       style={{paddingLeft: 7}}
//                     />
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text style={styles.teacher}>Teacher</Text>
//                     <View style={{flexDirection: 'column'}}>
//                       <IconPhysics2
//                         size={24}
//                         color="#EFB086"
//                         name="ios-hand-left"
//                         style={{paddingLeft: 7}}
//                       />
//                       <Text
//                         style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
//                         {' '}
//                         Doubts
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.section}>
//               <View style={styles.details}>
//                 <View style={styles.userinhostels}>
//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text
//                       style={{
//                         fontWeight: 'normal',
//                         fontSize: 22,
//                         color: ' rgba(25, 40, 57, 0.7)',
//                         fontFamily:'Poppins-Medium'
//                       }}>
//                       {' '}
//                       Biology
//                     </Text>

//                     <IconBio1
//                       size={27}
//                       color="greyrgba(25, 40, 57, 0.63)"
//                       name="microscope"

//                     />
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text style={styles.teacher}>Teacher</Text>
//                     <View style={{flexDirection: 'column'}}>
//                       <IconBio2
//                         size={24}
//                         color="rgba(93, 109, 116, 1)"
//                         name="chalkboard-teacher"

//                       />
//                       <Text
//                         style={{fontSize: 10,  fontFamily:'Poppins-Medium',color: 'rgba(25, 40, 57, 0.9)'}}>
//                         {' '}{' '}{' '}
//                         Viva
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//             <View style={styles.section}>
//               <View style={styles.details}>
//                 <View style={styles.userinhostels}>
//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text
//                       style={{
//                         fontWeight: 'normal',
//                         fontSize: 22,
//                         color: ' rgba(25, 40, 57, 0.7)',
//                         fontFamily:'Poppins-Medium'
//                       }}>

//                       Maths
//                     </Text>

//                     <MaterialCommunityIcon
//                       size={27}
//                       color="rgba(25, 40, 57, 0.63)"
//                       name="function-variant"
//                       style={{paddingLeft: 7}}
//                     />
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text style={styles.teacher}>Teacher</Text>
//                     <View style={{flexDirection: 'column'}}>
//                       <IconEnglish2
//                         size={24}
//                         color="#B04305"
//                         name="radio"
//                         style={{paddingLeft: 7}}
//                       />
//                       <Text
//                         style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
//                         {' '}{' '}{' '}
//                         Class
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//             <View style={styles.section}>
//               <View style={styles.details}>
//                 <View style={styles.userinhostels}>
//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text
//                       style={{
//                         fontWeight: 'normal',
//                         fontSize: 22,
//                         color: ' rgba(25, 40, 57, 0.7)',
//                         fontFamily:'Poppins-Medium'
//                       }}>

//                       Chemistry
//                     </Text>

//                     <MaterialCommunityIcon
//                       size={27}
//                       color="rgba(25, 40, 57, 0.63)"
//                       name="molecule"
//                       style={{paddingLeft: 7}}
//                     />
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.differentusers}>
//                     <Text style={styles.teacher}>Teacher</Text>
//                     <View style={{flexDirection: 'column'}}>
//                       <EntypoIcon
//                         size={24}
//                         color="#3854B7"
//                         name="lab-flask"
//                         style={{paddingLeft: 7}}
//                       />
//                       <Text
//                         style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
//                         {' '}{' '}{' '}{'  '}
//                         Lab
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </View>
//     );
//   }
//   return (
//     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//       <View style={styles.maincontainer}>
//         <View
//           style={{
//             width: '90%',
//             marginLeft: 25,
//             marginBottom: 20,
//             // marginTop: 30,
//           }}>

// {/* open search */}
// <View
//         style={{
//           marginTop: 10,

//           justifyContent: 'space-between',
//           width:'95%',
//           flexDirection: 'row',
//           ...styles.shadow,
//         }}>
//            <FontAwesome5
//           name="search"
//           style={{
//             alignSelf: 'center',
//             fontSize: 15,
//             color: '#6A6A80',
//           }}/>

//         <TextInput
//           style={{width: '80%', ...styles.text_input}}
//           placeholder="Enter subject or batch name"
//           placeholderTextColor='grey'
//         />
//         <TouchableOpacity
//           style={{
//             alignSelf: 'center',
//           }}>
//           <FontAwesome5
//           name="filter"
//           style={{
//             alignSelf: 'center',
//             fontSize: 21,
//             color: '#6A6A80',
//           }}

//           />
//         </TouchableOpacity>
//       </View>

//          </View>

//           {/* close search */}

//          <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginTop: 10,
//               marginLeft:2,
//               alignContent: 'flex-start',
//               width: '99%'
//             }}>

//             <ModalSelector
//               data={courses}
//               initValue="Class1"
//               onChange={option => {
//                 // setclass(option.key);
//               }}
//               style={styles.card}
//               initValueTextStyle={styles.SelectedValueSmall}
//               selectTextStyle={styles.SelectedValueSmall}
//             />
//             <ModalSelector
//               data={batches}
//               initValue="Batch1"
//               onChange={option => {
//                 // setbatch(option.key);
//               }}
//               style={styles.card}
//               initValueTextStyle={styles.SelectedValueSmall}
//               selectTextStyle={styles.SelectedValueSmall}
//             />
//             <ModalSelector
//               data={subjects}
//               initValue="Subject1"
//               onChange={option => {
//                 // setsubject(option.key);
//               }}
//               style={styles.card}
//               initValueTextStyle={styles.SelectedValueSmall}
//               selectTextStyle={styles.SelectedValueSmall}
//             />

//           </View>
//         <View style={styles.switchTabsView}>
//           <TouchableOpacity
//             style={{
//               borderBottomWidth: showContent == 'Live' ? 2 : 0,
//               borderBottomColor: '#B04305',
//               paddingHorizontal: 4,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//             onPress={() => setShowContent('Live')}>
//             <Text style={styles.switchText}>Live</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={{
//               borderBottomWidth: showContent == 'Recorded' ? 2 : 0,
//               borderBottomColor: '#B04305',
//               paddingHorizontal: 4,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//             onPress={() => setShowContent('Recorded')}>
//             <Text style={styles.switchText}>Recorded</Text>
//           </TouchableOpacity>
//         </View>

//         {showContent === 'Live' ? <Live /> : <Recorded />}
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 10,
//     flex: 1,
//     backgroundColor: 'rgba(249, 249, 249, 1)',
//   },

//   maincontainer: {
//     flex: 1,
//     // justifyContent:'flex-start'
//   },

//   card: {
//     shadowColor: '#999',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.5,
//     shadowRadius: 12,
//     elevation: 5,
//     backgroundColor: 'white',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderBottomLeftRadius: 12,
//     borderBottomRightRadius: 12,
//     borderTopRightRadius: 12,
//     borderTopLeftRadius: 12,
//     overflow: 'hidden',
//     justifyContent: 'center',
//     margin: 0,
//     padding: 0,
//     minWidth: '30%',
//   },
//   section: {
//     flexDirection: 'column',
//     backgroundColor: '#FFFFFF',

//     paddingHorizontal: 13,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     elevation: 10,
//     marginTop: 20,
//     borderRadius: 12,
//     marginHorizontal: 10,
//     width: 170,
//     height: 170,
//     //new added
//     alignSelf: 'center',
//     //new added to move english down
//     paddingTop: 50,
//   },

//   details: {
//     alignContent: 'center',
//     flexDirection: 'column',

//     borderBottomColor: '#333',
//     // borderBottomWidth:1,
//   },

//   userinhostels: {
//     //  paddingVertical:20,
//   },

//   //different users for two columns
//   differentusers: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     //for row spacing between two rows:done finally
//     paddingBottom: 10,
//   },
//   userstext: {
//     fontSize: 16,
//     // paddingVertical:4,
//     fontWeight: '300',
//   },
//   belowhr: {
//     display: 'flex',
//     flexDirection: 'row',
//     marginTop: 20,
//     justifyContent: 'space-between',
//     paddingBottom: 10,
//     borderBottomColor: '#333',
//   },
//   search: {
//     backgroundColor: 'white',
//     color: 'black',
//   },
//   switchTabsView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 40,
//     marginTop:20,
//   },
//   teacher: {
//     fontSize: 14,
//     color: 'rgba(25, 40, 57, 0.63)',
//     paddingLeft: 3,
//     fontFamily:'Poppins-Medium'
//   },
//   switchText: {
//     fontSize: 14,
//     color: '#B04305',
//     paddingHorizontal: 5,
//   },
//   maincontainer: {
//     paddingTop: 10,
//     flex: 1,
//     backgroundColor: 'rgba(249, 249, 249, 1)',
//   },
//   header: {
//     height: 65,
//     marginTop: -10,
//     backgroundColor: 'rgba(0, 73, 159, 1)',
//     flexDirection: 'row',
//   },
//   text_input: {
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     // backgroundColor: 'rgba(249, 249, 249, 1)',
//     height: 50,
//     fontSize: 16,
//     minWidth: 171,
//     backgroundColor: 'white',
//   },

//   shadow: {
//     shadowColor: '#999',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.5,
//     shadowRadius: 12,
//     backgroundColor: 'white',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderBottomLeftRadius: 12,
//     borderBottomRightRadius: 12,
//     borderTopRightRadius: 12,
//     borderTopLeftRadius: 12,
//     overflow: 'hidden',
//     justifyContent: 'center',
//     margin: 0,
//     padding: 0,
//     minWidth: 110,
//   },
//   SelectedValue: {
//     fontFamily: 'Poppins-Regular',
//     fontStyle: 'normal',
//     fontWeight: 'normal',
//     fontSize: 18,
//     lineHeight: 27,
//     padding: 10,
//     color: '#211C5A',
//   },
//   SelectedValueSmall: {
//     fontFamily: 'Poppins-Regular',
//     fontStyle: 'normal',
//     fontWeight: '500',
//     fontSize: 18,
//     lineHeight: 30,
//     paddingTop: 3,
//     color: '#211C5A',
//   },

// });

import * as React from 'react';

//stack navigation
import Recorded from './LectureRecorded';
import Live from './LectureLive';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';

//icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';

// redux
import {useSelector} from 'react-redux';

export default function LecturesScreen({navigation}) {
  const [showContent, setShowContent] = React.useState('Due');
  const [activeTab, setActiveTab] = React.useState('Due');
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  //theming
  const institute = useSelector(state => state.institute);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.maincontainer}>
        <View
          style={{
            backgroundColor: institute ? institute.themeColor : 'black',
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
              fontFamily: 'NunitoSans-Regular',
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
              color: 'white',
            }}>
            Lectures
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('GoLive')}
            style={{
              justifyContent: 'flex-end',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IonIcons
              name="add-circle"
              color="#900"
              style={{
                fontSize: 35,
                color: 'white',
                paddingRight: 20,
              }}
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              marginBottom: 20,
              marginTop: 10,
            }}>
            {/* open search */}
            <View style={{alignItems: 'center', width: '90%'}}>
              <View
                style={{
                  marginTop: 10,

                  justifyContent: 'space-between',
                  width: '95%',
                  flexDirection: 'row',
                  ...styles.shadow,
                }}>
                <FontAwesome5
                  name="search"
                  style={{
                    alignSelf: 'center',
                    fontSize: 15,
                    color: '#6A6A80',
                  }}
                />

                <TextInput
                  style={{width: '80%', ...styles.text_input}}
                  placeholder="Enter subject or batch name"
                />
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                  }}>
                  <FontAwesome5
                    name="filter"
                    style={{
                      alignSelf: 'center',
                      fontSize: 21,
                      color: '#6A6A80',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* close search */}
          </View>
          <View style={styles.switchTabsView}>
            <TouchableOpacity
              style={{
                borderBottomWidth: showContent == 'Live' ? 2 : 0,
                borderBottomColor: '#B04305',
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowContent('Live')}>
              <Text style={styles.switchText}>Live</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: showContent == 'Recorded' ? 2 : 0,
                borderBottomColor: '#B04305',
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowContent('Recorded')}>
              <Text style={styles.switchText}>Recorded</Text>
            </TouchableOpacity>
          </View>

          {showContent === 'Live' ? <Live /> : <Recorded />}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },

  maincontainer: {
    flex: 1,
    // justifyContent:'flex-start'
  },

  card: {
    shadowColor: '#999',
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
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    minWidth: '30%',
  },
  section: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',

    paddingHorizontal: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 10,
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 10,
    width: 170,
    height: 170,
    //new added
    alignSelf: 'center',
    //new added to move english down
    paddingTop: 50,
  },

  details: {
    alignContent: 'center',
    flexDirection: 'column',

    borderBottomColor: '#333',
    // borderBottomWidth:1,
  },

  userinhostels: {
    //  paddingVertical:20,
  },

  //different users for two columns
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //for row spacing between two rows:done finally
    paddingBottom: 10,
  },
  userstext: {
    fontSize: 16,
    // paddingVertical:4,
    fontWeight: '300',
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
  },
  search: {
    backgroundColor: 'white',
    color: 'black',
  },
  switchTabsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  teacher: {
    fontSize: 14,
    color: 'rgba(25, 40, 57, 0.63)',
    paddingLeft: 3,
    fontFamily: 'Poppins-Medium',
  },
  switchText: {
    fontSize: 14,
    color: '#B04305',
    paddingHorizontal: 5,
  },
  maincontainer: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  header: {
    height: 65,
    flexDirection: 'row',
  },
  text_input: {
    paddingHorizontal: 20,
    borderRadius: 10,
    // backgroundColor: 'rgba(249, 249, 249, 1)',
    height: 50,
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
  },

  shadow: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 12,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
});
