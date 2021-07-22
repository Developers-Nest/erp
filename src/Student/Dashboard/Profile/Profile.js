import React, {useState} from 'react';
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

//icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MySearchbar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  //theming
  const institute = useSelector(state => state.institute);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};
export default function Profile({navigation}) {
  return (
    <View style={{backgroundColor: '#E5E5E5', height: '100%'}}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <AntDesign
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
              color: 'white',
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
      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <Avatar.Text size={100} label="BS" />
      </View>
      <View
        style={{
          paddingTop: '10%',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View style={{width: '60%', backgroundColor: 'white'}}>
          <TextInput placeholder="Name" />
        </View>
        <View style={{paddingLeft: '5%'}} />
        <View style={{width: '30%', backgroundColor: 'white'}}>
          <TextInput secureTextEntry={true} placeholder="Class" />
        </View>
      </View>
      <View
        style={{
          paddingTop: '5%',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View style={{width: '45%', backgroundColor: 'white'}}>
          <TextInput placeholder="Contact no." />
        </View>
        <View style={{paddingLeft: '5%'}} />
        <View style={{width: '45%', backgroundColor: 'white'}}>
          <TextInput secureTextEntry={true} placeholder="Date" />
        </View>
      </View>
      <View
        style={{
          paddingTop: '5%',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View style={{width: '95%', backgroundColor: 'white'}}>
          <TextInput placeholder="Hostel Details" />
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
    flexDirection: 'row',
  },
});
