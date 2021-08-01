import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { useSelector } from 'react-redux';


function Loader({color}) {
    return (
        <View style={styles.container}>
            <Spinner
                visible={true}
                // textContent={'Loading...'}
                color={color}
                // textStyle={{color: color}}
            />
        </View>
    )
}

function LoaderHook() {
    const [loading, setLoading] = useState(false)
    const institute = useSelector((state)=>state.institute)

    return (
        [
            (loading) ? (
                <Loader color={institute? institute.themeColor: '#FFF'}/>
            ) : null,
            () => setLoading(true),
            () => setLoading(false)
        ]
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#F5FCFF',
        justifyContent:"center",
        alignItems:"center" 
    },
});

export default LoaderHook