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

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  event,
  onChange,
  setValue,
  target,
  value,
} from 'react-native-reanimated';
import {Searchbar, Button, Appbar} from 'react-native-paper';

export default function ContentLibrary({navigation}) {
  const [activeTab, setActiveTab] = React.useState('Material');

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  function switchTab() {
    if (activeTab === 'Videos') {
      setActiveTab('Material');
    } else {
      setActiveTab('Videos');
    }
  }
  function Material() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 20,
                    color: '#211C5A',
                  }}>
                  Title
                </Text>
                <Button>
                  edit
                  <FontAwesome5 name={'edit'} size={20} light />
                </Button>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 16, color: 'blue'}}>
                  course and Batch
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 16}}>
                  Exams will be conducted via online mode in the upcoming week
                  and these are the notes for it so go through them and study
                  well
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.hey}>
                <Text style={{fontSize: 16, marginRight: 100}}>
                  Teacher's Name
                </Text>

                <Button
                  styles={{flexDirection: 'flex-end'}}
                  mode="contained"
                  onPress={() => console.log('Pressed')}>
                  Send
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function Videos() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 20,
                    color: '#211C5A',
                  }}>
                  Title
                </Text>
                <Button>
                  edit
                  <FontAwesome5 name={'edit'} size={20} light />
                </Button>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 16, color: 'blue'}}>
                  course and Batch
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 16}}>
                  Exams will be conducted via online mode in the upcoming week
                  and these are the notes for it so go through them and study
                  well
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.hey}>
                <Text style={{fontSize: 16, marginRight: 100}}>
                  Teacher's Name
                </Text>
                <Button
                  styles={{flexDirection: 'flex-end'}}
                  mode="contained"
                  onPress={() => console.log('Pressed')}>
                  Send
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <Appbar>
          <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
          <Appbar.Content title="Content Library" />
          <Appbar.Action icon="plus-circle-outline" />
        </Appbar>
        <View style={styles.maincontainer}>
          <View
            style={{
              width: '90%',
              marginLeft: 25,
              marginBottom: 10,
              marginTop: 30,
              justifyContent: 'flex-start',
            }}>
            <Searchbar
              placeholder="Enter subject or batch name"
              onChangeText={onChangeSearch}
              value={searchQuery}
              //   containerStyle={{
              //     width: '60%',
              //     marginTop: 20,
              //     marginHorizontal: 70,
              //   }}
            />
          </View>
          <View style={styles.switchTabsView}>
            <TouchableOpacity
              style={{
                // flex: 1,
                borderBottomWidth: activeTab == 'Material' ? 2 : 0,
                borderBottomColor: 'black',
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => switchTab()}>
              <Text style={styles.switchText}>Material</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                // flex: 1,
                borderBottomWidth: activeTab == 'Videos' ? 2 : 0,
                borderBottomColor: 'black',
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => switchTab()}>
              <Text style={styles.switchText}>Videos</Text>
            </TouchableOpacity>
          </View>
          {activeTab === 'Material' ? <Material /> : <Videos />}
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
