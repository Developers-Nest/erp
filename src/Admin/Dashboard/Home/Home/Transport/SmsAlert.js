import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';

import ModalSelector from 'react-native-modal-selector';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { auto } from 'async';
import AntDesign from 'react-native-vector-icons/AntDesign';

//redux
import { useSelector } from 'react-redux';

export default function SmsAlert({ navigation }) {

  //theming
  const institute = useSelector(state => state.institute);

  const [SMS_for, setSMS_for] = useState([]);
  return (
    <View style={styles.backgroung}>
      {/* header start */}

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

      <View style={{ padding: 10 }} />
      <View style={{ padding: 10 }} >
        <ModalSelector
          data={SMS_for}
          initValue="SMS for"
          onChange={async option => {
            await getAssessesments(option.key);
          }}
          style={styles.card_picker}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
        <View style={{ padding: 10 }} />
        <Card style={{ height: 200, ...styles.Card }}>
          <Card.Content>
            <TextInput
              placeholder="Write your message here "
              onChange={val => setDiscription(val)}
              style={{ backgroundColor: 'white' }}
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
          <Button style={{ width: 90 }} mode="contained" onPress={() => console.log('Pressed')}>
            SAVE
          </Button>
        </View>
      </View>
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
