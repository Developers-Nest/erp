import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    TextInput,

} from 'react-native';

const design = () => {

    return (

        <View style={{
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: 'rgba(249, 249, 249, 1)',
        }}>

            <Image source={require('./assets/bootsplash_logo.png')} 

                style={{marginTop:50,justifyContent:'center',marginLeft:70}}
            />
            <View style={{ marginTop: 69}}>
                <TextInput
                    placeholderTextColor="black"
                    style={[styles.input]}
                    placeholder="CODE"

                />

            </View>

            <View style={{ marginHorizontal: 10}}>
                <View style={styles.search}>
                    <TextInput
                        style={{ ...styles.search_input, fontFamily: 'Poppins-Regular'}}
                        placeholder="Email"
                        placeholderTextColor="grey"
                        color="black"
                    />

                </View>
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <View style={styles.search}>
                    <TextInput
                        style={{ ...styles.search_input, fontFamily: 'Poppins-Regular' }}
                        placeholder="Password"
                        placeholderTextColor="grey"
                        color="black"
                    />

                </View>
            </View>

            <View style={styles.fixToText}>
                <TouchableOpacity style={[styles.button]}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
    },

    input: {

        height: 50,
        margin: 12,
        width: 180,
        marginTop: 0,
        marginBottom: 0,
        paddingHorizontal: 20,
        marginLeft: 30,
        backgroundColor: 'white',
        borderRadius: 8,
        borderColor: '#58636D',
        borderWidth: 1,
        justifyContent: 'space-between',
        fontFamily: 'Poppins-Regular',

    },



    search_input: {
        fontFamily: 'Poppins-Regular',
        borderRadius: 8,
        height: 50,
        fontSize: 15,
        paddingTop: 8,
        paddingHorizontal: 0,
        width: '90%',
        textAlign: 'left',

    },
    search: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderColor: '#58636D',
        borderRadius:8,
        borderWidth:1,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
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

export default design;