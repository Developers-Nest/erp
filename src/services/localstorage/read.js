import AsyncStorage from '@react-native-async-storage/async-storage';

async function read(key){

    try{
        const value = await AsyncStorage.getItem(key)

        if(!value){
            return new Error(`read.js: ${key} not found`)
        }

        return value

    } catch(err){
        return err
    }

}

export default read