import React, {useEffect} from 'react';

// import {TextInput} from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import Icon from 'react-native-vector-icons/Foundation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IconPhysics2 from 'react-native-vector-icons/Ionicons';
import IconEnglish2 from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import IconBio1 from 'react-native-vector-icons/FontAwesome5';
import IconBio2 from 'react-native-vector-icons/FontAwesome5';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput
} from 'react-native';


const Live=()=> {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    useEffect(async()=>{

      try{

      } catch(err){
        alert('Cannot fetch your classes!')
      }

    })

    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            <View style={styles.section}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <TouchableOpacity style={styles.differentusers}>
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 22,
                        color: ' rgba(25, 40, 57, 0.7)',
                        fontFamily:'Poppins-Medium'
                      }}>
                     
                      English
                    </Text>

                    <MaterialCommunityIcon
                      size={27}
                      color="rgba(25, 40, 57, 0.63)"
                      name="alpha-a"
                      style={{paddingLeft: 7}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.differentusers}>
                    <Text style={styles.teacher}>Teacher</Text>
                    <View style={{flexDirection: 'column'}}>
                      <IconEnglish2
                        size={24}
                        color="#B04305"
                        name="radio"
                        style={{paddingLeft: 7}}
                      />
                      <Text
                        style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
                        {' '}{' '}{' '}
                        Class
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <TouchableOpacity style={styles.differentusers}>
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 22,
                        fontFamily:'Poppins-Medium',
                        color: ' rgba(25, 40, 57, 0.7)',
                      }}>
                      {' '}
                      Hindi
                    </Text>
                  
                    <MaterialCommunityIcon
                      size={27}
                      color="rgba(25, 40, 57, 0.63)"
                      name="alpha-a"
                      style={{paddingLeft: 7}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.differentusers}>
                    <Text style={styles.teacher}>Teacher</Text>
                    <View style={{flexDirection: 'column'}}>
                      <Icon
                        size={24}
                        color="#1F7C17"
                        name="clipboard-notes"
                        style={{paddingLeft: 7}}
                      />
                      <Text
                        style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
                        {' '}{' '}
                        Test
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <TouchableOpacity style={styles.differentusers}>
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 22,
                        color: ' rgba(25, 40, 57, 0.7)',
                        fontFamily:'Poppins-Medium'
                      }}>
                      {' '}
                      Physics
                    </Text>

                    <EntypoIcon
                      size={27}
                      color="rgba(25, 40, 57, 0.63)"
                      name="tree"
                      style={{paddingLeft: 7}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.differentusers}>
                    <Text style={styles.teacher}>Teacher</Text>
                    <View style={{flexDirection: 'column'}}>
                      <IconPhysics2
                        size={24}
                        color="#EFB086"
                        name="ios-hand-left"
                        style={{paddingLeft: 7}}
                      />
                      <Text
                        style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
                        {' '}
                        Doubts
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <TouchableOpacity style={styles.differentusers}>
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 22,
                        color: ' rgba(25, 40, 57, 0.7)',
                        fontFamily:'Poppins-Medium'
                      }}>
                      {' '}
                      Biology
                    </Text>

                    <IconBio1
                      size={27}
                      color="greyrgba(25, 40, 57, 0.63)"
                      name="microscope"
                      
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.differentusers}>
                    <Text style={styles.teacher}>Teacher</Text>
                    <View style={{flexDirection: 'column'}}>
                      <IconBio2
                        size={24}
                        color="rgba(93, 109, 116, 1)"
                        name="chalkboard-teacher"
                        
                      />
                      <Text
                        style={{fontSize: 10,  fontFamily:'Poppins-Medium',color: 'rgba(25, 40, 57, 0.9)'}}>
                        {' '}{' '}{' '}
                        Viva
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <TouchableOpacity style={styles.differentusers}>
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 22,
                        color: ' rgba(25, 40, 57, 0.7)',
                        fontFamily:'Poppins-Medium'
                      }}>
                     
                      Maths
                    </Text>

                    <MaterialCommunityIcon
                      size={27}
                      color="rgba(25, 40, 57, 0.63)"
                      name="function-variant"
                      style={{paddingLeft: 7}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.differentusers}>
                    <Text style={styles.teacher}>Teacher</Text>
                    <View style={{flexDirection: 'column'}}>
                      <IconEnglish2
                        size={24}
                        color="#B04305"
                        name="radio"
                        style={{paddingLeft: 7}}
                      />
                      <Text
                        style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
                        {' '}{' '}{' '}
                        Class
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <TouchableOpacity style={styles.differentusers}>
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 22,
                        color: ' rgba(25, 40, 57, 0.7)',
                        fontFamily:'Poppins-Medium'
                      }}>
                     
                      Chemistry
                    </Text>

                    <MaterialCommunityIcon
                      size={27}
                      color="rgba(25, 40, 57, 0.63)"
                      name="molecule"
                      style={{paddingLeft: 7}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.differentusers}>
                    <Text style={styles.teacher}>Teacher</Text>
                    <View style={{flexDirection: 'column'}}>
                      <EntypoIcon
                        size={24}
                        color="#3854B7"
                        name="lab-flask"
                        style={{paddingLeft: 7}}
                      />
                      <Text
                        style={{fontSize: 10, color: 'rgba(25, 40, 57, 0.9)', fontFamily:'Poppins-Medium'}}>
                        {' '}{' '}{' '}{'  '}
                        Lab
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  
const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      flex: 1,
      backgroundColor: 'rgba(249, 249, 249, 1)',
    },
  
    maincontainer: {
      flex: 1,
      // justifyContent:'flex-start'
    },
  
    card: {
      shadowColor: '#999',
      shadowOffset: {width: 0, height: 1},
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
      minWidth: '30%',
    },
    section: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
  
      paddingHorizontal: 13,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      elevation: 10,
      marginTop: 20,
      borderRadius: 12,
      marginHorizontal: 10,
      width: 170,
      height: 170,
      //new added
      alignSelf: 'center',
      //new added to move english down
      paddingTop: 50,
    },
  
    details: {
      alignContent: 'center',
      flexDirection: 'column',
  
      borderBottomColor: '#333',
      // borderBottomWidth:1,
    },
  
    userinhostels: {
      //  paddingVertical:20,
    },
  
    //different users for two columns
    differentusers: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      //for row spacing between two rows:done finally
      paddingBottom: 10,
    },
    userstext: {
      fontSize: 16,
      // paddingVertical:4,
      fontWeight: '300',
    },
    belowhr: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'space-between',
      paddingBottom: 10,
      borderBottomColor: '#333',
    },
    search: {
      backgroundColor: 'white',
      color: 'black',
    },
    switchTabsView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 40,
    },
    teacher: {
      fontSize: 14,
      color: 'rgba(25, 40, 57, 0.63)',
      paddingLeft: 3,
      fontFamily:'Poppins-Medium'
    },
    switchText: {
      fontSize: 14,
      color: '#B04305',
      paddingHorizontal: 5,
    },
    maincontainer: {
      paddingTop: 10,
      flex: 1,
      backgroundColor: 'rgba(249, 249, 249, 1)',
    },
    header: {
      height: 65,
      marginTop: -10,
      backgroundColor: 'rgba(0, 73, 159, 1)',
      flexDirection: 'row',
    },
    text_input: {
      paddingHorizontal: 20,
      borderRadius: 10,
      // backgroundColor: 'rgba(249, 249, 249, 1)',
      height: 50,
      fontSize: 16,
      minWidth: 171,
      backgroundColor: 'white',
    },
  
  
    shadow: {
      shadowColor: '#999',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.5,
      shadowRadius: 12,
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
      minWidth: 110,
    },
  
  
  });

  export default Live;