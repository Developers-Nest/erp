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




export default function EditDestination() {

    const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
    const [Time, setTime] = React.useState('15:00')
    let index = 0;
    const dateMonths = {
        1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'June', 7: 'July', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec',
    }

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setTimePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", date.toString());
        setTime(Time.getTime() + " " + TimeMonths[Time.getHour() + 1] + ":" + Time.getMinute())
        hideTimePicker();
    };


  return (
    <View style={styles.backgroung}>
      <Appbar>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Add Destination" />
      </Appbar>
      <ScrollView>
      <View style={{padding:10}}/>


            <View style={{ width: "100%", paddingTop: 10, flexDirection: 'row',alignContent:'flex-start',justifyContent:'space-evenly'}}>
                <Text style={styles.section_heading}>Route Code </Text>
                <Text style={styles.section_heading}>Stop Time</Text>
            </View>

        
            <View style={{flexDirection:'row',justifyContent:'space-evenly', paddingBottom:10}}>
                <View style={styles.Card}>
                    <View style={styles.CardContent}>
                    <TextInput
                style={{...styles.search_input }}
                placeholder="Route Code"
                />
                    </View>
                </View>
                <View style={styles.Card}>
                    <View style={styles.CardContent}>
                        <TouchableOpacity style={[styles.pickdate]} onPress={showTimePicker}>
                            <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                                placeholder={Time}

                            />
                            <Feather size={18} color="black" name="calendar"
                                style={{
                                    marginTop: 10,
                                    marginRight: 0,
                                }}
                            ></Feather>
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                style={styles.pickdate}
                                mode='time'
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ width: "100%", paddingTop: 10, flexDirection: 'row',alignContent:'flex-start',justifyContent:'space-evenly'}}>
                <Text style={styles.section_heading}>Fees Type </Text>
                <Text style={styles.section_heading}>Fees Amount</Text>
            </View>

        
            <View style={{flexDirection:'row',justifyContent:'space-evenly', paddingBottom:10}}>
                <View style={styles.Card}>
                    <View style={styles.CardContent}>
                    <TextInput
                style={{...styles.search_input }}
                placeholder="Fee Type"
                />
                    </View>
                </View>
                <View style={styles.Card}>
                    <View style={styles.CardContent}>
                    <TextInput
                style={{...styles.search_input }}
                placeholder="Fees Amount"
                />
                    </View>
                </View>
            </View>

            <View style={{ width: "100%", paddingTop: 10,paddingLeft:'7%', flexDirection: 'row'}}>
                <Text style={styles.section_heading3}>Pick Up Address</Text>
            </View>

        
            <View style={{flexDirection:'row',justifyContent:'space-evenly', paddingBottom:10}}>
                <View style={styles.Card3}>
                    <View style={styles.CardContent}>
                    <TextInput
                style={{...styles.search_input }}
                placeholder="Enter pick-up address"
                />
                    </View>
                </View>
                
            </View>


            <View style={{ width: "100%", paddingTop: 10,paddingLeft:'7%', flexDirection: 'row'}}>
                <Text style={styles.section_heading3}>Drop Address</Text>
            </View>

        
            <View style={{flexDirection:'row',justifyContent:'space-evenly', paddingBottom:10}}>
                <View style={styles.Card3}>
                    <View style={styles.CardContent}>
                    <TextInput
                style={{...styles.search_input }}
                placeholder="Enter drop address"
                />
                    </View>
                </View>
                
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
        lineHeight: 30,
        paddingTop: 3,
        color: '#211C5A',
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
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        width:160,
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
