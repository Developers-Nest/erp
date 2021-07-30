import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Button} from 'react-native-paper';

import AntDesign from 'react-native-vector-icons/AntDesign'; //for users section icons

import { useSelector } from 'react-redux';

import get from '../../../../services/helpers/request/get'
import post from '../../../../services/helpers/request/post'
import read from '../../../../services/localstorage/read'

import getCourse from '../../../../services/helpers/getList/getCourse'
import getBatch from '../../../../services/helpers/getList/getBatch'
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

const HostelAllocationAdd = ({ navigation }) => {


    //theming
    const institute = useSelector(state => state.institute);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = React.useState('29 May 2021')

    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const [date1, setDate1] = React.useState('29 May 2021')

    // dropdown values
    const [userType, setUserType] = useState([])
    const [hostelType, setHostelType] = useState([])
    const [hostelName, setHostelName] = useState([])
    const [hostelRoom, setHostelRoom] = useState([])
    const [courses, setCourses] = useState([])
    const [batches, setBatches] = useState([])
    const [users, setUsers] = useState([])
    const [departments, setDepartments] = useState([])

    const [usersObject, setUsersObject] = useState([])

    // selected values
    const [selectedUserType, setSelectedUserType] = useState('')
    const [selectedUserTypeId, setSelectedUserTypeId] = useState('')
    const [selectedHostelType, setSelectedHostelType] = useState('')
    const [selectedHostelName, setSelectedHostelName] = useState('')
    const [selectedHostelRoom, setSelectedHostelRoom] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('')
    const [selectedCourse, setSelectedCourse] = useState('')
    const [selectedBatch, setSelectedBatch] = useState('')
    const [selectedUser, setSelectedUser] = useState('')

    // loading screen
    const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();


    useEffect(async () => {
        showLoadingScreen();
        try {
            let slug = '/usertype'
            let token = await read('token')
            let response = await get(slug, token)
            let userArray = []
            response && response.map((user) => {
                userArray.push({
                    key: user._id,
                    label: user.name
                })
            })
            console.log('UserTypes ', userArray)
            setUserType(userArray)
        } catch (err) {
            alert('Error ', err)
        }

        try {
            let courses = await getCourse()
            setCourses(courses)
        } catch (err) {
            alert('Cannot fetch Courses!')
        }

        try {
            let slug = '/department'
            let token = await read('token')
            let response = await get(slug, token)
            let departmentArray = []
            response && response.map((dep) => {
                departmentArray.push({
                    key: dep._id,
                    label: dep.name
                })
            })
            setDepartments(departmentArray)
        } catch (err) {
            alert('Cannot fetch departments!')
        }

        try {
            let slug = '/hostel/hostelType'
            let token = await read('token')
            let response = await get(slug, token)
            let hostelTypeArray = []
            response && response.map((dep) => {
                hostelTypeArray.push({
                    key: dep._id,
                    label: dep.name
                })
            })
            setHostelType(hostelTypeArray)
        } catch (err) {
            alert('Cannot fetch hostel types!' + err)
        }

        console.log('Admin Institite ', institute)
        hideLoadingScreen()
    }, [])

    // usertype === 'Teacher'
    let fetchEmployees = async (sd) => {
        try {
            setSelectedDepartment(sd)
            let slug = `/employee?department=${sd}`
            let token = await read('token')
            let response = await get(slug, token)
            console.log('Response ', response)
            let employeeArray = []
            response && response.map((dep) => {
                employeeArray.push({
                    key: dep._id,
                    label: dep.firstName ? dep.firstName : 'N/A'
                })
            })
            setUsersObject(response)
            console.log('Emplo ', employeeArray)
            setUsers(employeeArray)
        } catch (err) {
            alert('Cannot fetch Employess!')
        }
    }

    // usertype === 'Student'
    // get list of batches
    const fetchBatches = async sc => {
        showLoadingScreen();
        setSelectedCourse(sc);
        try {
            let bat = await getBatch(sc);
            setBatches(bat);
        } catch (err) {
            alert('Cannot fetch Batches!!');
        }
        hideLoadingScreen();
    };

    // get list of students
    const fetchStudents = async sb => {
        showLoadingScreen();
        setSelectedBatch(sb);
        try {
            let slug = `/student/course?course=${selectedCourse}&batch=${sb}`
            let token = await read('token')
            let res = await get(slug, token)
            let studentArray = []
            res && res.map((student) => {
                studentArray.push({
                    key: student._id,
                    label: student.firstName
                })
            })
            setUsersObject(res)
            setUsers(studentArray)
        } catch (err) {
            alert('Cannot fetch Students!!');
        }
        hideLoadingScreen();
    };

    // hostel details
    const fetchHostelName = async ht => {
        showLoadingScreen();
        setSelectedHostelType(ht)
        try {
            let slug = `/hostel/hostelDetails?hostelType=${ht}`
            let token = await read('token')
            let res = await get(slug, token)
            let hostelArray = []
            res && res.map((student) => {
                hostelArray.push({
                    key: student._id,
                    label: student.name
                })
            })
            setHostelName(hostelArray)
        } catch (err) {
            alert('Cannot fetch Hostel Types!!');
        }
        hideLoadingScreen();
    };

    const fetchHostelRoom = async hn => {
        showLoadingScreen();
        setSelectedHostelName(hn)
        try {
            let slug = `/hostel/hostelRoom?hostelType=${selectedHostelType}&hostelName=${hn}`
            console.log('Slug Hostel Room ', slug)
            let token = await read('token')
            let res = await get(slug, token)
            let hostelArray = []

            res && res.map((student) => {
                hostelArray.push({
                    key: student._id,
                    label: student.floorName + ' - ' + student.beds
                })
            })
            setHostelRoom(hostelArray)
        } catch (err) {
            alert('Cannot fetch Hostel Types!!');
        }
        hideLoadingScreen();
    };

    // date
    const handleConfirm = (date) => {
        setDate(date.toString())
        setDatePickerVisibility(false);
    };

    const handleConfirm1 = (date1) => {
        setDate1(date1.toString())
        setDatePickerVisibility1(false);
    };

    // submit form
    const handleSubmit = async () => {

        if (!userType || !date || !date1) {
            alert('All fields are required!')
            return
        }

        try {
            let selectedUsersObject = {}
            usersObject.map((user) => {
                if (user._id === selectedUser) {
                    selectedUsersObject = user
                }
            })
            let data = {}
            if (selectedUsersObject.userType === 'Teacher') {
                data = {
                    department: selectedDepartment,
                    hostelName: selectedHostelName,
                    hostelRegistrationDate: date,
                    hostelRoom: selectedHostelRoom,
                    hostelType: selectedHostelType,
                    user: selectedUsersObject,
                    userType: selectedUserTypeId,
                    vacatingDate: date1,
                    hostelRoom: selectedHostelRoom,
                }
            } else {
                data = {
                    hostelName: selectedHostelName,
                    hostelRegistrationDate: date,
                    hostelRoom: selectedHostelRoom,
                    hostelType: selectedHostelType,
                    user: selectedUsersObject,
                    userType: selectedUserTypeId,
                    vacatingDate: date1,
                    batch: selectedBatch,
                    course: selectedCourse,
                    hostelRoom: selectedHostelRoom,
                }
            }

            let slug = '/hostel/hostelAllocation'
            let token = await read('token')
            let response = await post(slug, data, token)
            console.log('Allocate Hostel ', response)
            if (response.error) {
                throw new Error(response.error)
            } else if(response._id){
                alert('Hosted Allocated')
            }
        } catch (err) {
            alert('Error!! ' + err)
        }
    }

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
                    Hostel Allocation
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

            <View style={{ justifyContent: 'space-around', alignContent: 'center' }}>
                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>User Type</Text>
                </View>
                <View style={{ marginHorizontal: 10, ...styles.shadow }}>
                    <ModalSelector
                        initValue="User Type"
                        style={styles.card}
                        data={userType}
                        initValueTextStyle={styles.SelectedValueSmall}
                        onChange={option => {
                            setSelectedUserType(option.label)
                            setSelectedUserTypeId(option.key)
                        }}
                    />
                </View>

                {
                    selectedUserType === 'Student' ? (
                        <View>
                            <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                                <Text style={styles.section_heading}>Course </Text>
                                <Text style={styles.section_heading2}>Batch</Text>
                                <Text style={styles.section_heading2}>Student</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }} >
                                <ModalSelector
                                    initValue="Course"
                                    style={styles.card3}
                                    initValueTextStyle={styles.SelectedValueSmall}
                                    data={courses}
                                    onChange={option => {
                                        fetchBatches(option.key)
                                    }}
                                />
                                <ModalSelector
                                    initValue="Batch"
                                    style={styles.card3}
                                    initValueTextStyle={styles.SelectedValueSmall}
                                    data={batches}
                                    onChange={option => {
                                        fetchStudents(option.key)
                                    }}
                                />
                                <ModalSelector
                                    initValue="Student"
                                    style={styles.card3}
                                    initValueTextStyle={styles.SelectedValueSmall}
                                    data={users}
                                    onChange={option => {
                                        setSelectedUser(option.key)
                                    }}
                                />
                            </View>
                        </View>
                    ) : (null)
                }


                {
                    selectedUserType === 'Teacher' ? (
                        <View>
                            <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                                <Text style={styles.section_heading}>Department </Text>
                                <Text style={styles.section_heading2}>Employee</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }} >
                                <ModalSelector
                                    initValue="Department"
                                    style={styles.card}
                                    initValueTextStyle={styles.SelectedValueSmall}
                                    data={departments}
                                    onChange={option => {
                                        fetchEmployees(option.key)
                                    }}
                                />
                                <ModalSelector
                                    initValue="Employee"
                                    style={styles.card}
                                    initValueTextStyle={styles.SelectedValueSmall}
                                    data={users}
                                    onChange={option => {
                                        setSelectedUser(option.key)
                                    }}
                                />
                            </View>
                        </View>
                    ) : (null)
                }


                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>Hostel Type </Text>
                    <Text style={styles.section_heading2}>Hostel Name</Text>
                    <Text style={styles.section_heading2}>Hostel Room</Text>
                </View>
                <View style={{ flexDirection: 'row' }} >
                    <ModalSelector
                        initValue="Type"
                        style={styles.card3}
                        initValueTextStyle={styles.SelectedValueSmall}
                        data={hostelType}
                        onChange={option => {
                            fetchHostelName(option.key)
                        }}
                    />
                    <ModalSelector
                        initValue="Name"
                        style={styles.card3}
                        initValueTextStyle={styles.SelectedValueSmall}
                        data={hostelName}
                        onChange={option => {
                            fetchHostelRoom(option.key)
                        }}
                    />
                    <ModalSelector
                        initValue="Room"
                        style={styles.card3}
                        initValueTextStyle={styles.SelectedValueSmall}
                        data={hostelRoom}
                        onChange={option => {
                            setSelectedHostelRoom(option.key)
                        }}
                    />

                </View>
                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>Registration </Text>
                    <Text style={styles.section_heading1}>Vacating</Text>
                </View>

                <View style={{ flexDirection: 'row' }} >

                    {/* registraion */}
                    <TouchableOpacity style={styles.pickdate} onPress={() => setDatePickerVisibility(!isDatePickerVisible)}>
                        <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular', color: 'black' }}
                            value={date ? date.slice(0, 11) : 'Select'}
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
                            onConfirm={handleConfirm}
                            onCancel={() => setDatePickerVisibility(false)}
                        />
                    </TouchableOpacity>

                    {/* vacating */}
                    <TouchableOpacity style={styles.pickdate1} onPress={() => setDatePickerVisibility1(!isDatePickerVisible1)} >
                        <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular', color: 'black' }}
                            value={date1 ? date1.slice(0, 11) : 'Select'}
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
                            onConfirm={handleConfirm1}
                            onCancel={() => setDatePickerVisibility1(false)}
                        />
                    </TouchableOpacity>


                </View>
                <View style={styles.fixToText}>
                    <Button onPress={handleSubmit} color={institute? institute.themeColor: 'blue'} mode="contained">Save</Button>
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
        marginLeft: 35,


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
        //flexDirection: 'row',
        justifyContent: 'space-between'
    },

    card3: {
        width: 100,
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




export default HostelAllocationAdd;