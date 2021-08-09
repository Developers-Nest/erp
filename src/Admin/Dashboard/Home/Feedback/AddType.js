import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';


import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';


import get from '../../../../services/helpers/request/get'
import post from '../../../../services/helpers/request/post'
import read from '../../../../services/localstorage/read'
import LoaderHook from '../../../../components/LoadingScreen/LoadingScreen';

import { useSelector } from 'react-redux';



const AddType = ({ navigation }) => {
    //theming
    const institute = useSelector(state => state.institute);
    //text input
    const [feedbacktype, setfeedbacktype] = useState('');

    //modal selector values,no values fetched in api ,const label and keys made
    const [feedbackfors, setfeedbackfors] = useState([

        { label: 'Student', key: 'Student' },
        { label: 'Guardian', key: 'Guardian' },
        { label: 'Employee', key: 'Employee' },
        { label: 'Common To All', key: 'Common To All' },

    ]);


    const [statuses, setstatuses] = useState([
        { label: 'Active', key: 'Active' },
        { label: 'Deactive', key: 'Deactive' },

    ]);

    //data to be sent
    const [feedbackfor, setfeedbackfor] = useState();
    const [status, setstatus] = useState();

    const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoaderHook()

    //on save button press action
    let handleSubmit = async () => {
        showLoadingScreen()
        try {
            let slug = '/feedback/type?';
            let token = await read('token');
            let data = {

                feedbackfor: feedbackfor,
                feedbacktype: feedbacktype,

                status: status
            };
            let res = await post(slug, data, token);
            if (res.error) {
                alert(res.error)
            } else if (res._id) {
                alert('Fedback Type Added!!')
            }
        } catch (err) {
            alert('Unable to add Feedback Type !!' + err);
        }
        hideLoadingScreen()
    }

    return (



        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            {/* header start */}

            <View
                style={{
                    backgroundColor: institute ? institute.themeColor : '#FF5733',

                    ...styles.header,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('FeedbackMain');
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
                            fontFamily: 'NunitoSans-Regular',
                            fontSize: 28,
                            fontWeight: '600',
                            alignSelf: 'center',
                            marginLeft: 10,
                            color: 'white',
                        }}>
                        Add Type
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('TypeList')}
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

            {loadingScreen}

            <View style={{ justifyContent: 'space-around', alignContent: 'center' }}>

                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>Add Feedback Type</Text>
                </View>

                <View style={{ marginHorizontal: 10, ...styles.shadow }}>
                    <View style={styles.search}>
                        <TextInput
                            style={{ ...styles.search_input, fontFamily: 'Poppins-Regular', color: '#505069' }}
                            placeholder="Annual feedback forum"
                            placeholderTextColor="grey"
                            color="black"

                            onChangeText={val => setfeedbacktype(val)}
                        />

                    </View>
                </View>

                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}> Feedback For </Text>
                    <Text style={styles.section_heading2}> Status </Text>
                </View>


                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',

                        alignItems: 'center',

                    }}>

                    <ModalSelector
                        data={feedbackfors}

                        onChange={option => {
                            setfeedbackfor(option.key);
                        }}


                        initValue="Student"

                        style={styles.cardusertype}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />

                    <ModalSelector
                        data={statuses}

                        onChange={option => {
                            setstatus(option.key);
                        }}

                        initValue="Active"
                        style={styles.cardusertype}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />

                </View>



                <View style={styles.fixToText}>




                    <Pressable
                        style={{ backgroundColor: institute ? institute.themeColor : '#5177E7', ...styles.button }} onPress={handleSubmit}>
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
        marginRight: 28,
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

        justifyContent: 'space-between',

        width: '47%',


    },
    card1: {

        width: '43%',
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
        marginLeft: 0,
        marginRight: 20,

        justifyContent: 'space-between'




    },
    cardusertype: {
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

        width: 160,
        elevation: 3,
    },

    SelectedValueSmall: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 30,
        paddingTop: 3,
        color: '#211C5A',
    },
    header: {
        height: 69,
        flexDirection: 'row',
    },



});




export default AddType;