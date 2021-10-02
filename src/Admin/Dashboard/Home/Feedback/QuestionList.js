import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';

//redux
import {useSelector} from 'react-redux';

const QuestionList = ({navigation}) => {
  const institute = useSelector(state => state.institute);

  const [questionlist, setquestionlist] = useState([]);

  useEffect(async () => {
    try {
      let slug = '/feedback/question?';
      let token = await read('token');
      const response = await get(slug, token);
      console.log(response);
      setquestionlist(response);
    } catch (err) {
      alert('Cannot fetch added books list !!');
    }
  }, []);

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [date, setDate] = React.useState('21 May 2021');
  let index = 0;
  const dateMonths = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'Aug',
    9: 'Sept',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    console.warn('A date has been picked: ', date.toString());
    setDate(
      date.getDate() +
        ' ' +
        dateMonths[date.getMonth() + 1] +
        ' ' +
        date.getFullYear(),
    );
    hideDatePicker();
  };

  return (
    <View style={{backgroundColor: 'rgba(249, 249, 249, 1)'}}>
      <View style={{justifyContent: 'space-around', alignContent: 'center'}}>
        {/* header start */}

        <View
          style={{
            backgroundColor: institute ? institute.themeColor : '#FF5733',
            ...styles.header,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FeedbackMain');
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
            Question's List
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddType')}
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

        <View style={{marginHorizontal: 10, ...styles.shadow}}>
          <View style={styles.search}>
            <TextInput
              style={{...styles.search_input, fontFamily: 'Poppins-Regular'}}
              placeholder="Enter feedback type here"
              placeholderTextColor="grey"
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
      </View>

      <ScrollView>
        <View style={{marginBottom: 50}}>
          {questionlist &&
            questionlist.map(questionlist => (
              <View style={styles.section} key={questionlist._id}>
                <View style={styles.details}>
                  <View style={styles.userinhostels}>
                    <View style={styles.differentusers}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#211C5A',
                          fontFamily: 'Poppins-Regular',
                          marginHorizontal: -5,
                        }}>
                        {' '}
                        {questionlist.feedbacktype.feedbacktype}
                      </Text>
                    </View>

                    <TouchableOpacity style={styles.differentusers}>
                      <Text style={{fontSize: 12, color: '#505069'}}>
                        For: {questionlist.feedbacktype.feedbackfor}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.differentusers}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#505069',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {questionlist.question}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.belowhr}>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        color: institute ? institute.themeColor : '#5177E7',
                        paddingTop: 10,
                        fontSize: 12,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {questionlist.status}
                    </Text>
                  </View>

                  <View style={{marginTop: 5}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                      onPress={() => {
                        navigation.navigate('EditQuestion', {
                          question: questionlist.question,
                          feedbacktype: questionlist.feedbacktype.feedbacktype,
                          feedbacktypeID: questionlist.feedbacktype._id,
                          status: questionlist.status,
                          v: questionlist.v,
                          id: questionlist._id,
                          institution: questionlist.institution,
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
                        backgroundColor=" #211C5A"
                        name="edit"
                        style={{paddingTop: 7, paddingRight: 12}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </View>
        <View style={{height: 100}} />
      </ScrollView>
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
    marginHorizontal: 10,
    elevation: 3,
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

    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
    marginVertical: 10,
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

  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    justifyContent: 'space-between',
  },

  hey: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderTopWidth: 1,
  },

  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '500',
    marginLeft: 10,
    letterSpacing: 0.25,
    color: 'black',
    justifyContent: 'center',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: '500',
    margin: 0,
  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    margin: 50,
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

  card: {
    width: 170,
    height: 50,

    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderColor: '#58636D',

    overflow: 'hidden',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 0.3,
    marginLeft: 30,
    marginRight: 20,

    //flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,

    justifyContent: 'space-between',
    color: '#211C5A',
  },

  pickdate: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 170,
    fontFamily: 'Poppins-Regular',
    height: 50,
    backgroundColor: 'white',
    borderColor: '#58636D',
    borderRadius: 8,
    borderWidth: 0.3,
    marginLeft: 10,
    marginRight: 20,

    paddingHorizontal: 20,
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
});

export default QuestionList;
