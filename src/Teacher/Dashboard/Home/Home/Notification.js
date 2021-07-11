import * as React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-paper';

import Notifications from './Notification/Notifications';
import Circulars from './Notification/Circulars';

export default function Notify({navigation}) {
  // const [activeTab, setActiveTab] = React.useState('Notification');
  const [showContent, setshowContent] = React.useState('Notification');
  // const [searchQuery, setSearchQuery] = React.useState('');
  // const onChangeSearch = query => setSearchQuery(query);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <FontAwesome5
              name="chevron-left"
              style={{
                alignSelf: 'center',
                fontSize: 25,
                color: 'black',
                paddingLeft: 20,
                paddingTop: 20,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontStyle: 'normal',
              fontSize: 28,
              fontFamily: 'NunitoSans-Light',
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
            }}>
            {showContent === 'Circular' ? 'Circular' : 'Notification'}
          </Text>
        </View>
        <View style={styles.switchTabsView}>
          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Notification' ? 3 : 0,
              borderBottomColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setshowContent('Notification')}>
            <Text style={styles.switchText}>Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Circular' ? 3 : 0,
              borderBottomColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setshowContent('Circular')}>
            <Text style={styles.switchText}>Circular</Text>
          </TouchableOpacity>
        </View>
        {showContent === 'Circular' ? <Circulars /> : <Notifications />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#333',
  },

  switchTabsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginTop: 20,
  },

  switchText: {
    fontSize: 14,
    color: 'black',
    paddingHorizontal: 9,
    paddingVertical: 2,
    fontFamily: 'Poppins',
    fontWeight: '600',
    height: 21,
  },

  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },

  header: {
    height: 69,
    backgroundColor: 'white',
    flexDirection: 'row',
  },

  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
});
