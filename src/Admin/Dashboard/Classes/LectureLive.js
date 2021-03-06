import React, { useEffect, useState } from 'react';

//icons
import Icon from 'react-native-vector-icons/AntDesign';
import IconEnglish2 from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput
} from 'react-native';

//selector
import ModalSelector from 'react-native-modal-selector';

// loading screen
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

// helpers
import get from '../../../services/helpers/request/get';
import read from '../../../services/localstorage/read';
import getCourse from '../../../services/helpers/getList/getCourse';
import getBatch from '../../../services/helpers/getList/getBatch';

import deleteReq from '../../../services/helpers/request/delete'
// redux
import { useSelector } from 'react-redux';

let parseDate = myDate => {
  let d = new Date(myDate);
  return d.toString().slice(0, 15);
};

export default function Live({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  let institute = useSelector(state => state.institute);

  const [LiveClasses, setLiveClasses] = useState([]);
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();
  const userInfo = useSelector(state => state.userInfo);

  const [reload, setreload] = React.useState(true);
  // dropdown selected values
  const [batch, setBatch] = useState(null);
  const [course, setCourse] = useState(null);

  // dropdown values
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  //for search
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  //fetch courses
  useEffect(async () => {
    showLoadingScreen();
    try {
      let cour = await getCourse();
      setCourses(cour);
    } catch (err) {
      alert('Cannot fetch courses!!');
    }
    hideLoadingScreen();
  }, []);

  // get list of batches
  const fetchBatches = async sc => {
    showLoadingScreen();
    setCourse(sc);

    try {
      let bat = await getBatch(sc);
      setBatches(bat);
    } catch (err) {
      alert('Cannot fetch Batches!!');
    }
    hideLoadingScreen();
  };

  //fetch list
  const fetchList = async batch => {
    showLoadingScreen();
    setBatch(batch);

    try {
      let slug = `/liveclass/${course}/${batch}`;
      let token = await read('token');
      let response = await get(slug, token);
      setLiveClasses(response);
    } catch (err) {
      alert('Cannot fetch your Live Classes !!\n' + err);
    }
    hideLoadingScreen();
  };
  const handleDelete = async id => {
    showLoadingScreen();
    try {
      let slug = `/liveclass/${id}`
      let token = await read('token')
      let res = await deleteReq(slug, token)
      alert('Deleted..kindly reload the classes')
      setreload(!reload);
    } catch (err) {
      alert('Cannot delete this live class!!');
    }
    hideLoadingScreen();
  };

  return (
    <View style={styles.container}>
      {/* open search */}
      <View style={{ width: '90%', alignSelf: 'center', marginVertical: 20, alignItems: 'center' }}>
        <View
          style={{
            justifyContent: 'space-between',
            width: '95%',
            flexDirection: 'row',
            ...styles.shadow,
          }}>


          <TextInput
            style={{ width: '80%', ...styles.text_input }}
            placeholder="Enter subject name"
            placeholderTextColor='grey'
            defaultValue={searchText}
            textContentType='name'
            onChangeText={(text) => {
              setSearchText(text);
              if (text === '') {
                return setFilteredUsers([]);
              }
              const filtered_users = LiveClasses.filter((liveclass) =>
                liveclass.name.toLowerCase().startsWith(text.toLowerCase())
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
              <Ionicons
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
      {/* close search */}

      <View
        style={{
          marginBottom: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginHorizontal: 20,
        }}>
        {loadingScreen}
        <View style={{ marginTop: 10, width: 150, ...styles.card }}>
          <ModalSelector
            data={courses}
            onChange={option => {
              fetchBatches(option.key);
            }}
            initValue="Select Courses"
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>

        <View style={{ marginTop: 10, width: 150, ...styles.card }}>
          <ModalSelector
            data={batches}
            onChange={option => {
              fetchList(option.key);
            }}
            initValue="Select Batch"
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {filteredUsers.length > 0 ?
            (
              <>

                {LiveClasses &&
                  filteredUsers.map(LiveClass => (
                    <TouchableOpacity
                      onPress={() =>
                        LiveClass.url
                          ? Linking.openURL(LiveClass.url)
                          : alert('Url Not found!!')
                      }
                      style={styles.section}
                      key={LiveClass._id}>
                      <View style={styles.details}>
                        <View style={styles.userinhostels}>
                          <View style={styles.differentusers}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                fontSize: 22,
                                color: ' rgba(25, 40, 57, 0.7)',
                                fontFamily: 'Poppins-Medium',
                              }}>
                              {LiveClass.name.slice(0, 12)}
                            </Text>

                            <MaterialCommunityIcon
                              size={27}
                              color="rgba(25, 40, 57, 0.63)"
                              name="alpha-a"
                              style={{ paddingLeft: 7 }}
                            />
                          </View>

                          <View style={styles.differentusers}>
                            <Text
                              style={
                                (styles.teacher,
                                {
                                  color: institute
                                    ? institute.themeColor
                                    : 'rgba(25, 40, 57, 0.63)',
                                })
                              }>
                              {LiveClass.date ? parseDate(LiveClass.date) : null}
                              {/* {'\n' + new Date().toString() + '\n'}
                        {new Date(LiveClass.date).toString()} */}
                            </Text>
                            <View style={{ flexDirection: 'column' }}>
                              <IconEnglish2
                                size={24}
                                color={institute ? institute.themeColor : '#B04305'}
                                name="radio"
                                style={{ paddingLeft: 7 }}
                              />

                              <Text
                                style={{
                                  fontSize: 10,
                                  color: 'rgba(25, 40, 57, 0.9)',
                                  fontFamily: 'Poppins-Medium',
                                }}></Text>
                            </View>
                          </View>
                          {/* {new Date() < new Date(LiveClass.date) ? ( */}
                          <View style={styles.differentusers}>
                            <TouchableOpacity
                              style={{ flexDirection: 'row' }}
                              onPress={() =>
                                navigation.navigate('LiveEdit', {
                                  LiveClass: LiveClass,
                                })
                              }>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: '#211C5A',
                                  fontFamily: 'Poppins-Medium',
                                }}>
                                Edit
                              </Text>
                              <Icon
                                size={12}
                                color="#211C5A"
                                name="edit"
                                style={{ paddingTop: 2, paddingRight: 10 }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity

                              onPress={() => { handleDelete(LiveClass._id) }}
                              style={{
                                flexDirection: 'row',
                                // justifyContent: 'space-between',
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
                          {/* ) : null} */}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
              </>
            ) : (
              <>

                {LiveClasses &&
                  LiveClasses.map(LiveClass => (
                    <TouchableOpacity
                      onPress={() =>
                        LiveClass.url
                          ? Linking.openURL(LiveClass.url)
                          : alert('Url Not found!!')
                      }
                      style={styles.section}
                      key={LiveClass._id}>
                      <View style={styles.details}>
                        <View style={styles.userinhostels}>
                          <View style={styles.differentusers}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                fontSize: 22,
                                color: ' rgba(25, 40, 57, 0.7)',
                                fontFamily: 'Poppins-Medium',
                              }}>
                              {LiveClass.name.slice(0, 12)}
                            </Text>

                            <MaterialCommunityIcon
                              size={27}
                              color="rgba(25, 40, 57, 0.63)"
                              name="alpha-a"
                              style={{ paddingLeft: 7 }}
                            />
                          </View>

                          <View style={styles.differentusers}>
                            <Text
                              style={
                                (styles.teacher,
                                {
                                  color: institute
                                    ? institute.themeColor
                                    : 'rgba(25, 40, 57, 0.63)',
                                })
                              }>
                              {LiveClass.date ? parseDate(LiveClass.date) : null}
                              {/* {'\n' + new Date().toString() + '\n'}
                           {new Date(LiveClass.date).toString()} */}
                            </Text>
                            <View style={{ flexDirection: 'column' }}>
                              <IconEnglish2
                                size={24}
                                color={institute ? institute.themeColor : '#B04305'}
                                name="radio"
                                style={{ paddingLeft: 7 }}
                              />

                              <Text
                                style={{
                                  fontSize: 10,
                                  color: 'rgba(25, 40, 57, 0.9)',
                                  fontFamily: 'Poppins-Medium',
                                }}></Text>
                            </View>
                          </View>
                          {/* {new Date() < new Date(LiveClass.date) ? ( */}
                          <View style={styles.differentusers}>
                            <TouchableOpacity
                              style={{ flexDirection: 'row' }}
                              onPress={() =>
                                navigation.navigate('LiveEdit', {
                                  LiveClass: LiveClass,
                                })
                              }>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: '#211C5A',
                                  fontFamily: 'Poppins-Medium',
                                }}>
                                Edit
                              </Text>
                              <Icon
                                size={12}
                                color="#211C5A"
                                name="edit"
                                style={{ paddingTop: 2, paddingRight: 10 }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity

                              onPress={() => { handleDelete(LiveClass._id) }}
                              style={{
                                flexDirection: 'row',
                                // justifyContent: 'space-between',
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

                          {/* ) : null} */}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
              </>
            )
          }
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },

  maincontainer: {
    flex: 1,

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
  section: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',

    paddingHorizontal: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 10,
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 10,
    width: 170,
    height: 180,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    paddingHorizontal: 14
  },

  details: {
    alignContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 20,


    borderBottomColor: '#333',

  },

  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  userstext: {
    fontSize: 16,
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
  teacher: {
    fontSize: 14,
    paddingLeft: 3,
    fontFamily: 'Poppins-Medium',
  },
  switchText: {
    fontSize: 14,
    color: '#B04305',
    paddingHorizontal: 5,
  },
  maincontainer: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  header: {
    height: 65,
    marginTop: -10,
    backgroundColor: 'rgba(0, 73, 159, 1)',
    flexDirection: 'row',
  },
  text_input: {
    paddingHorizontal: 20,
    borderRadius: 10,
    // backgroundColor: 'rgba(249, 249, 249, 1)',
    height: 50,
    fontSize: 16,
    minWidth: 171,
    backgroundColor: 'white',
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
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 30,
    paddingTop: 3,
    color: '#211C5A',
  },
  text_input: {
    paddingHorizontal: 20,
    borderRadius: 10,

    height: 50,
    fontSize: 16,
    minWidth: 171,
    color: 'black',
    backgroundColor: 'white',
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
});
