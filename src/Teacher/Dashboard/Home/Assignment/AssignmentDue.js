import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { Searchbar } from 'react-native-paper';

// helpers
import get from '../../../../services/helpers/request/get'
import read from '../../../../services/localstorage/read'

export default function AssignmentsDue({ navigation }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [assignments, setAssignments] = useState([])

  const onChangeSearch = query => setSearchQuery(query);

  useEffect(async () => {

    try {
      let slug = '/note/assignment'
      let token = await read('token')
      const response = await get(slug, token)
      console.log(response)
      setAssignments(response)

    } catch (err) {
      alert('Cannot fetch your assignments !!')
    }

  }, [])

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
            onChangeText={onChangeSearch}
            value={searchQuery} //value={search}
            containerStyle={{ width: '60%', marginTop: 40, marginHorizontal: 70 }}
          />
        </View>
        <View style={styles.container}>
          <ScrollView>
            {
              assignments && assignments.map((assignment) => (

                <View style={styles.section} key={assignment._id}>
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
                          {assignment.title || 'Title Not Found'}
                        </Text>

                        <View style={{ flexDirection: 'row' }}>

                          {/* passin assignment id */}
                          <TouchableOpacity
                            onPress={() => navigation.navigate('Assignment Edit', {
                              assignment: assignment
                            })}>

                            <Text style={{ fontSize: 12, color: '#211C5A' }}>Edit</Text>
                            <Icon size={12} color="#211C5A" name="edit" />
                          </TouchableOpacity>

                        </View>
                      </View>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text style={{ fontSize: 12, color: '#5177E7' }}>
                          {assignment.course && assignment.course.courseName} -
                          {assignment.batch && assignment.batch.batchName}
                        </Text>

                      </TouchableOpacity>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text style={{ fontSize: 12, color: '#505069' }}>
                          {assignment.description || 'Description Not Found'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.belowhr}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ color: '#B04305', fontSize: 12 }}>
                        Due: {assignment.submissionDateString || 'Submission date Not Found'}
                      </Text>
                      <Text style={{ color: '#58636D', fontSize: 12 }}>
                        Saved as Draft
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            }
          </ScrollView>
        </View>
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
