import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import {
    Button,
} from 'react-native-paper';

import ModalSelector from 'react-native-modal-selector';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

//redux
import { useSelector } from 'react-redux';

import get from '../../../../../services/helpers/request/get'
import post from '../../../../../services/helpers/request/post'
import read from '../../../../../services/localstorage/read'
import LoaderHook from '../../../../../components/LoadingScreen/LoadingScreen';


export default function AddDestination({ navigation }) {
    //theming
    const institute = useSelector(state => state.institute);

    //modal selector values
    const [routenos, setroutenos] = useState([]);

    //for fee type no API given,make the label and keys
    const [feetypes, setfeetypes] = useState([
        { label: 'Annual', key: 'Annual' },
        { label: 'Bi-Annual', key: 'Bi-Annual' },
        { label: 'Tri-Annual', key: 'Tri-Annual' },
        { label: 'Quaterly', key: 'Quaterly' },
        { label: 'Monthly', key: 'Monthly' },
    ]);

    //data to be sent
    const [routeno, setrouteno] = useState();
    const [feetype, setfeetype] = useState();

    //for textinputs
    const [feeamount, setfeeamount] = useState('');
    const [drop, setdrop] = useState('');


    const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoaderHook()

    const [showtimePicker, setShowTimePicker] = useState(false);
    const [time, setTime] = useState(null);


    // handle time select
    let handleSubmit2 = async sd => {
        showLoadingScreen();
        await setTime(sd.toString());
        setShowTimePicker(false);
        hideLoadingScreen();
    };

    //on save button press action
    let handleSubmit = async () => {
        showLoadingScreen()
        try {
            let slug = '/transport/destinationAndFees';
            let token = await read('token');
            let data = {
                pickAndDrop: drop,
                amount: feeamount,
                feeType: feetype,
                stopTime: time,
                route: routeno,
            };
            let res = await post(slug, data, token);
            if (res.error) {
                alert(res.error)
            } else if (res._id) {
                alert('Destination Added!!')
                navigation.navigate('TransportMain')
            }
        } catch (err) {
            alert('Cannot Save !!' + err);
        }
        hideLoadingScreen()
    }

    //on load
    useEffect(async () => {
        try {
            let slug = '/transport/route';
            let token = await read('token');
            let res = await get(slug, token);
            let list = [];

            res &&
                res.map((res) => {
                    list.push({
                        label: res.code,
                        key: res._id,
                    })
                })
            setroutenos(list);
        } catch (err) {
            alert('Cannot get route code!!');
        }
    }, [])


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
                    {loadingScreen}
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
                        Add Destination
                    </Text>
                </View>

            </View>

            {/* header ends */}

            <ScrollView>
                <View style={{ padding: 10 }} />


                <View style={{ width: "100%", paddingTop: 10, flexDirection: 'row', alignContent: 'flex-start', justifyContent: 'space-evenly' }}>
                    <Text style={styles.section_heading}>Route Code </Text>
                    <Text style={styles.section_heading}>Stop Time</Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 10 }}>
                    <ModalSelector
                        data={routenos}
                        initValue="Route Code"
                        onChange={option => {
                            setrouteno(option.key);
                        }}
                        style={styles.cardsmall}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />

                    {/* time picker */}
                    {/* <Button
                                icon="calendar"
                                mode="contained"
                                color="white"
                                style={{ margin: 2 }}
                                onPress={() => setShowTimePicker(true)}>
                                {time ? time.slice(17, 21) : 'TIME'}
                            </Button>

                            <DateTimePickerModal
                                isVisible={showtimePicker}
                                mode="time"
                                onConfirm={handleSubmit2}
                                onCancel={() => setShowTimePicker(!showtimePicker)} />*/}

                    <View style={styles.card}>
                        <TouchableOpacity style={styles.pickdate1} onPress={() => setShowTimePicker(true)}>
                            {/* time picker */}

                            <TextInput
                                style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                                placeholder={time ? time.slice(15, 21) : 'TIME'}
                                placeholderTextColor='grey'
                                color='black'
                                editable={false}

                            />

                            <Feather
                                size={18}
                                color="black"
                                name="calendar"
                                style={{
                                    marginTop: 16,
                                    marginRight: 0,
                                }}></Feather>



                            <DateTimePickerModal
                                isVisible={showtimePicker}
                                mode="time"
                                style={styles.pickdate1}

                                onConfirm={handleSubmit2}
                                onCancel={() => setShowTimePicker(!showtimePicker)}

                            />
                        </TouchableOpacity>

                    </View>

                </View>

                <View style={{ width: "100%", paddingTop: 10, flexDirection: 'row', alignContent: 'flex-start', justifyContent: 'space-evenly' }}>
                    <Text style={styles.section_heading}>Fees Type </Text>
                    <Text style={styles.section_heading}>Fees Amount</Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 10 }}>
                    <ModalSelector
                        data={feetypes}
                        initValue="Fee Type"
                        onChange={option => {
                            setfeetype(option.key);
                        }}
                        style={styles.cardsmall}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />
                    <View style={styles.Card}>
                        <View style={styles.CardContent}>
                            <TextInput
                                style={{ ...styles.search_input }}
                                placeholder="Fees Amount"
                                placeholderTextColor="grey"
                                color="black"
                                keyboardType="numeric"
                                onChangeText={val => setfeeamount(val)}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ width: "100%", paddingTop: 10, paddingLeft: '7%', flexDirection: 'row' }}>
                    <Text style={styles.section_heading3}>Pick Up and Drop</Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 10 }}>
                    <View style={styles.Card3}>
                        <View style={styles.CardContent}>
                            <TextInput
                                style={{ ...styles.search_input }}
                                placeholder="Enter pick-up address"
                                placeholderTextColor="grey"
                                color="black"
                                onChangeText={val => setdrop(val)}
                            />
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                    }}>
                    <Button style={{ width: 90 }} color={institute ? institute.themeColor : "#5177E7"} mode="contained" onPress={handleSubmit}>
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
        paddingLeft: '0%',
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
        width: 160,
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
        // overflow: 'hidden',
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
    pickdate1: {
        width: 160,
        height: 55,
        backgroundColor: 'white',
        borderColor: '#58636D',
        borderRadius: 8,
      
        marginLeft: 0,
        marginRight: 12,

        paddingHorizontal: 20,
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
        margin: 0,
        padding: 0,
        width: '40%',
    },
});
