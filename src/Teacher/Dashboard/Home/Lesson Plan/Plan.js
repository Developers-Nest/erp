import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  TextInput,
  RadioButton,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function LessonPlan({navigation}) {
  return (
    <View
      style={{
        backgroundColor: '#E5E5E5',
        flex: 1,
        justifyContent: 'flex-start',
      }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
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
        <View style={{flex: 1, marginLeft: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Add Lesson Plan');
            }}>
            <IonIcon
              size={24}
              color="white"
              name="add-circle-outline"
              style={{
                alignSelf: 'center',
                fontSize: 25,
                color: 'white',
                paddingLeft: 20,
                paddingTop: 15,
              }}
            />
          </TouchableOpacity>
          <Text style={{paddingLeft: 70, color: '#fff'}}>Add</Text>
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

        <View style={{marginTop: 20, ...styles.card}}>
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
        {/* close search */}
      </View>
      {/* starting of Card loop-section,scroll for more number of cards */}
      <ScrollView>
        <View style={styles.section}>
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
                  Topic Name
                </Text>

                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    navigation.navigate('Edit Lesson Plan');
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#58636D',
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Edit
                  </Text>
                  <Icon size={12} color="#211C5A" name="edit" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#505069',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Physics(Phy-20232)
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
                  Exams will be conducted via online mode.All the best.It is
                  requested from the students to maintain the dignity
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
              Batch
            </Text>

            <Button
              title="Link"
              mode="contained"
              color="#5177E7"
              labelStyle={{color: 'white'}}
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
                    fontFamily: 'Poppins-Regular',
                    fontSize: 18,
                    color: '#211C5A',
                  }}>
                  {' '}
                  Topic Name
                </Text>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#58636D',
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {' '}
                    Edit
                  </Text>
                  <Icon size={12} color="#211C5A" name="edit" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#505069',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Physics(Phy-20232)
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
                  Exams will be conducted via online mode.All the best.It is
                  requested from the students to maintain the dignity
                </Text>
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
              Batch
            </Text>

            <Button
              title="Link"
              mode="contained"
              color="#5177E7"
              labelStyle={{color: 'white'}}
            />
          </View>
        </View>
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
  Drop: {
    marginTop: 5,
    flexDirection: 'row',

    justifyContent: 'space-evenly',
  },
  header: {
    height: 65,
    marginTop: 0,
    backgroundColor: 'rgba(0, 73, 159, 1)',
    flexDirection: 'row',
  },
});
