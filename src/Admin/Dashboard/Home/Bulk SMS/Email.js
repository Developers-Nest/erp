import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import {Button} from 'react-native-paper';

import ModalSelector from 'react-native-modal-selector';
import AntDesign from 'react-native-vector-icons/AntDesign';

//redux
import {useSelector} from 'react-redux';


export default function SmsAlert({ navigation }) {
    
      //theming
      const institute = useSelector(state => state.institute);
    const [AccountName, setAccountName] = useState([]);
    const [Template, setTemplate] = useState([]);
    const [Des, setDiscription] = useState([]);
    return (
        <View style={styles.backgroung}>
            <View
                style={{backgroundColor: institute ? institute.themeColor : '#FF5733',
                ...styles.header,
                  }}>
                <TouchableOpacity onPress={() => navigation.navigate('BulkSMS')}>
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
                        fontSize: 28,
                        fontWeight: '600',
                        alignSelf: 'center',
                        paddingLeft: 30,
                        color: 'white',
                    }}>
                    Email
                </Text>
            </View>
            <ScrollView>
                <View style={{ padding: 5 }} />
                <View style={{ padding: 15 }} >
                    <ModalSelector
                        data={AccountName}
                        initValue="Account Name"
                        onChange={async option => {
                            await getAssessesments(option.key);
                        }}
                        style={styles.card_picker}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />
                    <View style={{ padding: 8 }} />
                    <ModalSelector
                        data={Template}
                        initValue="Template"
                        onChange={async option => {
                            await getAssessesments(option.key);
                        }}
                        style={styles.card_picker}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />
                    <View style={{ padding: 10 }} />
                   
                            <TextInput
                                placeholder="Write your subject of the email here. . ."
                                placeholderTextColor='grey'
                                onChange={val => setDiscription(val)}
                                multiline={true}
                                style={{ backgroundColor: 'white' ,color:'black',fontFamily:'Poppins-Regular',fontSize:15,textAlignVertical:'top',height:150,borderRadius:12}}
                            />
                       
                </View>
                <View style={{ padding: 10 }}>
                    <View
                        style={{
                            justifyContent: 'center',

                            alignItems: 'center',
                        }}>
                        <Button style={{ width: 90 }} color='#5177E7' mode="contained" onPress={() => console.log('Pressed')}>
                            Send
                        </Button>
                    </View>
                </View>
                <View style={{ padding: 20 }} />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroung: {
        backgroundColor: '#E5E5E5',
        height: '100%',
        flex: 1,
    },
    header: {
        height: 69,
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#58636D',

        color: '#F9F9F9',
        padding: 3,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    SelectedValueSmall: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 30,
        paddingTop: 3,
        color: '#211C5A',
    },
    card_picker: {
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius:12,
        overflow: 'hidden',
        justifyContent: 'center',
        elevation: 3,
    },
    Card: {
        borderRadius: 12,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
    }

});
