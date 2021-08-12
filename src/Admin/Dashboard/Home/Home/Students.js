import React from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Text, ScrollView
} from 'react-native';


//selector
import ModalSelector from 'react-native-modal-selector';
import { useSelector } from 'react-redux';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function Students({ navigation }) {

    //theming
    const institute = useSelector(state => state.institute);
    
    return (

        
        <View style={styles.container}>
      

            {/* header start */}
            <View
                style={{
                    backgroundColor: institute ? institute.themeColor : '#FF5733',
                    ...styles.header,
                }}>
                <View
                    style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
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
                    Student
                </Text>
                <TouchableOpacity
                      onPress={() => navigation.navigate('Guardian')}
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
                        <FontAwesome5Icon
                            name="list-alt"
                            color="#900"
                            style={{
                                fontSize: 30,
                                color: 'white',
                                marginRight: 20,
                                marginTop: 10,
                            }}
                        />
                        <Text
                            style={{
                                color: '#fff',
                                fontFamily: 'Poppins-Regular',
                                fontSize: 12,
                                marginRight: 20,
                            }}>
                            Guardian List
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Modal Selector */}
            <View style={styles.ModalContainer}>
                <ModalSelector 
                 initValue="Batch"
                 style={styles.card_picker}
                 initValueTextStyle={styles.SelectedValueSmall}
                 selectTextStyle={styles.SelectedValueSmall}>

                </ModalSelector>
                <ModalSelector 
                 initValue="Courses"
                 style={styles.card_picker}
                 initValueTextStyle={styles.SelectedValueSmall}
                 selectTextStyle={styles.SelectedValueSmall}>

                </ModalSelector>

            </View>

            {/* {modal selector ends} */}

           {/* Search bar */}
            <View style={styles.search}>
                <TextInput
                    style={{ ...styles.search_input }}
                    placeholder="Enter Student's name Here"
                    placeholderTextColor="grey"
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
            {/* searchbar ends */}

            {/* Student section */}
            <View style={styles.StudentsCard}>
                <View style={{margin:10,flexDirection:'column'}}>
                <Text style={{fontFamily:'Poppins-Regular',fontSize:20}}>
                    Student name
                </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontFamily:'Poppins-Regular',fontSize:15}}>
                        Admission No
                    </Text>
                    <Text style={{fontFamily:'Poppins-Regular',fontSize:15}}>
                        Roll No :
                    </Text>
                </View>
                </View>
            </View>

            
        </View>
    );
}






const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(249, 249, 249, 1)',
        flex: 1
    },
    header: {
        height: 69,
        flexDirection: 'row',
    },
    ModalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    SelectedValueSmall: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 20,
        paddingTop: 3,
        color: '#211C5A',
      },

      card_picker: {
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 0,
        borderRadius: 0.5,
        overflow: 'hidden',
        justifyContent: 'center',
        minWidth: 110,
        elevation: 3,
      },
    search: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderColor: '#00499F',
        borderRadius: 10,
        marginTop: 20,
        marginLeft:20,
        marginRight:20,
        borderWidth: 0.3,
    },
    search_input: {
        borderRadius: 8,
        height: 59,
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        width: '90%',
        color: 'black',
    },
    StudentsCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop:20,
        marginLeft:20,
        marginRight:20,
        flexDirection:'column',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 12,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        padding: 0,

        elevation: 5,

    },

});
