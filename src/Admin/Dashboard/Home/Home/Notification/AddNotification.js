import * as React from 'react';
import {Button,TextInput} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

// redux
// import {useSelector} from 'react-redux';

import ModalSelector from 'react-native-modal-selector';
import { color } from 'react-native-elements/dist/helpers';

export default function Report({navigation}) {
  //theming
//   const institute = useSelector(state => state.institute);
  const [Description, setDescription] = React.useState('');
  const [text, setText] = React.useState('');
  return (
    <View style={styles.container}>
      <View
        style={{
        //   backgroundColor: institute ? institute.themeColor : 'black',
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
        <Text
          style={{
            fontStyle: 'normal',
            fontFamily: 'NunitoSans-Regular',
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
            color: 'white',
          }}>
          Add Notification
        </Text>
      </View>
      
      <Text style={{marginLeft:20,fontFamily:'Poppins-Regular'}}>Title</Text>
      <View style={styles.titleInput}>    
      <TextInput
      placeholder="Enter Title"
      multiline={true}
      value={text}
      onChangeText={text => setText(text)}
      placeholderTextColor={'grey'}
      mode={'flat'}
      style={{...styles.text_input}}
      
    />

      </View>
       
      <Text style={{marginLeft:20,fontFamily:'Poppins-Regular',marginTop:10}}>Messages</Text>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            width: '90%',
            marginTop:0,
            alignSelf: 'center',
            ...styles.shadow,
          }}>
           
          <TextInput
            multiline
            // mode='outlined'
            placeholder="Write down your problems here.."
            numberOfLines={10}
            value={Description}
            onChangeText={Description => {
              setDescription(Description);
            }}
            placeholderTextColor={'grey'}
            style={{...styles.text_input}}
          />
        </View>
      </TouchableWithoutFeedback>

      <View style={{margin: 20}} >
        <Text style={{fontFamily:'Poppins-Regular',}}>Usertype</Text>
        <ModalSelector 
            // data={courses}
            // initValue="Course"
            // onChange={option => {
            //   getBatches(option.key);
            // }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
           
          />
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:20}}>
      <Button
        
        onPress={() => Alert.alert('Report Submitted')}
        labelStyle={{color: 'red'}}
        // color={institute ? institute.themeColor : 'blue'}
        uppercase={false}
        color="red"
        mode="outlined">
        Delete
      </Button>
      <Button
       
        onPress={() => Alert.alert('Report Submitted')}
        labelStyle={{color: 'white'}}
        // color={institute ? institute.themeColor : 'blue'}
        uppercase={false}
        color='#5177E7'
        mode="contained">
        Save
      </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text_input: {
    backgroundColor: 'white',
    fontFamily: 'Poppins-Regular',
   
  },
  Modal:{
      borderWidth:1

  },
 titleInput:{
     marginRight:20,
     marginLeft:20,
     shadowColor: '#000',
     shadowOffset: {
       width: 0,
       height: 1,
     },
     shadowOpacity: 1.0,
     elevation: 5,
     borderRadius:8,
     padding: 1,
 },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1.0,
    elevation: 5,
    borderRadius:8,
    padding: 1,
  },

  header: {
    height: 69,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
    alignContent: 'center',
  },
  
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    paddingTop: 3,
    color: '#211C5A',
    textAlign:'left'
  },
  card_picker: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    elevation: 5,
  },
});
