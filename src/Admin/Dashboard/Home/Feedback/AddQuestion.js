import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Evillcons from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';//for users section icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';



import { useSelector } from 'react-redux';


const AddQuestion = ({navigation}) => {
//theming
const institute = useSelector(state => state.institute);


    return (



        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
          {/* header start */}

   <View
          style={{
            backgroundColor: institute ? institute.themeColor : '#FF5733',
            // backgroundColor:'blue',
            ...styles.header,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
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
                marginTop: 22,
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
              marginLeft: 30,
              color: 'white',
            }}>
            Add Question
          </Text>
          
            <TouchableOpacity
              onPress={() => navigation.navigate('QuestionList')}
              style={{
                justifyContent: 'flex-end',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 5,
                }}>
                <MaterialCommunityIcon
                  name="eye"
                  color="#900"
                  style={{
                    fontSize: 30,
                    color: 'white',
                    paddingRight: 20,
                  }}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 12,
                  }}>
                  VIEW LIST
                </Text>
              </View>
            </TouchableOpacity>
          
        </View>

        {/* header ends */}

   


            <View style={{ justifyContent: 'space-around', alignContent: 'center' }}>

                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>Add Feedback Type</Text>
                </View>

                <ModalSelector>

                    <View style={{ marginHorizontal: 10, ...styles.shadow }}>
                        <View style={styles.search}>
                            <TextInput
                                style={{ ...styles.search_input, fontFamily: 'Poppins-Regular', color: '#505069' }}
                                placeholder="Annual feedback forum"

                            />
                            <Evillcons size={25} color='#505069' name='chevron-down'
                                style={{

                                    marginLeft: 20,
                                    marginTop: 10,



                                }}>

                            </Evillcons>

                        </View>
                    </View>
                </ModalSelector>




                <View>
                    <Text style={styles.section_heading}> Feedback Question </Text>



                </View>





                <View>
                    <TextInput style={{ width: 348, borderRadius: 8, borderWidth: 0.2, backgroundColor: '#FFFFFF', marginLeft: 15, paddingBottom: 120 }}
                        placeholder="Write your feedback question here"
                    >
                    </TextInput>
                </View>






                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>Status</Text>

                </View>
                <View style={{ flexDirection: 'row' }} >

                    <ModalSelector




                        initValue="Active"

                        style={styles.card}


                        initValueTextStyle={styles.SelectedValueSmall}
                    //selectTextStyle={styles.SelectedValueSmall}


                    >
                        <View style={{ marginTop: 10, flexDirection: 'row' }}>

                            <Text style={styles.text2}>Active</Text>
                            <Evillcons size={25} color='#505069' name='chevron-down'
                                style={{

                                    marginLeft: 70,



                                }}>

                            </Evillcons>

                        </View>




                    </ModalSelector>


                </View>





                <View style={styles.fixToText}>



                    

                    <Pressable style={styles.button} 
                    onPress={() => {
                        navigation.navigate('EditQuestion');}}
                    >
                        <Text style={styles.text}>Save</Text>
                    </Pressable>




                </View>

            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',


    },

    input1: {

        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        textAlign: 'left',
        color: '#505069',
        paddingHorizontal: 20,


    },

    text2: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '500',
        marginLeft: 10,
        letterSpacing: 0.25,
        color: '#505069',
        justifyContent: 'center'

    },
    button1: {

        marginTop: 0,
        marginBottom: 0,

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
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
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#d2691e',
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
        borderColor: '#58636D',
        borderRadius: 8,
        borderWidth: 0.3,

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
        marginTop: 20,
    },

    search_input: {
        fontFamily: 'Poppins-Regular',
        borderRadius: 8,
        height: 50,
        fontSize: 15,

        color: '#505069',
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
        marginRight: 20,
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
        marginLeft: 0,


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
        borderColor: '#58636D',
        borderRadius: 8,
        borderWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Poppins-Regular',
        marginLeft: 0,


    },

    pickdate: {
        width: 120,
        fontFamily: 'Poppins-Regular',
        height: 50,
        backgroundColor: 'white',
        borderColor: '#58636D',
        borderRadius: 8,
        borderWidth: 0.3,
        marginLeft: 12,
        marginRight: 0,
        paddingHorizontal: 20,

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

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
        marginLeft: 15,
        marginRight: 20,
        marginTop: 10,

        //flexDirection: 'row',
        justifyContent: 'space-between'




    },
    card1: {

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
        marginLeft: 10,
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

    header: {
        height: 69,
        flexDirection: 'row',
      },


});




export default AddQuestion;