import React from 'react';
import {View} from 'react-native';

import {Button, TextInput} from 'react-native-paper';

export default function App({navigation}) {
  return (
    <View>
      <TextInput label="Institution Code" />
      <TextInput label="Email or Username" />
      <TextInput label="Password" />
      <Button onPress={() => navigation.navigate('Teacher Dashboard')}>
        Login
      </Button>
    </View>
  );
}
