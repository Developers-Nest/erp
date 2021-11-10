import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';

import ModalSelector from 'react-native-modal-selector';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { auto } from 'async';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

//redux
import { useSelector } from 'react-redux';
// helpers
import post from '../../../../../services/helpers/request/post';
import read from '../../../../../services/localstorage/read';
import LoaderHook from '../../../../../components/LoadingScreen/LoadingScreen';

export default function AddVehicle({ navigation }) {
  //theming
  const institute = useSelector(state => state.institute);

  //dropdown
  const [types, setTypes] = useState([
    { label: 'Contract', key: 'Contract' },
    { label: 'Ownership', key: 'Ownership' },
  ]);
  //for textboxes
  const [vehiclenum, setVehiclenum] = useState('');
  const [trackid, setTrackid] = useState('');
  const [licensenum, setLicensenum] = useState('');
  const [maxseats, setMaxseats] = useState('');
  const [drivername, setDrivername] = useState('');
  const [maxallow, setMaxallow] = useState('');

  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');

  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  // const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [date, setDate] = useState('')
  
  const handleConfirm = (d) => {
    setDate(d.toString())
    setDatePickerVisibility1(false);
};
  let handleSubmit = async () => {
    setLoadingScreen();
    try {
      let token = await read('token');
      let slug = '/transport/vehicle';
      //  let acadYear = institute.academicYear
      let data = {
        // academicYear: acadYear,
        vehicleNo: vehiclenum,
        trackId: trackid,
        seats: maxseats,
        maximumAllowed: maxallow,
        contactPerson: drivername,
        type: type,
        renewalDate: date,
        createdAt: '2021-07-15T06:43:00.650Z',
        updatedAt: '2021-07-15T06:43:00.650Z',
      };
      console.log('Vehicle add data ', data);
      let res = await post(slug, data, token);
      console.log('Vehicle Added ', res);
      alert('created');
      navigation.navigate('TransportMain')
    } catch (err) {
      alert('Cannot Add ' + err);
    }
    hideLoadingScreen();
  };

  return (
    <View style={styles.backgroung}>
      {/* header start */}

      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('TransportMain');
            }}>
            <AntDesign
              size={24}
              color="white"
              name="left"
              style={{
                alignSelf: 'center',
                fontSize: 25,
                color: 'white',
                // paddingLeft: 10,
                // paddingTop: 23,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontStyle: 'normal',
              fontSize: 28,
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 10,
              color: 'white',
              fontFamily: 'NunitoSans-Regular',
            }}>
            Add Vehicle
          </Text>
        </View>
      </View>

      {/* header ends */}

      <ScrollView>
        <View style={{ padding: 10 }} />

        <View
          style={{
            width: '100%',
            paddingTop: 10,
            flexDirection: 'row',
            alignContent: 'flex-start',
            justifyContent: 'space-evenly',
          }}>
          <Text style={styles.section_heading}>Vehicle No. </Text>
          <Text style={styles.section_heading}>Track ID</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingBottom: 10,
          }}>
          <View style={styles.Card}>
            <View style={styles.CardContent}>
              <TextInput
                style={[styles.search_input]}
                placeholder="Vehicle No."
                placeholderTextColor="grey"
                color="black"
                onChangeText={val => setVehiclenum(val)}
              />
            </View>
          </View>
          <View style={styles.Card}>
            <View style={styles.CardContent}>
              <TextInput
                style={{ ...styles.search_input }}
                placeholder="Track ID"
                placeholderTextColor="grey"
                color="black"
                keyboardType="numeric"
                onChangeText={val => setTrackid(val)}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            paddingTop: 10,
            flexDirection: 'row',
            alignContent: 'flex-start',
            justifyContent: 'space-evenly',
          }}>
          <Text style={styles.section_heading}>Vehicle Type</Text>
          <Text style={styles.section_heading}>Insurance Renewal Date</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingBottom: 10,
          }}>
          <ModalSelector
            data={types}
            initValue="Contract"
            onChange={option => {
              setType(option.key);
            }}
            style={styles.cardsmall}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          <View style={styles.Card}>
            <View style={styles.CardContent}>
             
                 <TouchableOpacity style={[styles.pickdate, styles.shadow]}
                            onPress={()=>setDatePickerVisibility1(true)}>
                            <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                                value={date.slice(4,15)}
                                placeholderTextColor='grey'
                                color='black'
                                editable={false}
                            />
                            <Feather size={18} color="black" name="calendar"
                                style={{
                                    marginTop: 16,
                                    marginRight: 0,
                                }}
                            ></Feather>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible1}
                                style={styles.pickdate}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={()=>setDatePickerVisibility1(false)}
                            />
                        </TouchableOpacity>

            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            paddingTop: 10,
            flexDirection: 'row',
            alignContent: 'flex-start',
            justifyContent: 'space-evenly',
          }}>
          <Text style={styles.section_heading1}>No. of Seats </Text>
          <Text style={styles.section_heading2}>Name of the driver</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingBottom: 10,
          }}>
          <View style={styles.Card1}>
            <View style={styles.CardContent}>
              <TextInput
                style={{ ...styles.search_input }}
                placeholder="Seats"
                placeholderTextColor="grey"
                color="black"
                keyboardType="numeric"
                onChangeText={val => setMaxseats(val)}
              />
            </View>
          </View>
          <View style={styles.Card2}>
            <View style={styles.CardContent}>
              <TextInput
                style={{ ...styles.search_input }}
                placeholder="Driver's name"
                placeholderTextColor="grey"
                color="black"
                onChangeText={val => setDrivername(val)}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            paddingTop: 10,
            flexDirection: 'row',
            alignContent: 'flex-start',
            justifyContent: 'space-evenly',
          }}>
          <Text style={styles.section_heading1}>Max Allowed</Text>
          {/* <Text style={styles.section_heading2}>Phone no. of the driver</Text> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingBottom: 10,
          }}>
          <View style={styles.Card1}>
            <View style={styles.CardContent}>
              <TextInput
                style={{ ...styles.search_input }}
                placeholder="Allowed"
                placeholderTextColor="grey"
                color="black"
                keyboardType="numeric"
                onChangeText={val => setMaxallow(val)}
              />
            </View>
          </View>

        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <Button
            color="#5177E7"
            mode="contained"
            style={{
              backgroundColor: institute ? institute.themeColor : 'blue',
              ...styles.button,
            }}
            onPress={handleSubmit}>
            {' '}
            SAVE
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroung: {
    backgroundColor: '#E5E5E5',
    height: '100%',
    flex: 1,
  },

  button: {
    backgroundColor: '#58636D',

    color: '#F9F9F9',
    padding: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 40,
    paddingTop: 3,
    color: '#211C5A',
  },
  section_heading: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    width: 160,
    paddingLeft: '0%',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'left',
    color: 'rgba(88, 99, 109, 0.85)',

    marginBottom: 5,
  },
  section_heading1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    width: 160,
    paddingLeft: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'left',
    color: 'rgba(88, 99, 109, 0.85)',

    marginBottom: 5,
  },
  section_heading2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    width: 210,
    paddingLeft: '0%',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'left',
    color: 'rgba(88, 99, 109, 0.85)',

    marginBottom: 5,
  },
  card_picker: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
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
    elevation: 3,
  },
  shadow: {
    elevation: 5,

    borderRadius: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  Card: {

    backgroundColor: 'white',
    width: '40%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: '#00499F',
    borderRadius: 8,
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 5,
  },
  cardsmall: {
    shadowColor: '#000',
    height: 59,
    width: 160,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    // borderColor: '#ccc',
    // borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    // overflow: 'hidden',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    minWidth: '30%',
  },
  Card1: {
    backgroundColor: 'white',
    width: '30%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: '#00499F',
    borderRadius: 8,
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 5,
  },
  Card2: {
    backgroundColor: 'white',
    width: '50%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: '#00499F',
    borderRadius: 8,
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 5,

  },
  CardContent: {
    borderRadius: 8,
    height: 55,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    paddingTop: 10,
    paddingHorizontal: 10,
    width: '90%',
  },
  pickdate: {
    width: 120,
    fontFamily: 'Poppins-Regular',
    height: 50,
    backgroundColor: 'white',
    borderColor: '#58636D',
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
  button: {
    width: 90,
  },
  card: {
    shadowColor: '#999',
    height: 60,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: 'white',
    borderColor: '#ccc',

    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    alignSelf: 'center',
    // justifyContent: 'center',
    // alignContent:'center',
    margin: 0,
    padding: 0,

    width: '40%',
  },
});
