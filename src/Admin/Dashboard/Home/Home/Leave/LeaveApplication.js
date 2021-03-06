import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable, TextInput, TouchableWithoutFeedback } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import AntDesign from 'react-native-vector-icons/AntDesign';//for users section icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
// helpers
import get from '../../../../../services/helpers/request/get';
import read from '../../../../../services/localstorage/read';
//redux
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

const LeaveApplication = ({ navigation }) => {
    //theming
    const institute = useSelector(state => state.institute);

    const [searchQuery, setSearchQuery] = useState('');
    const [leaveapp, setleaveapp] = useState([]);
    //for search
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const onChangeSearch = query => setSearchQuery(query);
    useEffect(async () => {
        try {
            let slug = '/leavemanagement/application';
            let token = await read('token');
            const response = await get(slug, token);
            console.log("Leave Details ", response);
            setleaveapp(response);
        } catch (err) {
            alert('Cannot fetch leave details !!');
        }
    }, []);

    return (
        <View style={{
            justifyContent: 'center', alignContent: 'center',
            backgroundColor: 'rgba(249, 249, 249, 1)',
        }}>
            {/* header start */}

            <View
                style={{
                    backgroundColor: institute ? institute.themeColor : 'black',
                    ...styles.header,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('LeaveManager');
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
                        Leave Application
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('AddApplication')}
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
                        <Icon
                            name="add-circle"
                            color="#900"
                            style={{
                                fontSize: 35,
                                color: 'white',
                                paddingRight: 20,
                            }}
                        />
                        <Text
                            style={{
                                color: '#fff',
                                fontFamily: 'Poppins-Regular',
                                fontSize: 12,
                                paddingRight: 20,
                            }}>
                            Add
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* header ends */}

            <View style={{ marginHorizontal: 10, ...styles.shadow }}>
                <View style={styles.search}>
                    <TextInput
                        style={{ ...styles.search_input, fontFamily: 'Poppins-Regular' }}
                        placeholder="Enter Employee no here"
                        placeholderTextColor='grey'
                        color='black'
                        defaultValue={searchText}
                        textContentType='name'
                        onChangeText={(text) => {
                            setSearchText(text);
                            if (text === '') {
                                return setFilteredUsers([]);
                            }

                            const filtered_users = leaveapp.filter((emp) =>
                                emp.empcode.toLowerCase().startsWith(text.toLowerCase())
                            );
                            setFilteredUsers(filtered_users);

                        }}
                        returnKeyType='search'
                    />
                    {searchText.length === 0 ? (
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

                    ) : (
                        <TouchableOpacity
                            onPress={() => {

                                setSearchText('');
                                setFilteredUsers([]);
                            }}
                            style={{
                                alignSelf: 'center',
                            }}
                        >
                            <MaterialIcon name='cancel'
                                style={{
                                    alignSelf: 'center',
                                    fontSize: 24,
                                    color: '#505069',
                                }}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <TouchableWithoutFeedback
                onPress={() => navigation.navigate('HostelRequest')}

            >
                <ScrollView>
                    {filteredUsers.length > 0 ?
                        (
                            <View>

                                {leaveapp &&
                                    filteredUsers.map(leaveapp => (
                                        <View style={styles.section}
                                            key={leaveapp._id}
                                        >
                                            <View style={styles.details}>
                                                <View style={styles.userinhostels}>
                                                    <View style={styles.differentusers}>
                                                        <Text
                                                            style={{
                                                                fontSize: 18,
                                                                color: '#211C5A',
                                                                fontFamily: 'Poppins-Regular',

                                                            }}>

                                                            {leaveapp.empcode ? leaveapp.empcode : 'Employee code N/A'}

                                                        </Text>

                                                        <Text style={{ flexDirection: 'row', fontSize: 12, color: '#505069', fontFamily: 'OpenSans-Regular' }}>
                                                            {leaveapp.status ? leaveapp.status : 'N/A'}
                                                        </Text>


                                                        {/* */}
                                                    </View>
                                                    {/* <TouchableOpacity style={styles.differentusers}>
                            <Text style={{ fontSize: 12, color: ' #505069', fontFamily: 'openSans' }}>
                                User Type
                            </Text>
                        </TouchableOpacity> */}



                                                    <View style={styles.differentusers}>
                                                        <Text
                                                            style={{
                                                                fontSize: 14,
                                                                color: '#211C5A',
                                                                fontFamily: 'Poppins-Regular',
                                                            }}>
                                                            {leaveapp.leaveCategory ? leaveapp.leaveCategory.name : 'N/A'}
                                                        </Text>




                                                    </View>

                                                </View>
                                            </View>




                                            <View style={styles.belowhr}>
                                                <View style={{ flexDirection: 'column' }}>

                                                    <Text
                                                        style={{
                                                            color: '#211C5A',

                                                            fontSize: 12,
                                                            fontFamily: 'Poppins-Regular',
                                                        }}>
                                                        From:{leaveapp.fromDate ? leaveapp.fromDate.slice(0, 10) : 'N/A'}
                                                    </Text>
                                                </View>

                                                <Text
                                                    style={{
                                                        color: '#211C5A',

                                                        fontSize: 12,
                                                        fontFamily: 'Poppins-Regular',
                                                    }}>
                                                    To:{leaveapp.toDate ? leaveapp.toDate.slice(0, 10) : 'N/A'}
                                                </Text>

                                            </View>


                                        </View>
                                    ))}

                            </View>
                        ) : (
                            <View>

                                {leaveapp &&
                                    leaveapp.map(leaveapp => (
                                        <View style={styles.section}
                                            key={leaveapp._id}
                                        >
                                            <View style={styles.details}>
                                                <View style={styles.userinhostels}>
                                                    <View style={styles.differentusers}>
                                                        <Text
                                                            style={{
                                                                fontSize: 18,
                                                                color: '#211C5A',
                                                                fontFamily: 'Poppins-Regular',

                                                            }}>

                                                            {leaveapp.empcode ? leaveapp.empcode : 'Employee code N/A'}

                                                        </Text>

                                                        <Text style={{ flexDirection: 'row', fontSize: 12, color: '#505069', fontFamily: 'OpenSans-Regular' }}>
                                                            {leaveapp.status ? leaveapp.status : 'N/A'}
                                                        </Text>


                                                        {/* */}
                                                    </View>
                                                    {/* <TouchableOpacity style={styles.differentusers}>
                                                            <Text style={{ fontSize: 12, color: ' #505069', fontFamily: 'openSans' }}>
                                                                User Type
                                                            </Text>
                                                        </TouchableOpacity> */}



                                                    <View style={styles.differentusers}>
                                                        <Text
                                                            style={{
                                                                fontSize: 14,
                                                                color: '#211C5A',
                                                                fontFamily: 'Poppins-Regular',
                                                            }}>
                                                            {leaveapp.leaveCategory ? leaveapp.leaveCategory.name : 'N/A'}
                                                        </Text>




                                                    </View>

                                                </View>
                                            </View>




                                            <View style={styles.belowhr}>
                                                <View style={{ flexDirection: 'column' }}>

                                                    <Text
                                                        style={{
                                                            color: '#211C5A',

                                                            fontSize: 12,
                                                            fontFamily: 'Poppins-Regular',
                                                        }}>
                                                        From:{leaveapp.fromDate ? leaveapp.fromDate.slice(0, 10) : 'N/A'}
                                                    </Text>
                                                </View>

                                                <Text
                                                    style={{
                                                        color: '#211C5A',

                                                        fontSize: 12,
                                                        fontFamily: 'Poppins-Regular',
                                                    }}>
                                                    To:{leaveapp.toDate ? leaveapp.toDate.slice(0, 10) : 'N/A'}
                                                </Text>

                                            </View>


                                        </View>
                                    ))}

                            </View>

                        )}
                </ScrollView>
            </TouchableWithoutFeedback>











        </View>
    )



}


const styles = StyleSheet.create({

    container1: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: 'rgba(249, 249, 249, 1)',
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
        shadowOpacity: 2.0,
        elevation: 5,
        marginTop: 14,
        marginBottom: 5,
        borderRadius: 12,
        paddingHorizontal: 20,
        marginHorizontal: 20,
    },

    details: {
        //display: 'flex',
        flexDirection: 'column',
        marginTop: 5,
        paddingBottom: 0,
        borderBottomColor: 'rgba(88, 99, 109, 0.45)',
        borderBottomWidth: 0.8,
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
        marginTop: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingBottom: 10,
        borderBottomColor: '#333',
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

export default LeaveApplication;

