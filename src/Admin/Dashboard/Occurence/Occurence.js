import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Button, Appbar } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';

//icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// loading screen
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

// helpers
import get from '../../../services/helpers/request/get';
import read from '../../../services/localstorage/read';
import deleteReq from '../../../services/helpers/request/delete';

// redux
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

import OccurenceEdit from './OccurenceEdit';
import Occurence2 from './Occurence2';

export default function Occurence({ navigation }) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Occurence" component={Occurance} />
      <Stack.Screen name="OccurenceEdit" component={OccurenceEdit} />
      <Stack.Screen name="Occurence2" component={Occurence2} />
    </Stack.Navigator>
  );
}

function Occurance({ navigation }) {
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(0, 15);
  };

  const institute = useSelector(state => state.institute);

  const [list, setlist] = useState([]);
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  const onChangeSearch = query => setSearchQuery(query);

  //screen reload
  const [reload, setreload] = React.useState(true);

  //fetch list
  useEffect(async () => {
    showLoadingScreen();
    try {
      let slug = `/occurrence`;
      let token = await read('token');
      let response = await get(slug, token);
      console.log('Response ', response);
      setlist(response);
    } catch (err) {
      alert('Cannot fetch your Live Classes !!\n');
    }
    hideLoadingScreen();
  }, [reload]);

  const HandleDelete = async id => {
    try {
      let slug = `/occurrence/${id}`;
      let token = await read('token');
      const response = await deleteReq(slug, token);
      setreload(!reload);
    } catch (err) {
      alert('Cannot delete occurrence!!' + err);
    }
  };

  return (
    <>
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
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
              paddingLeft: 20,
              color: 'white',
            }}>
            Occurence Register
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Occurence2')}>
            <AntDesign
              size={24}
              color="white"
              name="pluscircleo"
              style={{
                alignSelf: 'center',
                fontSize: 25,
                color: 'white',
                paddingRight: 20,
                paddingTop: 20,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.container}>
        {list &&
          list.map(occurance => (
            <View style={styles.section} key={occurance._id}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <TouchableOpacity style={styles.differentusers}>
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 20,
                        color: '#211C5A',
                      }}>
                      {occurance.employeeName.firstName}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Button
                        color={institute ? institute.themeColor : 'blue'}
                        style={{ padding: 0, margin: 0 }}
                        onPress={() =>
                          navigation.navigate('OccurenceEdit', {
                            id: occurance._id,
                            employeeID: occurance.employeeName._id,
                            employeeName: occurance.employeeName.firstName,
                            date: occurance.date,
                            remarks: occurance.remarks,
                            institution: occurance.institution,
                            v: occurance.__v,
                          })
                        }>
                        {'edit '}
                        <FontAwesome5 name={'edit'} size={20} light />
                      </Button>
                      <Button
                        color={institute ? institute.themeColor : 'blue'}
                        style={{ padding: 0, margin: 0 }}
                        onPress={() => {
                          HandleDelete(occurance._id);
                        }}>
                        {'delete '}
                        <MaterialCommunityIcons
                          size={20}
                          name="delete-outline"
                        />
                      </Button>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ ...styles.differentusers }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: institute ? institute.themeColor : 'blue',
                      }}>
                      {parseDate(occurance.date)}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('Occurence2')}
                    style={styles.differentusers}>
                    <Text style={{ fontSize: 16 }}>{occurance.remarks}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
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
    elevation: 5,
    marginTop: 14,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 10,
    borderBottomColor: '#333',
  },
  userinhostels: {
    marginTop: 10,
  },
  hey: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderTopWidth: 1,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userstext: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '300',
  },

  search: {
    backgroundColor: 'white',
    color: 'black',
  },
  switchTabsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  switchText: {
    fontSize: 20,
    color: 'black',
    paddingHorizontal: 5,
  },
  maincontainer: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
});
