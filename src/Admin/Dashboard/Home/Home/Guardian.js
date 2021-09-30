import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
} from 'react-native';

//selector
import ModalSelector from 'react-native-modal-selector';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// helpers
import get from '../../../../services/helpers/request/get';
import read from '../../../../services/localstorage/read';

// redux
import { useSelector } from 'react-redux';

// loading screen
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

export default function Guardian({ navigation }) {
  //guardian list
  const [Guardians, setGuardians] = useState([]);

  //for search
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  //on load
  useEffect(async () => {
    showLoadingScreen();
    try {
      let token = await read('token');
      let slug = `/guardian`;
      let res = await get(slug, token);
      setGuardians(res);
      console.log(res);
    } catch (err) {
      alert('Cannot fetch guardians!!');
    }
    hideLoadingScreen();
  }, []);

  //theming
  const institute = useSelector(state => state.institute);

  //loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  return (
    <View style={styles.container}>
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : '#FF5733',
          ...styles.header,
        }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Students');
            }}>
            <AntDesign
              size={24}
              color="white"
              name="left"
              style={{
                alignSelf: 'center',
                fontSize: 25,
                color: 'white',
              }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontStyle: 'normal',
            fontFamily: 'NunitoSans-Regular',
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 20,
            color: 'white',
          }}>
          Guardian
        </Text>
      </View>

      {/* Modal Selector */}
      {/* <View style={styles.ModalContainer}>
        <ModalSelector
          initValue="Batch"
          style={styles.card_picker}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}></ModalSelector>
        <ModalSelector
          initValue="Courses"
          style={styles.card_picker}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}></ModalSelector>
      </View> */}

      {/* {modal selector ends} */}

      {/* Search bar */}
      <View style={styles.search}>
        <TextInput
          style={{ ...styles.search_input }}
          placeholder="Enter Guardian's name Here"
          placeholderTextColor="grey"
          defaultValue={searchText}
          textContentType='name'
          onChangeText={(text) => {
            setSearchText(text);
            if (text === '') {
              return setFilteredUsers([]);
            }
            const filtered_users = Guardians.filter((guardian) =>
              guardian.student.firstName.toLowerCase().startsWith(text.toLowerCase())
            );
            setFilteredUsers(filtered_users);
          }}
          returnKeyType='search'
        />
        {searchText.length === 0 ? (
          <TouchableOpacity
            style={{
              alignSelf: 'center',
            }}>
            <FontAwesome5Icon
              name="search"
              style={{
                alignSelf: 'center',
                fontSize: 30,
                color: 'black',
              }}
            />
          </TouchableOpacity>

        ) : (
          <TouchableOpacity
            onPress={() => {
              setSearchText('');
              setFilteredUsers([]);
            }}
            style={{
              alignSelf: 'center',
            }}
          >
            <MaterialIcon name='cancel'
              style={{
                alignSelf: 'center',
                fontSize: 24,
                color: '#505069',
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* searchbar ends */}

      {/* Student section */}
      {filteredUsers.length > 0 ?
        (
          <ScrollView>
            {Guardians &&
              filteredUsers.map(guardian => (
                <View style={styles.StudentsCard} key={guardian._id}>
                  <View style={{ margin: 10, flexDirection: 'column' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18 }}>
                      {guardian.student.firstName + ' ' + guardian.student.lastName}
                    </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18 }}>
                      {guardian.name}
                    </Text>
                    <View
                      style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}>
                        {guardian.email}
                      </Text>
                      <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}>
                        {guardian.relation}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            <View style={{ height: 10 }} />
          </ScrollView>
        ) : (
          <ScrollView>
            {Guardians &&
              Guardians.map(guardian => (
                <View style={styles.StudentsCard} key={guardian._id}>
                  <View style={{ margin: 10, flexDirection: 'column' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18 }}>
                      {guardian.student.firstName + ' ' + guardian.student.lastName}
                    </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18 }}>
                      {guardian.name}
                    </Text>
                    <View
                      style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}>
                        {guardian.email}
                      </Text>
                      <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}>
                        {guardian.relation}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            <View style={{ height: 10 }} />
          </ScrollView>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(249, 249, 249, 1)',
    flex: 1,
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
  ModalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 20,
    paddingTop: 3,
    color: '#211C5A',
  },

  card_picker: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 0,
    borderRadius: 0.5,
    overflow: 'hidden',
    justifyContent: 'center',
    minWidth: 110,
    elevation: 3,
  },
  search: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderColor: '#00499F',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 0.3,
  },
  search_input: {
    borderRadius: 8,
    height: 59,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    width: '90%',
    color: 'black',
  },
  StudentsCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 12,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    padding: 0,

    elevation: 5,
  },
});
