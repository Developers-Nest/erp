import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import {
 
  Card,
  Button,
} from 'react-native-paper';

import ModalSelector from 'react-native-modal-selector';
import AntDesign from 'react-native-vector-icons/AntDesign';

//redux
import { useSelector } from 'react-redux';
import get from '../../../../../services/helpers/request/get'
import read from '../../../../../services/localstorage/read'
import post from '../../../../../services/helpers/request/post'

import LoaderHook from '../../../../../components/LoadingScreen/LoadingScreen'

export default function SmsAlert({ navigation }) {

   //theming
   const institute = useSelector(state => state.institute)
   const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

   const [SMS_for, setSMS_for] = useState([{ label: 'Common to all', key: 'Common to all'}, { label: 'Route Wise', key: 'Route Wise' }, { label: 'Destination Wise', key: 'Destination Wise' }]);
   const [templates, setTemplates] = useState([]);
   const[routes,setroutes] = useState([]);
   const[dests,setdests] = useState([]);

   //selected values
   const [smsFor, setSmsFor] = useState('');
   const [template, setTemplate] = useState('');
   const [templateId, setTemplateId] = useState('');
 const[route,setroute]= useState('');
 const[destination,setdest]= useState('');
 //on load
   useEffect(async () => {
    setLoadingScreen();
    try {

        let slug = '/transport/route'
        let token = await read('token')
        let res = await get(slug, token)
        let arr = []
        res && res.map((route) => {
            arr.push({
                key: route._id,
                label: route.code,
                // list: group.list
            })
        })
        setroutes(arr)


        slug = `/smsTemplate`;
        res = await get(slug, token);
        arr = [];
        res && res.map((temp) => {
            arr.push({
                key: temp._id,
                label: temp.templateId,
                message: temp.templateMessage
            })
        })
        setTemplates(arr);

    } catch (err) {
        alert('Error ' + err);
    }

    
    hideLoadingScreen();
}, [])

let fetchdestination = async(route)=>{
  setLoadingScreen()
  try{
    let slug = `/transport/destinationAndFees?route=${route}`
    let token = await read('token')
    let res = await get(slug, token)
    let arr = []
    res && res.map((destination) => {
        arr.push({
            key: destination._id,
            label: destination.pickAndDrop,
           
        })
    })
    setdests(arr);     
  } catch(err){   
      alert('Cannot get destination');
  }
  hideLoadingScreen();
}

let handleSend = async()=>{
  setLoadingScreen();
  try{
      let token = await read('token');
      let slug = `/transport/route/sendsms`;
      let data = {
          message: template,
          destination:destination?destination:'',
          route:route?route:'',
          reportType: smsFor,
          templateId: templateId
      }
      console.log('Data ', data);
      let res = await post(slug, data, token);
      console.log('Response ', res);
      if(res.error){
          alert(res.error);
      } else if(res.Status) {
          alert('Message Sent');
          // navigation.navigate("Home");
      }
  } catch(err){
      console.log('Error ', err);
      alert('Error ');
  }
  hideLoadingScreen()
}

   return (
    <View style={styles.backgroung}>
      {/* header start */}
{loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TransportMain');
            }}>
            <AntDesign
              size={24}
              color="white"
              name="left"
              style={{
                alignSelf: 'center',
                fontSize: 25,
                color: 'white',
                // paddingLeft: 10,
                // paddingTop: 23,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontStyle: 'normal',
              fontSize: 28,
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 10,
              color: 'white',
              fontFamily: 'NunitoSans-Regular',
            }}>
            SMS Alert
          </Text>
        </View>

      </View>

     
      {/* header ends */}
<ScrollView>
<View>
      <View style={{ padding: 10 }} />
      <View style={{ padding: 10 }} >
        <ModalSelector
         data={SMS_for}
         initValue="SMS For"
         onChange={option => {
             setSmsFor(option.label)
         }}
        
          style={styles.card_picker}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
        <View style={{ padding: 10 }} />
       {/* //for selecting route  */}
       {
                        smsFor === "Route Wise"? (
        <ModalSelector
         data={routes}
         initValue="Route Code"
         onChange={option => {
             setroute(option.label)
         }}
        
          style={styles.card_picker}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
        ) : (null)

      }
{/* for selecting destination */}
{
                        smsFor === "Destination Wise" ? (
<View style={{padding:10}}>
                          <ModalSelector
                          data={routes}
                          initValue="Route Code"
                          onChange={option => {
                              setroute(option.label)
                              fetchdestination(option.key)
                          }}
                         
                           style={styles.card_picker}
                           initValueTextStyle={styles.SelectedValueSmall}
                           selectTextStyle={styles.SelectedValueSmall}
                         />

<View style={{padding:10}}/>
<ModalSelector
         data={dests}
         initValue="Destination"
         onChange={option => {
             setdest(option.label)
         }}
        
          style={styles.card_picker}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
        </View>
        ) : (null)

      }
       
         {/* for template id */}
         <ModalSelector
       data={templates}
       initValue="Template ID"
       onChange={option => {
           setTemplate(option.message)
           setTemplateId(option.label)
       }}
          style={styles.card_picker}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
         <View style={{ padding: 10 }} />
         {/* for message */}
        <Card style={{ height: 200, ...styles.Card }}>
          <Card.Content>
            <TextInput
             placeholder="Write your message here "
             placeholderTextColor='grey'
             value={template}
             color='black'
             onChangeText={val => setTemplate(val)}
             style={{ backgroundColor: 'white', textAlignVertical: 'top', fontFamily: 'Poppins-Regular', fontSize: 15 }}
             multiline={true}
            />
          </Card.Content>
        </Card>
      </View>
      <View style={{ padding: 10 }}>
        <View
          style={{
            // justifyContent: 'center',
            flexDirection: 'row-reverse',
            // alignItems: 'center',
          }}>
          <Button style={{ width: 90 }} color={ institute? institute.themeColor: '#5177E7'} mode="contained" onPress={handleSend}>
            SAVE
          </Button>
        </View>
      </View>
      </View>
</ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  backgroung: {
    backgroundColor: '#E5E5E5',
    height: '100%',
    flex: 1,
  },
  button: {
    backgroundColor: '#58636D',

    color: '#F9F9F9',
    padding: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 30,
    paddingTop: 3,
    color: '#211C5A',
  },
  card_picker: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    elevation: 3,
  },
  Card: {
    borderRadius: 12,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },

});
