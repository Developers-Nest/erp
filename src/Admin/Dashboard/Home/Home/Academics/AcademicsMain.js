import React, { useState, useEffect } from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
//loadingscreen
import LoadingScreen from '../../../../../components/LoadingScreen/LoadingScreen';

// helpers
import get from '../../../../../services/helpers/request/get';
import read from '../../../../../services/localstorage/read';
//redux
import { useSelector } from 'react-redux';

//useFocusEffect
import { useFocusEffect } from '@react-navigation/native';

export default function AcademicsMain({ navigation }) {
    const [showContent, setShowContent] = React.useState('Courses');
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    //theming
    const institute = useSelector(state => state.institute);
    // loading screem
    const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

    function Courses() {
        const [courselist, setcourselist] = useState([]);

        useFocusEffect(
            React.useCallback(() => {
                let isActive = true;

                const fetchUser = async () => {
                    try {
                        let slug = '/course';
                        let token = await read('token');
                        const response = await get(slug, token);
                        setcourselist(response);
                    } catch (err) {
                        alert('Cannot fetch added books list !!');
                    }
                };

                fetchUser();

                return () => {
                    isActive = false;
                };
            }, [])
        );




        const [searchQuery, setSearchQuery] = React.useState('');

        const onChangeSearch = query => setSearchQuery(query);

        return (

            <View style={styles.container}>

                <TouchableOpacity style={{ marginTop: 8, marginLeft: 30 }}

                    onPress={() =>
                        navigation.navigate('AddCourses')}


                >
                    <Text style={{ color: 'blue', marginBottom: -6 }}>Add more Courses</Text>
                    <Text ellipsizeMode="clip" numberOfLines={1} style={{ color: 'blue', fontWeight: 'bold' }}>
                        - - - - - - - - - - - - -

                    </Text>
                </TouchableOpacity>

                <ScrollView>
                    {courselist ? courselist &&
                        courselist.map(courselist => (
                            <View style={styles.section}
                                key={courselist._id}
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
                                                {' '}
                                                {courselist.courseName ? courselist.courseName : 'N/A'}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    color: '#211C5A',
                                                    fontFamily: 'Poppins-Regular',
                                                }}>
                                                {' '}
                                                {courselist.code ? courselist.code : 'N/A'}
                                            </Text>

                                        </View>
                                        <View style={styles.differentusers}>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    color: '#505069',
                                                    fontFamily: 'Poppins-Regular',
                                                }}>
                                                {'  '}{courselist.description ? courselist.description : 'N/A'}
                                            </Text>
                                            <TouchableOpacity
                                                style={{ flexDirection: 'row' }}
                                                onPress={() =>
                                                    navigation.navigate('EditCourses', {
                                                        course: courselist
                                                    })
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: '#211C5A',
                                                        fontFamily: 'Poppins-Regular',
                                                    }}>
                                                    Edit
                                                </Text>
                                                <AntDesign
                                                    size={12}
                                                    color="#211C5A"
                                                    name="edit"
                                                    style={{ paddingTop: 2 }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.belowhr}>

                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#505069',
                                            fontFamily: 'Poppins-Regular',
                                            paddingLeft: 5,
                                        }}>
                                        {courselist.attendanceType ? courselist.attendanceType : 'N/A'}
                                    </Text>

                                </View>
                            </View>
                        )) : 'N/A'}

                    <View style={{ height: 30 }} />
                </ScrollView>

            </View>
        );
    }

    function Batches() {
        const [batchlist, setbatchlist] = useState([]);

        useFocusEffect(
            React.useCallback(() => {
                let isActive = true;

                const fetchUser = async () => {
                    try {
                        let slug = '/batch';
                        let token = await read('token');
                        const response = await get(slug, token);
                        setbatchlist(response);
                    } catch (err) {
                        alert('Cannot fetch batches list !!');
                    }
                };

                fetchUser();

                return () => {
                    isActive = false;
                };
            }, [])
        );



        return (
            <View style={styles.container}>

                <TouchableOpacity style={{ alignItems: 'flex-end', marginRight: 30 }}
                    onPress={() =>
                        navigation.navigate('AddBatches')}

                >
                    <Text style={{ color: 'blue', marginBottom: -6 }}>Add more batches</Text>
                    <Text ellipsizeMode="clip" numberOfLines={1} style={{ color: 'blue', fontWeight: 'bold' }}>
                        - - - - - - - - - - - - -

                    </Text>
                </TouchableOpacity>
                <ScrollView>
                    {batchlist ? batchlist &&
                        batchlist.map(batchlist => (
                            <View style={styles.section}
                                key={batchlist._id}
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
                                                {' '}
                                                {batchlist.batchName ? batchlist.batchName : 'N/A'}
                                            </Text>

                                        </View>
                                        <View style={styles.differentusers}>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    color: '#505069',
                                                    fontFamily: 'Poppins-Regular',
                                                }}>
                                                {'  '}{batchlist.course ? batchlist.course.courseName : 'N/A'}
                                            </Text>
                                            <TouchableOpacity
                                                style={{ flexDirection: 'row' }}
                                                onPress={() =>
                                                    navigation.navigate('EditBatches',{
                                                        batch: batchlist
                                                    })
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: '#211C5A',
                                                        fontFamily: 'Poppins-Regular',
                                                    }}>
                                                    Edit
                                                </Text>
                                                <AntDesign
                                                    size={12}
                                                    color="#211C5A"
                                                    name="edit"
                                                    style={{ paddingTop: 2 }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.belowhr}>

                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#505069',
                                            fontFamily: 'Poppins-Regular',
                                            paddingLeft: 5,
                                        }}>
                                        Start:{batchlist.startDate ? batchlist.startDate.toString().slice(0, 10) : 'N/A'}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#505069',
                                            fontFamily: 'Poppins-Regular',
                                        }}>
                                        End:{batchlist.endDate ? batchlist.endDate.toString().slice(0, 10) : 'N/A'}
                                    </Text>

                                </View>
                            </View>
                        )) : 'N/A'}
                    <View style={{ height: 30 }} />
                </ScrollView>

            </View>
        );
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView style={styles.maincontainer}>
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
                        Academics
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ClassTeacherAllocation')}
                        style={{
                            justifyContent: 'flex-end',
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 5 }}>
                            <MaterialIcon
                                name="align-horizontal-right"
                                color="#900"
                                style={{
                                    fontSize: 30,
                                    color: 'white',
                                    paddingRight: 20,
                                }}
                            />


                        </View>
                    </TouchableOpacity>
                </View>

                {/* header ends */}

                <View
                    style={{
                        alignItems: 'center',
                        marginBottom: 20,
                        marginTop: 20,
                    }}>
                    <View style={{ alignItems: 'center', width: '90%' }}>
                        {/* open search */}

                        {/* <View
                            style={{
                                marginTop: 10,
                                marginLeft: 5,
                                justifyContent: 'space-between',
                                width: '95%',
                                flexDirection: 'row',
                                ...styles.shadow,
                            }}>
                            <TextInput
                                style={{ width: '80%', ...styles.text_input }}
                                placeholder="Enter student's name"
                                placeholderTextColor="grey"
                            />
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'center',
                                }}>
                                <FontAwesome5
                                    name="search"
                                    style={{
                                        alignSelf: 'center',
                                        fontSize: 21,
                                        color: '#505069',
                                    }}
                                />
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </View>

                {/* close search */}

                {/* tabs section open */}
                <View style={styles.switchTabsView}>
                    <TouchableOpacity
                        style={{
                            borderBottomWidth: showContent == 'Courses' ? 1 : 0,
                            borderBottomColor: showContent == 'Courses' ? 'rgba(176, 67, 5, 1)' : '#58636D',
                            paddingHorizontal: 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => setShowContent('Courses')}>
                        <Text style={[styles.switchText], [{ color: showContent == 'Courses' ? 'rgba(176, 67, 5, 1)' : '#58636D' }, { fontWeight: 'bold' }]}>Courses</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            borderBottomWidth: showContent == 'Batches' ? 1 : 0,
                            borderBottomColor: showContent == 'Batches' ? 'rgba(176, 67, 5, 1)' : '#58636D',
                            paddingHorizontal: 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => setShowContent('Batches')}>
                        <Text style={[styles.switchText], [{ color: showContent == 'Batches' ? 'rgba(176, 67, 5, 1)' : '#58636D' }, { fontWeight: 'bold' }]}>Batches</Text>
                    </TouchableOpacity>
                </View>
                {showContent === 'Courses' ? <Courses /> : <Batches />}
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: 'rgba(249, 249, 249, 1)',

    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        elevation: 5,
        marginTop: 14,
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        marginHorizontal: 20,
        marginBottom: 10,

    },

    details: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 4,
        // paddingBottom: 10,
        borderBottomColor: '#333',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 0.5
    },

    differentusers: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userstext: {
        fontSize: 16,
        fontWeight: '300',
    },

    search: {
        backgroundColor: 'white',
        color: 'black',
    },
    switchTabsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        marginBottom: 10,
    },
    switchText: {
        fontSize: 14,
        paddingHorizontal: 5,
        fontFamily: 'Poppins-Regular',

    },
    maincontainer: {
        flex: 1,
        backgroundColor: 'rgba(249, 249, 249, 1)',
    },

    switchTextDue: {
        fontSize: 14,
        color: '#B04305',
        paddingHorizontal: 5,
        fontFamily: 'Poppins-SemiBold',
        fontWeight: 'bold',
    },

    text_input: {

        borderRadius: 10,
        height: 50,
        fontSize: 16,
        minWidth: 171,
        backgroundColor: 'white',
        color: 'black'
    },

    shadow: {
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        minWidth: 110,
    },

    header: {
        height: 69,
        flexDirection: 'row',
    },
    belowhr: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderBottomColor: '#333',

    },
});
