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
import { useSelector } from 'react-redux';

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

export default function QuickPayment1({ navigation }) {
  const [Department, setDrepartment] = useState([]);
  const [UseType, setUseType] = useState([]);
  const [FeeTypeCategory, setFeeTypeCategory] = useState([]);
  const [FeeSubTypeCategory, setFeeSubTypeCategory] = useState([]);
  const institute = useSelector(state => state.institute);
  return (
    <View style={styles.backgroung}>
      {/* <Appbar>
        <Appbar.BackAction onPress={() => {navigation.navigate('Home')}} />
        <Appbar.Content title="Quick Payment" />
      </Appbar> */}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >
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
            Quick Payment
          </Text>
        </View>
      </View>
      <View style={{ padding: 10 }} />
      <View style={{ padding: 10 }} >
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <ModalSelector
            data={Department}
            initValue="Department"
            onChange={async option => {
              await getAssessesments(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
          <ModalSelector
            data={UseType}
            initValue="User Type"
            onChange={async option => {
              await getAssessesments(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>
        <View style={{ padding: 10 }} />
        <ModalSelector
          data={FeeTypeCategory}
          initValue="Fee Type Category"
          onChange={async option => {
            await getAssessesments(option.key);
          }}
          style={styles.card_picker1}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
        <View style={{ padding: 10 }} />
        <ModalSelector
          data={FeeSubTypeCategory}
          initValue="Fee Sub Type Category"
          onChange={async option => {
            await getAssessesments(option.key);
          }}
          style={styles.card_picker1}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
      </View>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
      }}>

        <Button color='#5177E7' mode="contained" onPress={() => navigation.navigate('QuickPayment2')}>
          Search
        </Button>
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
    width: '45%',
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
  card_picker1: {
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