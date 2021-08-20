import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import Feather from 'react-native-vector-icons/Feather';

import Evillcons from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
//checkbox
import { CheckBox, Modal } from 'react-native-elements';
//helpers

// loading screem
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen.js';
import get from '../../../../services/helpers/request/get';
import post from '../../../../services/helpers/request/post';
import read from '../../../../services/localstorage/read';

// helpers
import patch from '../../../../services/helpers/request/patch'

//redux
import { useSelector } from 'react-redux';
const PlacementScreen1 = ({ navigation }) => {
    //theming
    const institute = useSelector(state => state.institute);
    // loading screen
    const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen();

    // dropdown values
    const [companyname, setcompanyname] = useState([]);

    const [isSelectAll, setIsSelectAll] = useState(false)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);
    // selected values
    const [scompany, setscompany] = useState('')
    //for text input
    const [year, setyear] = useState('');



    // users
    const [users, setUsers] = useState([])

    //for checkboxes
    const [checkBoxValue, setCheckBoxValue] = useState({});

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

    //on load
    useEffect(async () => {
        setLoadingScreen()
        try {
            let slug = '/placement/vendor'
            let token = await read('token')
            let res = await get(slug, token)
            let companynamearray = []
            res && res.map((user) => {
                companynamearray.push({
                    key: user._id,
                    label: user.companyName
                })
            })
            setcompanyname(companynamearray)
        } catch (err) {
            alert('Cannot get companynames!!')
        }

        hideLoadingScreen()
    }, [])

    let fetchUsers = async (scompany) => {

        setLoadingScreen()
        
        setscompany(scompany)
       
        

        try {
           let slug = `/placement/placed?joiningDate=${date}&companyName=${scompany}&year=${year}`

            let token = await read('token')
            let res = await get(slug, token)
            let checkBoxMap = {}
            res && res.map((user) => {
                checkBoxMap[user._id] = false
            })
            setUsers(res)
            setCheckBoxValue(checkBoxMap)
        } catch (err) {
            alert('Cannot get Users!!')
        }
        hideLoadingScreen()
    }

    let toggleCheckBox = (userId) => {
        setCheckBoxValue(prevRecDays => {
            return {
                ...prevRecDays,
                [userId]: !checkBoxValue[[userId]],
            };
        });
    }

    let selectAll = () => {
        Object.entries(checkBoxValue).forEach(([userId, value]) => {
            setCheckBoxValue(prevRecDays => {
                return {
                    ...prevRecDays,
                    [userId]: !isSelectAll,
                };
            });
        });
        setIsSelectAll(!isSelectAll)
    }
    //on save button click
    let handleUpdate = async () => {
        setLoadingScreen()
        try {
            let slug = `/placement/placed/${id}`
            let token = await read('token')
            let data = {
                companyName: scompany,
               
                joiningDate: date,
                year:year

            }
            let res = await patch(slug, data, token)
            if (res.error) {
                alert(res.error)
            } else if (res._id) {
                alert('Updated')
               
            }
        } catch (err) {
            alert('Cannot Update !!')
        }
        hideLoadingScreen()
    }


    return (
        <View style={{ justifyContent: 'center', alignContent: 'center' }}>


            <View style={{ justifyContent: 'space-around', alignContent: 'center' }}>
                {/* header start */}

                <View
                    style={{
                        backgroundColor: institute ? institute.themeColor : '#FF5733',
                        ...styles.header,
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }} >
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

                                }}
                            />

                        </TouchableOpacity>
                    </View>
                    <Text
                        style={{
                            fontStyle: 'normal',
                            fontFamily: 'NunitoSans-Regular',
                            fontSize: 28,
                            fontWeight: '600',
                            alignSelf: 'center',
                            paddingLeft: 20,
                            color: 'white',
                        }}>
                        Placement Details
                    </Text>
                </View>

                {/* header ends */}


                {loadingScreen}




                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, width: '100%', }}>












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
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 10 }}>
                    <View style={styles.Card3}>
                        <View style={styles.CardContent}>
                            <TextInput
                                style={{ ...styles.search_input }}
                                placeholder="Year"
                                placeholderTextColor="grey"
                                color="black"

                                keyboardType="numeric"
                                onChangeText={val => setyear(val)}
                            />
                        </View>
                    </View>
                </View>





                <ModalSelector



