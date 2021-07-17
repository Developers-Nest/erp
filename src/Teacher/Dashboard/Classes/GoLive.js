import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity,TextInput} from 'react-native';

import {
  Button,
  Card,
} from 'react-native-paper';

import ModalSelector from 'react-native-modal-selector';
// date picker
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function OnlineLecture() {

  const [Chapter, setChapter] = useState("Chapter's name");
  const [Topic, setTopic] = useState('Topic:');
  const [Discription, setDescription] = useState('Description:')
  const [showdatePicker, setShowDatePicker] = useState(false)

   // handle form submission
   let handleSubmit = async(sd) => {
    showLoadingScreen()
    console.log("Date ", sd)
    await setDate(sd.toString())
    setShowDatePicker(false)
    hideLoadingScreen()
  }
  

  return (
    <View style={styles.container}>
      <View  style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}>
                 {/* course selector */}
                 <ModalSelector
            // data={courses}
            initValue="Class"
            // onChange={option => {
            //   fetchBatches(option.key)
            // }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          {/* batch selector */}
          <ModalSelector
            // data={batches}
            initValue="Batch"
            // onChange={option => {
            //   fetchSubjects(option.key)
            // }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />

          {/* subject selector */}
          <ModalSelector
            // data={subjects}
            initValue="Subject"
            // onChange={option => {
            //   getList(option.key)
            // }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
      </View>
      <Card style={styles.card1}>
        <Card.Content>
        
        <TextInput
              placeholder="Chapter : Newton laws of motion"
              onChange={(val) => setChapter(val)} />
              
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.5,
            }}
          />
         
         <TextInput
              placeholder="Topic : First law of motion"
              onChange={(val) => setTopic(val)} />
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.5,
            }}
          />
          <TextInput
            placeholder="Description"
            multiline={true}
            numberOfLines={4}
            style={{ 
              textAlignVertical: 'top',
              marginTop:5,
              height:150
            }}
            onChange={(val)=>setDescription(val)}/>
     
  
          <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              {/* date picker */}
              <Button
                icon="calendar"
                mode="contained"
                color="white"
                onPress={() => setShowDatePicker(true)}>
                Set Deadline
              </Button>

              <DateTimePickerModal
                isVisible={showdatePicker}
                mode="date"
                onConfirm={handleSubmit}
                onCancel={()=>setShowDatePicker(!showdatePicker)}
              />

              <View style={{ padding: 10 }} />
              <Button
                mode="contained"
                color="white"
                onPress={() => console.log('Pressed')}>
                Add file
              </Button>
            </View>
          </Card.Content>
      </Card>

      <Text
        style={{
          fontSize: 17,
          fontFamily: 'Poppins-Regular',
          paddingLeft: 15,
          marginTop: 15,
        }}>
        Reccurence Days
      </Text>
      <View style={styles.Week}>
        <View style={{marginTop: 15}}>
          <TouchableOpacity
            onPress={() => {
              /* do this */
            }}>
            <View
              style={{
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                width: 60,
                height: 40,
              }}>
              <Text style={{color: 'white'}}>Mon</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15, paddingLeft: 30}}>
          <TouchableOpacity
            onPress={() => {
              /* do this */
            }}>
            <View
              style={{
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                width: 60,
                height: 40,
              }}>
              <Text style={{color: 'white'}}>Tue</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15, paddingLeft: 30}}>
          <TouchableOpacity
            onPress={() => {
              /* do this */
            }}>
            <View
              style={{
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                width: 60,
                height: 40,
              }}>
              <Text style={{color: 'white'}}>Wed</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15, paddingLeft: 30}}>
          <TouchableOpacity
            onPress={() => {
              /* do this */
            }}>
            <View
              style={{
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                width: 60,
                height: 40,
              }}>
              <Text style={{color: 'white'}}>Thur</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 30}}>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => {
              /* do this */
            }}>
            <View
              style={{
                backgroundColor: 'blue',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                width: 100,
                height: 40,
              }}>
              <Text style={{color: 'white'}}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  header: {
    height: 65,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  card: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    width:125
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    paddingTop: 3,
    color: '#211C5A',
  },
  card1: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    // height: 310,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },


  Week: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
