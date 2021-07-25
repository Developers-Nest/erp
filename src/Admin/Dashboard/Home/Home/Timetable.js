import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import ModalSelector from 'react-native-modal-selector';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

// redux
import {useSelector} from 'react-redux';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';
import timeTableBuilder from '../../../../services/helpers/extract/teacherTtDayWiseBuild';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

export default function OnlineLecture({navigation}) {
  const userInfo = useSelector(state => state.userInfo);
  const institute = useSelector(state => state.institute);

  const [teacherlist, setTeacherlist] = useState([]);
  const [timeTable, setTimeTable] = useState([]);

  // loading screem
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  // on load of the screen
  useEffect(async () => {
    showLoadingScreen();
    try {
      let slug = `/employee`;
      let token = await read('token');
      console.log(token);

      let response = await get(slug, token);

      const list = [];
      for (let i = 0; i < response.length; i++) {
        list.push({
          key: response[i]._id,
          label: response[i].firstName,
        });
        setTeacherlist(list);
        console.log(teacherlist);
      }
    } catch (err) {
      alert('Cannot fetch courses!!');
    }
    hideLoadingScreen();
  }, []);

  const fetchTimetable = async id => {
    try {
      let slug = `/timetable/${id}`;
      let token = await read('token');
      let response = await get(slug, token);

      /// build timetable day-wise ///
      let tt = timeTableBuilder(response);
      console.log(tt);
      setTimeTable(tt);
    } catch (err) {
      alert('Cannot Display your timetable!!');
    }
  };

  return (
    <View style={styles.container}>
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
        <Text
          style={{
            fontStyle: 'normal',
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
            color: 'white',
            fontFamily: 'NunitoSans-Regular',
          }}>
          Time Table
        </Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 20}}>
        <View style={{marginHorizontal: 30, ...styles.shadow}}>
          <View style={styles.search}>
            {/* <TextInput
              style={{...styles.search_input}}
              placeholder="Enter teacher’s name here"
            /> */}

            {/* <TouchableOpacity
              style={{
                alignSelf: 'center',
              }}>
              <IonIcon
                name="search-sharp"
                style={{
                  alignSelf: 'center',
                  fontSize: 30,
                  color: 'black',
                }}
              />
            </TouchableOpacity> */}
            <ModalSelector
              data={teacherlist}
              initValue="Select Teacher"
              onChange={option => {
                fetchTimetable(option.key);
              }}
              style={styles.card}
              initValueTextStyle={styles.SelectedValueSmall}
              selectTextStyle={styles.SelectedValueSmall}
            />
          </View>
        </View>
        {timeTable &&
          Object.keys(timeTable).map((day, index) => {
            return (
              <View style={styles.section}>
                <View style={styles.shadow}>
                  <View style={styles.card_headingContainer}>
                    <Text style={styles.card_heading}>{day}</Text>
                  </View>
                </View>
                <View style={styles.classes_cardWrapper}>
                  {timeTable[day].length == 0 ? (
                    <Text>No Classes</Text>
                  ) : (
                    timeTable[day].map((slots, index) => {
                      return slots.map(slot => {
                        return (
                          <TouchableOpacity style={styles.shadow}>
                            <View style={styles.classes_card}>
                              <Text style={styles.classes_cardClass}>
                                {'Class'}
                              </Text>
                              <Text style={styles.classes_cardTime}>
                                {`${slot.startTime} - ${slot.endTime}`}
                              </Text>
                              <Text style={styles.classes_cardBatch}>
                                {slot.subjectId &&
                                  slot.subjectId.name.toUpperCase()}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      });
                    })
                  )}
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
  search: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderColor: '#00499F',
    borderRadius: 8,
  },
  search_input: {
    borderRadius: 8,
    height: 59,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    paddingTop: 15,
    paddingHorizontal: 10,
    width: '90%',
  },
  shadow: {
    marginBottom: 10,
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

  card_heading: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21,
    textAlign: 'left',
    color: 'rgba(88, 99, 109, 1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  card_headingContainer: {
    color: 'rgba(88, 99, 109, 1)',
    backgroundColor: '#FFFFFF',
    borderColor: '#58636D',
    borderRadius: 8,
    alignItems: 'center',
  },
  classes_cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    width: '100%',
  },
  classes_card: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 100,
    height: 120,
  },
  classes_cardClass: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#58636D',
  },
  classes_cardTime: {
    fontSize: 12,
    color: '#5177E7',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  classes_cardBatch: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    paddingVertical: 5,
    color: '#58636D',
  },
  section: {
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
