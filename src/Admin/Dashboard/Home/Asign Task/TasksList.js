import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';

//redux
import { useSelector } from 'react-redux';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';
import LoaderHook from '../../../../components/LoadingScreen/LoadingScreen';
import deleteReq from '../../../../services/helpers/request/delete';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { useFocusEffect } from '@react-navigation/native';

export default function TasksList({ navigation }) {
  //theming
  const institute = useSelector(state => state.institute);

  //parse date
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(0, 15);
  };

  //data
  const [tasks, setTasks] = useState();
  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook();

  //for search
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  //screen reload
  const [reload, setreload] = React.useState(true);

  //on load
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        setLoadingScreen();
        try {
          let slug = '/task';
          let token = await read('token');
          let response = await get(slug, token);
          console.log(response);

          setTasks(response);
        } catch (err) {
          alert('Error in fetching Task Lists!' + err);
        }
        hideLoadingScreen();
      };

      fetchUser();

      return () => {
        isActive = false;
      };
    }, [reload]),
  );

  //delete
  const HandleDelete = async id => {
    setLoadingScreen();
    try {
      let slug = `/task/${id}`;
      let token = await read('token');
      const response = await deleteReq(slug, token);
      setreload(!reload);
      alert('Task deleted!!');
    } catch (err) {
      alert('Cannot delete task!!' + err);
    }
    hideLoadingScreen();
  };
  return (
    <View style={styles.backgroung}>
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : '#FF5733',
          ...styles.header,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }} >

          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
              fontSize: 28,
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 20,
              color: 'white',
            }}>
            Task's List
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTask')}
            style={{
              justifyContent: 'center',
              flex: 1,
              alignItems: 'center',
              alignSelf: 'flex-end',
              marginTop: 4,
              paddingRight: 15,
            }}>
            <IonIcon size={30} color="white" name="add-circle-outline" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ padding: 10 }} />

      <View style={{ marginHorizontal: 15, ...styles.shadow }}>
        <View style={styles.search}>
          <TextInput
            style={{ ...styles.search_input }}
            placeholder="Enter the task type"
            placeholderTextColor="grey"
            defaultValue={searchText}
            textContentType='name'
            onChangeText={(text) => {
              setSearchText(text);
              if (text === '') {
                return setFilteredUsers([]);
              }
              const filtered_users = tasks.filter((task) =>
                task.task.toLowerCase().startsWith(text.toLowerCase())
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

      <View style={{ padding: 10 }} />
      {filteredUsers.length > 0 ?
        (
          <ScrollView>
            {
              tasks &&
              filteredUsers.map(task => (
                <View style={styles.section} key={task._id}>
                  <View style={styles.details}>
                    <View style={styles.userinhostels}>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#211C5A',
                            marginHorizontal: 5,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {task.task}
                        </Text>
                      </View>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: '#58636D',
                            marginHorizontal: 5,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {task.userType && task.userType.name}
                          {': '}
                          {task.user &&
                            task.user.firstName + ' ' + task.user.lastName}
                        </Text>
                        <Text
                          style={{
                            color: institute ? institute.themeColor : '#B04305',
                            fontSize: 13,
                            fontFamily: 'Poppins-Medium',
                            marginHorizontal: 5,
                            fontWeight: 'bold',
                          }}>
                          {'Priority: '}
                          {task.priority}
                        </Text>
                      </View>
                      <View style={{ padding: 3 }} />
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#58636D',
                          fontFamily: 'Poppins-Regular',
                          marginHorizontal: 5,
                        }}>
                        {'Description: '}
                        {task.description}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.belowhr}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#211C5A',
                          fontSize: 15,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        {parseDate(task.taskDate)}
                      </Text>
                      <Text
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 2,
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: institute? institute.themeColor: 'black',
                          fontFamily: 'Poppins-Medium',
                        }}>
                        {'Status: '+task.status.toUpperCase()}
                      </Text>

                      <TouchableWithoutFeedback
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 2,
                        }}
                        onPress={() => {
                          HandleDelete(task._id);
                        }}>
                        <AntDesign size={15} color="#211C5A" name="delete" />
                        <Text
                          style={{
                            color: institute ? institute.themeColor : '#211C5A',
                          }}>
                          Delete
                        </Text>
                      </TouchableWithoutFeedback>
                    </View>
                    <View style={{ padding: 5 }} />
                  </View>
                </View>
              ))}
            <View style={{ height: 10 }} />
            
          </ScrollView>
        ) : (
          <ScrollView>
            <View flexDirection="column-reverse">
            {tasks &&
              tasks.map(task => (
                <View style={styles.section} key={task._id}>
                  <View style={styles.details}>
                    <View style={styles.userinhostels}>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#211C5A',
                            marginHorizontal: 5,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {task.task}
                        </Text>
                      </View>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: '#58636D',
                            marginHorizontal: 5,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {task.userType && task.userType.name}
                          {': '}
                          {task.user &&
                            task.user.firstName + ' ' + task.user.lastName}
                        </Text>
                        <Text
                          style={{
                            color: institute ? institute.themeColor : '#B04305',
                            fontSize: 13,
                            fontFamily: 'Poppins-Medium',
                            marginHorizontal: 5,
                            fontWeight: 'bold',
                          }}>
                          {'Priority: '}
                          {task.priority}
                        </Text>
                      </View>
                      <View style={{ padding: 3 }} />
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#58636D',
                          fontFamily: 'Poppins-Regular',
                          marginHorizontal: 5,
                        }}>
                        {'Description: '}
                        {task.description}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.belowhr}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#211C5A',
                          fontSize: 15,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        {parseDate(task.taskDate)}
                      </Text>
                      <Text
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 2,
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: institute? institute.themeColor: 'black',
                          fontFamily: 'Poppins-Medium',
                        }}>
                        {'Status: '+task.status.toUpperCase()}
                      </Text>
                      <TouchableWithoutFeedback
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 2,
                        }}
                        onPress={() => {
                          HandleDelete(task._id);
                        }}>
                        <AntDesign size={15} color="#211C5A" name="delete" />
                        <Text
                          style={{
                            color: institute ? institute.themeColor : '#211C5A',
                          }}>
                          Delete
                        </Text>
                      </TouchableWithoutFeedback>
                    </View>
                    <View style={{ padding: 5 }} />
                  </View>
                </View>
              ))}
              </View>
            <View style={{ height: 10 }} />
          </ScrollView>

        )}


    </View>
  );
}

const styles = StyleSheet.create({
  backgroung: {
    backgroundColor: 'rgba(249, 249, 249, 1)',
    height: '100%',
    flex: 1,
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
  search: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderColor: '#00499F',
    borderRadius: 12,
  },
  search_input: {
    borderRadius: 12,
    height: 59,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    paddingTop: 15,
    paddingHorizontal: 10,
    width: '90%',
    color: 'black',
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
    shadowRadius: 12,
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
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 15,
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
});
