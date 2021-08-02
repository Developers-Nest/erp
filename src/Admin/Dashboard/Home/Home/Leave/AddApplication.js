import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable, TextInput } from 'react-native';

import ModalSelector from 'react-native-modal-selector';

import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
//redux
import { useSelector } from 'react-redux';


import { CheckBox } from 'react-native-elements';

const AddApplication = ({ navigation }) => {

    //theming
    const institute = useSelector(state => state.institute);

    //for checkboxes
    const [checkBoxValue, setCheckBoxValue] = useState(false);
    //for category in 4th row
    const [category, setcategory] = useState([
        { label: 'Fiction', key: 'Fiction' },
        { label: 'Philosophy', key: 'Philosophy' },
        { label: 'history', key: 'History' },
    ]);

    //date picker
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
    //2nd date
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const [date1, setDate1] = React.useState('29 May 2021')

    const showDatePicker1 = () => {
        setDatePickerVisibility1(true);
    };

    const hideDatePicker1 = () => {
        setDatePickerVisibility1(false);
    };
    const handleConfirm1 = (date1) => {
        // console.warn("A date has been picked: ", date.toString());
        setDate1(date1.getDate() + " " + dateMonths[date1.getMonth() + 1] + " " + date1.getFullYear())
        hideDatePicker1();
    };

    return (



        <View style={{ justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(249, 249, 249, 1)', }}>


            <View
                style={{
                    backgroundColor: institute ? institute.themeColor : 'black',
                    ...styles.header,
                }}

            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('LeaveApplication');
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
                        fontFamily: 'NunitoSans-Regular',
                        fontSize: 28,
                        fontWeight: '600',
                        alignSelf: 'center',
                        paddingLeft: 30,
                        color: 'white',
                    }}>
                    Add Application
                </Text>
            </View>

            <ScrollView>


                <View style={{ justifyContent: 'space-around', alignContent: 'center' }}>
                    {/* 1st new row */}
                    <View style={{ width: "100%", marginTop: 20, flexDirection: 'row' }}>
                        <Text style={styles.section_heading}>Designation </Text>
                        <Text style={styles.section_heading1}>Employee Name</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >

                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="First"
                            placeholderTextColor='grey'
                            color='black'

                        />
                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="J.K. Rowling"
                            placeholderTextColor='grey'
                            color='black'
                        />

                    </View>

                    <View style={{ width: "100%", marginTop: 20, flexDirection: 'row' }}>
                        <Text style={styles.section_heading}>Leave Type </Text>
                        <Text style={styles.section_heading1}>Leave Duration</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >

                        <View style={{ paddingHorizontal: 10 }}>
                            <ModalSelector
                                data={category}
                                initValue="Medical"
                                onChange={option => {
                                    // setclass(option.key);
                                }}
                                style={styles.card}
                                initValueTextStyle={styles.SelectedValueSmall}
                                selectTextStyle={styles.SelectedValueSmall}
                            />
                        </View>

                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="8 days"
                            placeholderTextColor='grey'
                            color='black'
                        />

                    </View>



                    <View style={{ width: "100%", paddingTop: 20, flexDirection: 'row' }}>
                        <Text style={styles.section_heading}>From </Text>
                        <Text style={styles.section_heading1}>To</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >

                        <TouchableOpacity style={[styles.pickdate, styles.shadow]} onPress={showDatePicker}>
                            <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                                placeholder={date}
                                placeholderTextColor='grey'
                                color='black'
                            />
                            <Feather size={18} color="black" name="calendar"
                                style={{
                                    marginTop: 16,
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

                        <TouchableOpacity style={[styles.pickdate, styles.shadow]} onPress={showDatePicker1}>
                            <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                                placeholder={date1}
                                placeholderTextColor='grey'
                                color='black'
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
                                onConfirm={handleConfirm1}
                                onCancel={hideDatePicker1}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={{ height: 30 }} />
                    <CheckBox
                        containerStyle={{ marginTop: -9 }}
                        checked={checkBoxValue}
                        title={'Apply for on Duty(OD)'}

                        onPress={() => setCheckBoxValue(!checkBoxValue)}
                    />

                    <View style={styles.fixToText}>

                        <Pressable style={{ backgroundColor: institute ? institute.themeColor : '#5177E7', ...styles.button }}
                        // onPress={handleSubmit}
                        >
                            <Text style={styles.text}>Save</Text>
                        </Pressable>


                    </View>

                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',


    },

    button1: {

        marginTop: 0,
        marginBottom: 0,

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        alignSelf: 'flex-end',
        padding: 3,
        paddingHorizontal: 25,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 30,
        height: 46,
        borderColor: '#d2691e',
        borderWidth: 1.5

    },
    text1: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#d2691e',
    },
    button: {


        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#5177E7',
    },
    text: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: '500',
        letterSpacing: 0.25,
        color: 'white',
    },

    fixToText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 8,
        margin: 40,


    },
    search: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        // borderColor: '#58636D',
        // borderRadius: 8,
        // borderWidth: 0.3,

    },

    section_heading: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 18,
        textAlign: 'left',
        color: 'rgba(88, 99, 109, 0.85)',
        paddingHorizontal: 15,
        marginBottom: 5,
    },

    search_input: {
        fontFamily: 'Poppins-Regular',
        borderRadius: 8,
        height: 50,
        fontSize: 15,


        paddingTop: 5,
        paddingHorizontal: 0,
        width: '90%',
        textAlign: 'left'

    },
    section_heading1: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 18,
        textAlign: 'center',
        color: 'rgba(88, 99, 109, 0.85)',

        marginBottom: 5,
    },
    section_heading4: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 18,
        textAlign: 'center',
        marginLeft: -100,


        color: 'rgba(88, 99, 109, 0.85)',



    },

    section_heading2: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 18,
        textAlign: 'center',
        marginRight: 35,


        color: 'rgba(88, 99, 109, 0.85)',



    },


    pickdate1: {
        width: 120,
        height: 50,
        backgroundColor: 'white',
        borderColor: '#58636D',
        borderRadius: 8,
        borderWidth: 0.3,
        marginLeft: 22,
        marginRight: 12,
        paddingHorizontal: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },


    input: {
        flex: 1,
        height: 50,
        margin: 12,
        width: 120,
        marginTop: 0,
        marginBottom: 0,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        // borderColor: '#58636D',

        // borderWidth: 0.35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Poppins-Regular',


    },

    shadow: {
        elevation: 2,
        borderRadius: 0,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },



    pickdate: {
        width: 120,
        fontFamily: 'Poppins-Regular',
        height: 50,
        backgroundColor: 'white',
        borderColor: '#58636D',
        borderRadius: 8,
        // borderWidth: 0.3,
        marginLeft: 12,
        marginRight: 10,
        paddingHorizontal: 20,

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },


    header: {
        height: 69,
        flexDirection: 'row',

    },

    SelectedValueSmall: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '200',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 30,
        // paddingTop: 3,

        color: 'rgba(88, 99, 109, 0.85)',
    },

    card: {
        shadowColor: '#000',
        height: 50,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 2,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        overflow: 'hidden',
        justifyContent: 'center',
        margin: 0,
        padding: 0,

        minWidth: '47%',
    },


});




export default AddApplication;