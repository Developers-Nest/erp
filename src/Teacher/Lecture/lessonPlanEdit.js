import React,{useState} from 'react';
import { StyleSheet,View,Text,TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button,List,Card, Title, Paragraph ,TextInput} from 'react-native-paper';

export default function LessonPlanAdd()
{
    const [expanded, setExpanded] = React.useState(true);
    const [text, setText] = React.useState('')
    const handlePress = () => setExpanded(!expanded);
   
    return(
        <View style={styles.container}>
        <View  style={styles.header}>
            <TouchableOpacity  onPress={()=>{}}>
            <FontAwesome5 name='chevron-left' style={{alignSelf:'center',fontSize:25,color:'blue',paddingLeft:20,paddingTop:20}}/>
            </TouchableOpacity>
            <Text style={{fontStyle:'normal',fontSize:28,fontFamily:'NunitoSans-Light',fontWeight:'600',alignSelf:'center',paddingLeft:30}}>
               Edit Lesson Plan
            </Text>
        </View >
        <View style={styles.Drop}>
    
        <List.Section style={{width:125,paddingLeft:10}}>
      <List.Accordion
        title="Class"
      style={{borderTopRightRadius:5,borderBottomRightRadius:5,borderBottomLeftRadius:5,borderWidth:0.5,borderTopStartRadius:5,backgroundColor:'white'}}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
        </List.Accordion>
        </List.Section>
       

        <List.Section  style={{width:125,paddingLeft:10}}>
      <List.Accordion
        title="Batch"
      style={{borderTopRightRadius:5,borderBottomRightRadius:5,borderBottomLeftRadius:5,borderWidth:0.5,borderTopStartRadius:5,backgroundColor:'white'}}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
        </List.Accordion>
        </List.Section>
        <List.Section style={{width:125,paddingLeft:10}} >
      <List.Accordion
        title="Subject"
      style={{borderTopRightRadius:5,borderBottomRightRadius:5,borderBottomLeftRadius:5,borderWidth:0.5,borderTopStartRadius:5,backgroundColor:'white'}}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
        </List.Accordion>
        </List.Section>
       </View>
       <Card style={styles.card}>
    <Card.Content>
      <Title style={{fontSize:16,fontFamily:'Poppins-Regular'}}>Chapter: Newton's Law of motion</Title>
      <View
       style={{
               borderBottomColor: 'black',
               borderBottomWidth: 0.5,
             }}
        />
        <Title style={{fontSize:16,fontFamily:'Poppins-Regular'}}>Topic: First law of motion</Title>
        <View
       style={{
               borderBottomColor: 'black',
               borderBottomWidth: 0.5,
             }}
        />
         <TextInput
          style={{height:80 ,textAlignVertical:'top',backgroundColor:'white'}} multiline={true}
          numberOfLines={10}
          placeholder="Description (optional)"
          right={<TextInput.Affix text="/100" />}
         />
         <TouchableOpacity onPress={() => {/* do this */}}>
         <View style={{flexDirection:'row',paddingVertical:70,alignSelf:'flex-end'}}>
         <List.Item style={{width:100,borderWidth:0.3,borderTopRightRadius:5,borderBottomRightRadius:5,borderBottomLeftRadius:5,borderTopLeftRadius:5}}
          title="Add Link"
         />
     </View>
     </TouchableOpacity>
    </Card.Content>
  </Card>
    <View style={{justifyContent:'center',marginTop:50,flexDirection:'row'}}>
    <Button  mode="outlined" onPress={() => {}}>
    Delete
    </Button>
    <View style={{width:50}}>
    </View>
    <Button  mode="contained" onPress={() => {}}>
    Save
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
    Drop: {
        marginTop:5,
        flexDirection:'row',
     
    },
    card: {
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        height:310
    },
    Week:{
        marginTop:5,
        flexDirection:'row'

    }
}
    
    );