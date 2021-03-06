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

import AntDesign from 'react-native-vector-icons/AntDesign'; 
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

// helpers
import get from '../../../../../services/helpers/request/get';
import read from '../../../../../services/localstorage/read';
//redux

const EmployeeList = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setemployeelist] = useState([]);

  const onChangeSearch = query => setSearchQuery(query);

  //for search
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(async () => {
    try {
      let slug = '/employee';
      let token = await read('token');
      const response = await get(slug, token);
      console.log('Employees', response);
      setemployeelist(response);
    } catch (err) {
      alert('Cannot fetch employees list !!');
    }
  }, []);

  //theming
  const institute = useSelector(state => state.institute);

  return (
    <View style={styles.container}>
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
          Employee List
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('EmployeeAttendance')}
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
           
            <MaterialCommunityIcon
              name="eye"
              color="#900"
              style={{
                fontSize: 35,
                color: 'white',
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
              }}>
              Attendance
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* header ends */}

      <View style={{marginHorizontal: 10, ...styles.shadow}}>
        <View style={styles.search}>
          <TextInput
            style={{...styles.search_input, fontFamily: 'Poppins-Regular'}}
            placeholder="Enter employee name here"
            placeholderTextColor="grey"
            defaultValue={searchText}
            textContentType='name'
            onChangeText={(text) => {
              setSearchText(text);
              if (text === '') {
                return setFilteredUsers([]);
              }
              const filtered_users = employees.filter((employee) =>
               employee.firstName.toLowerCase().startsWith(text.toLowerCase())
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

      {/* cards open */}
      {filteredUsers.length > 0 ?
        (
      <ScrollView>
        {employees &&
          filteredUsers.map(employees => (
            <View style={styles.section} key={employees._id}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <View style={styles.differentusers}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#211C5A',
                        fontFamily: 'Poppins-Regular',
                        marginHorizontal: -5,
                        // marginRight:100,
                        paddingRight: 50,
                      }}>
                      {' '}
                      {employees.firstName
                        ? employees.firstName.charAt(0).toUpperCase() +
                          employees.firstName.slice(1) +
                          ' ' +
                          employees.middleName.charAt(0).toUpperCase() +
                          employees.middleName.slice(1) +
                          ' ' +
                          employees.lastName.charAt(0).toUpperCase() +
                          employees.lastName.slice(1)
                        : 'Name not given'}
                    </Text>
                  </View>
                  <View style={styles.differentusers}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#211C5A',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {employees.designation ? employees.designation : 'N/A'}
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        color: '#211C5A',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {employees.department ? employees.department : ' N / A'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.belowhr}>
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontWeight: '500',
                      fontSize: 12,
                      lineHeight: 18,
                      color: '#211C5A',
                    }}>
                    {employees.email ? employees.email : 'EMAIL N/A'}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontWeight: '500',
                      fontSize: 12,
                      lineHeight: 18,
                      color: '#211C5A',
                    }}>
                    {employees.code ? employees.code : N / A}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        <View style={{height: 90}} />
      </ScrollView>
      ):(
        <ScrollView>
        {employees &&
          employees.map(employees => (
            <View style={styles.section} key={employees._id}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <View style={styles.differentusers}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#211C5A',
                        fontFamily: 'Poppins-Regular',
                        marginHorizontal: -5,
                        // marginRight:100,
                        paddingRight: 50,
                      }}>
                      {' '}
                      {employees.firstName
                        ? employees.firstName.charAt(0).toUpperCase() +
                          employees.firstName.slice(1) +
                          ' ' +
                          employees.middleName.charAt(0).toUpperCase() +
                          employees.middleName.slice(1) +
                          ' ' +
                          employees.lastName.charAt(0).toUpperCase() +
                          employees.lastName.slice(1)
                        : 'Name not given'}
                    </Text>
                  </View>
                  <View style={styles.differentusers}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#211C5A',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {employees.designation ? employees.designation : 'N/A'}
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        color: '#211C5A',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {employees.department ? employees.department : ' N / A'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.belowhr}>
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontWeight: '500',
                      fontSize: 12,
                      lineHeight: 18,
                      color: '#211C5A',
                    }}>
                    {employees.email ? employees.email : 'EMAIL N/A'}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontWeight: '500',
                      fontSize: 12,
                      lineHeight: 18,
                      color: '#211C5A',
                    }}>
                    {employees.code ? employees.code : N / A}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        <View style={{height: 90}} />
      </ScrollView>


      )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  // container1: {
  //     paddingTop: 10,
  //     flex: 1,

  //     backgroundColor: 'rgba(249, 249, 249, 1)',
  // },
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(249, 249, 249, 1)',
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

    color: 'black',
    paddingTop: 5,
    paddingHorizontal: 0,
    width: '90%',
    textAlign: 'left',
    marginTop: 3,
  },
  search: {
    // backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderColor: '#58636D',
    borderRadius: 8,
    borderWidth: 0.3,
    marginTop: 20,
    marginBottom: 20,
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
    shadowOpacity: 1.0,
    elevation: 5,
    marginVertical: 14,
    borderRadius: 12,

    marginHorizontal: 20,
    paddingHorizontal: 20,
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
    marginVertical: 6,
    justifyContent: 'space-between',
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

export default EmployeeList;
