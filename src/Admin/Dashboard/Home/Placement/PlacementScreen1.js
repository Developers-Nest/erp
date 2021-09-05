import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import Feather from 'react-native-vector-icons/Feather';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

//checkbox
import { CheckBox } from 'react-native-elements';

// loading screem
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen.js';
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';


//redux
import { useSelector } from 'react-redux';
const PlacementScreen1 = ({ navigation }) => {

    //theming
    const institute = useSelector(state => state.institute);
    // loading screen
    const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen();

    // dropdown values
    const [companyname, setcompanyname] = useState([]);

    // selected values
    const [scompany, setscompany] = useState('')

    //for text input
    const [year, setyear] = useState('');

    // users
    const [users, setUsers] = useState([])

    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [date, setDate] = React.useState('21 May 2021')
    const [dateQuery, setDateQuery] = useState('')
    const dateMonths = {
        1: 'January', 2: 'Februray', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December',
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        let d = date.toString()
        setDate(d.slice(4,12))
        setDateQuery(dateMonths[date.getMonth() + 1]+ " " + date.getDate() + ", " + date.getFullYear())
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
            alert('Cannot get company names!!')
        }

        hideLoadingScreen()
    }, [])

    let fetchUsers = async (scompany) => {
        setLoadingScreen()
        setscompany(scompany)
        try {
            let slug = `/placement/placed?joiningDate=${dateQuery}&companyName=${scompany}&year=${year}`
            let token = await read('token')
            let res = await get(slug, token)
            let arr = []
            res.students && res.students.map((user) => {
                arr.push(user)
            })
            setUsers(arr)
        } catch (err) {
            alert('Cannot get Users!!')
        }
        hideLoadingScreen()
    }

    return (
        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            {loadingScreen}
            <ScrollView>
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, width: '100%', marginBottom: 20 }}>
                        <TouchableOpacity style={styles.pickdate} onPress={showDatePicker}>
                            <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                                placeholder={date}
                                placeholderTextColor="grey"
                                values={date}
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
                    </ModalSelector>
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
                                            {user.firstName}
                                        </Text>

                                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    color: '#211C5A',
                                                    fontFamily: 'Poppins-Regular',
                                                    marginTop: 5,
                                                }}>
                                                Placed
                                            </Text>
                                            <CheckBox
                                                containerStyle={{ marginTop: -9 }}
                                                checked={user.checked}
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
                                            Code: {user.code}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
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
        marginBottom: 20
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
        width: 180,
        fontFamily: 'Poppins-Regular',
        height: 50,
        backgroundColor: 'white',
        borderColor: '#58636D',
        borderRadius: 8,
        borderWidth: 0.3,
        marginLeft: 10,
        marginRight: 5,
        paddingHorizontal: 20,
    },
    header: {
        height: 69,
        flexDirection: 'row',
    },
    Card3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 50,
        fontFamily: 'Poppins-Regular',
        height: 50,
        backgroundColor: 'white',
        borderColor: '#58636D',
        borderRadius: 8,
        borderWidth: 0.3,
        marginLeft: 2,
        marginRight: 20,
    },
    CardContent: {
        borderRadius: 8,
        height: 50,
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        fontWeight: 'bold',
        paddingTop: 10,
        paddingHorizontal: 10,
    },

});

export default PlacementScreen1;