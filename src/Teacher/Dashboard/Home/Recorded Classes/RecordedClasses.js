import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {Card, Button} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
// import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import ModalSelector from 'react-native-modal-selector';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

// helpers
import getCourse from '../../../../services/helpers/getList/getCourse';
import getBatch from '../../../../services/helpers/getList/getBatch';
import post from '../../../../services/helpers/request/post';
import read from '../../../../services/localstorage/read';

// date picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// loading screen
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

export default function RecordedClasses({navigation}) {
  // selected options
  const [courseName, setcourseName] = useState(null);
  const [batch, setBatch] = useState(null);
  const [classRecordedName, setclassRecordedName] = useState(null);
  const [videoURL, setvideoURL] = useState(null);
  const [date, setDate] = useState(new Date(1598051730000));

  // dropdown list
  const [classes, setClasses] = useState([]);
  const [batches, setBatches] = useState([]);

  const [showdatePicker, setShowDatePicker] = useState(false);

  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  useEffect(async () => {
    showLoadingScreen();
    try {
      let cou = await getCourse();
      setClasses(cou);
    } catch (err) {
      alert('Cannot fetch Courses!!');
    }
    hideLoadingScreen();
  }, []);

  // batches fetch
  let fetchBatches = async sc => {
    showLoadingScreen();
    try {
      setcourseName(sc);
      let bat = await getBatch(sc);
      setBatches(bat);
    } catch (err) {
      alert('Cannot fetch Batches!!');
    }
    hideLoadingScreen();
  };

  // handle form submission
  let handleSubmit = async sd => {
    showLoadingScreen();
    await setDate(sd.toString());
    setShowDatePicker(false);
    hideLoadingScreen();
  };

  let handleSaveClass = async () => {
    showLoadingScreen();
    try {
      let slug = `/record`;
      let token = await read('token');
      let data = {
        name: classRecordedName,
        course: courseName,
        batch: batch,
        videoUrl: videoURL,
        date: date,
      };
      let res = await post(slug, data, token);
      if (res) {
        alert('Saved!!');
      } else {
        throw new Error('Cannot Save');
      }
    } catch (err) {
      alert('Cannot Save the class!!');
    }
    hideLoadingScreen();
  };

  return (
    <View style={styles.container}>
      {loadingScreen}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
          }}>
          Recorded Classes
        </Text>
      </View>
      <View style={{marginHorizontal: 15, marginVertical: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          {/* course selector */}
          <ModalSelector
            data={classes}
            initValue="Courses"
            onChange={option => {
              fetchBatches(option.key);
            }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          {/* batch selector */}
          <ModalSelector
            data={batches}
            initValue="Batch"
            onChange={option => {
              setBatch(option.key);
            }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>
      </View>

      <View>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
              }}></View>

            <TextInput
              placeholder="Name*"
              onChangeText={val => setclassRecordedName(val)}
            />
            <View style={{padding: 2}} />
            <View style={{borderWidth: 0.2}} />
            <View style={{padding: 10}} />
            <TextInput
              placeholder="Video videoURL (Youtube)*"
              onChangeText={val => setvideoURL(val)}
            />
            <View style={{padding: 10}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View style={{padding: 10}} />

              {/* date picker */}
              <Button
                icon="calendar"
                mode="contained"
                color="white"
                onPress={() => setShowDatePicker(true)}>
                Date
              </Button>

              <DateTimePickerModal
                isVisible={showdatePicker}
                mode="date"
                onConfirm={handleSubmit}
                onCancel={() => setShowDatePicker(!showdatePicker)}
              />
            </View>
          </Card.Content>
        </Card>
        <Button onPress={handleSaveClass}>Submit</Button>
      </View>
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
    backgroundColor: 'rgba(0, 73, 159, 1)',
    flexDirection: 'row',
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
    shadowRadius: 8,
  },
  card: {
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    justifyContent: 'center',
    minWidth: 110,
  },
  dropdown: {
    elevation: 3,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    justifyContent: 'center',
    minWidth: 110,
  },
  accordion: {margin: 0, padding: 0, backgroundColor: 'white'},
  image: {
    minWidth: 100,
    height: 200,
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
  card: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',

    minWidth: 110,
    elevation: 3,
  },
  card_title: {fontSize: 18},
  card_marks: {
    justifyContent: 'center',
    backgroundColor: ' rgba(88, 99, 109, 1)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: 'white',
  },
  card_top: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card_middle: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  card_bottom: {
    borderTopColor: 'rgba(88, 99, 109, 0.45)',
    borderTopWidth: 1,
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 20,
  },
  classes_card: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
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
  SelectedValue: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 27,
    padding: 10,
    color: '#211C5A',
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 30,
    paddingTop: 3,
    color: '#211C5A',
  },
});
