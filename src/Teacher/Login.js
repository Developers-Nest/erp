import React from 'react';
import {View, StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {Button, Searchbar, IconButton, TextInput} from 'react-native-paper';

export default function App({navigation}) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0, 73, 159, 1)', 'rgba(176, 67, 5, 0.84)']}
        style={styles.linearGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={styles.text_search}>
          <TextInput
            style={styles.text_input1}
            label="Institution Code"
            mode="outlined"
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
          label="Email or Username"
          mode="outlined"
        />
        <TextInput style={styles.text_input} label="Password" mode="outlined" />
        <Button
          style={styles.button}
          labelStyle={{color: 'white'}}
          onPress={() => navigation.navigate('Teacher Dashboard')}>
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
    padding: 0,
    margin: 0,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(249, 249, 249, 1)',
    height: 50,
    minWidth: 171,
  },
  text_input1: {
    padding: 0,
    margin: 0,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(249, 249, 249, 1)',
    height: 50,
    width: 171,
  },
  text_search: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  search_icon: {padding: 0, margin: 0, alignSelf: 'flex-end'},
  button: {
    backgroundColor: 'rgba(80, 80, 105, 1)',
    width: 118,
    height: 50,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});
