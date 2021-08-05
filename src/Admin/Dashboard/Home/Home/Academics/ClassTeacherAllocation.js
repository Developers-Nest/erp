import React, { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import AntDesign from 'react-native-vector-icons/AntDesign';

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

// helpers
import get from '../../../../../services/helpers/request/get';
import read from '../../../../../services/localstorage/read';
//redux
import { useSelector } from 'react-redux';
import { Searchbar } from 'react-native-paper';

//useFocusEffect
import { useFocusEffect } from '@react-navigation/native';


export default function ClassTeacherAllocation({ navigation }) {

    //theming
    const institute = useSelector(state => state.institute);
    const [teacherallocationlist, setteacherallocationlist] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const fetchUser = async () => {

                try {
                    let slug = '/classteacher';
                    let token = await read('token');
                    const response = await get(slug, token);
                    console.log('Allocated Teachers', response);
                    setteacherallocationlist(response);
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





    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.maincontainer}>

                {/* header start */}

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
                            Class Teacher Allocation
                        </Text>
                    </View>

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

                        <View
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
                                placeholder="Enter teacher's name"
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
                        </View>
                    </View>
                </View>

                {/* close search */}

                <View style={styles.container}>
                    <TouchableOpacity style={{ marginTop: 8, marginLeft: 30 }}

                        onPress={() =>
                            navigation.navigate('AllocateClassTeacher')}


                    >
                        <Text style={{ color: 'blue', marginBottom: -6 }}>Allocate Teachers</Text>
                        <Text ellipsizeMode="clip" numberOfLines={1} style={{ color: 'blue', fontWeight: 'bold' }}>
                            - - - - - - - - - - - - -

                        </Text>
                    </TouchableOpacity>
                    <ScrollView>
                        {teacherallocationlist ? teacherallocationlist &&
                            teacherallocationlist.map(teacherallocationlist => (



                                <View style={styles.section}
                                    key={teacherallocationlist._id}
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
                                                    {teacherallocationlist.classTeacher
                                                        ? teacherallocationlist.classTeacher.firstName.charAt(0).toUpperCase() +
                                                        teacherallocationlist.classTeacher.firstName.slice(1) +
                                                        ' ' +
                                                        teacherallocationlist.classTeacher.middleName.charAt(0).toUpperCase() +
                                                        teacherallocationlist.classTeacher.middleName.slice(1) +
                                                        ' ' +
                                                        teacherallocationlist.classTeacher.lastName.charAt(0).toUpperCase() +
                                                        teacherallocationlist.classTeacher.lastName.slice(1)
                                                        : 'Name not given'}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: '#211C5A',
                                                        fontFamily: 'Poppins-Regular',
                                                    }}>
                                                    {' '}
                                                    {teacherallocationlist.batch.batchName ? teacherallocationlist.batch.batchName : 'N/A'}
                                                </Text>

                                            </View>
                                            <View style={styles.differentusers}>
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: '#505069',
                                                        fontFamily: 'Poppins-Regular',
                                                    }}>
                                                    {'  '}{teacherallocationlist.course.courseName ? teacherallocationlist.course.courseName : 'N/A'}
                                                </Text>
                                                <TouchableOpacity
                                                    style={{ flexDirection: 'row' }}
                                                    onPress={() =>
                                                        navigation.navigate('EditAllocationTeacher')
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

                                </View>
                            )) : null}

                        <View style={{ height: 30 }} />

                    </ScrollView>
                </View>

            </View>
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
        borderBottomColor: '#333',
        paddingHorizontal: 10,
        paddingVertical: 10,

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
        fontFamily: 'Poppins-SemiBold',
        fontWeight: 'bold',
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
