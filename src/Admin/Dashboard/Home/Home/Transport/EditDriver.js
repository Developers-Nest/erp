import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import {

    Button,
} from 'react-native-paper';

import ModalSelector from 'react-native-modal-selector';

import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import AntDesign from 'react-native-vector-icons/AntDesign';

//redux
import { useSelector } from 'react-redux';

// helpers
import patch from '../../../../../services/helpers/request/patch'
import deleteReq from '../../../../../services/helpers/request/delete'
import read from '../../../../../services/localstorage/read'
import LoaderHook from '../../../../../components/LoadingScreen/LoadingScreen';
import get from '../../../../../services/helpers/request/get';


export default function EditDriver({ route, navigation }) {

    //theming
    const institute = useSelector(state => state.institute);
    //loading screen
    const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()
    //modal selector values
    const [vehicles, setVehicles] = useState([]);
    //data to be sent
    const [vehicle, setVehicle] = useState();
    //for textinputs
    const [track, setTrackid] = useState();
    const [licensenum, setLicensenum] = useState('');
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [curraddr, setcurraddr] = useState('')
    const [permaddr, setpermaddr] = useState('')

    const [id, setId] = useState('')

    //datepicker
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

    //for edit


    useEffect(async () => {
        let driver = route.params.driver
        console.log('Edit driver ', driver)
        setDate(driver.dob)
        //text inputs
        setLicensenum(driver.licenseNumber)
        setName(driver.name)

        setPhone(driver.phone)
        setcurraddr(driver.presentAddress)
        setpermaddr(driver.permanentAddress)
        setId(driver._id)

        try {

            let slug = '/transport/vehicle';
            let token = await read('token');
            let res = await get(slug, token);
            let list = [];

            res &&
                res.map((res) => {
                    list.push({
                        label: res.vehicleNo,
                        key: res._id,
                    })
                })

            console.log(list);
            setVehicles(list);

        } catch (err) {
            alert('Cannot fetch Vehicle number list!!');
        }

    }, [])


    let handleUpdate = async () => {
        setLoadingScreen()
        try {
            let slug = `/transport/driver/${id}`
            let token = await read('token')
            let data = {
                vehicleNo: vehicle,
                licenseNumber: licensenum,
                name: name,
                phone: phone,
                presentAddress: curraddr,
                permanentAddress: permaddr,
                dob: date,

            }
            let res = await patch(slug, data, token)
            if (res.error) {
                alert(res.error)
            } else if (res._id) {
                alert('Updated')
                navigation.navigate('TransportMain');
            }
        } catch (err) {
            alert('Cannot Update !!')
        }
        hideLoadingScreen()
    }

    let handleDelete = async () => {
        setLoadingScreen()
        try {
            let slug = `/transport/driver/${id}`
            let token = await read('token')
            let res = await deleteReq(slug, token)
            if (res.error) {
                alert(res.error)
            } else {
                alert('Deleted')
                navigation.navigate('TransportMain');
            }
        } catch (err) {
            alert('Cannot Delete !!')
        }
        hideLoadingScreen()
    }

    return (
        <View style={styles.backgroung}>
            {/* header start */}

            <View
                style={{
                    backgroundColor: institute ? institute.themeColor : 'black',
                    ...styles.header,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('TransportMain');
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
                    <Text
                        style={{
                            fontStyle: 'normal',
                            fontSize: 28,
                            fontWeight: '600',
                            alignSelf: 'center',
                            paddingLeft: 10,
                            color: 'white',
                            fontFamily: 'NunitoSans-Regular',
                        }}>
                        Edit Driver
                    </Text>
                </View>

            </View>

            {/* header ends */}
            <ScrollView>
                <View style={{ padding: 10 }} />
                {loadingScreen}
                <View style={{ width: "100%", paddingTop: 10, flexDirection: 'row', alignContent: 'flex-start', justifyContent: 'space-evenly' }}>
                    <Text style={styles.section_heading}>Vehicle No. </Text>
                    
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 20, paddingBottom: 10 }}>
                    <ModalSelector
                        data={vehicles}
                        initValue="Contract"
                        onChange={option => {
                            setVehicle(option.key);
                        }}
                        // disabled={true}
                        style={styles.cardsmall}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />

                   
                </View>



                <View style={{ width: "100%", paddingTop: 10, flexDirection: 'row', alignContent: 'flex-start', justifyContent: 'space-evenly' }}>
                    <Text style={styles.section_heading}>License No. </Text>
                    <Text style={styles.section_heading}>Date</Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 10 }}>
                    <View style={styles.Card}>
                        <View style={styles.CardContent}>
                            <TextInput
                                style={{ ...styles.search_input }}
                                placeholder="License No."
                                placeholderTextColor="grey"
                                color="black"
                                keyboardType="numeric"
                                value={licensenum.toString()}
                                onChangeText={val => setLicensenum(val)}
                            />
                        </View>
                    </View>
                    <View style={styles.Card}>
                        <View style={styles.CardContent}>
                            <TouchableOpacity style={[styles.pickdate]} onPress={showDatePicker}>
                                <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                                     placeholder={date}
                                     value={date ? date.slice(0, 10) : 'N/A'}
                                //    value={dob}
                                    placeholderTextColor="grey"
                                    color="black"

                                    editable={false}

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

                <View style={{ width: "100%", paddingTop: 10, flexDirection: 'row', alignContent: 'flex-start', justifyContent: 'space-evenly' }}>
                    <Text style={styles.section_heading}>Name </Text>
                    <Text style={styles.section_heading}>Phone No.</Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 10 }}>
                    <View style={styles.Card}>
                        <View style={styles.CardContent}>
                            <TextInput
                                style={{ ...styles.search_input }}
                                placeholder="Shaheen"
                                placeholderTextColor="grey"
                                color="black"
                                value={name}
                                onChangeText={val => setName(val)}
                            />
                        </View>
                    </View>
                    <View style={styles.Card}>
                        <View style={styles.CardContent}>
                            <TextInput
                                style={{ ...styles.search_input }}
                                placeholder="8906534256"
                                placeholderTextColor="grey"
                                keyboardType="numeric"
                                color="black"
                                value={phone.toString()}
                                onChangeText={val => setPhone(val)}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ width: "100%", paddingTop: 10, paddingLeft: '7%', flexDirection: 'row' }}>
                    <Text style={styles.section_heading3}>Current Address</Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 10 }}>
                    <View style={styles.Card3}>
                        <View style={styles.CardContent}>
                            <TextInput
                                style={{ ...styles.search_input }}
                                placeholder="Enter current address"
                                placeholderTextColor="grey"
                                color="black"
                                value={curraddr}
                                onChangeText={val => setcurraddr(val)}
                            />
                        </View>
                    </View>

                </View>


                <View style={{ width: "100%", paddingTop: 10, paddingLeft: '7%', flexDirection: 'row' }}>
                    <Text style={styles.section_heading3}>Permanent Address</Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 10 }}>
                    <View style={styles.Card3}>
                        <View style={styles.CardContent}>
                            <TextInput
                                style={{ ...styles.search_input }}
                                placeholder="Enter permanent address"
                                placeholderTextColor="grey"
                                color="black"
                                value={permaddr}
                                onChangeText={val => setpermaddr(val)}
                            />
                        </View>
                    </View>

                </View>



                <View
                    style={{
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        padding: 20,
                        flexDirection: 'row',

                    }}>
                    <Button style={{ width: 90 }} color="#B04305" mode="contained" onPress={handleDelete}>
                        DELETE
                    </Button>
                    <Button style={{ width: 90 }} color={institute ? institute.themeColor : '#5177E7'} mode="contained" onPress={handleUpdate}>
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
        lineHeight: 40,
        paddingTop: 3,
        color: '#211C5A',



    },
    section_heading: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        width: 160,
        
      paddingHorizontal:40,
        marginHorizontal:50,
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
        width: 160,
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
        width: 210,
        paddingLeft: '0%',
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
        width: 210,
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
    Card: {
        backgroundColor: 'white',
        width: '40%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderColor: '#00499F',
        borderRadius: 8,
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 5,
    },

    cardsmall: {
        shadowColor: '#000',
        height: 59,
        flex: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        // borderColor: '#ccc',
        // borderWidth: 1,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        //overflow: 'hidden',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        minWidth: '30%',
    },
     Card1: {
        backgroundColor: 'white',
        width: '30%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderColor: '#00499F',
        borderRadius: 8,
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 5,
    },
    Card2: {
        backgroundColor: 'white',
        width: '50%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderColor: '#00499F',
        borderRadius: 8,
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 5,
    },
    Card3: {
        backgroundColor: 'white',
        width: '85%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderColor: '#00499F',
        borderRadius: 8,
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 5,
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
    header: {
        height: 69,
        flexDirection: 'row',
    },
    card: {
        shadowColor: '#999',
        height: 60,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 5,
        backgroundColor: 'white',
        borderColor: '#ccc',

        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        overflow: 'hidden',
        alignSelf: 'center',
        // justifyContent: 'center',
        // alignContent:'center',
        margin: 0,
        padding: 0,

        width: '40%',
    },
});
