// import React from 'react';
// import {View} from 'react-native';

// import {Text} from 'react-native-paper';

// export default function App({navigation}) {
//   return (
//     <View>
//       <Text>Books Screen Teacher</Text>
//     </View>
//   );
// }

import * as React from 'react';
import {TextInput} from 'react-native-paper';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {
  event,
  onChange,
  setValue,
  target,
  value,
} from 'react-native-reanimated';
import {Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

export default function IssuedBooksScreen1() {
  const [activeTab, setActiveTab] = React.useState('Due');

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  function switchTab() {
    if (activeTab === 'Cleared') {
      setActiveTab('Due');
    } else {
      setActiveTab('Cleared');
    }
  }
  function Due() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <TouchableOpacity style={styles.differentusers}>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      fontSize: 18,
                      color: '#211C5A',
                    }}>
                    {' '}
                    Title
                  </Text>

                  <Text style={{fontSize: 10, color: '#505069'}}>
                    ID:45321440
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#58626C'}}>
                    Issued: 21May,2021
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12, color: '#58636D'}}>
                      {' '}
                      Due: 21Sept,2021
                    </Text>
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
                      fontSize: 18,
                      color: '#211C5A',
                    }}>
                    {' '}
                    Title
                  </Text>

                  <Text style={{fontSize: 10, color: '#505069'}}>
                    ID:45321440
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#58626C'}}>
                    Issued: 21May,2021
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12, color: '#58636D'}}>
                      {' '}
                      Due: 21Sept,2021
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  function Cleared() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <TouchableOpacity style={styles.differentusers}>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      fontSize: 18,
                      color: '#211C5A',
                    }}>
                    {' '}
                    Title
                  </Text>

                  <Text style={{fontSize: 10, color: '#505069'}}>
                    ID:45321440
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#58626C'}}>
                    Issued: 21May,2021
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12, color: '#58636D'}}>
                      {' '}
                      Due: 21Sept,2021
                    </Text>
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
                      fontSize: 18,
                      color: '#211C5A',
                    }}>
                    {' '}
                    Title
                  </Text>

                  <Text style={{fontSize: 10, color: '#505069'}}>
                    ID:45321440
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#58626C'}}>
                    Issued: 21May,2021
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12, color: '#58636D'}}>
                      {' '}
                      Due: 21Sept,2021
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.maincontainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {}}>
            <Icon
              size={24}
              color="white"
              name="left"
              style={{
                alignSelf: 'center',
                fontSize: 25,
                color: 'white',
                paddingLeft: 20,
                paddingTop: 20,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontStyle: 'normal',
              fontSize: 28,
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
              color: 'white',
            }}>
            Issued Books
          </Text>
        </View>

        <View
          style={{
            width: '90%',
            marginLeft: 25,
            marginBottom: 20,
            marginTop: 20,
          }}>
          {/* open search */}
          <View
            style={{
              marginLeft: 0,
            }}>
            <View style={{marginTop: 10, ...styles.card}}>
              <TextInput
                right={<TextInput.Icon name="magnify" />}
                theme={{
                  colors: {
                    primary: '#999',
                    underlineColor: 'transparent',
                    background: 'white',
                  },
                }}
                placeholder="Enter book name or ID here"
                outlineColor="transparent"
                styles={{
                  margin: 10,
                  padding: 10,
                  backgroundColor: 'white',
                }}
                mode="outline"
              />
            </View>
          </View>
          {/* close search */}
        </View>
        <View style={styles.switchTabsView}>
          <TouchableOpacity
            style={{
              borderBottomWidth: activeTab == 'Due' ? 2 : 0,
              borderBottomColor: '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => switchTab()}>
            <Text style={styles.switchText}>Due</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderBottomWidth: activeTab == 'Cleared' ? 2 : 0,
              borderBottomColor: '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => switchTab()}>
            <Text style={styles.switchText}>Cleared</Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'Due' ? <Due /> : <Cleared />}
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
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userstext: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '300',
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
  },
  search: {
    backgroundColor: 'white',
    color: 'black',
  },
  switchTabsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  switchText: {
    fontSize: 14,
    color: '#58636D',
    paddingHorizontal: 5,
  },
  maincontainer: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  card: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    minWidth: '30%',
  },
  header: {
    height: 65,
    marginTop: -10,
    backgroundColor: 'rgba(0, 73, 159, 1)',
    flexDirection: 'row',
  },
});
