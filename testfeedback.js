import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import Evillcons from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const testfeedback = () => {



    return (
        <View style={{ justifyContent: 'center', alignContent: 'center' }}>


            <View style={{ justifyContent: 'space-around', alignContent: 'center' }}>
                <ModalSelector

                    initValue="Feedback"


                    initValueTextStyle={styles.SelectedValue}
                    selectTextStyle={styles.SelectedValue}




                />
                <ModalSelector>



                    <View style={{ marginHorizontal: 10, ...styles.shadow }}>
                        <View style={styles.search}>
                            <TextInput
                                style={{ ...styles.search_input, fontFamily: 'Poppins-Regular' }}
                                placeholder="Type"

                            />
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'center',

                                }}>
                                <Evillcons size={25} color='#505069' name='chevron-down'
                                    style={{

                                        marginLeft: 20,
                                        marginTop: 3,



                                    }}>

                                </Evillcons>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ModalSelector>







            </View>






            <View style={styles.section} >
                <View style={styles.details}>
                    <View style={styles.userinhostels}>
                        <View style={styles.differentusers}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#505069',
                                    fontFamily: 'Poppins-Regular',
                                    marginHorizontal: -5,
                                }}>

                                Questionnaire
                            </Text>


                        </View>



                        <TouchableOpacity style={styles.differentusers}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: '#505069',
                                    fontFamily: 'Poppins-Regular',
                                }}>
                                This feedback is about the form that was given
                                to you yesterday dealing with one of the issues
                                of teachers.


                            </Text>


                        </TouchableOpacity>
                    </View>
                </View>




            </View>



            <View style={styles.section} >
                <View style={styles.details}>
                    <View style={styles.userinhostels}>
                        <View style={styles.differentusers1}>
                            <TextInput
                                style={{
                                    fontSize: 14,
                                    color: '#58636D',
                                    fontFamily: 'Poppins-Regular',
                                    marginHorizontal: -5,
                                    marginTop: 0,
                                }}
                                placeholder="Write down your feedback question here....."

                            >



                            </TextInput>


                        </View>




                    </View>
                </View>

            </View>


            <View style={styles.fixToText}>



                <Pressable style={styles.button} >
                    <Text style={styles.text1}>Save</Text>
                </Pressable>




            </View>





        </View>
    )
};

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

    button: {


        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#5177E7',
    },
    text1: {
        fontFamily: 'Poppins-Regular',
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

    search_input: {
        fontFamily: 'Poppins-Regular',
        borderRadius: 8,
        height: 50,
        fontSize: 20,


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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        elevation: 5,
        marginTop: 14,
        borderRadius: 12,
        paddingLeft: 10,
        paddingRight: 10,
        marginHorizontal: 20,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10,
        paddingBottom: 0,
        borderBottomColor: '#333',
        borderBottomWidth: 0.5,
    },
    userinhostels: {
        marginTop: 10,
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

    differentusers: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        justifyContent: 'space-between',
        marginTop: 2,

    },
    differentusers1: {

        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        justifyContent: 'space-between',
        paddingBottom: 200,



    },

    hey: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        borderTopWidth: 1,
    },


    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        lineHeight: 21,
        fontWeight: '500',
        marginLeft: 10,
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
        marginLeft: 30,
        marginRight: 20,

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
        marginLeft: 10,
        marginRight: 20,

        paddingHorizontal: 20,


    },


});

export default testfeedback;