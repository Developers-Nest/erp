import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
} from 'react-native-paper';

//icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

// redux
import {useSelector} from 'react-redux';

export default function Profile({navigation}) {
  const userInfo = useSelector(state => state.userInfo);

  //theming
  const institute = useSelector(state => state.institute);

  return (
    <View style={styles.container}>
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
      <ScrollView>
        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          <Avatar.Text size={100} label={userInfo.firstName[0]} />
        </View>

        <View style={styles.textFields}>
          <View style={styles.input}>
            <FontAwesome5
              name="user-alt"
              style={{
                color: institute ? institute.themeColor : 'black',
                fontSize: 22,
                marginRight: 10,
              }}
            />
            <Text style={styles.inputField}>Name: </Text>
            <Text style={styles.inputValue}>{userInfo.firstName}</Text>
          </View>

          <View style={styles.input}>
            <FontAwesome5
              name="building"
              style={{
                color: institute ? institute.themeColor : 'black',
                fontSize: 22,
                marginRight: 10,
              }}
            />
            <Text style={styles.inputField}>Department: </Text>
            <Text style={styles.inputValue}>{userInfo.departmentName}</Text>
          </View>

          <View style={styles.input}>
            <FontAwesome5
              name="user-check"
              style={{
                color: institute ? institute.themeColor : 'black',
                fontSize: 22,
                marginRight: 10,
              }}
            />
            <Text style={styles.inputField}>Designation: </Text>
            <Text style={styles.inputValue}>{userInfo.designationName}</Text>
          </View>

          <View style={styles.input}>
            <FontAwesome5
              name="id-badge"
              style={{
                color: institute ? institute.themeColor : 'black',
                fontSize: 22,
                marginRight: 10,
              }}
            />
            <Text style={styles.inputField}>Employee Code: </Text>
            <Text style={styles.inputValue}>{userInfo.code}</Text>
          </View>

          <View style={styles.input}>
            <FontAwesome5
              name="user-tag"
              style={{
                color: institute ? institute.themeColor : 'black',
                fontSize: 22,
                marginRight: 10,
              }}
            />
            <Text style={styles.inputField}>Role: </Text>
            <Text style={styles.inputValue}>{userInfo.permRole.name}</Text>
          </View>

          <View style={styles.input}>
            <FontAwesome5
              name="mobile-alt"
              style={{
                color: institute ? institute.themeColor : 'black',
                fontSize: 22,
                marginRight: 10,
              }}
            />
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
    backgroundColor: 'rgba(249, 249, 249, 1)',
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
    flexDirection: 'row',
  },
  textFields: {
    margin: 20,
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  inputField: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  inputValue: {
    fontSize: 18,
  },
});
