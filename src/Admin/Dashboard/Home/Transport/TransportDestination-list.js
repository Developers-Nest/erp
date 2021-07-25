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

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { auto } from 'async';

export default function TransportDestinationList() {
  return (
    <View style={styles.backgroung}>
      <Appbar>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Transport" />
        <Appbar.Action icon="information" onPress={() => {}} />
      </Appbar>
      <View style={{padding: 10}} />
{/* top section */}
<ScrollView>
    <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    }}>
    <View style={styles.count}>
        <TouchableOpacity>

            <View style={{alignItems:'center'}}>
            
            <MaterialCommunityIcons
                    size={36.83}
                    color="#211C5A"
                    name="bus"
                    
                />
                <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 10,
                  color: '#211C5A',
                  marginTop:-5,
                  fontFamily:'Poppins-Regular'
                }}>
          Vehicle
              </Text>
            </View>
            
            
        </TouchableOpacity>
        </View>
        <View style={styles.count}>
            <TouchableOpacity>

            <View style={{alignItems:'center'}}>
            
            <MaterialCommunityIcons
                    size={36.83}
                    color="#211C5A"
                    name="face-outline"
                    
                />
                <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 10,
                  color: '#211C5A',
                  marginTop:-5,
                  fontFamily:'Poppins-Regular'
                }}>
                Driver
              </Text>
            </View>
            </TouchableOpacity>
            
        </View>

        <View style={styles.count}>
            <TouchableOpacity>

            <View style={{alignItems:'center'}}>
            
            <MaterialCommunityIcons
                    size={36.83}
                    color="#211C5A"
                    name="google-maps"  
                />
            <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 10,
                  color: '#211C5A',
                  marginTop:-5,
                  fontFamily:'Poppins-Regular'
                }}>
                    Destination
              </Text>
        </View>
            </TouchableOpacity>
        </View>
    </View>

    <View style={{width:"100%",alignItems:'flex-end',paddingTop:15}}>
            <Text style={styles.section_heading}>Add Destination</Text>
            </View>
    {/* search bar */}
    <View style={{ marginHorizontal: 30, ...styles.shadow }}>
        <View style={styles.search}>
            <TextInput
            style={{...styles.search_input }}
            placeholder="Enter the destination here"
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
                }}
            />
            </TouchableOpacity>
        </View>
    </View>
    {/* Add driver  */}
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
                          Route Code
                        </Text>
                        <Text style={{
                              fontSize: 12,
                              color: '#211C5A',
                              fontFamily: 'Poppins',
                              fontStyle:'normal',
                            }}>
                                Stop time- 15:00
                        </Text>
                      </View>
                      <View style={{padding:5}}/>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                            marginHorizontal: -5,
                          }}>
                          Stop Positon
                        </Text>
                        <TouchableOpacity
                          style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Medium',
                            }}>
                            Edit
                          </Text>
                          {/* <Icon
                            size={12}
                            color="#211C5A"
                            name="edit"
                            style={{paddingTop: 2, paddingRight: 10}}
                          /> */}
                          <MaterialCommunityIcon
                            size={15}
                            color="#211C5A"
                            name="square-edit-outline"
                            style={{paddingTop: 2, paddingRight: 10}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={styles.belowhr}>
                    <View style={{flexDirection: 'row',alignItems:'center', padding:5}}>
                      <Text
                        style={{
                          color: '#58636D',
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                        }}>
                            Fees Type: Transport
                      </Text>
                    </View>
                    <View style={{marginBottom: 3}}>
                    <Text
                        style={{
                          color: '#1F7C17',
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        Fees: 900 Rs
                      </Text>
                    </View>
        </View>
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
                            marginHorizontal: -5,
                          }}>
                          Route Code
                        </Text>
                        <Text style={{
                              fontSize: 12,
                              color: '#211C5A',
                              fontFamily: 'Poppins',
                              fontStyle:'normal',
                            }}>
                                Stop time- 15:00
                        </Text>
                      </View>
                      <View style={{padding:5}}/>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                            marginHorizontal: -5,
                          }}>
                          Stop Positon
                        </Text>
                        <TouchableOpacity
                          style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Medium',
                            }}>
                            Edit
                          </Text>
                          {/* <Icon
                            size={12}
                            color="#211C5A"
                            name="edit"
                            style={{paddingTop: 2, paddingRight: 10}}
                          /> */}
                          <MaterialCommunityIcon
                            size={15}
                            color="#211C5A"
                            name="square-edit-outline"
                            style={{paddingTop: 2, paddingRight: 10}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={styles.belowhr}>
                    <View style={{flexDirection: 'row',alignItems:'center', padding:5}}>
                      <Text
                        style={{
                          color: '#58636D',
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                        }}>
                            Fees Type: Transport
                      </Text>
                    </View>
                    <View style={{marginBottom: 3}}>
                    <Text
                        style={{
                          color: '#1F7C17',
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        Fees: 900 Rs
                      </Text>
                    </View>
        </View>
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
                            marginHorizontal: -5,
                          }}>
                          Route Code
                        </Text>
                        <Text style={{
                              fontSize: 12,
                              color: '#211C5A',
                              fontFamily: 'Poppins',
                              fontStyle:'normal',
                            }}>
                                Stop time- 15:00
                        </Text>
                      </View>
                      <View style={{padding:5}}/>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                            marginHorizontal: -5,
                          }}>
                          Stop Positon
                        </Text>
                        <TouchableOpacity
                          style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Medium',
                            }}>
                            Edit
                          </Text>
                          {/* <Icon
                            size={12}
                            color="#211C5A"
                            name="edit"
                            style={{paddingTop: 2, paddingRight: 10}}
                          /> */}
                          <MaterialCommunityIcon
                            size={15}
                            color="#211C5A"
                            name="square-edit-outline"
                            style={{paddingTop: 2, paddingRight: 10}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={styles.belowhr}>
                    <View style={{flexDirection: 'row',alignItems:'center', padding:5}}>
                      <Text
                        style={{
                          color: '#58636D',
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                        }}>
                            Fees Type: Transport
                      </Text>
                    </View>
                    <View style={{marginBottom: 3}}>
                    <Text
                        style={{
                          color: '#1F7C17',
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        Fees: 900 Rs
                      </Text>
                    </View>
        </View>
    </View>

    <View style={{padding:50}}/> 
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
  count: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',

    paddingHorizontal: 13,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 0.8,
         },
      shadowOpacity: 0.2,
      elevation: 10,
      marginTop: 20,
      borderRadius: 50,
      marginHorizontal: 10,
      width: 85,
      height: 85,
      //new added
      alignSelf: 'center',
      //new added to move english down
      paddingTop: 20,
    },
    search: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
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
    section_heading: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'left',
    color: 'rgba(81, 119, 231, 1)',
    paddingHorizontal: 30,
    marginBottom: 5,
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
      userstext: {
        fontSize: 16,
        paddingVertical: 4,
        fontWeight: '300',
      },
    button: {
        backgroundColor: '#58636D',
    
        color: '#F9F9F9',
        padding: 3,
        paddingHorizontal: 5,
        borderRadius: 5,
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
