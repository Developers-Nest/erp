import React, {useEffect, useState} from 'react';

import IconEnglish2 from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking
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

// redux
import {useSelector} from 'react-redux';

let parseDate = myDate => {
  let d = new Date(myDate);
  return d.toString().slice(0, 15);
};

const Live = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  let institute = useSelector((state)=>state.institute)

  const [LiveClasses, setLiveClasses] = useState([]);
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();
  const userInfo = useSelector(state => state.userInfo);

  // dropdown selected values
  const [batch, setBatch] = useState(null);
  const [course, setCourse] = useState(null);

  // dropdown values
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);

  //fetch courses
  useEffect(async () => {
    showLoadingScreen();
    try {
      let cour = await getCourse();
      console.log(cour);
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
      console.log(bat);
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
      console.log('Response ', response);
      setLiveClasses(response);
    } catch (err) {
      alert('Cannot fetch your Live Classes !!\n' + err);
    }
    hideLoadingScreen();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          margin: 20,
        }}>
          {loadingScreen}
        <View style={{marginTop: 10, width: 150, ...styles.card}}>
          <ModalSelector
            data={courses}
            onChange={option => {
              fetchBatches(option.key);
            }}
            initValue="This courses"
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>

        <View style={{marginTop: 10, width: 150, ...styles.card}}>
          <ModalSelector
            data={batches}
            onChange={option => {
              fetchList(option.key);
            }}
            initValue="This batches"
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
          {LiveClasses &&
            LiveClasses.map(LiveClass => (
              <TouchableOpacity
                onPress={() => LiveClass.url ? 
                  Linking.openURL(LiveClass.url)
                : alert('Url Not found!!')}
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
                        {LiveClass.name.slice(0,12)}
                      </Text>

                      <MaterialCommunityIcon
                        size={27}
                        color="rgba(25, 40, 57, 0.63)"
                        name="alpha-a"
                        style={{paddingLeft: 7}}
                      />
                    </View>

                    <View style={styles.differentusers}>
                      <Text style={styles.teacher, {color: institute ? institute.themeColor : 'rgba(25, 40, 57, 0.63)'}}>
                        {LiveClass.date ? parseDate(LiveClass.date) : null}
                      </Text>
                      <View style={{flexDirection: 'column'}}>
                        <IconEnglish2
                          size={24}
                          color={ institute? institute.themeColor : "#B04305"}
                          name="radio"
                          style={{paddingLeft: 7}}
                        />
                        <Text
                          style={{
                            fontSize: 10,
                            color: 'rgba(25, 40, 57, 0.9)',
                            fontFamily: 'Poppins-Medium',
                          }}></Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },

  maincontainer: {
    flex: 1,
    // justifyContent:'flex-start'
  },

  card: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
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
    height: 170,
    //new added
    alignSelf: 'center',
    //new added to move english down
    paddingTop: 50,
  },

  details: {
    alignContent: 'center',
    flexDirection: 'column',

    borderBottomColor: '#333',
    // borderBottomWidth:1,
  },

  userinhostels: {
    //  paddingVertical:20,
  },

  //different users for two columns
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //for row spacing between two rows:done finally
    paddingBottom: 10,
  },
  userstext: {
    fontSize: 16,
    // paddingVertical:4,
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
    shadowOffset: {width: 0, height: 1},
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

export default Live;
