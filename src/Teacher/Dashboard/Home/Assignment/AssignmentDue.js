// import React from 'react';
// import {View} from 'react-native';

// import {Text} from 'react-native-paper';

// export default function App({navigation}) {
//   return (
//     <View>
//       <Text>Assignment Screen Teacher</Text>
//     </View>
//   );
// }

import * as React from 'react';

import Icon from 'react-native-vector-icons/AntDesign';
// import AssignmentDueHeader from '../shared/assignmentsdueheader';
// import HeaderAssignmentDue from '../../shared/headerassignmentdue';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
//import HostelAllocation2 from "./hostelallocation2";

//import { Dropdown} from 'sharingan-rn-modal-dropdown';
import {
  event,
  onChange,
  setValue,
  target,
  value,
} from 'react-native-reanimated';
import {Searchbar} from 'react-native-paper';
// import HeaderAllocatedList from '../shared/headerallocatedlist';
// import {AntDesign} from '@expo/vector-icons';

export default function AssignmentsDue({navigation}) {
  const [activeTab, setActiveTab] = React.useState('Due');

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  function switchTab() {
    if (activeTab === 'Submitted') {
      setActiveTab('Due');
    } else {
      setActiveTab('Submitted');
    }
  }
  function Due() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <View style={styles.differentusers}>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      fontSize: 18,
                      color: '#211C5A',
                    }}>
                    {' '}
                    Title
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Assignment Edit')}>
                      <Text style={{fontSize: 12, color: '#211C5A'}}>Edit</Text>
                      <Icon size={12} color="#211C5A" name="edit" />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#5177E7'}}>
                    Course and Batch
                  </Text>
                  {/*                 
                <Text style={{fontSize:12,color:'blue'}}> Not Graded</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#505069'}}>
                    Exams will be conducted via online mode in the upcoming week
                    and these are notes for it.So,go through them and study well
                  </Text>

                  {/* <Text style={styles.userstext}>Graded</Text> */}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.belowhr}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#B04305', fontSize: 12}}>
                  Due:21 May,2021
                </Text>
                <Text style={{color: '#58636D', fontSize: 12}}>
                  Saved as Draft
                </Text>
              </View>
              <Button
                title="Send"
                mode="contained"
                color="#58636D"
                //   labelStyle={{color:'white'}}
              />
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <TouchableOpacity style={styles.differentusers}>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      fontSize: 18,
                      color: '#211C5A',
                    }}>
                    {' '}
                    Title
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12, color: '#211C5A'}}> Edit</Text>
                    <Icon size={12} color="#211C5A" name="edit" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#5177E7'}}>
                    Course and Batch
                  </Text>
                  {/*                 
                <Text style={{fontSize:12,color:'blue'}}> Not Graded</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#505069'}}>
                    Exams will be conducted via online mode in the upcoming week
                    and these are notes for it.So,go through them and study well
                  </Text>

                  {/* <Text style={styles.userstext}>Graded</Text> */}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.belowhr}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#B04305', fontSize: 12}}>
                  Due:21 May,2021
                </Text>
                <Text style={{color: '#58636D', fontSize: 12}}>
                  Saved as Draft
                </Text>
              </View>
              <Button title="Send" mode="contained" color="#5177E7" />
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <TouchableOpacity style={styles.differentusers}>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      fontSize: 18,
                      color: '#211C5A',
                    }}>
                    {' '}
                    Title
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12, color: '#211C5A'}}> Edit</Text>
                    <Icon size={12} color="#211C5A" name="edit" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#5177E7'}}>
                    Course and Batch
                  </Text>
                  {/*                 
                <Text style={{fontSize:12,color:'blue'}}> Not Graded</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#505069'}}>
                    Exams will be conducted via online mode in the upcoming week
                    and these are notes for it.So,go through them and study well
                  </Text>

                  {/* <Text style={styles.userstext}>Graded</Text> */}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.belowhr}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#B04305', fontSize: 12}}>
                  Due:21 May,2021
                </Text>
                <Text style={{color: '#58636D', fontSize: 12}}>
                  Saved as Draft
                </Text>
              </View>
              <Button title="Send" mode="contained" color="#5177E7" />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  function Submitted() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <TouchableOpacity style={styles.differentusers}>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      fontSize: 18,
                      color: '#211C5A',
                    }}>
                    {' '}
                    Title
                  </Text>

                  <Text style={{fontSize: 10, color: '#505069'}}>
                    ID:45321440
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#58626C'}}>
                    Issued: 21May,2021
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12, color: '#58636D'}}>
                      {' '}
                      Due: 21Sept,2021
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <TouchableOpacity style={styles.differentusers}>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      fontSize: 18,
                      color: '#211C5A',
                    }}>
                    {' '}
                    Title
                  </Text>

                  <Text style={{fontSize: 10, color: '#505069'}}>
                    ID:45321440
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#58626C'}}>
                    Issued: 21May,2021
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12, color: '#58636D'}}>
                      {' '}
                      Due: 21Sept,2021
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.maincontainer}>
        <View
          style={{
            width: '90%',
            marginLeft: 25,
            marginBottom: 30,
            marginTop: 30,
          }}>
          <Searchbar
            placeholder="Enter subject or batch name"
            // placeholderTextColor="black"
            // onChangeText={this.updateSearch}
            onChangeText={onChangeSearch}
            value={searchQuery} //value={search}
            //    style={styles.search}
            containerStyle={{width: '60%', marginTop: 40, marginHorizontal: 70}}
            //     //containerStyle={{backgroundColor:"#fff"}}
          />
        </View>
        <View style={styles.switchTabsView}>
          <TouchableOpacity
            style={{
              borderBottomWidth: activeTab == 'Due' ? 4 : 0,
              borderBottomColor: '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => switchTab()}>
            <Text style={styles.switchText}>Due</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderBottomWidth: activeTab == 'Submitted' ? 4 : 0,
              borderBottomColor: '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => switchTab()}>
            <Text style={styles.switchText}>Submitted</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'Due' ? <Due /> : <Submitted />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 2,
    marginTop: 14,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 0,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
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
  userstext: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '300',
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
    //borderBottomWidth:1,
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
  switchText: {
    fontSize: 14,
    color: '#58636D',
    paddingHorizontal: 5,
  },
  maincontainer: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  //   header: {
  //     height:65,
  //     backgroundColor:'white',
  //     flexDirection:'row',
  //   }
});
