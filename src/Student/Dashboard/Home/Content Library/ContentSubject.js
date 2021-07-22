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
import ContentLibrary from './ContentLibrary';

import {Avatar} from 'react-native-paper';

import Icon from 'react-native-vector-icons/AntDesign';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// redux
import {useSelector} from 'react-redux';

export default function ContentSubject({navigation}) {
  //theming
  const institute = useSelector(state => state.institute);

  return (
    <View
      style={{
        backgroundColor: '#E5E5E5',
        flex: 1,
        justifyContent: 'flex-start',
      }}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
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
          Content Library
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('GoLive')}
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesome5
            name="align-left"
            size={30}
            style={{
              color: 'white',
              paddingRight: 20,
            }}
            onPress={() => {
              navigation.navigate('ContentLibrary');
            }}
          />
        </TouchableOpacity>
      </View>

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
                  English
                </Text>

                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    navigation.navigate('Edit Lesson Plan');
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#58636D',
                      fontFamily: 'Poppins-Regular',
                    }}>
                    A
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.differentusers}></TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#505069',
                    paddingRight: 15,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Weekly classes:05
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'column'}}>
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
                  Abhinav Chikkara
                </Text>

                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    navigation.navigate('Edit Lesson Plan');
                  }}>
                  <Avatar.Text size={30} label="BS" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.differentusers}></TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#505069',
                    paddingRight: 15,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Weekly classes:05
                </Text>
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
                    fontFamily: 'Poppins-Regular',
                    fontSize: 18,
                    color: '#211C5A',
                  }}>
                  {' '}
                  Hindi
                </Text>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    navigation.navigate('Edit Lesson Plan');
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#58636D',
                      fontFamily: 'Poppins-Regular',
                    }}>
                    A
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#505069',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Weekly Classes:07
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'column'}}>
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
                  Prakash
                </Text>

                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    navigation.navigate('Edit Lesson Plan');
                  }}>
                  <Avatar.Text size={30} label="BS" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.differentusers}></TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#505069',
                    paddingRight: 15,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Designation
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
  },
});
