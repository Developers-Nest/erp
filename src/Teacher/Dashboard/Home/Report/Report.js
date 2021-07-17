import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    StyleSheet,
    Text,
    View,

    ScrollView,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';


export default function Report({ navigation }) {

    const [Description, setDescription] = React.useState('');
    return (

        < View style={styles.container}>

            {/* header opens */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                    <Icon size={24} color="white" name="left" style={{ alignSelf: 'center', fontSize: 25, color: 'white', paddingLeft: 20, paddingTop: 20 }} />
                </TouchableOpacity>
                <Text style={{ fontStyle: 'normal', fontFamily: 'NunitoSans-Regular', fontSize: 28, fontWeight: '600', alignSelf: 'center', paddingLeft: 30, color: 'white' }}>
                    Report
                </Text>

            </View>

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ width: '90%', marginTop: 20, alignSelf: 'center', ...styles.shadow }}>
                    <TextInput
                        multiline
                        // mode='outlined'
                        placeholder='Write down your problems here..'
                        numberOfLines={20}
                        value={Description}
                        onChangeText={(Description) => { setDescription(Description) }}
                        style={{ ...styles.text_input }} />
                </View>
            </TouchableWithoutFeedback>

            <View style={{ padding: 20 }} />

            <Button
                style={styles.button}
                onPress={() => Alert.alert('Report Submitted')}
                labelStyle={{ color: 'white' }}
                uppercase={false}
                mode="contained">
                Submit
            </Button>
        </View>
    );
}


const styles = StyleSheet.create({

    text_input: {

        backgroundColor: 'white',
        fontFamily: 'Poppins-Regular',
    },


    shadow: {

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1.0,
        elevation: 5,


        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        padding: 1,

    },

    header: {
        height: 65,
        marginTop: -10,
        backgroundColor: 'rgba(0, 73, 159, 1)',
        flexDirection: 'row',

    },
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: 'rgba(249, 249, 249, 1)',
        alignContent: 'center',

    },
    button: {
        backgroundColor: '#5177E7',
        alignSelf: 'flex-end',
        //   marginTop: 10,
        color: '#F9F9F9',
        padding: 3,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginRight: 20
    },

});