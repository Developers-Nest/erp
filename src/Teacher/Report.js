import React,{useState} from 'react';
import { StyleSheet,View,Text,TouchableOpacity,TextInput} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-paper';

export default function Report()
{
   
    return(
        <View style={styles.container}>
        <View  style={styles.header}>
            <TouchableOpacity  onPress={()=>{}}>
            <FontAwesome5 name='chevron-left' style={{alignSelf:'center',fontSize:25,color:'blue',paddingLeft:20,paddingTop:20}}/>
            </TouchableOpacity>
            <Text style={{fontStyle:'normal',fontSize:28,fontFamily:'NunitoSans-Light',fontWeight:'600',alignSelf:'center',paddingLeft:30}}>
               Report
            </Text>
        </View >
        <View style={styles.Description}>
        <TextInput multiline={true}
         numberOfLines={10}
         style={styles.input1}
        placeholder="Write the description here"
        />
    </View>
    <View style={styles.buttonContainer}>
    <Button  mode="contained" onPress={() => {}} style={{width:150,backgroundColor:'blue'}}>
 Submit
    </Button>
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
    Description: {
      marginTop:25,
      paddingLeft:10,
      paddingRight:10
      
      },
      input1:{
        height:300,
        margin:7,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        paddingLeft:20,
        fontFamily:'Poppins-Regular',
        fontWeight:'900',
        fontSize:18,
        textAlignVertical: "top",
        backgroundColor:'white'
      },
      buttonContainer:{
          marginTop:20,
          alignItems:'flex-end',
          paddingRight:20
         
      }
     
   
});
