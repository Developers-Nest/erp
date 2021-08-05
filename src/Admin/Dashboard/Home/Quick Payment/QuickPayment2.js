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

export default function QuickPayment2({ navigation }) {
  const [Department, setDrepartment] = useState([]);
  const [UseType, setUseType] = useState([]);
  const [FeeTypeCategory, setFeeTypeCategory] = useState([]);
  const [FeeSubTypeCategory, setFeeSubTypeCategory] = useState([]);
  return (
    <View style={styles.backgroung}>
      {/* <Appbar>
        <Appbar.BackAction onPress={() => {navigation.navigate('QuickPayment1')}} />
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
              navigation.navigate('QuickPayment1');
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
      <ScrollView>
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
              initValue="Use Type"
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

          <Button color='#5177E7' mode="contained" onPress={() => console.log('Pressed')}>
            Search
          </Button>
        </View>

        <View style={{ marginHorizontal: 30, ...styles.shadow }}>
          <View style={styles.search}>
            <TextInput
              style={{ ...styles.search_input }}
              placeholder="Enter the vehicle no. here"
              placeholderTextColor='grey'
              color='black'
            />
            <TouchableOpacity
              style={{
                alignSelf: 'center',
              }}>
              <Icon
                name="search-sharp"
                style={{
                  alignSelf: 'center',
                  fontSize: 30,
                  color: 'black',
                  paddingRight: 5,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 10 }} />
        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <View style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Regular',
                    marginHorizontal: -5,
                  }}>
                  Employee Name
                </Text>
              </View>
              <View style={{ padding: 5 }} />
              <View style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Regular',
                    marginHorizontal: -5,
                  }}>
                  Registration Number
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Medium',
                    paddingRight: 5,
                  }}>
                  48,320 Rs
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.belowhr}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
              <Text
                style={{
                  color: '#211C5A',
                  fontSize: 12,
                  fontFamily: 'Poppins-Medium',
                }}>
                From: 21May,2021
              </Text>
            </View>
            <View style={{ marginBottom: 3 }} />
          </View>
        </View>
        <View style={{ padding: 10 }} />

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <View style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Regular',
                    marginHorizontal: -5,
                  }}>
                  Employee Name
                </Text>
              </View>
              <View style={{ padding: 5 }} />
              <View style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Regular',
                    marginHorizontal: -5,
                  }}>
                  Registration Number
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Medium',
                    paddingRight: 5,
                  }}>
                  48,320 Rs
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.belowhr}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
              <Text
                style={{
                  color: '#211C5A',
                  fontSize: 12,
                  fontFamily: 'Poppins-Medium',
                }}>
                From: 21May,2021
              </Text>
            </View>
            <View style={{ marginBottom: 3 }} />
          </View>
        </View>
        <View style={{ padding: 40 }} />
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
  search: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: '#00499F',
    borderRadius: 8,
  },
  search_input: {
    borderRadius: 8,
    height: 59,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    paddingTop: 15,
    paddingHorizontal: 10,
    width: '90%',
  },
  shadow: {

    elevation: 5,
    borderRadius: 8,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    elevation: 5,
    marginTop: 14,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 0,
    borderBottomColor: '#333',
    borderBottomWidth: 0.5,
  },
  userinhostels: {
    marginTop: 10,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    justifyContent: 'space-between',
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
});