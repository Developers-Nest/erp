import React, { useState, useEffect } from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';


import { Button } from 'react-native-paper';
// helpers
import get from '../../../../../services/helpers/request/get';
import deleteReq from '../../../../../services/helpers/request/delete';
import read from '../../../../../services/localstorage/read';

//redux
import { useSelector } from 'react-redux';

export default function LibraryMain({ navigation }) {

  const [addedbooks, setaddedbooks] = useState([]);

  const [issuedbooks, setissuedbooks] = useState([]);
  const [showContent, setShowContent] = React.useState('IssuedBooks');
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  //screen reload
  const [reload, setreload] = React.useState(true);

  //theming
  const institute = useSelector(state => state.institute);

  //for search
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  //on load
  useEffect(async () => {
    try {
      let slug = '/library/issue';
      let token = await read('token');
      const response = await get(slug, token);
      console.log('Issued Books ', response);
      setissuedbooks(response);
    } catch (err) {
      alert('Cannot fetch issued books list !!');
    }
    try {
      let slug = '/library/books';
      let token = await read('token');
      const response = await get(slug, token);
      console.log(response);
      setaddedbooks(response);
    } catch (err) {
      alert('Cannot fetch added books list !!');
    }
  }, [reload]);



  function AddedBooks() {

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ alignItems: 'flex-end', marginRight: 30 }}
          onPress={() => navigation.navigate('AddBooks')}>
          <Text style={{ color: 'blue', marginBottom: -6, fontWeight: 'bold' }}>
            Add more books
          </Text>
          <Text
            ellipsizeMode="clip"
            numberOfLines={1}
            style={{ color: 'blue', fontWeight: 'bold' }}>
            - - - - - - - - - - - - -
          </Text>
        </TouchableOpacity>
        {filteredUsers.length > 0 ?
          (
            <ScrollView>
              {addedbooks &&
                filteredUsers.map(addedbooks => (
                  <View style={styles.section} key={addedbooks._id}>
                    <View style={styles.details}>
                      <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {' '}
                            {addedbooks.title}
                          </Text>
                        </View>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#505069',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {'  '}
                            {addedbooks.isbn}
                          </Text>
                          <TouchableOpacity
                            style={{ flexDirection: 'row' }}
                            onPress={() => navigation.navigate('EditBooks', {
                              books: addedbooks
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
                              style={{ paddingTop: 2 }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={styles.belowhr}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#1F7C17',
                          fontFamily: 'Poppins-Regular',
                          paddingLeft: 5,
                        }}>
                        Issued:{addedbooks.purchaseDate.slice(0, 10)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#505069',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {addedbooks.bookNumber}
                      </Text>
                    </View>
                  </View>
                ))}
            </ScrollView>
          ) :
          (
            <ScrollView>
              {addedbooks &&
                addedbooks.map(addedbooks => (
                  <View style={styles.section} key={addedbooks._id}>
                    <View style={styles.details}>
                      <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {' '}
                            {addedbooks.title}
                          </Text>
                        </View>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#505069',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {'  '}
                            {addedbooks.isbn}
                          </Text>
                          <TouchableOpacity
                            style={{ flexDirection: 'row' }}
                            onPress={() => navigation.navigate('EditBooks', {
                              books: addedbooks
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
                              style={{ paddingTop: 2 }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={styles.belowhr}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#1F7C17',
                          fontFamily: 'Poppins-Regular',
                          paddingLeft: 5,
                        }}>
                        Issued:{addedbooks.purchaseDate.slice(0, 10)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#505069',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {addedbooks.bookNumber}
                      </Text>
                    </View>
                  </View>
                ))}
            </ScrollView>

          )}
      </View>
    );
  }

  function IssuedBooks() {

    const HandleDelete = async id => {
      try {
        let slug = `/library/issue/${id}`;
        let token = await read('token');
        const response = await deleteReq(slug, token);
        setreload(!reload);
      } catch (err) {
        alert('Cannot delete issued book !!');
      }
    };
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ marginTop: 8, marginLeft: 30 }}
          onPress={() => navigation.navigate('IssuedBooksAdd')}>
          <Text style={{ color: 'blue', marginBottom: -6, fontWeight: 'bold' }}>
            Issue more books
          </Text>
          <Text
            ellipsizeMode="clip"
            numberOfLines={1}
            style={{ color: 'blue', fontWeight: 'bold' }}>
            - - - - - - - - - - - - -
          </Text>
        </TouchableOpacity>
        {filteredUsers.length > 0 ?
          (
            <ScrollView>
              {issuedbooks &&
                filteredUsers.map(issuedbooks => (
                  <View style={styles.section} key={issuedbooks._id}>
                    <View style={styles.details}>
                      <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {' '}
                            {issuedbooks.bookName
                              ? issuedbooks.bookName.title
                              : 'N/A'}
                          </Text>

                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#211C5A',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              {issuedbooks.returned ? 'Returned' : 'Not Returned'}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#5177E7',
                              fontFamily: 'Poppins-Medium',
                            }}>
                            {' '}
                            {issuedbooks.userType.name}
                          </Text>
                        </View>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#505069',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {'  '}
                            {/* Bulk Issue */}
                            {issuedbooks.bookName.copies}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              HandleDelete(issuedbooks._id);
                            }}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',

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
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#1F7C17',
                          fontFamily: 'Poppins-Regular',
                          paddingLeft: 5,
                        }}>
                        Issued:{issuedbooks.issueDate.slice(0, 10)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#B04305',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Due: {issuedbooks.dueDate.slice(0, 10)}
                      </Text>
                    </View>
                  </View>
                ))}
            </ScrollView>
          ) : (
            <ScrollView>
              {issuedbooks &&
                issuedbooks.map(issuedbooks => (
                  <View style={styles.section} key={issuedbooks._id}>
                    <View style={styles.details}>
                      <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {' '}
                            {issuedbooks.bookName
                              ? issuedbooks.bookName.title
                              : 'N/A'}
                          </Text>

                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#211C5A',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              {issuedbooks.returned ? 'Returned' : 'Not Returned'}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#5177E7',
                              fontFamily: 'Poppins-Medium',
                            }}>
                            {' '}
                            {issuedbooks.userType.name}
                          </Text>
                        </View>
                        <View style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#505069',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {'  '}
                            {/* Bulk Issue */}
                            {issuedbooks.bookName.copies}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              HandleDelete(issuedbooks._id);
                            }}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',

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
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#1F7C17',
                          fontFamily: 'Poppins-Regular',
                          paddingLeft: 5,
                        }}>
                        Issued:{issuedbooks.issueDate.slice(0, 10)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#B04305',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Due: {issuedbooks.dueDate.slice(0, 10)}
                      </Text>
                    </View>
                  </View>
                ))}
            </ScrollView>

          )}
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.maincontainer}>
        {/* header start */}

        <View
          style={{
            backgroundColor: institute ? institute.themeColor : '#FF5733',
            ...styles.header,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }} >
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
              Library
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('BooksRequest')}
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
                name="align-horizontal-left"
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

        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View style={{ alignItems: 'center', width: '90%' }}>
            {/* open search */}
            <View
              style={{
                marginTop: 10,
                marginLeft: 5,
                justifyContent: 'space-between',
                width: '95%',
                flexDirection: 'row',
                ...styles.shadow,
              }}>
              <TextInput
                style={{ width: '80%', ...styles.text_input }}
                placeholder="Enter book name or ID here"
                placeholderTextColor="grey"
                defaultValue={searchText}
                textContentType='name'
                onChangeText={(text) => {
                  setSearchText(text);
                  if (text === '') {
                    return setFilteredUsers([]);
                  }
                  if (showContent === 'IssuedBooks') {
                    const filtered_users = issuedbooks.filter((issuedbook) =>
                      issuedbook.bookName.title.toLowerCase().startsWith(text.toLowerCase())
                    );
                    setFilteredUsers(filtered_users);
                  }
                  if (showContent === 'AddedBooks') {
                    const filtered_users = addedbooks.filter((addedbook) =>
                      addedbook.title.toLowerCase().startsWith(text.toLowerCase())
                    );
                    setFilteredUsers(filtered_users);
                  }
                }}
                returnKeyType='search'
              />
              {searchText.length === 0 ? (
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                  }}>
                  <FontAwesome5
                    name="search"
                    style={{
                      alignSelf: 'center',
                      fontSize: 21,
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
        </View>

        {/* close search */}
        <Button
          onPress={() => navigation.navigate('IssuedStatus')}
          style={{ marginHorizontal: 20, marginVertical: 20 }}
          color={institute.themeColor}
          mode="contained">
          <Text>Issued Books Status</Text>
        </Button>

        {/* tabs section open */}
        <View style={styles.switchTabsView}>
          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'IssuedBooks' ? 1 : 0,
              borderBottomColor:
                showContent == 'IssuedBooks'
                  ? 'rgba(176, 67, 5, 1)'
                  : '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowContent('IssuedBooks')}>
            <Text
              style={
                ([styles.switchText],
                  [
                    {
                      color:
                        showContent == 'IssuedBooks'
                          ? 'rgba(176, 67, 5, 1)'
                          : '#58636D',
                    },
                    { fontWeight: 'bold' },
                  ])
              }>
              Issued Books
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'AddedBooks' ? 1 : 0,
              borderBottomColor:
                showContent == 'AddedBooks' ? 'rgba(176, 67, 5, 1)' : '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowContent('AddedBooks')}>
            <Text
              style={
                ([styles.switchText],
                  [
                    {
                      color:
                        showContent == 'AddedBooks'
                          ? 'rgba(176, 67, 5, 1)'
                          : '#58636D',
                    },
                    { fontWeight: 'bold' },
                  ])
              }>
              Added Books
            </Text>
          </TouchableOpacity>
        </View>
        {showContent === 'IssuedBooks' ? <IssuedBooks /> : <AddedBooks />}
      </View>
    </TouchableWithoutFeedback>
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
      height: 2,
    },
    shadowOpacity: 1,
    elevation: 5,
    marginTop: 14,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 4,
    // paddingBottom: 10,
    borderBottomColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },

  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userstext: {
    fontSize: 16,
    fontWeight: '300',
  },

  search: {
    backgroundColor: 'white',
    color: 'black',
  },
  switchTabsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  switchText: {
    fontSize: 14,
    paddingHorizontal: 5,
    fontFamily: 'Poppins-SemiBold',
  },
  maincontainer: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },

  switchTextDue: {
    fontSize: 14,
    color: '#B04305',
    paddingHorizontal: 5,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
  },

  text_input: {

    borderRadius: 10,
    height: 50,
    fontSize: 16,
    minWidth: 171,
    backgroundColor: 'white',
    color: 'black',
  },

  shadow: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
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
    minWidth: 110,
  },

  header: {
    height: 69,
    flexDirection: 'row',
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomColor: '#333',

  },
});
