import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Searchbar, IconButton} from 'react-native-paper';

import {useDispatch} from 'react-redux';

// helpers
import post from '../../src/services/helpers/request/post';
import get from '../../src/services/helpers/request/get';
import write from '../../src/services/localstorage/write';
import read from '../../src/services/localstorage/read';

// redux
import {USERINFO} from '../../src/reducers/actionType';

// loading screen
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';

export default function Login({navigation}) {
  const [institutionCode, setInstitutionCode] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();

  // loading screen
  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen();

  useEffect(async () => {
    setLoadingScreen();
    // check for token from local storage
    try {
      let t = await read('token');
      let r = await read('role');

      if (t && r) {
        //get details
        const slug_info = '/admin';
        const response_info = await get('/admin', t);
        dispatch({
          type: USERINFO,
          userInfo: response_info,
        });

        let role = response_info.role;
        await write('role', role);

        if (role === 'admin') {
          navigation.replace('Admin Dashboard');
        }
      }
    } catch (err) {
      alert('Cannot Login !!');
    }
    hideLoadingScreen();
  }, []);

  const handleSubmit = async () => {
    setLoadingScreen();
    try {
      const slug = '/admin/login';

      // data for post request
      let data = {
        email: email,
        password: password,
      };

      // post request
      const response = await post(slug, data);
      console.log(response);

      try {
        await write('token', response.token);
        if (response.token !== null) {
          //get details
          const slug_info = '/admin';
          const response_info = await get('/admin', response.token);
          dispatch({
            type: USERINFO,
            userInfo: response_info,
          });

          let role = response_info.role;
          await write('role', role);

          if (role === 'admin') {
            navigation.replace('Admin Dashboard');
          } else {
            alert('Enter Valid Credentials');
          }
        }
      } catch (err) {
        alert('Cannot save token to local storage');
      }
    } catch (err) {
      console.log(err);
    }
    hideLoadingScreen();
  };

  return (
    <View style={styles.container}>
      {loadingScreen}
      <LinearGradient
        colors={['rgba(0, 73, 159, 1)', 'rgba(176, 67, 5, 0.84)']}
        style={styles.linearGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={styles.logoStyle}>
          <Image source={require('../../assets/bootsplash_logo.png')} />
        </View>
        <View style={styles.textinput_search}>
          <TextInput
            style={styles.text_input1}
            placeholder="Institution Code"
            placeholderTextColor="grey"
            mode="outlined"
            onChangeText={code => setInstitutionCode(code)}
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
          placeholderTextColor="grey"
          mode="outlined"
          onChangeText={email => setemail(email)}
        />
        <TextInput
          style={styles.text_input}
          placeholder="Password"
          placeholderTextColor="grey"
          mode="outlined"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
          onSubmitEditing={handleSubmit}
        />
        <Button
          style={styles.button}
          // onPress={() => navigation.navigate('Teacher Dashboard')}
          labelStyle={{color: 'white'}}
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
    height: '100%',
    width: '100%',
    padding: 40,
  },
  logoStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingBottom: 30,
  },
  text_input: {
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    color: 'black',
    backgroundColor: 'rgba(249, 249, 249, 1)',
    height: 50,
    fontSize: 16,
    minWidth: 171,
  },
  text_input1: {
    paddingHorizontal: 20,
    height: 50,
    color: 'black',
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(249, 249, 249, 1)',
    width: 171,
  },
  textinput_search: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    color: 'black',
  },
  search_icon: {padding: 0, margin: 0, alignSelf: 'flex-end'},
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
