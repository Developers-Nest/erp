import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,TextInput,Modal
} from 'react-native';
import {
  Avatar,Button
} from 'react-native-paper';

//icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import read from '../../../services/localstorage/read';
import patch from '../../../services/helpers/request/patch';
import LoaderHook from '../../../components/LoadingScreen/LoadingScreen';

// redux
import {useSelector} from 'react-redux';

export default function Profile({navigation}) {
  const userInfo = useSelector(state => state.userInfo);

  //theming
  const institute = useSelector(state => state.institute);

  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

  const [modalVisible, setModalVisible] = useState(false);


  const [uemail, setUemail] = useState(null)
  const [ufirstName, setUfirstName] = useState(null)
  const [ulastName, setULastName] = useState(null)
  const [upaddress, setUpAddress] = useState(null)

  useEffect(()=>{
    setUemail(userInfo.email)
    setUfirstName(userInfo.firstName)
    setULastName(userInfo.lastName)
    setUpAddress(userInfo.permanentAddress)
  },[])


  let updateProfile = async()=>{
    setLoadingScreen()
    setModalVisible(!modalVisible)
    try{
      let slug = '/user'
      let token = await read('token')
      let data = {
        email: uemail,
        firstName: ufirstName,
        lastName: ulastName,
        presentAddress: upaddress
      }
      console.log('Update Profile Data ', data)
      let response = await patch(slug, data, token)
      console.log('Profile Update Response ', response)
      if(response){
        alert('Profile Updated!!')
      } else throw new Error('Some Error occured!!')
    } catch(err){
      alert('Cannot Update '+err)
    }
    hideLoadingScreen()
  }

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

        <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={{marginTop:20}}>Enter Email</Text>
          <ScrollView>
          <TextInput placeholder={userInfo.email}
                                   value={uemail} style={styles.textInput} 
                                   onChangeText={(value) => setUemail(value)} />
           <Text style={{marginTop:20}}>First Name</Text>
            <TextInput placeholder={userInfo.firstName} 
                                   value={ufirstName} style={styles.textInput} 
                                   onChangeText={(value) => setUfirstName(value)} />
             <Text style={{marginTop:20}}>Last Name</Text>
            <TextInput placeholder={userInfo.lastName}
                                   value={ulastName} style={styles.textInput} 
                                   onChangeText={(value) => setULastName(value)} />
             <Text style={{marginTop:20}}>Present Address</Text>
            <TextInput placeholder={userInfo.presentAddress} 
                                   value={upaddress} style={styles.textInput} 
                                   onChangeText={(value) => setUpAddress(value)} />
            </ScrollView>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:20}}>
            <Button mode="outlined"  color={ institute?institute.themeColor : "red"} onPress={() => setModalVisible(!modalVisible)}>Cancel</Button>
            <Button mode="contained" color={ institute?institute.themeColor : "blue"} onPress={updateProfile}  >Save</Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    <View style={{flexDirection:'row',justifyContent:'flex-end',marginEnd:30}}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Text>
      Edit Profile 
      &nbsp;
      <FontAwesome5
              name="edit"
              size={20}
              color={institute? institute.themeColor : 'rgba(62, 104, 228, 0.9)'}
            />
            </Text>
      </TouchableOpacity>
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
            <Text style={styles.inputField}>Course: </Text>
            <Text style={styles.inputValue}>{userInfo.courseName}</Text>
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
            <Text style={styles.inputField}>Batch: </Text>
            <Text style={styles.inputValue}>{userInfo.batchName}</Text>
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
            <Text style={styles.inputField}>Code: </Text>
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
            <Text style={styles.inputValue}>{userInfo.phone}</Text>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:'90%'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  textInput: {
    width: "100%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
    color: 'black'},
});
