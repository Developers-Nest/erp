import AsyncStorage from '@react-native-async-storage/async-storage';

async function write(key, value){

    if(!key || !value) return new Error('write.js: Inavlid Format')

    await AsyncStorage.setItem(key, value)

    return true
}

export default write