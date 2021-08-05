import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import {
    Searchbar,
    Appbar,
    List,
    Card,
    Title,
    Paragraph,
    Button,
} from 'react-native-paper';

import ModalSelector from 'react-native-modal-selector';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { auto } from 'async';
//redux
import {useSelector} from 'react-redux';

export default function BulkSMS({ navigation }) {
      //theming
      const institute = useSelector(state => state.institute);

    const [SMS_for, setSMS_for] = useState([]);
    return (
        <View style={styles.backgroung}>
            {/* <Appbar>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Bulk SMS" />
      </Appbar> */}
            <View
              style={{backgroundColor: institute ? institute.themeColor : '#FF5733',
              ...styles.header,
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
                    Bulk SMS
                </Text>
                <View style={{ flex: 1, marginLeft: 20 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SmsAlert')}
                        style={{
                            justifyContent: 'center',
                            flex: 1,
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            paddingRight: 20,
                        }}>
                        <IonIcon size={24} color="white" name="add-circle-outline" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={{ padding: 5 }} />
                <View style={{ padding: 15 }} >
                    <ModalSelector
                        data={SMS_for}
                        initValue="Employee"
                        onChange={async option => {
                            await getAssessesments(option.key);
                        }}
                        style={styles.card_picker}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />
                    <View style={{ padding: 10 }} />
                    <Card style={{ height: 200, ...styles.Card }}>
                        <Card.Content>
                            <TextInput
                                placeholder="Write your message here "
                                placeholderTextColor='grey'
                                color='black'
                                onChange={val => setDiscription(val)}
                                style={{ backgroundColor: 'white' }}
                            />
                        </Card.Content>
                    </Card>
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
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
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
