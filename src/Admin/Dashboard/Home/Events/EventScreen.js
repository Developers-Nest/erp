
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput ,Text} from 'react-native';
import {
   
} from 'react-native-paper';

//selector
import ModalSelector from 'react-native-modal-selector';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

// redux
import { useSelector } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function EventScreen({ navigation }) {
    const [type, setType] = useState([]);
    const [courses, setCourses] = useState([]);
    const [subjects, setSubjects] = useState([]);

    //theming
    const institute = useSelector(state => state.institute);

    return (
        <View style={{ backgroundColor: 'rgba(249, 249, 249, 1)', flex: 1 }}>
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
                    Events
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddQuestion')}
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
                        <Ionicons
                            name="add-circle"
                            color="#900"
                            style={{
                                fontSize: 30,
                                color: 'white',
                                marginRight: 20,
                                marginTop: 10
                            }}
                        />
                        <Text
                            style={{
                                color: '#fff',
                                fontFamily: 'Poppins-Regular',
                                fontSize: 12,
                                marginRight: 20,
                            }}>
                            Add Events
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* header ends */}

            <View style={styles.search}>
                <TextInput
                    style={{ ...styles.search_input }}
                    placeholder="Enter Events name Here"
                    placeholderTextColor='grey'
                />

                <TouchableOpacity
                    style={{
                        alignSelf: 'center',
                    }}>
                    <FontAwesome5Icon
                        name="search"
                        style={{
                            alignSelf: 'center',
                            fontSize: 30,
                            color: 'black',
                        }}
                    />
                </TouchableOpacity>
            </View>
           
            <View style={styles.EventCard}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:18,marginLeft:18,marginRight:18}}>
                    <Text style={{fontSize:18,fontWeight:'400',color:'#211C5A'}}>Events Name</Text>
                    <View style={{flexDirection:'row'}}>
                    <TouchableWithoutFeedback onPress={() => {
                                navigation.navigate('EditEvent')}}>
                    <FontAwesome5Icon
                     name="edit"
                     style={{
                         alignSelf: 'center',
                         fontSize: 20,
                         color: '#211C5A',
                     }}/>
                    <Text>Edit</Text>
                    </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{marginLeft:18,marginRight:18}}>
                    <Text style={{color:'#211C5A'}}>
                        Event type
                    </Text>
                    <Text style={{color: '#211C5A',marginBottom:0}}>
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and  muvh more
                    </Text>
                    <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',marginBottom:10,borderTopWidth:0.2}}>
                        <Text style={{color: '#211C5A',marginTop:5}}>
                            Beds:448
                        </Text>
                        <Text style={{color: '#211C5A',marginTop:5}}>
                            Amount:240000 Rs
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 69,
        flexDirection: 'row',
    },
    search: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderColor: '#00499F',
        borderRadius: 10,
        margin: 20,
        borderWidth:0.2
    },
    search_input: {
        borderRadius: 8,
        height: 59,
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        width: '90%',
        color: 'black'

    },
    EventCard:{
        backgroundColor:'white',
        marginRight:20,
        marginLeft:20,
        borderRadius:10,
        marginTop:10,
      
    }

});
