import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';


import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// redux
import { useSelector } from 'react-redux';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import deleteReq from '../../../../services/helpers/request/delete'
import { useFocusEffect } from '@react-navigation/native';

const AllocatedListHostel = ({ route, navigation }) => {

  const [allocation, setAllocationlist] = useState([]);

  // loading screem
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();
  //for search
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  //date
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(0, 15);
  };


  // on load of the screen
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        showLoadingScreen();
        try {
          let slug = `/hostel/hostelAllocation`;
          let token = await read('token');

          let response = await get(slug, token);

          const list = [];
          for (let i = 0; i < response.length; i++) {
            list.push({
              _id: response[i]._id,
              username: response[i].user.firstName,
              type: response[i].userType.name,
              hostel: response[i].hostelName.name,
              room: response[i].hostelRoom.roomNo,
              floor: response[i].hostelRoom.floorName,
              institution: response[i].institution,
              regDate: parseDate(response[i].hostelRegistartionDate),
              vacaDate: parseDate(response[i].vacatingDate),
            });
            setAllocationlist(list)
          }
        } catch (err) {
          alert('Cannot fetch allocation list!!' + err);
        }
        hideLoadingScreen();
      };

      fetchUser();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleDelete = async id => {
    showLoadingScreen()
    try {
      let slug = `/hostel/hostelAllocation/${id}`
      let token = await read('token')
      let res = await deleteReq(slug, token)
      if (res.error) {
        alert(res.error)
      } else {
        alert('Deleted')
        setAllocationlist(allocation.filter(all => all._id != id))
      }
    } catch (err) {
      alert('Cannot Delete !!')
    }
    hideLoadingScreen()
  }


  //theming
  const institute = useSelector(state => state.institute);

  return (
    <View style={{ justifyContent: 'center', alignContent: 'center' }}>
      {/* header start */}
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : '#FF5733',

          ...styles.header,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }} >

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('HostelDetails');
            }}>
            <AntDesign
              size={24}
              color="white"
              name="left"
              style={{
                alignSelf: 'center',

                fontSize: 25,
                color: 'white',

              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontStyle: 'normal',
              fontFamily: 'NunitoSans-Regular',
              fontSize: 28,
              fontWeight: '600',
              alignSelf: 'center',
              marginLeft: 20,
              color: 'white',
            }}>
            Allocated List
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('HostelAllocationAdd')}
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop:4,
            }}>
            <Icon
              name="add-circle"
              color="#900"
              style={{
                fontSize: 30,
                color: 'white',
                paddingRight: 20,

              }}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                marginRight: 20,
              }}>
              ALLOCATE
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* header ends */}

      <View style={{ marginHorizontal: 10, ...styles.shadow }}>
        <View style={styles.search}>
          <TextInput
            style={{ ...styles.search_input, fontFamily: 'Poppins-Regular' }}
            placeholder="Enter hostel name here"
            placeholderTextColor="grey"
            defaultValue={searchText}
            textContentType='name'
            onChangeText={(text) => {
              setSearchText(text);
              if (text === '') {
                return setFilteredUsers([]);
              }
              const filtered_users = allocation.filter((allocation) =>
                allocation.username.toLowerCase().startsWith(text.toLowerCase())
              );
              setFilteredUsers(filtered_users);
            }}
            returnKeyType='search'
          />

          {searchText.length === 0 ? (
            <TouchableOpacity
              style={{
                alignSelf: 'center',
              }}
            >
              <Icon
                name="search-sharp"
                style={{
                  alignSelf: 'center',
                  fontSize: 30,
                  color: '#505069',
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setSearchText('');
                setFilteredUsers([]);
              }}
              style={{
                alignSelf: 'center',
              }}
            >
              <MaterialIcon name='cancel'
                style={{
                  alignSelf: 'center',
                  fontSize: 24,
                  color: '#505069',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Button
        onPress={() => navigation.navigate('RoomsList')}
        style={{ marginHorizontal: 20, marginVertical: 10 }}
        color={institute.themeColor}
        mode="contained">
        <Text>Room List</Text>
      </Button>
      {filteredUsers.length > 0 ?
        (
          <ScrollView>
            {allocation
              ? (allocation) &&
              filteredUsers.map(allocation => (
                <View key={allocation._id}>
                  <View style={styles.section} >
                    <View style={styles.details}>
                      <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',
                              marginHorizontal: -5,
                            }}>
                            {' '}
                            {allocation.username ? allocation.username : 'N/A'}
                          </Text>

                          <Text
                            style={{
                              flexDirection: 'row',
                              fontSize: 12,
                              color: '#505069',
                              fontFamily: 'OpenSans-Regular',
                            }}>
                            {allocation.room ? allocation.room : 'N/A'} {', '}
                            {allocation.floor ? allocation.floor : 'N/A'} {' floor'}
                          </Text>

                        </View>
                        <TouchableOpacity style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#5177E7',
                              fontFamily: 'Poppins-Medium',
                            }}></Text>
                        </TouchableOpacity>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: institute ? institute.themeColor : '#505069',
                              fontFamily: 'OpenSans-Regular',
                            }}>
                            {allocation.type ? allocation.type : 'N/A'}
                          </Text>
                        </View>

                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#505069',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {'Hostel: '}
                            {allocation.hostel ? allocation.hostel : 'N/A'}
                          </Text>

                          <TouchableOpacity
                            onPress={() => { handleDelete(allocation._id) }}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 5
                            }}>
                            <MaterialIcon
                              size={20}
                              backgroundColor=" #211C5A"
                              name="delete"
                              color={institute ? institute.themeColor : '#211C5A'}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={styles.belowhr}>
                      <View style={{ flexDirection: 'column' }}>

                        <Text
                          style={{
                            color: '#211C5A',

                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {'Register: '}
                          {allocation.regDate ? allocation.regDate : 'N/A'}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#211C5A',

                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {'Vacate: '} {allocation.vacaDate ? allocation.vacaDate : 'N/A'}
                        </Text>
                      </View>
                    </View>
                  </View>

                </View>
              ))
              : null}
            <View style={{ height: 90 }} />
          </ScrollView>
        ) : (
          <ScrollView>
            <View flexDirection="column-reverse">
            {allocation
              ? (allocation) &&
              allocation.map(allocation => (
                <View key={allocation._id}>
                  <View style={styles.section} >
                    <View style={styles.details}>
                      <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',
                              marginHorizontal: -5,
                            }}>
                            {' '}
                            {allocation.username ? allocation.username : 'N/A'}
                          </Text>

                          <Text
                            style={{
                              flexDirection: 'row',
                              fontSize: 12,
                              color: '#505069',
                              fontFamily: 'OpenSans-Regular',
                            }}>
                            {allocation.room ? allocation.room : 'N/A'} {', '}
                            {allocation.floor ? allocation.floor : 'N/A'} {' floor'}
                          </Text>

                          {/* */}
                        </View>
                        <TouchableOpacity style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#5177E7',
                              fontFamily: 'Poppins-Medium',
                            }}></Text>
                        </TouchableOpacity>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: institute ? institute.themeColor : '#505069',
                              fontFamily: 'OpenSans-Regular',
                            }}>
                            {allocation.type ? allocation.type : 'N/A'}
                          </Text>
                        </View>

                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#505069',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {'Hostel: '}
                            {allocation.hostel ? allocation.hostel : 'N/A'}
                          </Text>

                          <TouchableOpacity
                            onPress={() => { handleDelete(allocation._id) }}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 5
                            }}>
                            <MaterialIcon
                              size={20}
                              backgroundColor=" #211C5A"
                              name="delete"
                              color={institute ? institute.themeColor : '#211C5A'}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={styles.belowhr}>
                      <View style={{ flexDirection: 'column' }}>

                        <Text
                          style={{
                            color: '#211C5A',

                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {'Register: '}
                          {allocation.regDate ? allocation.regDate : 'N/A'}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#211C5A',

                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {'Vacate: '} {allocation.vacaDate ? allocation.vacaDate : 'N/A'}
                        </Text>
                      </View>
                    </View>
                  </View>

                </View>
              ))
              : null}
              </View>
            <View style={{ height: 90 }} />
          </ScrollView>



        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  container: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  SelectedValue: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 27,
    padding: 10,
    backgroundColor: '#8a2be2',
    color: '#211C5A',
  },
  search_input: {
    fontFamily: 'Poppins-Regular',
    borderRadius: 12,
    height: 50,
    fontSize: 15,
    color: 'black',
    paddingTop: 5,
    paddingHorizontal: 0,
    width: '90%',
    textAlign: 'left',
  },
  search: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderColor: '#58636D',
    borderRadius: 12,
    borderWidth: 0.3,
    marginTop: 20,
  },

  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 2.0,
    elevation: 10,
    marginTop: 14,
    marginBottom: 10,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
  },

  details: {
    //display: 'flex',
    flexDirection: 'column',
    marginTop: 5,
    paddingBottom: 0,
    borderBottomColor: 'rgba(88, 99, 109, 0.45)',
    borderBottomWidth: 0.8,
  },
  userinhostels: {
    marginTop: 10,
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
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 0,
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#333',
    //borderBottomWidth:1,
  },

  button: {
    backgroundColor: '#58636D',

    color: '#F9F9F9',
    padding: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },


});

export default AllocatedListHostel;
