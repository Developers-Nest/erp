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

  const userInfo = useSelector((state) => state.userInfo)

  console.log("Profile.js ", userInfo)


  return (
    <View style={styles.container}>
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
      <ScrollView>
      <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <Avatar.Text size={100} label={userInfo.firstName[0]} />
      </View>

      <View style={styles.textFields}>
        <View style={styles.input}>
          <Text style={styles.inputField}>Name: </Text>
          <Text style={styles.inputValue}>{userInfo.firstName}</Text>
        </View>

        <View style={styles.input}>
          <Text style={styles.inputField}>Department: </Text>
          <Text style={styles.inputValue}>{userInfo.departmentName}</Text>
        </View>

        <View style={styles.input}>
          <Text style={styles.inputField}>Designation: </Text>
          <Text style={styles.inputValue}>{userInfo.designationName}</Text>
        </View>

        <View style={styles.input}>
          <Text style={styles.inputField}>Employee Code: </Text>
          <Text style={styles.inputValue}>{userInfo.code}</Text>
        </View>

        <View style={styles.input}>
          <Text style={styles.inputField}>Role: </Text>
          <Text style={styles.inputValue}>{userInfo.permRole.name}</Text>
        </View>

        <View style={styles.input}>
          <Text style={styles.inputField}>Mobile: </Text>
          <Text style={styles.inputValue}>{userInfo.mobile}</Text>
        </View>
      </View>
      </ScrollView>
    </View>
    // bottom navigation
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
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
  textFields: {
    margin: 20
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10
  },
  inputField: {
    fontWeight: 'bold',
    fontSize: 18
  },

});