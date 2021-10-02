import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';


//icons
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';

//redux
import {useSelector} from 'react-redux';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';

const TypeList = ({navigation}) => {
  const institute = useSelector(state => state.institute);
  const [typelist, settypelist] = useState([]);
  useEffect(async () => {
    try {
      let slug = '/feedback/type?';
      let token = await read('token');
      const response = await get(slug, token);
      console.log(response);
      settypelist(response);
    } catch (err) {
      alert('Cannot fetch feedback type list !!');
    }
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : '#FF5733',
          ...styles.header,
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddType');
            }}>
            <Icon1
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
        </View>
        <Text
          style={{
            fontStyle: 'normal',
            fontFamily: 'NunitoSans-Regular',
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 20,
            color: 'white',
          }}>
          Type List
        </Text>
      </View>

      <View style={{marginHorizontal: 20, ...styles.shadow}}>
        <View style={styles.search}>
          <TextInput
            style={{...styles.search_input, fontFamily: 'Poppins-Regular'}}
            placeholder="Enter feedback type here"
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
      <ScrollView>
        {typelist &&
          typelist.map(typelist => (
            <View style={styles.section} key={typelist._id}>
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
                      {typelist.feedbacktype ? typelist.feedbacktype : 'N/A'}
                    </Text>

                    {/* */}
                  </View>

                  <View style={styles.differentusers}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#505069',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      For: {typelist.feedbackfor ? typelist.feedbackfor : 'N/A'}
                    </Text>

                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                      onPress={() => {
                        navigation.navigate('EditType', {
                          status: typelist.status,
                          id: typelist._id,
                          v: typelist.__v,
                          institution: typelist.institution,
                          feedbacktype: typelist.feedbacktype,
                          feedbackfor: typelist.feedbackfor,
                        });
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#211C5A',
                          fontFamily: 'Poppins-Regular',
                          marginTop: 5,
                        }}>
                        Edit
                      </Text>
                      <Icon1
                        size={12}
                        backgroundColor="#211C5A"
                        name="edit"
                        style={{paddingTop: 7, paddingRight: 12}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.belowhr}>
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      color: '#B04305',
                      fontSize: 12,
                      fontFamily: 'Poppins-Medium',
                    }}></Text>
                  <Text
                    style={{
                      color: '#5177E7',

                      fontSize: 12,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {typelist.status ? typelist.status : 'N/A'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        <View style={{height: 80}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    paddingTop: 10,
    flex: 1,
  },
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
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 2.0,
    elevation: 10,
    marginTop: 14,
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

export default TypeList;
