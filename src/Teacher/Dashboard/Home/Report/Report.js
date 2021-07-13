import * as React from 'react';
import { TextInput,Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';


export default function Report({navigation}) {

  const [Description, setDescription] = React.useState('');
  return (
    < View style={styles.container}>

      {/* header opens */}
             <View style={styles.header}>
            <TouchableOpacity onPress={() => {navigation.goBack(); }}>
                <Icon size={24} color="white" name="left" style={{ alignSelf: 'center', fontSize: 25, color: 'white', paddingLeft: 20, paddingTop: 20 }} />
            </TouchableOpacity>
            <Text style={{ fontStyle: 'normal', fontFamily:'NunitoSans-Regular' ,fontSize: 28, fontWeight: '600', alignSelf: 'center', paddingLeft: 30, color: 'white' }}>
                Report
            </Text>
          
        </View>
{/* 
     header closed    */}
{/* open search */}
{/* <View
        style={{
          marginTop: 10,
          //make search and card in same line
          marginLeft:5,
          justifyContent: 'space-between',
          width:'95%',
         
          height:'90%',
          ...styles.shadow,
        }}>
       
        <TextInput
        multiline
          style={{width: '100%',height:'100%', ...styles.text_input}}
          placeholder="Write down your problem here"
        />
        
      </View> */}

     
      <View style={{width:'90%',marginTop:20,alignSelf:'center', ...styles.shadow}}>
      <TextInput
      multiline
      mode='outlined'
      placeholder='Write down your problems here..'
      numberOfLines={20}
      value={Description}
      onChangeText={(Description) => { setDescription(Description) }}
      style={{...styles.text_input}}                       />
     </View>
     
     <View style={{padding:20}}/>
      
          <Button
          style={styles.button}
          onPress={() => navigation.navigate('Teacher Dashboard')}
          labelStyle={{color: 'white'}}
          uppercase={false}
          mode="contained">
          Submit
        </Button>
    </View>
  );
}


const styles = StyleSheet.create({

text_input: {
  
  backgroundColor: 'white',
},


shadow: {
  
  shadowColor: '#333',
  shadowOffset: {
    width: 1,
    height: 0,
  },
  shadowOpacity: 2.0,
  elevation: 13,
 
 
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  borderTopRightRadius: 12,
  borderTopLeftRadius: 12,
  
  margin: 0,
  padding: 0,
  
},

header: {
  height: 65,
  marginTop: -10,
  backgroundColor: 'rgba(0, 73, 159, 1)',
  flexDirection: 'row',

},
container: {
  paddingTop: 10,
  flex: 1,
  backgroundColor: '#E5E5E5',
  alignContent:'center',
  
},
button: {
  backgroundColor: '#5177E7',
  alignSelf: 'flex-end',
//   marginTop: 10,
  color: '#F9F9F9',
  padding: 3,
  paddingHorizontal: 5,
  borderRadius: 5,
  marginRight:20
},

});