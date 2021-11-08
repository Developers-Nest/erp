import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity, TextInput

} from 'react-native';
import { Searchbar, Button, Card, Title } from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector';
// date picker
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';
import getCourse from '../../../../services/helpers/getList/getCourse';
import getBatch from '../../../../services/helpers/getList/getBatch';


// loading screen
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

export default function StudentReport({ navigation }) {

    //theming
    const institute = useSelector(state => state.institute);


    //loading screen
    const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();
    //lists
    const [Students, setStudents] = useState([]);
    const [Batches, setBatches] = useState([]);
    const [Courses, setCourses] = useState([]);

    //selected values
    const [Batch, setBatch] = useState([]);
    const [Course, setCourse] = useState([]);

    //for search
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    //on load
    useEffect(async () => {
        showLoadingScreen();
        try {
            let res = await getCourse();
            setCourses(res);
            console.log(res);
        } catch (err) {
            alert('Cannot fetch courses!!');
        }
        hideLoadingScreen();
    }, []);

    const fetchBatches = async course => {
        showLoadingScreen();
        try {
            setCourse(course);
            let res = await getBatch(course);
            setBatches(res);
            console.log(res);
        } catch (err) {
            alert('Cannot fetch batches!!');
        }
        hideLoadingScreen();
    };

    const fetchStudents = async batch => {
        showLoadingScreen();
        try {
            setBatch(batch);
            let token = await read('token');
            let slug = `/result/getStudentDetails/?course=${Course}&batch=${batch}`;
            let res = await get(slug, token);
            setStudents(res);
            console.log('students:', res);
        } catch (err) {
            alert('Cannot fetch students report!!');
        }
        hideLoadingScreen();
    };
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const [showdatePicker, setShowDatePicker] = useState(false);

    let handleDatePicker = async date => {
        showLoadingScreen();
        console.log('Date ', date);
        await setDateString(date.toString());
        await setDate(date.toString());
        setShowDatePicker(false);
        hideLoadingScreen();
    };


    return (
        <View style={styles.container}>
            {loadingScreen}
            <View
                style={{
                    backgroundColor: institute ? institute.themeColor : 'black',
                    ...styles.header,
                }}

            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ReportList');
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
                    Student Report
                </Text>
            </View>

            <View style={styles.ModalContainer}>
                <ModalSelector
                    data={Courses}
                    onChange={option => fetchBatches(option.key)}
                    initValue="Course"
                    style={styles.Modal}
                    initValueTextStyle={styles.SelectedValueSmall}
                    selectTextStyle={styles.SelectedValueSmall}
                />


                <ModalSelector

                    initValue="Batch"
                    data={Batches}
                    onChange={option => fetchStudents(option.key)}
                    style={styles.Modal}
                    initValueTextStyle={styles.SelectedValueSmall}
                    selectTextStyle={styles.SelectedValueSmall}
                />

            </View>
            {/* search starts */}
            <View style={styles.search}>
                <TextInput
                    style={{ ...styles.search_input }}
                    placeholder="Enter Student's name Here"
                    placeholderTextColor="grey"
                    defaultValue={searchText}
                    textContentType='name'
                    onChangeText={(text) => {
                        setSearchText(text);
                        if (text === '') {
                            return setFilteredUsers([]);
                        }
                        const filtered_users = Students.filter((student) =>
                            student.firstName.toLowerCase().startsWith(text.toLowerCase())
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
                        <FontAwesome5Icon
                            name="search"
                            style={{
                                alignSelf: 'center',
                                fontSize: 20,
                                color: 'black',
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
            {/* //search ends     */}
            {filteredUsers.length > 0 ?
                (
                    <ScrollView>
                        {Students &&
                            filteredUsers.map(student => (
                                <View style={styles.InfoCards}>
                                    <Card style={styles.cardContent}>
                                        <Card.Content>
                                            <Text>
                                                Name :{student.firstName}
                                            </Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                {/* <Text>
                            Category :{Details.Category}
                        </Text>  */}
                                                <Text>
                                                    Religion: {student.religion ? student.religion : 'N/A'}
                                                </Text>
                                            </View>
                                            <Text>
                                                Guardian/Parents :{student.guardianName}
                                            </Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text>
                                                    DOB :{student.dob.slice(0, 10)}
                                                </Text>
                                                <Text>
                                                    Joining Date :{student.joiningDate.slice(0, 10)}
                                                </Text>
                                            </View>
                                            <View style={{ marginTop: 10, marginBottom: 10, borderWidth: 0.5, borderColor: 'grey' }}></View>
                                            <Text>
                                                More Details :
                                            </Text>
                                            <Text>
                                                Phone :{student.phone}
                                            </Text>
                                            <Text>
                                                Email :{student.email}
                                            </Text>
                                            <Text>
                                                Present Address :{student.presentAddress}
                                            </Text>

                                        </Card.Content>
                                    </Card>


                                </View>
                            ))}

                        <View style={{ height: 10 }} />
                    </ScrollView>
                ) : (
                    <ScrollView>
                        {Students &&
                            Students.map(student => (
                                <View style={styles.InfoCards}>
                                    <Card style={styles.cardContent}>
                                        <Card.Content>
                                            <Text>
                                                Name :{student.firstName}
                                            </Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                {/* <Text>
                            Category :{Details.Category}
                        </Text>  */}
                                                <Text>
                                                    Religion: {student.religion ? student.religion : 'N/A'}
                                                </Text>
                                            </View>
                                            <Text>
                                                Guardian/Parents :{student.guardianName}
                                            </Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text>
                                                    DOB :{student.dob.slice(0, 10)}
                                                </Text>
                                                <Text>
                                                    Joining Date :{student.joiningDate.slice(0, 10)}
                                                </Text>
                                            </View>
                                            <View style={{ marginTop: 10, marginBottom: 10, borderWidth: 0.5, borderColor: 'grey' }}></View>
                                            <Text>
                                                More Details :
                                            </Text>
                                            <Text>
                                                Phone :{student.phone}
                                            </Text>
                                            <Text>
                                                Email :{student.email}
                                            </Text>
                                            <Text>
                                                Present Address :{student.presentAddress}
                                            </Text>

                                        </Card.Content>
                                    </Card>


                                </View>
                            ))}

                        <View style={{ height: 10 }} />
                    </ScrollView>

                )
            }
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(249, 249, 249, 1)',
    },

    header: {
        height: 65,
        flexDirection: 'row',

    },
    ModalContainer: {
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 5
    },
    Modal: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 2,
        elevation: 5,
    },
    SelectedValueSmall: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 25,
        paddingTop: 3,
        color: '#211C5A',
    },
    searchbar: {
        margin: 8,
        borderRadius: 10,

    },
    InfoCards: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',

    },
    cardContent: {
        borderRadius: 12,
        marginVertical: 15,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 2,
        elevation: 5,

    },
    search: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderColor: '#00499F',
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 2,
        elevation: 5,
    },
    search_input: {
        borderRadius: 8,
        height: 49,
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        width: '90%',
        color: 'black',
    },
});