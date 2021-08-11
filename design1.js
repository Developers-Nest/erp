import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    TextInput,

} from 'react-native';

import { Button } from 'react-native-paper';


const design1 = () => {

    return (

        <View style={{
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: 'rgba(249, 249, 249, 1)',
        }}>

            <Image source={require('./assets/bootsplash_logo.png')}

                style={{ marginTop:200, justifyContent: 'center', marginLeft: 70 }}
            />
            <View style={{ marginTop: 100 }}>
                <View style={styles.fixToText}>
                    <TouchableOpacity style={styles.button1} >
                        <Text style={styles.text1}>User Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.text}>Admin Login</Text>
                    </TouchableOpacity>


                </View>

            </View>





        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
    },

    button1: {

        marginTop: 0,
        marginBottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5177E7',
        alignSelf: 'flex-end',
        padding: 3,
        paddingHorizontal: 25,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 30,
        height: 60,
        borderColor: '#5177E7',
        borderWidth: 1.5

    },
    text1: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',

    },



    fixToText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 8,
        margin: 40,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#5177E7',

    },
    text: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: '500',
        letterSpacing: 0.25,
        color: 'white',
    },

});

export default design1;