import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Text, Pressable, TextInput } from 'react-native';
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
import AntDesign from 'react-native-vector-icons/AntDesign';//for users section icons

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';
//redux
import { useSelector } from 'react-redux';

const RoomsList = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [listroom, setRoomsList] = useState([]);
  
    const onChangeSearch = query => setSearchQuery(query);
  
    useEffect(async () => {
        try {
          let slug = '/hostel/hostelRoom';
          let token = await read('token');
          const response = await get(slug, token);
          console.log(response);
          setRoomsList(response);
        } catch (err) {
          alert('Cannot fetch your rooms list !!');
        }
      }, []);
    
    //theming
    const institute = useSelector(state => state.institute);

    return (
        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            {/* header start */}

            <View
                style={{
                    backgroundColor: institute ? institute.themeColor : '#FF5733',
                    ...styles.header,
                }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AllocatedListHostel');
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
                    Rooms List
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AllocatedListHostel')}
                    style={{
                        justifyContent: 'flex-end',
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                </TouchableOpacity>
            </View>

            {/* header ends */}
<View style={{height:10}}/>

            <View style={{ marginHorizontal: 10, ...styles.shadow }}>
                <View style={styles.search}>
                    <TextInput
                        style={{ ...styles.search_input, fontFamily: 'Poppins-Regular' }}
                        placeholder="Enter hostel name here"
                        placeholderTextColor='grey'

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
<View style={{height:15}}/>
            <TouchableWithoutFeedback onPress={() => {
              navigation.navigate('VisitorsList');}}
           >
               <View>

{listroom &&
              listroom.map(listroom => (
                <View style={styles.section} key={listroom._id}>
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

                                    {/* Hostel Name */}
   {''} {listroom.hostelName.name || 'Hostel name Not Found'}
                                </Text>

                                <Text style={{ flexDirection: 'row', fontSize: 10, color: '#505069', marginTop: 5, fontFamily: 'openSans' }}>
                                    {listroom.roomNo}, {listroom.floorName}
                                </Text>


                                {/* */}
                            </View>
                            <View style={styles.differentusers}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: '#5177E7',
                                        fontFamily: 'Poppins-Medium',
                                    }}>

                                </Text>


                            </View>




                            <View style={styles.differentusers}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#211C5A',
                                        fontFamily: 'Poppins-Regular',
                                    }}>
                                   {listroom.hostelType.name}

                                </Text>



</View>

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
                                Beds:{listroom.beds}
                            </Text>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text
                                style={{
                                    color: '#211C5A',

                                    fontSize: 12,
                                    fontFamily: 'Poppins-Regular',
                                }}>
                                Amount: {listroom.amount} Rs
                            </Text>

                        </View>
                    </View>


                </View>
              ))}
              </View>
            </TouchableWithoutFeedback>









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
color:'black',

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
        paddingHorizontal:10
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
        paddingHorizontal:10
        //borderBottomWidth:1,
    },

    button: {
        backgroundColor: '#58636D',

        color: '#F9F9F9',
        padding: 3,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    header: {
        height: 69,
        flexDirection: 'row',
    },


});

export default RoomsList;

