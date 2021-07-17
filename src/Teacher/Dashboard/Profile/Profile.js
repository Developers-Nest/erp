import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
  Avatar,
  BottomNavigation,
} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// redux
import { useSelector } from 'react-redux';

const MySearchbar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};
export default function Profile({ navigation }) {

  const userInfo = useSelector((state)=>state.userInfo)

  console.log("Profile.js ", userInfo)


  return (
    <View style={{ backgroundColor: '#E5E5E5', height: '100%' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontStyle: 'normal',
              fontSize: 28,
              fontFamily: 'NunitoSans-Light',
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
            }}>
            Profile
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 20,
        }}
      />
      <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <Avatar.Text size={100} label={userInfo.firstName[0]} />
      </View>
      <View
        style={{
          paddingTop: '10%',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View style={{ width: '60%', backgroundColor: 'white', height: '170%',}}>
          <Text>{userInfo.firstName} </Text>
        </View>
        <View style={{ paddingLeft: '5%' }} />
        <View style={{ width: '30%', backgroundColor: 'white', height: '170%' }}>
          <Text>{userInfo.qualification}</Text>
        </View>
      </View>
      <View
        style={{
          paddingTop: '8%',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View style={{ width: '45%', backgroundColor: 'white', height: '170%',borderRadius: 20}}>
          <Text>{userInfo.mobile}</Text>
        </View>
        <View style={{ paddingLeft: '5%' }} />
        <View style={{ width: '45%', backgroundColor: 'white', height: '170%' }}>
          <Text>{userInfo.dob}</Text>
        </View>
      </View>
      <View
        style={{
          paddingTop: '8%',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View style={{ width: '95%', backgroundColor: 'white', height: '170%' }}>
          <Text placeholder="Hostel Details" />
        </View>
      </View>
    </View>
    // bottom navigation
  );
}

const styles = StyleSheet.create({
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
  header: {
    height: 69,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});