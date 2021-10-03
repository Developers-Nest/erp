import React from 'react';
import {View} from 'react-native';

import {TextInput,Appbar,Card,Title,Paragraph} from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector'
import { useState } from 'react';

export default function Feedback({navigation}) {

  const [type, setType] = useState([])
  const [courses, setCourses] = useState([])
  const [subjects, setSubjects] = useState([])

  return (
    <View style={{backgroundColor:'#E5E5E5'}}>
      <Appbar.Header>
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content title="Feedback" />
      </Appbar.Header>
      <View style={{padding:10 }}/> 
      <View style={{backgroundColor:'white'}} >
        <ModalSelector
            data={type}
            initValue="Type"
            onChange={(option) => {
              getSubjects(option.key)
         }} />
      </View>
      <View style={{padding:10 }}/>
      <Card>
          <Card.Content>
            <Title>Questionnarie</Title>
            <View style={{padding:2}} />
            <Paragraph>This feedback is about the form that was given
                to you yesterday dealing with one of the issues 
                of teachers.
            </Paragraph>
          </Card.Content>
        </Card>
        <View style={{padding:10 }}/>
      <Card style={{height:200}}>
          <Card.Content>
          <TextInput 
            placeholder="Write down your feedback question here..... "
            onChange={(val)=>setDiscription(val)}
            style={{backgroundColor: 'white'}}/>
          </Card.Content>
        </Card>
        
    </View>
  );
}
