import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {Container, Content, List, ListItem, Header, Icon} from 'native-base';

import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  event,
  onChange,
  setValue,
  target,
  value,
} from 'react-native-reanimated';
import {Searchbar, Button, Appbar} from 'react-native-paper';
import OccurenceEdit from './OccurenceEdit';
import Occurence2 from './Occurence2';

export default function Occurence({nav}) {

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  function Material({navigation}) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <>
         <View
            style={{
              width: '90%',
              marginLeft: 25,
              marginBottom: 10,
              marginTop: 30,
              justifyContent: 'flex-start',
            }}>
          </View>
        <Searchbar
        placeholder="Enter subject or batch name"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity
              style={styles.differentusers}>
                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 20,
                    color: '#211C5A',
                  }}>
                  Title
                </Text>
                <Button 
              onPress={
                  ()=>navigation.navigate('OccurenceEdit')
              }>
                  edit{' '}
                  <FontAwesome5 name={'edit'} size={20} light />
                </Button>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 16, color: 'blue'}}>
                  19 July, 2021
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
              onPress={
                  ()=>navigation.navigate('Occurence2')
              } style={styles.differentusers}>
                <Text style={{fontSize: 16}}>
                  Exams will be conducted via online mode in the upcoming week
                  and these are the notes for it so go through them and study
                  well
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </>
    );
  }

  function Videos({navigation}) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <Appbar>
          <Appbar.BackAction 
        //   onPress={() => navigation.navigate('Home')} 
          />
          <Appbar.Content title="Occurence Register" />
          <Appbar.Action icon="plus-circle-outline" />
        </Appbar>

        <View style={styles.maincontainer}>
    <Stack.Navigator headerMode="none">
    <Stack.Screen name="Occurence" component={Material} />
    <Stack.Screen name="OccurenceEdit" component={OccurenceEdit} />
    <Stack.Screen name="Occurence2" component={Occurence2} />
  </Stack.Navigator>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 2,
    marginTop: 14,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#333',
  },
  userinhostels: {
    marginTop: 10,
  },
  hey: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderTopWidth: 1,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  userstext: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '300',
  },

  search: {
    backgroundColor: 'white',
    color: 'black',
  },
  switchTabsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  switchText: {
    fontSize: 20,
    color: 'black',
    paddingHorizontal: 5,
  },
  maincontainer: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
});
