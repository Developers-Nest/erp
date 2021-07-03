import React,{useState} from 'react';
import { StyleSheet,View,Text,Image,Button,Alert,Animate,Dimensions,StatusBar, TouchableOpacity,ScrollView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Appbar,Searchbar} from 'react-native-paper';
export default function Events()
{

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
    <View  style={styles.header}>
        <TouchableOpacity  onPress={()=>{}}>
        <FontAwesome5 name='chevron-left' style={{alignSelf:'center',fontSize:25,color:'blue',paddingLeft:20,paddingTop:20}}/>
        </TouchableOpacity>
        <Text style={{fontStyle:'normal',fontSize:28,fontFamily:'NunitoSans-Light',fontWeight:'600',alignSelf:'center',paddingLeft:30}}>
           Events List
        </Text>
    <View style={{flex:1,marginLeft:20}}>
    <TouchableOpacity onPress={()=>{}}>
    <MaterialCommunityIcons name="plus-circle-outline" style={{alignSelf:'center',fontSize:25,color:'blue',paddingLeft:20,paddingTop:15}}/>
    </TouchableOpacity>
    <Text style={{marginLeft:64}}>Add event</Text>
    </View>
    </View>
    <View style={styles.searchbar}>
    <Searchbar
      placeholder="Enter Event's name here"
      onChangeText={onChangeSearch}
      value={searchQuery} style={{alignItems:'center',borderBottomEndRadius:15,borderBottomStartRadius:15
      ,borderTopEndRadius:15,borderTopStartRadius:15,height:60}} icon='magnify' />
      </View>

      <View style={styles.cardsWrapper}>
        <View style={styles.card}>
          
          <View style={styles.cardInfo}>
            <Text style={{color:'black',textAlign:'left',fontSize:15,paddingTop:5}}>Plan</Text>
            <Text style={styles.cardDetails}>
              MRP 
            </Text>
            <Text style={{color:'black',textAlign:'left',fontSize:15,paddingTop:20}}>
              Payment mode
            </Text>
          </View>
        </View>
        <View style={styles.card}>
     
          <View style={styles.cardInfo}>
            <Text style={{color:'black',textAlign:'left',fontSize:15,paddingTop:5}}>Plan</Text>
            <Text style={styles.cardDetails}>
              MRP 
            </Text>
            <Text style={{color:'black',textAlign:'left',fontSize:15,paddingTop:20}}>
              Payment mode
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInfo}>
            <Text style={{color:'black',textAlign:'left',fontSize:15,paddingTop:5}}>Plan</Text>
            <Text style={styles.cardDetails}>
              MRP 
            </Text>
            <Text style={{color:'black',textAlign:'left',fontSize:15,paddingTop:20}}>
              Payment mode
            </Text>
          </View>
        </View>
      
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
    searchbar: {
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:20,
        paddingLeft:20,
        paddingRight:20,

    },
    cardsWrapper: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
      },
      card: {
        height: 150,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 5,
      },
      cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        backgroundColor: 'white',
        paddingHorizontal:10,
      },
      cardDetails: {
        fontSize: 15,
        color: '#444',
        fontWeight:'bold'
      },
      categoryContainer: {
        flexDirection: 'row',
        width: '95%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,}
        ,
      categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
    },
        categoryBtnTxt: {
            alignSelf: 'center',
            marginTop: 5,
            color: 'black',
          },

    

});


