import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


function Loader() {
    return (
        <View style={styles.container}>
            <Spinner
                visible={true}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
        </View>
    )
}

function LoaderHook() {
    const [loading, setLoading] = useState(false)

    return (
        [
            (loading) ? (
                <Loader />
            ) : null,
            () => setLoading(true),
            () => setLoading(false)
        ]
    )
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#F5FCFF',
        justifyContent:"center",
        alignItems:"center" 
    },
});

export default LoaderHook