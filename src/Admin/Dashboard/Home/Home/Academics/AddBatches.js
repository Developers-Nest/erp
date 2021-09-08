
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';

//redux
import { useSelector } from 'react-redux';

// helpers
import getCourse from '../../../../../services/helpers/getList/getCourse'
import post from '../../../../../services/helpers/request/post'
import read from '../../../../../services/localstorage/read'
import LoaderHook from '../../../../../components/LoadingScreen/LoadingScreen';


const AddBatches = ({ navigation }) => {
    //theming
    const institute = useSelector(state => state.institute);

    const [user, setuser] = useState([]);

    const [batchName, setBatchName] = useState('')
    const [courseName, setCourseName] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const [date, setDate] = useState('')
    const [startDate, setstartDate] = useState('')

    const handleConfirm = (d) => {
        setDate(d.toString())
        setDatePickerVisibility1(false);
    };
    const handleConfirmissued = (sd) => {
        setstartDate(sd.toString())
        setDatePickerVisibility(false);
    };

    const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

    useEffect(async()=>{
        setLoadingScreen()
        try{
            let res = await getCourse()
            setuser(res)
        } catch(err){   
            alert('Cannot get Batched!!')
        }
        hideLoadingScreen()
    },[])

    let handleSubmit = async()=>{
        if(!batchName || !courseName || !date || !startDate){
            alert('All Fields are required!!')
            return
        }
        setLoadingScreen()
        try{
            let token = await read('token')
            let slug = '/batch/add'
            let data = {
                academicYear: institute.academicYear,
                batchName: batchName,
                course: courseName,
                endDate: date,
                maximumStudents: 600,
                startDate: startDate
            }
            let res = await post(slug, data, token)
            if(res.error){
                alert(res.error)
            } else if(res._id){
                navigation.navigate('AcademicsMain');
                alert('Batch Added')
            }
        } catch(err){
            alert('Cannot Save '+err)
        }
        hideLoadingScreen()
    }

    return (
        <View style={{ justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(249, 249, 249, 1)', }}>

            {/* header start */}
            {loadingScreen}
            <View
                style={{
                    backgroundColor: institute ? institute.themeColor : 'black',
                    ...styles.header,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('AcademicsMain');
                        }}>
                        <AntDesign
                            size={24}
                            color="white"
                            name="left"
                            style={{
                                alignSelf: 'center',
                                fontSize: 25,
                                color: 'white',
                                // paddingLeft: 10,
                                // paddingTop: 23,
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
                        Add Batches
                    </Text>
                </View>

            </View>

            {/* header ends */}
            <ScrollView>

                <View style={{ justifyContent: 'space-around', alignContent: 'center' }}>



                    <View style={{ justifyContent: 'center', paddingTop: 15 }} >
                        <Text style={styles.section_heading}>Course's Name </Text>
                        <ModalSelector
                            data={user}
                            initValue="Introduction to the Python"
                            onChange={option => {
                               setCourseName(option.key)
                            }}
                            style={styles.card}
                            initValueTextStyle={styles.SelectedValue}
                            selectTextStyle={styles.SelectedValue}
                        />

                    </View>

                    <View style={{ justifyContent: 'center', paddingTop: 15 }} >
                        <Text style={styles.section_heading}>Batch Name </Text>
                        <View style={{ marginHorizontal: 10 }}>
                            <View style={[styles.search, styles.shadow]}>
                                <TextInput
                                    style={{ ...styles.search_input, fontFamily: 'Poppins-Regular' }}
                                    placeholder="Description"
                                    placeholderTextColor='grey'
                                    color='black'
                                 onChangeText={(val) => setBatchName(val)}
                                />
                            </View>
                        </View>

                    </View>
                    {/* 3rd row starts */}
                    <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                        <Text style={styles.section_heading}>From </Text>
                        <Text style={styles.section_heading1}>To</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }} >

                        <TouchableOpacity style={[styles.pickdate, styles.shadow]}
                            onPress={()=>setDatePickerVisibility(true)}>
                            <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                                value={startDate.slice(4,15)}
                                placeholderTextColor='grey'
                                color='black'
                                editable={false}
                            />
                            <Feather size={18} color="black" name="calendar"
                                style={{
                                    marginTop: 16,
                                    marginRight: 0,
                                }}
                            ></Feather>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                style={styles.pickdate}
                                mode="date"
                                onConfirm={handleConfirmissued}
                                onCancel={()=>setDatePickerVisibility(false)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.pickdate, styles.shadow]}
                            onPress={()=>setDatePickerVisibility1(true)}>
                            <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                                value={date.slice(4,15)}
                                placeholderTextColor='grey'
                                color='black'
                                editable={false}
                            />
                            <Feather size={18} color="black" name="calendar"
                                style={{
                                    marginTop: 16,
                                    marginRight: 0,
                                }}
                            ></Feather>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible1}
                                style={styles.pickdate}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={()=>setDatePickerVisibility1(false)}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.fixToText}>
                        <Pressable style={{backgroundColor: institute? institute.themeColor: 'blue', ...styles.button}} onPress={handleSubmit}>
                            <Text style={styles.text}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(249, 249, 249, 1)',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 4,
        elevation: 3,
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
    },

    pickdate: {
        width: 120,
        fontFamily: 'Poppins-Regular',
        height: 50,
        backgroundColor: 'white',
        borderColor: '#58636D',
        borderRadius: 8,
        marginLeft: 12,
        marginRight: 10,
        paddingHorizontal: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    SelectedValue: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '200',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 30,
        paddingTop: 3,
        color: 'rgba(88, 99, 109, 0.85)',
    },

    card: {
        shadowColor: '#999',
        height: 50,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 5,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
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

        width: '94%'
    },


    header: {
        height: 69,
        flexDirection: 'row',
    },
    search: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    shadow: {
        elevation: 5,
        borderRadius: 0,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
    },
    search_input: {
        fontFamily: 'Poppins-Regular',
        borderRadius: 8,
        height: 50,
        fontSize: 15,
        paddingTop: 5,
        paddingHorizontal: 0,
        width: '100%',
        textAlign: 'left'
    },

});




export default AddBatches;