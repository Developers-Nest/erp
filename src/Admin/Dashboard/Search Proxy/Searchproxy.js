import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
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
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { auto } from 'async';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function BulkSMS({ navigation }) {
    const [TeacherName, setTeacherName] = useState([]);

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

    const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
    const [Time, setTime] = React.useState('15:00')


    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    

    return (
        <View style={styles.backgroung}>
            <View
                style={{
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
                    Search Proxy
                </Text>
            </View>
            <ScrollView>
                <View style={{ padding: 5 }} />
                <View style={{ padding: 15 }} >
                    <ModalSelector
                        data={TeacherName}
                        initValue="Teacher's Name"
                        onChange={async option => {
                            await getAssessesments(option.key);
                        }}
                        style={styles.card_picker}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />
                    <View style={{ padding: 10 }} />
                    
                </View>
                <View style={{ width: "100%", paddingTop: 10, flexDirection: 'row',alignContent:'flex-start',justifyContent:'space-evenly'}}>
                <Text style={styles.section_heading}>License No. </Text>
                <Text style={styles.section_heading}>Date</Text>
            </View>

        
            <View style={{flexDirection:'row',justifyContent:'space-evenly', paddingBottom:10}}>
                <View style={styles.Card}>
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
                <View style={styles.Card}>
                    <View style={styles.CardContent}>
                        <TouchableOpacity style={[styles.pickdate]} onPress={showDatePicker}>
                            <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                                placeholder={date}

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
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

                <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding:20,
                }}>
                <Button color='#5177E7' mode="contained" onPress={() => console.log('Pressed')}>
                    Search
                </Button>
            </View>   
                
                <View style={{ padding: 20 }} />

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
        backgroundColor: '#595260',
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
