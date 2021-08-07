import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  Linking
} from 'react-native';

import {
  TextInput,
} from 'react-native-paper';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';
import LoaderHook from '../../../../components/LoadingScreen/LoadingScreen';

// redux
import { useSelector } from 'react-redux';

import { useFocusEffect } from '@react-navigation/core';

export default function LessonPlan({ navigation }) {
  const [data, setData] = useState([]);

  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

  //theming
  const institute = useSelector(state => state.institute);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        setLoadingScreen()
        try {
          let slug = '/lessonplanning';
          const token = await read('token');
          const response = await get(slug, token);
          console.log('Plan ', response)
          setData(response)
        } catch (err) {
          alert('Cannot fetch !!')
        }
        hideLoadingScreen()


      }
      fetchUser();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View
      style={{
        backgroundColor: '#E5E5E5',
        flex: 1,
        justifyContent: 'flex-start'
      }}>
      {loadingScreen}
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
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
            color: 'white',
          }}>
          Lesson Plan
        </Text>
        <View style={{ flex: 1, marginLeft: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Add Lesson Plan')}
            style={{
              justifyContent: 'center',
              flex: 1,
              alignItems: 'center',
              alignSelf: 'flex-end',
              paddingRight: 20,
              marginTop:15
            }}>
            <IonIcon size={30} color="white" name="add-circle-outline" />
            <Text style={{ fontFamily: 'Poppins-Regular', color: '#fff',marginRight:5 }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
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
        {data &&
          data.map(plan => (
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
                      {'Topic: ' + plan.topic || 'Topic: N/A'}
                    </Text>

                    <TouchableOpacity
                      style={{ flexDirection: 'row' }}
                      onPress={() => {
                        navigation.navigate('Edit Lesson Plan', {
                          lessonPlan: plan,
                        });
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#58636D',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Edit &nbsp;
                      </Text>
                      <AntDesign size={12} color="#211C5A" name="edit" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.differentusers}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: institute.themeColor || '#505069',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {plan.subject ? 'Subject: ' + plan.subject.name : 'Subject: N/A' || 'Subject: N/A'}
                    </Text>
                  </View>
                  <View style={styles.differentusers}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#505069',
                        paddingRight: 15,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {'Description: ' + plan.description || 'Description: N/A'}
                    </Text>

                    {/* <Text style={styles.userstext}>Graded</Text> */}
                  </View>
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
                  color={institute.themeColor || "#5177E7"}
                  labelStyle={{ color: 'white' }}
                  onPress={() => Linking.openURL(plan.url)}
                />
              </View>
            </View>
          ))}
      </ScrollView>
      {/* Cards end */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
  },

  header: {
    height: 69,
    flexDirection: 'row',
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
    marginBottom: 30
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
    backgroundColor: '#E5E5E5',
  },
  card: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
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
  Drop: {
    marginTop: 5,
    flexDirection: 'row',

    justifyContent: 'space-evenly',
  },
});
