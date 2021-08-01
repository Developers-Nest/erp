import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import {
  TextInput,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/AntDesign';

//redux
import { useSelector } from 'react-redux';

// helpers
import get from '../../../../services/helpers/request/get'
import read from '../../../../services/localstorage/read'

export default function LessonPlan({ navigation }) {
  //theming
  const institute = useSelector(state => state.institute);

  const [data, setData] = useState([])

  useEffect(async () => {

    let slug = '/lessonplanning'
    const token = await read('token')
    const response = await get(slug, token)
    console.log(response)
    setData(response)

  }, [])

  return (
    <View
      style={{
        backgroundColor: '#E5E5E5',
        flex: 1,
        justifyContent: 'flex-start',
      }}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : '#FF5733',
          // backgroundColor:'blue',
          ...styles.header,
        }}

      >
        <TouchableOpacity onPress={() => { navigation.navigate('Subjects') }}>
          <Icon
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
          Lesson Plan
        </Text>
      </View>

      {/* 
<AttendanceTakeHeader/> */}
      <View
        style={{
          width: '90%',
          marginLeft: 25,
          marginBottom: 30,
        }}>
        {/* open search */}

        <View style={{ marginTop: 20, ...styles.card }}>
          <TextInput
            left={<TextInput.Icon name="magnify" />}
            right={<TextInput.Icon name="filter" />}
            theme={{
              colors: {
                primary: '#999',
                underlineColor: 'transparent',
                background: 'white',
              },
            }}
            placeholder="Enter subject's or batch name"
            outlineColor="transparent"
            styles={{
              margin: 10,
              padding: 10,
              backgroundColor: 'white',
            }}
            mode="outline"
          />
        </View>
      </View>

      <ScrollView>

        {
          data && data.map((plan) => (
            <View style={styles.section} key={plan._id}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <View style={styles.differentusers}>
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 18,
                        color: '#211C5A',
                      }}>
                      {' '}
                      {plan.topic || 'Topic not found'}
                    </Text>

                  </View>
                  <TouchableOpacity style={styles.differentusers}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#505069',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {plan.name || 'Subject not found'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.differentusers}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#505069',
                        paddingRight: 15,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {plan.description || 'Description not found'}
                    </Text>

                    {/* <Text style={styles.userstext}>Graded</Text> */}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.belowhr}>
                <Text
                  style={{
                    color: '#505069',
                    fontSize: 12,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  {plan.course && plan.course.courseName} -
                  {plan.batch && plan.batch.batchName}
                </Text>

                <Button
                  title="Link"
                  mode="contained"
                  color={institute ? institute.themeColor : "#5177E7"}
                  labelStyle={{ color: 'white' }}
                />
              </View>
            </View>
          ))
        }

      </ScrollView>
      {/* Cards end */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,

    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    elevation: 5,
    marginTop: 14,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
    marginBottom: 20
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 3,
    paddingBottom: 10,
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
    marginTop: 20,
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

    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
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
  Drop: {
    marginTop: 5,
    flexDirection: 'row',

    justifyContent: 'space-evenly',
  },
  header: {
    height: 65,
    marginTop: 0,
    flexDirection: 'row',
  },
});
