import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

// redux
import {useSelector} from 'react-redux';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';
import timeTableBuilder from '../../../../services/helpers/extract/teacherTtDayWiseBuild';

export default function Timetable({navigation}) {
  //theming
  const institute = useSelector(state => state.institute);

  const userInfo = useSelector(state => state.userInfo);
  const [timeTable, setTimeTable] = useState([]);

  useEffect(async () => {
    try {
      let slug = `/timetable/names/${userInfo.course}/${userInfo.batch}`;
      let token = await read('token');
      let response = await get(slug, token);

      /// build timetable day-wise ///
      let tt = timeTableBuilder(response);
      console.log(tt);
      setTimeTable(tt);
    } catch (err) {
      alert('Cannot Display your timetable!!');
    }
  }, []);

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
      <ScrollView showsHorizontalScrollIndicator={false}>
        {timeTable &&
          Object.keys(timeTable).map((day, index) => {
            return (
              <View style={styles.section} key={index}>
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
                          <TouchableOpacity style={styles.shadow} key={index}>
                            <View style={styles.classes_card}>
                              <Text style={styles.classes_cardClass}>
                                {slot.subjectId &&
                                  slot.subjectId.name.toUpperCase()}
                              </Text>
                              <Text style={styles.classes_cardTime}>
                                {`${slot.startTime} - ${slot.endTime}`}
                              </Text>
                              <Text style={styles.classes_cardBatch}>
                                {`${slot.faculty}`}
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
    height: 150,
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
