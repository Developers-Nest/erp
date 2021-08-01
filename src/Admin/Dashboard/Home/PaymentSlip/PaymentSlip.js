import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
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

export default function PaymentSlip({navigation}) {
    const [Department, setDrepartment] = useState([]);
    const [Name, setName] = useState([]);
    const [Month, setMonth] = useState([]);
    const [Year, setYear] = useState([]);
  return (
    <View style={styles.backgroung}>
      <Appbar>
        <Appbar.BackAction onPress={() => {navigation.navigate('Home')}} />
        <Appbar.Content title="Payment Slip" />
      </Appbar>
      <ScrollView>
      <View style={{padding:10}}/>
      <View style={{padding: 10}} >
          
      <ModalSelector
          data={Department}
          initValue="Department"
          onChange={async option => {
            await getAssessesments(option.key);
          }}
          style={styles.card_picker1}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
        <View style={{padding: 10}} />
        <ModalSelector
          data={Name}
          initValue="Name"
          onChange={async option => {
            await getAssessesments(option.key);
          }}
          style={styles.card_picker1}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
        <View style={{padding: 10}} />
        <View style={{flexDirection:"row", justifyContent:'space-between'}}>

        <ModalSelector
          data={Month}
          initValue="Month"
          onChange={async option => {
            await getAssessesments(option.key);
          }}
          style={styles.card_picker}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
        <View style={{padding: 10}} />
        <ModalSelector
          data={Year}
          initValue="Year"
          onChange={async option => {
            await getAssessesments(option.key);
          }}
          style={styles.card_picker}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
        </View>
    </View>
    <View style={{justifyContent: 'center',
                    alignItems: 'center',
                    padding:15}}>

    <Button color='#5177E7' mode="contained" onPress={() => console.log('Pressed')}>
    Get
  </Button>
    </View>

    <View style={styles.section}>
                  <View style={styles.details}>
                    <View style={styles.userinhostels}>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                            paddingHorizontal: 5,
                          }}>
                          Name
                        </Text>
                      </View>
                      <View style={{padding:5}}/>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                            paddingHorizontal: 5,
                          }}>
                          Designation
                        </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight:'bold',
                              color: '#211C5A',
                              fontFamily: 'Poppins-Medium',
                              paddingHorizontal: 5,
                            }}>
                            Code
                          </Text>
                      </View>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                            paddingHorizontal: 5,
                          }}>
                          Department
                        </Text>
                      </View>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Medium',
                            paddingHorizontal: 5,
                          }}>
                          DOB: 31 July,2023
                        </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Medium',
                              paddingHorizontal: 5,
                            }}>
                            Joining Date: 31 July, 2022
                          </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.details}>
                    <View style={styles.userinhostels}>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 12,
                              fontWeight:'bold',
                              color: '#211C5A',
                              fontFamily: 'Poppins-Medium',
                              paddingHorizontal: 5,
                          }}>
                          Bank Name
                        </Text>
                      </View>
                      <View style={{padding:2}}/>
                      <View style={styles.differentusers}>
                      <Text
                          style={{
                            fontSize: 12,
                              fontWeight:'bold',
                              color: '#211C5A',
                              fontFamily: 'Poppins-Medium',
                              paddingHorizontal: 5,
                          }}>
                          Ac. No.-446466464876434545 
                        </Text>
                      </View>
                      <View style={{padding:2}}/>
                      <View style={styles.differentusers}>
                      <Text
                          style={{
                            fontSize: 14,
                              color: '#1F7C17',
                              fontFamily: 'Poppins-Medium',
                              paddingHorizontal: 5,
                          }}>
                          Earnings 
                        </Text>
                      </View>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 14,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Medium',
                              paddingHorizontal: 5,
                          }}>
                          Type
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Medium',
                              paddingHorizontal: 5,
                          }}>
                          20,000 Rs
                        </Text>
                      </View>
                
                      <View style={styles.differentusers}>
                      <Text
                          style={{
                            fontSize: 14,
                              color: '#B04305',
                              fontFamily: 'Poppins-Medium',
                              paddingHorizontal: 5,
                          }}>
                          Deductions
                        </Text>
                      </View>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Medium',
                            paddingHorizontal: 5,
                          }}>
                          Type
                        </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Medium',
                              paddingHorizontal: 5,
                            }}>
                                2000 Rs
                          </Text>
                      </View>
                      <View style={{padding:5}}/>
                    </View>
                  </View>
                

                  <View style={styles.belowhr}>
                    <View style={{flexDirection: 'row',alignItems:'center', paddingHorizontal:5}}>
                      <Text
                        style={{
                          color: '#211C5A',
                          fontSize: 14,
                          fontFamily: 'Poppins-Medium',
                        }}>
                            Gross Salary
                      </Text>
                    </View>
                    <View style={{marginBottom: 3}}>
                    <Text
                        style={{
                          color: '#211C5A',
                          fontSize: 14,
                          fontFamily: 'Poppins-Medium',
                          paddingHorizontal:5
                        }}>
                        20,000 Rs
                      </Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text
                        style={{
                          color: '#211C5A',
                          fontSize: 14,
                          fontFamily: 'Poppins-Medium',
                          paddingHorizontal:5
                        }}>
                            Total
                      </Text>
                      <Text
                        style={{
                          color: '#211C5A',
                          fontSize: 14,
                          fontFamily: 'Poppins-Medium',
                          paddingHorizontal:5,
                        }}>
                            2,000 Rs
                      </Text>
                </View>
                <View style={{padding:8}}/>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text
                        style={{
                          color: '#211C5A',
                          fontSize: 18,
                          fontFamily: 'Poppins-Medium',
                          paddingHorizontal:5
                        }}>
                            Net Salary
                      </Text>
                      <Text
                        style={{
                          color: '#211C5A',
                          fontSize: 18,
                          fontFamily: 'Poppins-Medium',
                          paddingHorizontal:5,
                        }}>
                            18,000 Rs
                      </Text>
                </View>
        <View style={{padding:15}}/>
    </View>
    <View style={{padding:40}}/>
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
    width:'45%',
    shadowOffset: {width: 0, height: 1},
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
    shadowOffset: {width: 0, height: 1},
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
    Card:{
        borderRadius:12,
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
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
});