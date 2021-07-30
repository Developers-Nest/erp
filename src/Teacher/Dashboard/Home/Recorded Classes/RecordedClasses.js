import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Card, Button} from 'react-native-paper';

//selector
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

// redux
import {useSelector} from 'react-redux';

export default function RecordedClasses({navigation}) {
  // selected options
  const [courseName, setcourseName] = useState(null);
  const [batch, setBatch] = useState(null);
  const [classRecordedName, setclassRecordedName] = useState(null);
  const [videoURL, setvideoURL] = useState(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateSelected, setDateSelected] = useState(false)

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
    setDateSelected(true)
    hideLoadingScreen();
  };

  let handleSaveClass = async () => {
    if(!classRecordedName || !courseName || !batch || !videoURL || !date){
      alert('All fields are Required!!')
      return
    }
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

  //theming
  const institute = useSelector(state => state.institute);

  return (
    <View style={styles.container}>
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
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
            justifyContent: 'space-evenly',
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
          <View style={{}}></View>
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

      <Card style={styles.card1}>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
            }}></View>

          <TextInput
            placeholder="Name"
            placeholderTextColor="black"
            onChangeText={val => setclassRecordedName(val)}
            style={{fontSize: 15, borderBottomWidth: 0.2, color: 'black'}}
          />
          <TextInput
            placeholder="Video URL (Youtube)"
            placeholderTextColor="black"
            onChangeText={val => setvideoURL(val)}
            style={{
              height: 150,
              textAlignVertical: 'top',
              marginTop: 5,
              fontSize: 15,
              color: 'black'
            }}
          />
          <View style={{padding: 10}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <View style={{padding: 10}} />

            {/* date picker */}
            <Button
              icon="calendar"
              mode="contained"
              color="white"
              onPress={() => setShowDatePicker(true)}>
              { dateSelected ? date.slice(0, 10) : 'Date' }
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
      <View style={{alignItems: 'center'}}>
        <Button
          mode="contained"
          onPress={handleSaveClass}
          color={institute ? institute.themeColor : '#5177E7'}
          style={styles.submitButton}>
          Save
        </Button>
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
    flexDirection: 'row',
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
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    width: 125,
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    paddingTop: 3,
    color: '#211C5A',
  },
  card1: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 0.5,
  },
  submitButton: {
    margin: 20,
    width: 100,
  },
});
