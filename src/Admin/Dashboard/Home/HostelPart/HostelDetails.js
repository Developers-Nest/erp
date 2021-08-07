import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import {Button} from 'react-native-paper';

import AntDesign from 'react-native-vector-icons/AntDesign'; //for users section icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';
//redux
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

const HostelDetails = ({navigation}) => {
  //theming
  const institute = useSelector(state => state.institute);

  const [searchQuery, setSearchQuery] = useState('');
  const [hdetails, sethdetails] = useState([]);

  const onChangeSearch = query => setSearchQuery(query);
  useEffect(async () => {
    try {
      let slug = '/hostel/hostelDetails';
      let token = await read('token');
      const response = await get(slug, token);
      console.log('Hostel Details ', response);
      sethdetails(response);
    } catch (err) {
      alert('Cannot fetch hostel details !!');
    }
  }, []);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(249, 249, 249, 1)',
      }}>
      {/* header start */}

      <View
        style={{
          backgroundColor: institute ? institute.themeColor : '#FF5733',
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
        <Text
          style={{
            fontStyle: 'normal',
            fontFamily: 'NunitoSans-Regular',
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
            color: 'white',
          }}>
          Hostel Details
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AllocatedListHostel')}
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
            {/* <Ionicons
                  name="add-circle"
                  color="#900"
                  style={{
                    fontSize: 35,
                    color: 'white',
                    paddingRight: 20,
                  }}
                /> */}
            <MaterialIcon
              name="align-horizontal-left"
              color="#900"
              style={{
                fontSize: 30,
                color: 'white',
                paddingRight: 20,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* header ends */}

      <View style={{marginHorizontal: 10, ...styles.shadow}}>
        <View style={styles.search}>
          <TextInput
            style={{...styles.search_input, fontFamily: 'Poppins-Regular'}}
            placeholder="Enter hostel name here"
            placeholderTextColor="grey"
            color="black"
          />
          <TouchableOpacity
            style={{
              alignSelf: 'center',
            }}>
            <Icon
              name="search-sharp"
              style={{
                alignSelf: 'center',
                fontSize: 30,
                color: '#505069',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Button
        onPress={() => navigation.navigate('HostelRequest')}
        style={{marginHorizontal: 20, marginVertical: 10}}
        color={institute.themeColor}
        mode="contained">
        <Text>Hostel Requests</Text>
      </Button>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('HostelRequest')}>
        <ScrollView>
          {hdetails &&
            hdetails.map(hdetails => (
              <View style={styles.section} key={hdetails._id}>
                <View style={styles.details}>
                  <View style={styles.userinhostels}>
                    <View style={styles.differentusers}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#211C5A',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {hdetails.name ? hdetails.name : 'Name N/A'}
                      </Text>

                      <Text
                        style={{
                          flexDirection: 'row',
                          fontSize: 10,
                          color: '#505069',
                          marginTop: 5,
                          fontFamily: 'openSans',
                        }}>
                        Ph:{hdetails.phoneNumber ? hdetails.phoneNumber : 'N/A'}
                      </Text>

                      {/* */}
                    </View>
                    {/* <TouchableOpacity style={styles.differentusers}>
                            <Text style={{ fontSize: 12, color: ' #505069', fontFamily: 'openSans' }}>
                                User Type
                            </Text>
                        </TouchableOpacity> */}

                    <View style={styles.differentusers}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#211C5A',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {hdetails.address ? hdetails.address : 'Address N/A'}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                            marginTop: 5,
                            marginHorizontal: 8,
                          }}>
                          {hdetails.hostelType
                            ? hdetails.hostelType.name
                            : 'N/A'}
                        </Text>
                        {/* <Icon1
                                    size={12}
                                    backgroundColor=" #211C5A"
                                    name="edit"
                                    style={{ paddingTop: 7, paddingRight: 12 }}
                                /> */}
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.belowhr}>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        color: '#B04305',
                        fontSize: 12,
                        fontFamily: 'Poppins-Regular',
                      }}></Text>
                    <Text
                      style={{
                        color: '#211C5A',

                        fontSize: 12,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {hdetails.wardenName ? hdetails.wardenName : 'N/A'}
                    </Text>
                  </View>
                  <View style={{marginTop: 15}}>
                    <Text
                      style={{
                        color: '#211C5A',

                        fontSize: 12,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Ph:
                      {hdetails.wardenPhoneNumber
                        ? hdetails.wardenPhoneNumber
                        : 'N/A'}
                    </Text>
                  </View>
                </View>
              </View>
            ))}

          <View style={{height: 90}} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
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
    borderRadius: 8,
    height: 50,
    fontSize: 15,

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
    borderRadius: 8,
    borderWidth: 0.3,
    marginTop: 20,
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
    shadowOpacity: 2.0,
    elevation: 5,
    marginTop: 14,
    marginBottom: 5,
    borderRadius: 12,
    paddingHorizontal: 20,
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
    paddingHorizontal: 0,
    paddingBottom: 10,
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

export default HostelDetails;
