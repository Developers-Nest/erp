import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Button, Searchbar, IconButton } from 'react-native-paper'

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

// helpers
import post from '../services/helpers/request/post'
import get from '../services/helpers/request/get'
import write from '../services/localstorage/write'
import read from '../services/localstorage/read'

// redux
import { USERINFO } from '../reducers/actionType'



export default function App({ navigation }) {

  const [institutionCode, setInstitutionCode] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  useEffect(async () => {

    // check for token from local storage
    try {
      let t = await read('token')
      let r = await read('role')

      // get user information
      const response = await get('/user', t)
      console.log("Use Effect ", response)
      console.log("Role ",r)
      if(r === 'Teacher'){
        navigation.navigate('Teacher Dashboard')
      } else if(role === 'Student'){

      }

    } catch (err) {
      // token not found
      // ask user to login
    }

  }, [])

  const handleSubmit = async () => {
    try {
      const slug = '/user/login'

      // data for post request
      let data = {
        username: username,
        password: password
      }

      // post request
      const response = await post(slug, data)
      let role = response.userType.name

      // write token to local storage
      try {
        await write('token', response.token)
        await write('role', role)
      } catch (err) {
        console.log('Cannot write to Local Storage')
      }

      if(role === 'Teacher'){
        navigation.navigate('Teacher Dashboard')
      } else if(role === 'Student'){

      }

    } catch (err) {
      console.log(err)
    }

  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0, 73, 159, 1)', 'rgba(176, 67, 5, 0.84)']}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <View style={styles.textinput_search}>
          <TextInput
            style={styles.text_input1}
            placeholder="Institution Code"
            mode="outlined"
            onChangeText={(code) => setInstitutionCode(code)}
          />
          <IconButton
            icon="magnify"
            color="white"
            size={40}
            onPress={() => console.log('Pressed')}
            style={styles.search_icon}
          />
        </View>

        <TextInput
          style={styles.text_input}
          placeholder="Email or Username"
          mode="outlined"
          onChangeText={(username) => setUsername(username)}
        />
        <TextInput
          style={styles.text_input}
          placeholder="Password"
          mode="outlined"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <Button
          style={styles.button}
          // onPress={() => navigation.navigate('Teacher Dashboard')}
          labelStyle={{ color: 'white' }}
          uppercase={false}
          onPress={handleSubmit}
          mode="contained">
          Login
        </Button>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  linearGradient: {
    justifyContent: 'center',
    borderRadius: 5,
    height: '100%',
    width: '100%',
    padding: 40,
  },
  text_input: {
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(249, 249, 249, 1)',
    height: 50,
    fontSize: 16,
    minWidth: 171,
  },
  text_input1: {
    paddingHorizontal: 20,
    height: 50,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(249, 249, 249, 1)',
    width: 171,
  },
  textinput_search: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  search_icon: { padding: 0, margin: 0, alignSelf: 'flex-end' },
  button: {
    backgroundColor: 'rgba(80, 80, 105, 1)',
    alignSelf: 'flex-end',
    marginTop: 10,
    color: 'white',
    padding: 7,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
});