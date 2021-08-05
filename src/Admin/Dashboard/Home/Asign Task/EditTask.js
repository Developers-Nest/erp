import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
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


// redux
import {useSelector} from 'react-redux';


export default function EditTask({navigation}) {
  //theming
  const institute = useSelector(state => state.institute);

    const [Priority, setPriority] = useState([]);
    const [Usertype, setUserType] = useState([]);
    const [Status, setUserStatus] = useState([]);

    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [date, setDate] = React.useState('21 May 2021')
    let index = 0;
    const dateMonths = {
        1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'June', 7: 'July', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec',
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", date.toString());
        setDate(date.getDate() + " " + dateMonths[date.getMonth() + 1] + " " + date.getFullYear())
        hideDatePicker();
    };


  return (
    <View style={styles.backgroung}>
      {/* <Appbar>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Add Task" />
      </Appbar> */}
      <View
            style={{backgroundColor: institute ? institute.themeColor : '#FF5733',
            ...styles.header,
            }}>
            <TouchableOpacity onPress={()=> navigation.navigate('TasksList')}>
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
            Assign Task
            </Text>
        </View>
      <ScrollView>
      <View style={{padding:10}}/>

      <View style={{ width: "100%", paddingTop: 10,paddingLeft:'8%', flexDirection: 'row'}}>
                <Text style={styles.section_heading3}>Add Task's Name</Text>
            </View>

        
            <View style={{flexDirection:'row',justifyContent:'space-evenly', paddingBottom:10}}>
                <View style={styles.Card3}>
                    <View style={styles.CardContent}>
                    <TextInput
                style={{...styles.search_input }}
                placeholder="Name of the task"
                placeholderTextColor='grey'
                color='black'
                />
                    </View>
                </View>
                
            </View>

            <View style={{ width: "100%", paddingTop: 10,paddingLeft:'8%', flexDirection: 'row'}}>
                <Text style={styles.section_heading3}>Description</Text>
            </View>

        
            <View style={{flexDirection:'row',justifyContent:'space-evenly', paddingBottom:10}}>
                <View style={styles.Card3}>
                    <View style={styles.CardContent}>
                    <TextInput
                style={{...styles.search_input }}
                placeholder="Write the description here . . . ."
                placeholderTextColor='grey'
                color='black'
                />
                    </View>
                </View>
                
            </View>


            <View style={{ width: "100%", paddingTop: 10, flexDirection: 'row',alignContent:'flex-start',justifyContent:'space-evenly'}}>
                <Text style={styles.section_heading}>Priority </Text>
                <Text style={styles.section_heading1}>Date</Text>
            </View>

            


            <View style={{flexDirection:"row", justifyContent:'space-between',paddingHorizontal:25}}>
      <ModalSelector
          data={Priority}
          initValue="Active"
          onChange={async option => {
            await getPriority(option.key);
          }}
          style={styles.card_picker}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
        <View
          style={styles.card_picker}
        ><TouchableOpacity style={[styles.pickdate]} onPress={showDatePicker}>
        <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
            placeholder={date}
            placeholderTextColor='grey'
            color='black'
        />
        <Feather size={18} color="black" name="calendar"
            style={{
                marginTop: 10,
                marginRight: 0,
            }}
        ></Feather>
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            style={styles.pickdate}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
    </TouchableOpacity></View>
        </View>
        <View style={{padding: 10}} />

        <View style={{ width: "100%", paddingTop: 10, flexDirection: 'row',alignContent:'flex-start',justifyContent:'space-evenly'}}>
                <Text style={styles.section_heading}>Usertype </Text>
                <Text style={styles.section_heading1}>Status</Text>
            </View>

        <View style={{flexDirection:"row", justifyContent:'space-between',paddingHorizontal:25}}>
      <ModalSelector
          data={Usertype}
          initValue="Teacher"
          onChange={async option => {
            await getPriority(option.key);
          }}
          style={styles.card_picker}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
        <ModalSelector
          data={Status}
          initValue="Teacher"
          onChange={async option => {
            await getPriority(option.key);
          }}
          style={styles.card_picker}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
        </View>
        <View
                style={{
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    padding:20,
                    flexDirection:'row',

                }}>
                <Button style={{width:90}} color="#B04305"  mode="contained" onPress={() => console.log('Pressed')}>
                    DELETE
                </Button>
                <Button style={{width:90}} color="#5177E7" mode="contained" onPress={() => console.log('Pressed')}>
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
  header: {
    height: 69,
    flexDirection: 'row',
    },
    button: {
        backgroundColor: '#58636D',
    
        color: '#F9F9F9',
        padding: 3,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    SelectedValueSmall: {
        fontFamily: 'Poppins-Medium',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 30,
        paddingTop: 3,
        color: '#505069',
      },
      section_heading: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        width:160,
        paddingLeft:'0%',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 18,
        textAlign: 'left',
        color: 'rgba(88, 99, 109, 0.85)',
        
        marginBottom: 5,
    },
    section_heading1: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        width:160,
        paddingLeft: 25,
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
        width:210,
        paddingLeft:'0%',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 18,
        textAlign: 'left',
        color: 'rgba(88, 99, 109, 0.85)',
        marginBottom: 5,
    },
    section_heading3: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        width:210,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 18,
        textAlign: 'left',
        color: 'rgba(88, 99, 109, 0.85)',
        marginBottom: 5,
    },
      card_picker: {
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
        elevation: 3,
        width:'40%',
      },
      Card: {
        backgroundColor: 'white',
        width:'40%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal:10,
        borderColor: '#00499F',
        borderRadius: 8,
      },
      Card1: {
        backgroundColor: 'white',
        width:'30%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal:10,
        borderColor: '#00499F',
        borderRadius: 8,
      },
      Card2: {
        backgroundColor: 'white',
        width:'50%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal:10,
        borderColor: '#00499F',
        borderRadius: 8,
      },
      Card3: {
        backgroundColor: 'white',
        width:'85%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal:10,
        borderColor: '#00499F',
        borderRadius: 8,
      },
      CardContent: {
        borderRadius: 8,
        height: 59,
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
});
