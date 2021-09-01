import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput, ScrollView } from 'react-native';



import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
//useFocusEffect
import { useFocusEffect } from '@react-navigation/native';
// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';
import deleteReq from '../../../../services/helpers/request/delete'
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

//redux

import { useSelector } from 'react-redux';
const VisitorsList = ({ navigation }) => {
    //theming
    const institute = useSelector(state => state.institute);
    const [visitorlist, setvisitorlist] = useState([]);
    const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();
    //for search
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);


    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const fetchUser = async () => {

                try {
                    let slug = '/hostel/hostelVisitor';
                    let token = await read('token');
                    const response = await get(slug, token);
                    setvisitorlist(response);
                } catch (err) {
                    alert('Cannot fetch hostel visitors list !!');
                }

            };

            fetchUser();

            return () => {
                isActive = false;
            };
        }, [])
    );

    //to delete
    const handleDelete = async id => {
        showLoadingScreen();
        try {
            let slug = `/hostel/hostelVisitor/${id}`
            let token = await read('token')
            let res = await deleteReq(slug, token)
            if (res.error) {
                alert(res.error)
            } else {
                alert('Visitor information deleted successfully')
                setvisitorlist(visitorlist.filter(all => all._id != id))
            }
        } catch (err) {
            alert('Cannot Delete !!')
        }
        hideLoadingScreen();
    }



    return (
        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            {/* header start */}

            <View
                style={{
                    backgroundColor: institute ? institute.themeColor : '#FF5733',
                    ...styles.header,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }} >

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('RoomsList');
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
                            marginLeft: 20,
                            color: 'white',
                        }}>
                        Visitors List
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddVisitorsHostel')}
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
                            }}>
                            ADD VISITORS
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>

            {/* header ends */}

            {loadingScreen}

            <View style={{ marginHorizontal: 10, ...styles.shadow }}>
                <View style={styles.search}>
                    <TextInput
                        style={{ ...styles.search_input, fontFamily: 'Poppins-Regular' }}
                        placeholder="Enter hostel name here"
                        placeholderTextColor='grey'
                        color='black'
                        defaultValue={searchText}
                        textContentType='name'
                        onChangeText={(text) => {
                            setSearchText(text);
                            if (text === '') {
                                return setFilteredUsers([]);
                            }
                            const filtered_users = visitorlist.filter((visitorlist) =>
                                visitorlist.visitorName.toLowerCase().startsWith(text.toLowerCase())
                            );
                            setFilteredUsers(filtered_users);
                        }}
                        returnKeyType='search'
                    />
                    {searchText.length === 0 ? (
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                            }}
                        >
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
            {filteredUsers.length > 0 ?
                (

                    <ScrollView>


                        {visitorlist &&
                            filteredUsers.map(visitorlist => (

                                <View style={styles.section}
                                    key={visitorlist._id}
                                >
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

                                                    {visitorlist.visitorName ? visitorlist.visitorName : 'N/A'}

                                                </Text>

                                                <Text style={{ flexDirection: 'row', fontSize: 10, color: '#505069', fontFamily: 'OpenSans-Regular' }}>
                                                    {visitorlist.hostelRoom.roomNo ? visitorlist.hostelRoom.roomNo : 'N/A'},{visitorlist.hostelRoom.floorName ? visitorlist.hostelRoom.floorName : 'N/A'} floor
                                                </Text>


                                                {/* */}
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
                                                <Text style={{ fontSize: 12, color: '#505069', fontFamily: 'OpenSans-Regular' }}>
                                                    {visitorlist.userType.name ? visitorlist.userType.name : 'N/A'}
                                                </Text>
                                            </TouchableOpacity>



                                            <View style={styles.differentusers}>
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: '#505069',
                                                        fontFamily: 'Poppins-Regular',
                                                    }}>
                                                    {visitorlist.relation ? visitorlist.relation : 'N/A'}

                                                </Text>

                                                <TouchableOpacity
                                                    onPress={() => { handleDelete(visitorlist._id) }}
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        marginBottom: 5
                                                    }}>

                                                    <MaterialIcon
                                                        size={20}
                                                        backgroundColor=" #211C5A"
                                                        name="delete"

                                                        color={institute ? institute.themeColor : '#211C5A'}
                                                    />
                                                </TouchableOpacity>


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
                                                Date: {visitorlist.dateOf ? visitorlist.dateOf.slice(0, 10) : 'N/A'}
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 15 }}>
                                            <Text
                                                style={{
                                                    color: '#211C5A',

                                                    fontSize: 12,
                                                    fontFamily: 'Poppins-Regular',
                                                }}>
                                                Time: {visitorlist.timeOf ? visitorlist.timeOf.slice(11, 19) : 'N/A'}
                                            </Text>

                                        </View>
                                    </View>


                                </View>

                            ))}

                        <View style={{ height: 90 }} />
                    </ScrollView>

                ) : (

                    <ScrollView>


                        {visitorlist &&
                            visitorlist.map(visitorlist => (

                                <View style={styles.section}
                                    key={visitorlist._id}
                                >
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

                                                    {visitorlist.visitorName ? visitorlist.visitorName : 'N/A'}

                                                </Text>

                                                <Text style={{ flexDirection: 'row', fontSize: 10, color: '#505069', fontFamily: 'OpenSans-Regular' }}>
                                                    {visitorlist.hostelRoom.roomNo ? visitorlist.hostelRoom.roomNo : 'N/A'},{visitorlist.hostelRoom.floorName ? visitorlist.hostelRoom.floorName : 'N/A'} floor
                                                </Text>


                                                {/* */}
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
                                                <Text style={{ fontSize: 12, color: '#505069', fontFamily: 'OpenSans-Regular' }}>
                                                    {visitorlist.userType.name ? visitorlist.userType.name : 'N/A'}
                                                </Text>
                                            </TouchableOpacity>



                                            <View style={styles.differentusers}>
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: '#505069',
                                                        fontFamily: 'Poppins-Regular',
                                                    }}>
                                                    {visitorlist.relation ? visitorlist.relation : 'N/A'}

                                                </Text>

                                                <TouchableOpacity
                                                    onPress={() => { handleDelete(visitorlist._id) }}
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        marginBottom: 5
                                                    }}>

                                                    <MaterialIcon
                                                        size={20}
                                                        backgroundColor=" #211C5A"
                                                        name="delete"

                                                        color={institute ? institute.themeColor : '#211C5A'}
                                                    />
                                                </TouchableOpacity>


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
                                                Date: {visitorlist.dateOf ? visitorlist.dateOf.slice(0, 10) : 'N/A'}
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 15 }}>
                                            <Text
                                                style={{
                                                    color: '#211C5A',

                                                    fontSize: 12,
                                                    fontFamily: 'Poppins-Regular',
                                                }}>
                                                Time: {visitorlist.timeOf ? visitorlist.timeOf.slice(11, 19) : 'N/A'}
                                            </Text>

                                        </View>
                                    </View>


                                </View>

                            ))}

                        <View style={{ height: 90 }} />
                    </ScrollView>

                )}


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

export default VisitorsList;

