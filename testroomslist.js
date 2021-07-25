import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Evillcons from 'react-native-vector-icons/Feather';
import check from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-paper';

const testroomslist = () => {
    return (
        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            <ModalSelector

                initValue="Rooms List"

                //style={styles.card}
                initValueTextStyle={styles.SelectedValue}
            //selectTextStyle={styles.SelectedValue}
            />

            <View style={{ marginHorizontal: 10, ...styles.shadow }}>
                <View style={styles.search}>
                    <TextInput
                        style={{ ...styles.search_input, fontFamily: 'Poppins-Regular' }}
                        placeholder="Enter hostel name here"

                    />
                    <TouchableOpacity
                        style={{
                            alignSelf: 'center',

                        }}>
                        <Icon
                            name="search-sharp"
                            style={{
                                alignSelf: 'center',
                                fontSize: 30,
                                color: '#505069',

                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>



            <View style={styles.section} >
                <View style={styles.details}>
                    <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: '#211C5A',
                                    fontFamily: 'Poppins-Regular',
                                    marginHorizontal: -5,
                                }}>

                                Hostel Name

                            </Text>

                            <Text style={{ flexDirection: 'row', fontSize: 10, color: '#505069', marginTop: 5, fontFamily: 'openSans' }}>
                                302, 3rd floor
                            </Text>


                            {/* */}
                        </View>
                        <TouchableOpacity style={styles.differentusers}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: '#5177E7',
                                    fontFamily: 'Poppins-Medium',
                                }}>

                            </Text>


                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.differentusers}>
                            <Text style={{ fontSize: 12, color: ' #505069', fontFamily: 'openSans' }}>
                                User Type
                            </Text>
                        </TouchableOpacity> */}



                        <TouchableOpacity style={styles.differentusers}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: '#211C5A',
                                    fontFamily: 'Poppins-Regular',
                                }}>
                                Hostel Type

                            </Text>

                            


                        </TouchableOpacity>

                    </View>
                </View>




                <View style={styles.belowhr}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text
                            style={{
                                color: '#B04305',
                                fontSize: 12,
                                fontFamily: 'Poppins-Medium',
                            }}>

                        </Text>
                        <Text
                            style={{
                                color: '#211C5A',

                                fontSize: 12,
                                fontFamily: 'Poppins-Regular',
                            }}>
                            Beds: 456
                        </Text>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text
                            style={{
                                color: '#211C5A',

                                fontSize: 12,
                                fontFamily: 'Poppins-Regular',
                            }}>
                            Amount: 24,000 Rs
                        </Text>

                    </View>
                </View>


            </View>


            <View style={styles.section} >
                <View style={styles.details}>
                    <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: '#211C5A',
                                    fontFamily: 'Poppins-Regular',
                                    marginHorizontal: -5,
                                }}>

                                Hostel Name

                            </Text>

                            <Text style={{ flexDirection: 'row', fontSize: 10, color: '#505069', marginTop: 5, fontFamily: 'openSans' }}>
                                302, 3rd floor
                            </Text>


                            {/* */}
                        </View>
                        <TouchableOpacity style={styles.differentusers}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: '#5177E7',
                                    fontFamily: 'Poppins-Medium',
                                }}>

                            </Text>


                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.differentusers}>
                            <Text style={{ fontSize: 12, color: ' #505069', fontFamily: 'openSans' }}>
                                User Type
                            </Text>
                        </TouchableOpacity> */}



                        <TouchableOpacity style={styles.differentusers}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: '#211C5A',
                                    fontFamily: 'Poppins-Regular',
                                }}>
                                Hostel Type

                            </Text>

                            


                        </TouchableOpacity>

                    </View>
                </View>




                <View style={styles.belowhr}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text
                            style={{
                                color: '#B04305',
                                fontSize: 12,
                                fontFamily: 'Poppins-Medium',
                            }}>

                        </Text>
                        <Text
                            style={{
                                color: '#211C5A',

                                fontSize: 12,
                                fontFamily: 'Poppins-Regular',
                            }}>
                            Beds: 456
                        </Text>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text
                            style={{
                                color: '#211C5A',

                                fontSize: 12,
                                fontFamily: 'Poppins-Regular',
                            }}>
                            Amount: 24,000 Rs
                        </Text>

                    </View>
                </View>


            </View>








        </View>
    )



}


const styles = StyleSheet.create({

    container1: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    container: {
        alignContent: 'center',
        justifyContent: 'center',


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
    search: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderColor: '#58636D',
        borderRadius: 8,
        borderWidth: 0.3,
        marginTop: 20,


    },

    section: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        shadowColor: '#333',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 2.0,
        elevation: 10,
        marginTop: 14,
        borderRadius: 12,
        paddingLeft: 10,
        paddingRight: 10,
        marginHorizontal: 20,
    },

    details: {
        //display: 'flex',
        flexDirection: 'column',
        marginTop: 5,
        paddingBottom: 0,
        borderBottomColor: 'rgba(88, 99, 109, 0.45)',
        borderBottomWidth: 0.8,
    },
    userinhostels: {
        marginTop: 10,
    },

    differentusers: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    userstext: {
        fontSize: 16,
        paddingVertical: 4,
        fontWeight: '300',
    },
    belowhr: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 0,
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomColor: '#333',
        //borderBottomWidth:1,
    },

    button: {
        backgroundColor: '#58636D',

        color: '#F9F9F9',
        padding: 3,
        paddingHorizontal: 5,
        borderRadius: 5,
    },


});

export default testroomslist;

