import React, { useEffect } from 'react';
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
  Avatar,
  BottomNavigation,
} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// redux
import { useSelector } from 'react-redux';

const MySearchbar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};
export default function Profile({ navigation }) {

  const userInfo = useSelector((state)=>state.userInfo)

  console.log("Profile.js ", userInfo)


  return (
    <View style={{ backgroundColor: '#E5E5E5', height: '100%' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome5
            name="chevron-left"
            style={{
              alignSelf: 'center',
              fontSize: 25,
              color: 'black',
              paddingLeft: 20,
              paddingTop: 20,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontStyle: 'normal',
              fontSize: 28,
              fontFamily: 'NunitoSans-Light',
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
            }}>
            Profile
          </Text>
          {/* <View>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="bell"
                style={{
                  alignSelf: 'center',
                  fontSize: 30,
                  color: 'black',
                  paddingHorizontal: 20,
                  paddingTop: 20,
                }}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
      <View
        style={{
          padding: 20,
        }}
      />
      <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <Avatar.Text size={100} label="BS" />
      </View>
      <View
        style={{
          paddingTop: '10%',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View style={{ width: '60%', backgroundColor: 'white', height: '170%',}}>
          <Text>{userInfo.firstName} </Text>
        </View>
        <View style={{ paddingLeft: '5%' }} />
        <View style={{ width: '30%', backgroundColor: 'white', height: '170%' }}>
          <Text>{userInfo.qualification}</Text>
        </View>
      </View>
      <View
        style={{
          paddingTop: '8%',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View style={{ width: '45%', backgroundColor: 'white', height: '170%',borderRadius:'20px' }}>
          <Text>{userInfo.mobile}</Text>
        </View>
        <View style={{ paddingLeft: '5%' }} />
        <View style={{ width: '45%', backgroundColor: 'white', height: '170%' }}>
          <Text>{userInfo.dob}</Text>
        </View>
      </View>
      <View
        style={{
          paddingTop: '8%',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View style={{ width: '95%', backgroundColor: 'white', height: '170%' }}>
          <Text placeholder="Hostel Details" />
        </View>
      </View>
    </View>
    // bottom navigation
  );
}

const styles = StyleSheet.create({
  text_input: {
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(249, 249, 249, 1)',
    height: 50,
    fontSize: 16,
    minWidth: 171,
  },
  header: {
    height: 69,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});
// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import { Searchbar, Appbar, List, Card, Title, Paragraph, Button, TextInput, RadioButton } from 'react-native-paper';
// // import AttendanceTakeHeader from '../shared/attendancetakeheader';

// import Icon from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// export default function AttendanceScreen1() {

//   const [nameMethod, setNameMethod] = useState('Name');
//   const [checked, setChecked] = React.useState('first');

//   const [checked2, setChecked2] = React.useState('');

//   const [checked3, setChecked3] = React.useState('');

//   const [checked4, setChecked4] = React.useState('');

//   return (

//     <View style={{ backgroundColor: "#E5E5E5", flex: 1, justifyContent: 'flex-start' }}>

//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => { }}>
//           <Icon size={24} color="white" name="left" style={{ alignSelf: 'center', fontSize: 25, color: 'white', paddingLeft: 20, paddingTop: 20 }} />
//         </TouchableOpacity>
//         <Text style={{ fontStyle: 'normal', fontSize: 28, fontWeight: '600', alignSelf: 'center', paddingLeft: 30, color: 'white' }}>
//           Attendance
//         </Text>
//         <View style={{ flex: 1, marginLeft: 20 }}>
//           <TouchableOpacity onPress={() => { }}>
//             <MaterialCommunityIcon size={24} color="white" name="eye" style={{ alignSelf: 'center', fontSize: 25, color: 'white', paddingLeft: 20, paddingTop: 15 }} />
//             {/* <Ionicons name="eye" style={{alignSelf:'center',fontSize:25,color:'white',paddingLeft:20,paddingTop:15}}/> */}
//           </TouchableOpacity>
//           <Text style={{ paddingLeft: 67, color: '#fff' }}>View</Text>
//         </View>
//       </View>

//       {/*
// <AttendanceTakeHeader/> */}
//       {/* open list part */}
//       <View style={{ padding: 10, justifyContent: 'center' }} />

//       <View style={styles.Drop}>

//         <List.Section style={{ width: 120 }}>
//           <List.Accordion
//             title="Class"
//             style={{ borderTopRightRadius: 5, borderBottomRightRadius: 5, borderBottomLeftRadius: 5, borderWidth: 0.5, borderTopStartRadius: 5, backgroundColor: 'white' }}>
//             <List.Item title="First item" />
//             <List.Item title="Second item" />
//           </List.Accordion>
//         </List.Section>

//         <List.Section style={{ width: 120 }}>
//           <List.Accordion
//             title="Batch"
//             style={{ borderTopRightRadius: 5, borderBottomRightRadius: 5, borderBottomLeftRadius: 5, borderWidth: 0.5, borderTopStartRadius: 5, backgroundColor: 'white' }}>
//             <List.Item title="First item" />
//             <List.Item title="Second item" />
//           </List.Accordion>
//         </List.Section>

//         <List.Section style={{ width: 120 }} >
//           <List.Accordion
//             title="Subject"
//             style={{ borderTopRightRadius: 5, borderBottomRightRadius: 5, borderBottomLeftRadius: 5, borderWidth: 0.5, borderTopStartRadius: 5, backgroundColor: 'white' }}>
//             <List.Item title="First item" />
//             <List.Item title="Second item" />
//           </List.Accordion>
//         </List.Section>
//       </View>

//       {/* </View> */}

//       <View style={{ padding: 7 }} />

//       {/* close list part */}

//       {/* open search */}
//       <View
//         style={{
//           width: '90%',
//           marginLeft: 20,
//           marginBottom: 10,
//           // marginTop: 30,
//         }}>
//         <View style={{ marginTop: 10, ...styles.card }}>
//           <TextInput
//             left={<TextInput.Icon name="magnify" />}
//             right={<TextInput.Icon name="filter" />}
//             theme={{
//               colors: {
//                 primary: '#999',
//                 underlineColor: 'transparent',
//                 background: 'white',
//               },
//             }}
//             placeholder="Enter student's name"
//             outlineColor="transparent"
//             styles={{
//               margin: 10,
//               padding: 10,
//               backgroundColor: 'white',
//             }}
//             mode="outline"
//           />
//         </View>
//       </View>
//       {/* close search */}

//       {/* starting of Card loop-section,scroll for more number of cards */}
//       <ScrollView>
//         <View style={styles.section}>
//           <View style={styles.details}>

//             <View style={styles.userinhostels}>
//               <TouchableOpacity style={styles.differentusers}

//               >
//                 <Text style={{ fontSize: 22, color: '#211C5A' }}> Name</Text>
//                 <RadioButton
//                   value="first"
//                   status={checked === 'first' ? 'checked' : 'unchecked'}
//                   onPress={() => setChecked('first')} />

//               </TouchableOpacity>
//               <TouchableOpacity style={styles.differentusers}>
//                 <Text style={{ fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>Roll No.</Text>

//                 <Text style={{ fontSize: 12, color: '#6A6A80' }}>21 May,2021</Text>
//               </TouchableOpacity>
//             </View>

//           </View>

//         </View>

//         <View style={styles.section}>
//           <View style={styles.details}>

//             <View style={styles.userinhostels}>
//               <TouchableOpacity style={styles.differentusers}

//               >
//                 <Text style={{ fontSize: 22, color: '#211C5A' }}> Name</Text>
//                 <RadioButton
//                   value="second"
//                   status={checked2 === 'second' ? 'checked' : 'unchecked'}
//                   onPress={() => setChecked2('second')} />

//               </TouchableOpacity>
//               <TouchableOpacity style={styles.differentusers}>
//                 <Text style={{ fontSize: 14, marginLeft: 5, color: '#6A6A80' }}>Roll No.</Text>

//                 <Text style={{ fontSize: 12, color: '#6A6A80' }}>21 May,2021</Text>
//               </TouchableOpacity>
//             </View>

//           </View>

//         </View>

//         <View style={styles.section}>
//           <View style={styles.details}>

//             <View style={styles.userinhostels}>
//               <TouchableOpacity style={styles.differentusers}

//               >
//                 <Text style={{ fontSize: 22, color: '#211C5A' }}> Name</Text>
//                 <RadioButton
//                   value="third"
//                   status={checked3 === 'third' ? 'checked' : 'unchecked'}
//                   onPress={() => setChecked3('third')} />
//                 {/* for radio button */}
//                 {/* <Radio selected={nameMethod==='Name'}/> */}
//                 {/* <Text style={{fontSize:12}}> PHY:20345</Text> */}
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.differentusers}>
//                 <Text style={{ fontSize: 14, marginLeft: 5, color: '#6A6A80' }}>Roll No.</Text>

//                 <Text style={{ fontSize: 12, color: '#6A6A80' }}>21 May,2021</Text>
//               </TouchableOpacity>
//             </View>

//           </View>

//         </View>

//         <View style={styles.section}>
//           <View style={styles.details}>

//             <View style={styles.userinhostels}>
//               <TouchableOpacity style={styles.differentusers}

//               >
//                 <Text style={{ fontSize: 22, color: '#211C5A' }}> Name</Text>
//                 <RadioButton
//                   value="fourth"
//                   status={checked4 === 'fourth' ? 'checked' : 'unchecked'}
//                   onPress={() => setChecked4('fourth')} />

//               </TouchableOpacity>
//               <TouchableOpacity style={styles.differentusers}>
//                 <Text style={{ fontSize: 14, marginLeft: 5, color: '#6A6A80' }}>Roll No.</Text>

//                 <Text style={{ fontSize: 12, color: '#6A6A80' }}>21 May,2021</Text>
//               </TouchableOpacity>
//             </View>

//           </View>

//         </View>

//       </ScrollView>
//       {/* Cards end */}

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 10,
//     flex: 1,
//     backgroundColor: '#E5E5E5',
//   },
//   section: {
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#fff',
//     shadowColor: '#333',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     elevation: 2,
//     marginTop: 14,
//     borderRadius: 12,
//     paddingLeft: 10,
//     paddingRight: 10,
//     marginHorizontal: 20,
//   },

//   details: {
//     display: 'flex',
//     flexDirection: 'column',
//     marginTop: 3,
//     paddingBottom: 10,
//     borderBottomColor: '#333',
//     // borderBottomWidth: 1,
//   },
//   userinhostels: {
//     marginTop: 10,

//   },
//   differentusers: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 2,
//     justifyContent: 'space-between',
//   },
//   userstext: {
//     fontSize: 16,
//     paddingVertical: 4,
//     fontWeight: '300',
//   },
//   belowhr: {
//     display: 'flex',
//     flexDirection: 'row',
//     marginTop: 10,
//     justifyContent: 'space-between',
//     paddingBottom: 10,
//     borderBottomColor: '#333',
//     //borderBottomWidth:1,
//   },
//   search: {
//     backgroundColor: 'white',
//     color: 'black',
//   },
//   switchTabsView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 40,
//   },
//   switchText: {
//     fontSize: 14,
//     color: '#58636D',
//     paddingHorizontal: 5,
//   },
//   maincontainer: {
//     paddingTop: 10,
//     flex: 1,
//     backgroundColor: '#E5E5E5',
//   },
//   card: {
//     shadowColor: '#999',
//     shadowOffset: { width: 0, height: 1 },
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
//   Drop: {
//     marginTop: 5,
//     flexDirection: 'row',

//     justifyContent: 'space-evenly'

//   },
//   header: {
//     height: 65,
//     marginTop: 0,
//     backgroundColor: 'rgba(0, 73, 159, 1)',
//     flexDirection: 'row',

//   }

// });
