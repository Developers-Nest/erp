import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import Evillcons from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { List } from 'react-native-paper';


const NotFound = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

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
        console.warn("A date has been picked: ", date.toString());
        setDate(date.getDate() + " " + dateMonths[date.getMonth() + 1] + " " + date.getFullYear())
        hideDatePicker();
    };

    return (
        <View style={{ justifyContent: 'center', alignContent: 'center' }}>


            <View style={{ justifyContent: 'space-around', alignContent: 'center' }}>
                <ModalSelector

                    initValue="Placement Details"


                    initValueTextStyle={styles.SelectedValue}
                    selectTextStyle={styles.SelectedValue}




                />







                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, width: '100%', }}>


                    



                   
 
                    <ModalSelector




                        initValue="Company"

                        style={styles.card}


                        initValueTextStyle={styles.SelectedValueSmall}
                    //selectTextStyle={styles.SelectedValueSmall}


                    >
                        <View style={{ marginTop: 10,flexDirection:'row' }}>
                            
                            <Text style={styles.text}>Company</Text>
                            <Evillcons size={22} color='#3E68E4' name='chevron-down'
                                style={{

                                    marginLeft: 20,



                                }}>

                            </Evillcons>

                        </View>




                    </ModalSelector>









                    <TouchableOpacity style={styles.pickdate} onPress={showDatePicker}>
                        <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                            placeholder={date}

                        />
                        <Feather size={18} color="black" name="calendar"
                            style={{
                                marginTop: 14,
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


                <View style={styles.fixToText}>


                    <Icon
                        name="search-sharp"
                        style={{
                            alignSelf: 'center',
                            fontSize: 105,
                            color: '#211C5A',
                            height: 99,
                            width: 99,

                            marginLeft: 157,
                            marginRight: 158,
                            marginTop:77,


                        }}
                    />



                </View>

                <View style={styles.input}>
                    <Text>oops , please try again with diffrent inputs</Text>
                </View>




            </View>


        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',


    },

    text: {
        fontFamily:'Poppins-Regular',
        fontSize: 18,
        lineHeight: 21,
        fontWeight: '500',
        marginLeft:10,
        letterSpacing: 0.25,
        color: 'black',
        justifyContent: 'center'
        
    },
    input: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        fontWeight: '500',
        margin: 0,

    },

    fixToText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 10,
        margin: 50,

    },
    SelectedValue: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 18,
        lineHeight: 27,
        padding: 10,
        backgroundColor: "#8a2be2",
        color: '#211C5A',


    },

    card: {

        width: 170,
        height: 50,

        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        backgroundColor: 'white',
        borderColor: '#58636D',
       
        
        overflow: 'hidden',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 0.3,
        marginLeft:30,
        marginRight:20,

        //flexDirection: 'row',
        justifyContent: 'space-between'




    },
    SelectedValueSmall: {

        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 18,
        
        
        justifyContent: 'space-between',
        color: '#211C5A',


    },

    
    pickdate: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 170,
        fontFamily: 'Poppins-Regular',
        height: 50,
        backgroundColor: 'white',
        borderColor: '#58636D',
        borderRadius: 8,
        borderWidth: 0.3,
        marginLeft:10,
        marginRight:20,
        
        paddingHorizontal: 20,


    },


});

export default NotFound;