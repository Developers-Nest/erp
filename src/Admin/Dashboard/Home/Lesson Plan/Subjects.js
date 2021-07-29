import * as React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, ImageBackground, Button, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


import AntDesign from 'react-native-vector-icons/AntDesign';

//redux
import {useSelector} from 'react-redux';


export default function Subjects({navigation}) {

 //theming
 const institute = useSelector(state => state.institute);


    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);


    return (



        <View style={styles.container}>
            {/* header start */}

            <View
                style={{
                    backgroundColor: institute ? institute.themeColor : '#FF5733',
                    // backgroundColor:'blue',
                    ...styles.header,
                }}>
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
                            paddingLeft: 20,
                            marginTop: 22,
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
                        marginLeft: 30,
                        color: 'white',
                    }}>
                    Subjects
                </Text>

            </View>

            {/* header ends */}

            <ScrollView>

                {/* <View style={styles.maincontainer}>     */}
<TouchableWithoutFeedback  onPress={() => {
                        navigation.navigate('LessonPlan');
                    }}>
                <View style={styles.section}>
                    <View style={styles.details}>

                        <View style={styles.userinhostels}>
                            <TouchableOpacity style={styles.differentusers}>
                                <Text style={{ fontSize: 18, color: '#211C5A', fontFamily: 'Poppins-Regular' }}> Physics</Text>

                                <Text style={{ fontSize: 12, color: '#211C5A', fontFamily: 'Poppins-Regular' }}> PHY:20345</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.differentusers}>
                                <Text style={{ fontSize: 12, marginLeft: 5, color: '#211C5A', fontFamily: 'Poppins-Regular' }}>Batch</Text>

                                <Text style={{ fontSize: 12, color: '#211C5A', fontFamily: 'Poppins-Regular' }}> Class</Text>
                            </TouchableOpacity>
                        </View>



                    </View>


                </View>
                </TouchableWithoutFeedback>          
                <View style={styles.section}>
                    <View style={styles.details}>

                        <View style={styles.userinhostels}>
                            <TouchableOpacity style={styles.differentusers}>
                                <Text style={{ fontSize: 18, color: '#211C5A', fontFamily: 'Poppins-Regular' }}> Physics</Text>

                                <Text style={{ fontSize: 12, color: '#211C5A', fontFamily: 'Poppins-Regular' }}> PHY:20345</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.differentusers}>
                                <Text style={{ fontSize: 12, marginLeft: 5, color: '#211C5A', fontFamily: 'Poppins-Regular' }}>Batch</Text>

                                <Text style={{ fontSize: 12, color: '#211C5A', fontFamily: 'Poppins-Regular' }}> Class</Text>
                            </TouchableOpacity>
                        </View>



                    </View>


                </View>
                {/* </View> */}

            </ScrollView>

        </View>


    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(249, 249, 249, 1)',

    },

    section: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        paddingVertical: 2,
        paddingHorizontal: 13,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        elevation: 5,
        marginTop: 20,
        marginBottom:10,
        borderRadius: 12,
        marginHorizontal: 25,



    },

    details: {
        display: 'flex',
        flexDirection: 'column',
        borderBottomColor: '#333',
        marginVertical:10
        // borderBottomWidth:1,
    },
    userinhostels: {
        marginTop: 0,
    },
    differentusers: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    userstext: {
        fontSize: 16,
        paddingVertical: 4,
        fontWeight: '300',
    },
    belowhr: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomColor: '#333',

    },
    search: {
        backgroundColor: "white",
        color: "black"
    },
    header: {
        height: 69,
        flexDirection: 'row',
        alignContent: 'center',
    },


});