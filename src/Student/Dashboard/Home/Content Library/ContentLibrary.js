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
  
  const[setContent,setShowContent]=React.useState('Materials');
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
                  Chapter Name
                </Text>
                <Button>
                  <FontAwesome5 name={'file-alt'} size={20} light />
                </Button>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, color: 'black'}}>Title</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 16, paddingRight: 100}}>
                  Exams will be conducted via online mode and students are
                  required to maintain the.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.hey}>
                <Text style={{fontSize: 16, marginRight: 100}}>
                  Abhinav Chikkara
                </Text>

                <View>
                  <Text>21 May,2021</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
                  Chapter Name
                </Text>
                <Button>
                  <FontAwesome5 name={'image'} size={20} light />
                </Button>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, color: 'black'}}>Subject</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 16, paddingRight: 100}}>
                  Exams will be conducted via online mode and students are
                  required to maintain the.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.hey}>
                <Text style={{fontSize: 16, marginRight: 100}}>
                  Abhinav Chikkara
                </Text>

                <View>
                  <Text>21 May,2021</Text>
                </View>
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
                  Chapter Name
                </Text>
                <Button>
                  <FontAwesome5 name={'file-alt'} size={20} light />
                </Button>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, color: 'black'}}>Title</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 16, paddingRight: 100}}>
                  Exams will be conducted via online mode and students are
                  required to maintain the.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.hey}>
                <Text style={{fontSize: 16, marginRight: 100}}>
                  Abhinav Chikkara
                </Text>

                <View>
                  <Text>21 May,2021</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

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
                  Chapter Name
                </Text>
                <Button>
                  <FontAwesome5 name={'image'} size={20} light />
                </Button>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, color: 'black'}}>Subject</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 16, paddingRight: 100}}>
                  Exams will be conducted via online mode and students are
                  required to maintain the.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.hey}>
                <Text style={{fontSize: 16, marginRight: 100}}>
                  Abhinav Chikkara
                </Text>

                <View>
                  <Text>21 May,2021</Text>
                </View>
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
          <Appbar.BackAction onPress={() => {navigation.goBack();}} />
          <Appbar.Content title="Content Library" />
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
              placeholder="Enter subject or topic name"
              onChangeText={onChangeSearch}
              value={searchQuery}
              containerStyle={{
                width: '60%',
                marginTop: 20,
                marginHorizontal: 70,
              }}
            />
          </View>
          <View style={styles.switchTabsView}>
            <TouchableOpacity
              style={{
                borderBottomWidth: setContent == 'Material' ? 2 : 0,
                borderBottomColor: 'black',
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowContent('Material')}>
              <Text style={styles.switchText}>Material</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: setContent == 'Videos' ? 2 : 0,
                borderBottomColor: 'black',
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowContent('Videos')}>
              <Text style={styles.switchText}>Videos</Text>
            </TouchableOpacity>
          </View>
          {setContent === 'Material' ? <Material /> : <Videos />}
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