data={companyname}
initValue="Company"

style={styles.card}
onChange={option => {
    fetchUsers(option.key)
}}

initValueTextStyle={styles.SelectedValueSmall}
selectTextStyle={styles.SelectedValueSmall}


>
{/* <View style={{ marginTop: 10, flexDirection: 'row' }}>

    <Text style={styles.text}>Company</Text>
    <Evillcons size={22} color='#3E68E4' name='chevron-down'
        style={{

            marginLeft: 20,



        }}>

    </Evillcons>

</View> */}




</ModalSelector>



            </View>

            <View style={{ flexDirection: 'row' }}>
                {/* <Icon2
                    size={25}
                    color="#5177E7"
                    name="checkbox"
                    style={{ paddingTop: 10, paddingRight: 12, marginLeft: 20 }}
                />
                <Text style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Regular',
                    marginTop: 15,
                }}>
                    Select All
                </Text> */}

                <CheckBox
                  
                    checked={isSelectAll}
                    title={'Select All'}
                    onPress={selectAll}
                />
            </View>
            {
                users && users.map((user) => (
                    <View style={styles.section} key={user._id}>
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

                                        {'TITLE'}

                                    </Text>

                                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: '#211C5A',
                                                fontFamily: 'Poppins-Regular',
                                                marginTop: 5,
                                            }}>
                                            placed
                                        </Text>
                                        {/* <Icon2
                                    size={30}
                                    color="#5177E7"
                                    name="checkbox"
                                    style={{ paddingTop: 2, paddingRight: 12 }}
                                /> */}
                                        <CheckBox
                                            containerStyle={{ marginTop: -9 }}
                                            checked={checkBoxValue[user._id]}
                                            onPress={() => toggleCheckBox(user._id)}
                                        />

                                    </TouchableOpacity>
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
                                <TouchableOpacity style={styles.differentusers}>
                                    <Text style={{ fontSize: 12, color: ' #505069' }}>
                                        {user.code}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.differentusers}>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#505069',
                                            fontFamily: 'Poppins-Regular',
                                        }}>
                                        {/* Exams will be conducted via online mode in the upcoming week
                                and these are notes for it.So,go through them and study well
 */}
                                        {user.remarks ? user.remarks : 'N/A'}

                                    </Text>


                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>

                ))
            }


            {/* <View style={styles.section} >
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

                                Title

                            </Text>

                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: '#211C5A',
                                        fontFamily: 'Poppins-Regular',
                                        marginTop: 5,
                                    }}>
                                    Unplaced
                                </Text>
                                <Icon3
                                    size={30}
                                    color="#5177E7"
                                    name="checkbox-blank-outline"
                                    style={{ paddingTop: 2, paddingRight: 12 }}
                                />
                            </TouchableOpacity>
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
                        <TouchableOpacity style={styles.differentusers}>
                            <Text style={{ fontSize: 12, color: '#505069' }}>
                                Admission Number
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.differentusers}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: '#505069',
                                    fontFamily: 'Poppins-Regular',
                                }}>
                                Exams will be conducted via online mode in the upcoming week
                                and these are notes for it.So,go through them and study well

                            </Text>


                        </TouchableOpacity>
                    </View>
                </View>


            </View> */}

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
        marginTop: 10,
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
    header: {
        height: 69,
        flexDirection: 'row',
    },
    Card3: {
        backgroundColor: 'white',
        width: '85%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
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

});

export default PlacementScreen1;