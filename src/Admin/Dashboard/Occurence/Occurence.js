import React, {useState, useEffect} from 'react';
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

import {createStackNavigator} from '@react-navigation/stack';

// loading screen
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

// helpers
import get from '../../../services/helpers/request/get';
import read from '../../../services/localstorage/read';
import getCourse from '../../../services/helpers/getList/getCourse';
import getBatch from '../../../services/helpers/getList/getBatch';

// redux
import {useSelector} from 'react-redux';

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

export default function Occurence({navigation}) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Occurence" component={Occurance} />
      <Stack.Screen name="OccurenceEdit" component={OccurenceEdit} />
      <Stack.Screen name="Occurence2" component={Occurence2} />
    </Stack.Navigator>
  );
}

function Occurance({navigation}) {
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(0, 15);
  };

  const [list, setlist] = useState([]);
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  const userInfo = useSelector(state => state.userInfo);
  const institute = useSelector(state => state.institute);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  //fetch list
  useEffect(async () => {
    showLoadingScreen();
    try {
      let slug = `/occurrence`;
      let token = await read('token');
      let response = await get(slug, token);
      console.log('Response ', response);
      setlist(response);
    } catch (err) {
      alert('Cannot fetch your Live Classes !!\n');
    }
    hideLoadingScreen();
  }, []);

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Occurence Register" />
        <Appbar.Action
          icon="plus-circle-outline"
          onPress={() => navigation.navigate('Occurence2')}
        />
      </Appbar>
      <View
        style={{
          width: '90%',
          marginLeft: 25,
          marginBottom: 10,
          marginTop: 30,
          justifyContent: 'flex-start',
        }}></View>
      <Searchbar
        placeholder="Enter subject or batch name"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <ScrollView style={styles.container}>
        {list &&
          list.map(occurance => (
            <View style={styles.section} key={occurance._id}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <TouchableOpacity style={styles.differentusers}>
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 20,
                        color: '#211C5A',
                      }}>
                      {occurance.employeeName.firstName}
                    </Text>
                    <Button
                      onPress={() =>
                        navigation.navigate('OccurenceEdit', {
                          id: occurance._id,
                          employeeID: occurance.employeeName._id,
                          employeeName: occurance.employeeName.firstName,
                          date: occurance.date,
                          remarks: occurance.remarks,
                          institution: occurance.institution,
                          v: occurance.__v,
                        })
                      }>
                      edit <FontAwesome5 name={'edit'} size={20} light />
                    </Button>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.differentusers}>
                    <Text style={{fontSize: 16, color: 'blue'}}>
                      {parseDate(occurance.date)}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('Occurence2')}
                    style={styles.differentusers}>
                    <Text style={{fontSize: 16}}>{occurance.remarks}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
    </>
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
