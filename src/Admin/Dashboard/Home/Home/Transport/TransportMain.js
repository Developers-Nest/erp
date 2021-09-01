import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { auto } from 'async';
//redux
import { useSelector } from 'react-redux';
//useFocusEffect
import { useFocusEffect } from '@react-navigation/native';
// helpers
import get from '../../../../../services/helpers/request/get';
import read from '../../../../../services/localstorage/read';

export default function TransportMain({ navigation }) {
  const [showContent, setShowContent] = React.useState('Vehicle');
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  //theming
  const institute = useSelector(state => state.institute);

  function Vehicle() {
    const [vehicleinfo, setvehicleinfo] = useState([]);

    //for search
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useFocusEffect(
      React.useCallback(() => {
        let isActive = true;

        const fetchUser = async () => {

          try {
            let slug = '/transport/vehicle';
            let token = await read('token');
            const response = await get(slug, token);
            console.log('Vehicle info', response);
            setvehicleinfo(response);
          } catch (err) {
            alert('Cannot fetch vehicles list !!');
          }

        };

        fetchUser();

        return () => {
          isActive = false;
        };
      }, [])
    );





    return (
      <View style={styles.container}>

        <TouchableOpacity style={{ marginTop: 8, marginLeft: 30, marginBottom: 10 }}

          onPress={() =>
            navigation.navigate('AddVehicle')}


        >
          <Text style={{ color: 'blue', marginBottom: -6, fontWeight: 'bold' }}>Add Vehicle</Text>
          <Text ellipsizeMode="clip" numberOfLines={1} style={{ color: 'blue', fontWeight: 'bold' }}>
            - - - - - - - - -

          </Text>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 30, ...styles.shadow }}>
          <View style={styles.search}>
            <TextInput
              style={{ ...styles.search_input }}
              placeholder="Enter the vehicle no. here"
              placeholderTextColor='grey'
              color='black'
              defaultValue={searchText}
              textContentType='name'
              onChangeText={(text) => {
                setSearchText(text);
                if (text === '') {
                  return setFilteredUsers([]);
                }
                const filtered_users = vehicleinfo.filter((vehicle) =>
                  vehicle.vehicleNo.toLowerCase().startsWith(text.toLowerCase())
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
        {filteredUsers.length > 0 ?
          (
            <ScrollView>
              {vehicleinfo &&
                filteredUsers.map(vehicleinfo => (

                  <View style={styles.section}
                    key={vehicleinfo._id}
                  >
                    <View style={styles.details}>
                      <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',

                            }}>
                            {vehicleinfo.vehicleNo ? vehicleinfo.vehicleNo : 'N/A'}
                          </Text>
                          <Text style={{
                            fontSize: 12,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                            fontStyle: 'normal',
                          }}>
                            Vehicle Type: {vehicleinfo.type ? vehicleinfo.type : 'N/A'}
                          </Text>
                        </View>

                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',

                            }}>
                            {''} {vehicleinfo.contactPerson ? vehicleinfo.contactPerson : 'N/A'}
                          </Text>
                          <TouchableOpacity
                            style={{ flexDirection: 'row' }}
                            onPress={() => navigation.navigate('EditVehicle', {
                              vehicle: vehicleinfo
                            })
                            }

                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#211C5A',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              Edit
                            </Text>
                            <AntDesign
                              size={12}
                              color="#211C5A"
                              name="edit"
                              style={{ paddingTop: 2, paddingRight: 10 }}
                            />


                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={styles.belowhr}>

                      <Text
                        style={{
                          color: '#B04305',
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        Max:{vehicleinfo.maximumAllowed ? vehicleinfo.maximumAllowed : 'N/A'} Persons
                      </Text>


                      <Text
                        style={{
                          color: '#58636D',
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        Seats:{vehicleinfo.seats ? vehicleinfo.seats : 'N/A'}
                      </Text>

                    </View>
                  </View>


                ))}

              <View style={{ height: 10 }} />
            </ScrollView>
          ) : (
            <ScrollView>
              {vehicleinfo &&
                vehicleinfo.map(vehicleinfo => (

                  <View style={styles.section}
                    key={vehicleinfo._id}
                  >
                    <View style={styles.details}>
                      <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',

                            }}>
                            {vehicleinfo.vehicleNo ? vehicleinfo.vehicleNo : 'N/A'}
                          </Text>
                          <Text style={{
                            fontSize: 12,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                            fontStyle: 'normal',
                          }}>
                            Vehicle Type: {vehicleinfo.type ? vehicleinfo.type : 'N/A'}
                          </Text>
                        </View>

                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',

                            }}>
                            {''} {vehicleinfo.contactPerson ? vehicleinfo.contactPerson : 'N/A'}
                          </Text>
                          <TouchableOpacity
                            style={{ flexDirection: 'row' }}
                            onPress={() => navigation.navigate('EditVehicle', {
                              vehicle: vehicleinfo
                            })
                            }

                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#211C5A',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              Edit
                            </Text>
                            <AntDesign
                              size={12}
                              color="#211C5A"
                              name="edit"
                              style={{ paddingTop: 2, paddingRight: 10 }}
                            />


                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={styles.belowhr}>

                      <Text
                        style={{
                          color: '#B04305',
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        Max:{vehicleinfo.maximumAllowed ? vehicleinfo.maximumAllowed : 'N/A'} Persons
                      </Text>


                      <Text
                        style={{
                          color: '#58636D',
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        Seats:{vehicleinfo.seats ? vehicleinfo.seats : 'N/A'}
                      </Text>

                    </View>
                  </View>


                ))}

              <View style={{ height: 10 }} />
            </ScrollView>
          )}
      </View>
    );

  };

  function Driver() {

    const [driverinfo, setdriverinfo] = useState([]);

    //for search
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useFocusEffect(
      React.useCallback(() => {
        let isActive = true;

        const fetchUser = async () => {

          try {
            let slug = '/transport/driver';
            let token = await read('token');
            const response = await get(slug, token);
            console.log('Driver info', response);
            setdriverinfo(response);
          } catch (err) {
            alert('Cannot fetch driver list !!');
          }

        };

        fetchUser();

        return () => {
          isActive = false;
        };
      }, [])
    );

    return (
      <View style={styles.container}>

        <TouchableOpacity style={{ marginTop: 8, alignItems: 'center', alignContent: 'center', marginBottom: 10 }}

          onPress={() =>
            navigation.navigate('AddDriver')}


        >
          <Text style={{ color: 'blue', marginBottom: -6, fontWeight: 'bold' }}>Add Driver</Text>
          <Text ellipsizeMode="clip" numberOfLines={1} style={{ color: 'blue', fontWeight: 'bold' }}>
            - - - - - - - - - -

          </Text>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 30, ...styles.shadow }}>
          <View style={styles.search}>
            <TextInput
              style={{ ...styles.search_input }}
              placeholder="Enter the driver name here"
              placeholderTextColor='grey'
              color='black'
              defaultValue={searchText}
              textContentType='name'
              onChangeText={(text) => {
                setSearchText(text);
                if (text === '') {
                  return setFilteredUsers([]);
                }
                const filtered_users = driverinfo.filter((driver) =>
                  driver.name.toLowerCase().startsWith(text.toLowerCase())
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
        {filteredUsers.length > 0 ?
          (
            <ScrollView>
              {driverinfo ? driverinfo &&
                filteredUsers.map(driverinfo => (


                  <View style={styles.section}
                    key={driverinfo._id}
                  >
                    <View style={styles.details}>
                      <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',

                            }}>
                            {driverinfo.vehicleNo.vehicleNo ? driverinfo.vehicleNo.vehicleNo : 'N/A'}
                          </Text>
                          <Text style={{
                            fontSize: 12,
                            color: '#211C5A',
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                          }}>
                            Ph:{driverinfo.phone ? driverinfo.phone : 'N/A'}
                          </Text>
                        </View>

                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Medium',
                              fontWeight: 'bold',

                            }}>
                            {driverinfo.name ? driverinfo.name : 'N/A'}
                          </Text>
                          <TouchableOpacity
                            onPress={() => navigation.navigate('EditDriver', {
                              driver: driverinfo
                            })
                            }
                            style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#211C5A',
                                fontWeight: 'bold',
                                fontFamily: 'Poppins-Medium',
                              }}>
                              Edit
                            </Text>

                            <AntDesign
                              size={12}
                              color="#211C5A"
                              name="edit"
                              style={{ paddingTop: 2, paddingRight: 10 }}
                            />

                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={styles.belowhr}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          style={{
                            color: '#58636D',
                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                            fontWeight: 'bold',
                            color: '#58636D',
                          }}>
                          Licensce No.{driverinfo.licenseNumber ? driverinfo.licenseNumber : 'N/A'}
                        </Text>
                      </View>
                    </View>
                  </View>

                )) : null}

              <View style={{ height: 10 }} />
            </ScrollView>
          ) : (
            <ScrollView>
              {driverinfo ? driverinfo &&
                driverinfo.map(driverinfo => (


                  <View style={styles.section}
                    key={driverinfo._id}
                  >
                    <View style={styles.details}>
                      <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',

                            }}>
                            {driverinfo.vehicleNo.vehicleNo ? driverinfo.vehicleNo.vehicleNo : 'N/A'}
                          </Text>
                          <Text style={{
                            fontSize: 12,
                            color: '#211C5A',
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                          }}>
                            Ph:{driverinfo.phone ? driverinfo.phone : 'N/A'}
                          </Text>
                        </View>

                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Medium',
                              fontWeight: 'bold',

                            }}>
                            {driverinfo.name ? driverinfo.name : 'N/A'}
                          </Text>
                          <TouchableOpacity
                            onPress={() => navigation.navigate('EditDriver', {
                              driver: driverinfo
                            })
                            }
                            style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#211C5A',
                                fontWeight: 'bold',
                                fontFamily: 'Poppins-Medium',
                              }}>
                              Edit
                            </Text>

                            <AntDesign
                              size={12}
                              color="#211C5A"
                              name="edit"
                              style={{ paddingTop: 2, paddingRight: 10 }}
                            />

                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={styles.belowhr}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          style={{
                            color: '#58636D',
                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                            fontWeight: 'bold',
                            color: '#58636D',
                          }}>
                          Licensce No.{driverinfo.licenseNumber ? driverinfo.licenseNumber : 'N/A'}
                        </Text>
                      </View>
                    </View>
                  </View>

                )) : null}

              <View style={{ height: 10 }} />
            </ScrollView>
          )}
      </View>
    );

  };
  function Destination() {
    const [destinationinfo, setdestinationinfo] = useState([]);

    //for search
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useFocusEffect(
      React.useCallback(() => {
        let isActive = true;

        const fetchUser = async () => {

          try {
            let slug = '/transport/destinationAndFees';
            let token = await read('token');
            const response = await get(slug, token);
            console.log('Destination info', response);
            setdestinationinfo(response);
          } catch (err) {
            alert('Cannot fetch destination list !!');
          }

        };

        fetchUser();

        return () => {
          isActive = false;
        };
      }, [])
    );



    return (
      <View style={styles.container}>

        <TouchableOpacity style={{ marginTop: 8, marginRight: 30, alignItems: 'flex-end', marginBottom: 10 }}

          onPress={() =>
            navigation.navigate('AddDestination')}


        >
          <View style={{}}></View>
          <Text style={{ color: 'blue', marginBottom: -6, fontWeight: 'bold' }}>Add Destination</Text>
          <Text ellipsizeMode="clip" numberOfLines={1} style={{ color: 'blue', fontWeight: 'bold' }}>
            - - - - - - - - - - - -

          </Text>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 30, ...styles.shadow }}>
          <View style={styles.search}>
            <TextInput
              style={{ ...styles.search_input }}
              placeholder="Enter the destination here"

              placeholderTextColor='grey'
              color='black'
              defaultValue={searchText}
              textContentType='name'
              onChangeText={(text) => {
                setSearchText(text);
                if (text === '') {
                  return setFilteredUsers([]);
                }
                const filtered_users = destinationinfo.filter((destination) =>
                  destination.route.code.toLowerCase().startsWith(text.toLowerCase())
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
        {filteredUsers.length > 0 ?
          (

            <ScrollView>
              {destinationinfo ? destinationinfo &&
                filteredUsers.map(destinationinfo => (


                  <View style={styles.section}
                    key={destinationinfo._id}
                  >
                    <View style={styles.details}>
                      <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',

                            }}>
                            {destinationinfo.route.code ? destinationinfo.route.code : 'N/A'}
                          </Text>
                          <Text style={{
                            fontSize: 14,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                            fontStyle: 'normal',
                          }}>
                            Stop time- {destinationinfo.stopTime ? destinationinfo.stopTime.slice(11, 19) : 'N/A'}
                          </Text>
                        </View>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',
                              fontWeight: 'bold',

                            }}>
                            {destinationinfo.route.stopPlace ? destinationinfo.route.stopPlace : 'N/A'}
                          </Text>
                          <TouchableOpacity
                            onPress={() => navigation.navigate('EditDestination', {
                              destination: destinationinfo
                            })
                            }

                            style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#211C5A',
                                fontWeight: 'bold',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              Edit
                            </Text>

                            <AntDesign
                              size={12}
                              color="#211C5A"
                              name="edit"
                              style={{ paddingTop: 2, paddingRight: 10 }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={styles.belowhr}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          style={{
                            color: '#58636D',
                            fontSize: 12,
                            fontFamily: 'Poppins-Medium',
                          }}>
                          Fees Type: {destinationinfo.feeType ? destinationinfo.feeType : 'N/A'}
                        </Text>
                      </View>

                      <Text
                        style={{
                          color: '#1F7C17',
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        Fees:{destinationinfo.amount ? destinationinfo.amount : 'N/A'}
                      </Text>

                    </View>
                  </View>

                )) : null}

              <View style={{ height: 10 }} />
            </ScrollView>
          ) : (

            <ScrollView>
              {destinationinfo ? destinationinfo &&
                destinationinfo.map(destinationinfo => (


                  <View style={styles.section}
                    key={destinationinfo._id}
                  >
                    <View style={styles.details}>
                      <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',

                            }}>
                            {destinationinfo.route.code ? destinationinfo.route.code : 'N/A'}
                          </Text>
                          <Text style={{
                            fontSize: 14,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                            fontStyle: 'normal',
                          }}>
                            Stop time- {destinationinfo.stopTime ? destinationinfo.stopTime.slice(11, 19) : 'N/A'}
                          </Text>
                        </View>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',
                              fontWeight: 'bold',

                            }}>
                            {destinationinfo.route.stopPlace ? destinationinfo.route.stopPlace : 'N/A'}
                          </Text>
                          <TouchableOpacity
                            onPress={() => navigation.navigate('EditDestination', {
                              destination: destinationinfo
                            })
                            }

                            style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#211C5A',
                                fontWeight: 'bold',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              Edit
                            </Text>

                            <AntDesign
                              size={12}
                              color="#211C5A"
                              name="edit"
                              style={{ paddingTop: 2, paddingRight: 10 }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={styles.belowhr}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          style={{
                            color: '#58636D',
                            fontSize: 12,
                            fontFamily: 'Poppins-Medium',
                          }}>
                          Fees Type: {destinationinfo.feeType ? destinationinfo.feeType : 'N/A'}
                        </Text>
                      </View>

                      <Text
                        style={{
                          color: '#1F7C17',
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        Fees:{destinationinfo.amount ? destinationinfo.amount : 'N/A'}
                      </Text>

                    </View>
                  </View>

                )) : null}

              <View style={{ height: 10 }} />
            </ScrollView>

          )
        }
      </View>
    );



  }



  return (


    <View style={styles.maincontainer}>

      {/* header start */}



      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >
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
                // paddingLeft: 10,
                // paddingTop: 23,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontStyle: 'normal',
              fontSize: 28,
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 20,
              color: 'white',
              fontFamily: 'NunitoSans-Regular',
            }}>
            Transport
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('SmsAlert')}
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
              marginRight: 5,
            }}>
            <MaterialIcon
              name="align-horizontal-right"
              color="#900"
              style={{
                fontSize: 35,
                color: 'white',
                paddingRight: 20,
              }}
            />


          </View>
        </TouchableOpacity>
      </View>

      {/* header ends */}
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }}>
        <View style={styles.count}>
          <TouchableOpacity onPress={() => setShowContent('Vehicle')}>

            <View style={{ alignItems: 'center' }}>

              <MaterialCommunityIcons
                size={36.83}
                color="#211C5A"
                name="bus"

              />
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 10,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular'
                }}>
                Vehicle
              </Text>
            </View>


          </TouchableOpacity>
        </View>
        <View style={styles.count}>
          <TouchableOpacity onPress={() => setShowContent('Driver')}>

            <View style={{ alignItems: 'center' }}>

              <MaterialCommunityIcons
                size={36.83}
                color="#211C5A"
                name="face-outline"

              />
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 10,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular'
                }}>
                Driver
              </Text>
            </View>
          </TouchableOpacity>

        </View>

        <View style={styles.count}>
          <TouchableOpacity onPress={() => setShowContent('Destination')}>

            <View style={{ alignItems: 'center' }}>

              <MaterialCommunityIcons
                size={36.83}
                color="#211C5A"
                name="google-maps"
              />
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 10,
                  color: '#211C5A',
                  marginTop: -5,
                  fontFamily: 'Poppins-Regular'
                }}
              >
                Destination
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {showContent === 'Vehicle' ? (<Vehicle />) : showContent === 'Driver' ? (<Driver />) : <Destination />}

      {/* close icons */}

    </View>

  );
}


const styles = StyleSheet.create({
  backgroung: {
    backgroundColor: '#E5E5E5',
    height: '100%',
    flex: 1,
  },
  count: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',

    paddingHorizontal: 13,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 0.8,
    },
    shadowOpacity: 0.2,
    elevation: 10,
    marginTop: 20,
    borderRadius: 50,
    marginHorizontal: 10,
    width: 85,
    height: 85,
    //new added
    alignSelf: 'center',
    //new added to move english down
    paddingTop: 20,
  },
  search: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderColor: '#00499F',
    borderRadius: 8,
  },
  search_input: {
    borderRadius: 8,
    height: 59,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    paddingTop: 15,
    paddingHorizontal: 10,
    width: '90%',
  },
  shadow: {

    elevation: 5,
    borderRadius: 8,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  section_heading: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'left',
    color: 'rgba(81, 119, 231, 1)',
    paddingHorizontal: 30,
    marginBottom: 5,
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
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 10
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 0,
    borderBottomColor: '#333',
    borderBottomWidth: 0.5,
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
  button: {
    backgroundColor: '#58636D',

    color: '#F9F9F9',
    padding: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
    paddingHorizontal: 5
  },
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  maincontainer: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
});
