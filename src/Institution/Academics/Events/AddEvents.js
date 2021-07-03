import React,{useState} from 'react';
import { StyleSheet,View,Text,TextInput,TouchableOpacity,Button} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';


export default function AddEvents()
{

    const [text, setText] = React.useState(''); 
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [selectedLanguage1, setSelectedLanguage1] = useState();

  return (
    <View style={styles.container}>
    <View  style={styles.header}>
        <TouchableOpacity  onPress={()=>{}}>
        <FontAwesome5 name='chevron-left' style={{alignSelf:'center',fontSize:25,color:'blue',paddingLeft:20,paddingTop:20}}/>
        </TouchableOpacity>
        <Text style={{fontStyle:'normal',fontSize:28,fontFamily:'NunitoSans-Light',fontWeight:'600',alignSelf:'center',paddingLeft:30}}>
           Add Events
        </Text>
    </View >
    <View style={{flexDirection:'row',marginTop:3}}>
    <View style={{width:'45%',paddingLeft:15}}>
    <Text style={{paddingLeft:20,marginTop:20,color:'#58636DD9',fontSize:14,fontFamily:'Poppins-Regular',fontWeight:'400'
}}>
           Event name
        </Text>
        <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="Name"
      />
    
</View>
<View style={{width:'50%',paddingLeft:20}}>
    <Text style={{paddingLeft:20,marginTop:20,color:'#58636DD9',fontSize:14,fontFamily:'Poppins-Regular',fontWeight:'400'
}}>
        Event Type
        </Text>
    <Picker style={{}}
  selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage(itemValue)
  }>
  <Picker.Item label="Active" value="active" />
  <Picker.Item label="Not Active" value="not-active" />
</Picker>
</View>


    

</View>
<View style={{flexDirection:'row',marginTop:5}}>
    <View style={{width:'45%',paddingLeft:15}}>
    <Text style={{paddingLeft:17,marginTop:20,color:'#58636DD9',fontSize:14,fontFamily:'Poppins-Regular',fontWeight:'400'
}}>
           Organizer name
        </Text>
        <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="Name"
      />
    
</View>
<View style={{width:'50%',paddingLeft:20}}>
    <Text style={{paddingLeft:20,marginTop:20,color:'#58636DD9',fontSize:14,fontFamily:'Poppins-Regular',fontWeight:'400'
}}>
        Event for
        </Text>
    <Picker style={{}}
  selectedValue1={selectedLanguage1}
  onValueChange1={(itemValue, itemIndex) =>
    setSelectedLanguage1(itemValue)
  }>
  <Picker.Item label="Students" value="students" />
  <Picker.Item label="Faculty" value="faculty" />
</Picker>
</View>
</View>
<View style={styles.Description}>
<Text style={{paddingLeft:10,marginTop:20,color:'#58636DD9',fontSize:14,fontFamily:'Poppins-Regular',fontWeight:'400'
}}>
    Description
        </Text>
        <TextInput multiline 
       style={styles.input1}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="Write the description here"
      />
</View>
<View style={styles.buttonContainer}>
<Button
  onPress={()=>{}}
  title="Save"
  color="#5177E7"
  accessibilityLabel="Learn more about this purple button"
/>

</View>
   
   

    </View>
  );
}

const styles=StyleSheet.create({
    container :{
        flex:1,
        backgroundColor:'#E5E5E5',   
    },
    header: {
        height:65,
        backgroundColor:'white',
        flexDirection:'row',
        
    },
   
    input: {
        height:50,
        margin:7,
        width:'100%',
        borderWidth:0.4,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        paddingLeft:20,
        fontFamily:'Poppins-Regular',
        fontWeight:'900',
        fontSize:18,
        color:'#505069',
        backgroundColor:'white'
      },
    Dropdown:{
        marginTop:5,
        backgroundColor:'#E5E5E5',
        flexDirection:'row'
    },
    Description: {
        marginTop:5,
        backgroundColor:'#E5E5E5',
        paddingLeft:20,
        paddingRight:20
    },
    input1:{
        height:150,
        margin:7,
        borderWidth:0.2,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        paddingLeft:20,
        fontFamily:'Poppins-Regular',
        fontWeight:'900',
        fontSize:18,
        color: '#505069',
        backgroundColor:'white'
      },
      buttonContainer:{
          marginTop:20,
          backgroundColor:'#E5E5E5',
          borderBottomLeftRadius:10,
          borderBottomRightRadius:10,
          borderTopRightRadius:10,
          borderTopLeftRadius:10,
          alignItems:'center',
      },
    
    
   

});


