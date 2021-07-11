import * as React from 'react';

import {TextInput} from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/AntDesign';

import Icon from 'react-native-vector-icons/Foundation';
import IconPhysics1 from 'react-native-vector-icons/Entypo';
import IconPhysics2 from 'react-native-vector-icons/Ionicons';
import IconEnglish2 from 'react-native-vector-icons/Feather';
import IconEnglish1 from 'react-native-vector-icons/MaterialCommunityIcons';

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
} from 'react-native';

export default function LecturesScreen() {
  const[showContent,setShowContent]=React.useState('Due');

  const [activeTab, setActiveTab] = React.useState('Due');

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
 
  function Live() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

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

                    <IconEnglish1
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
                  
                    <IconEnglish1
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

                    <IconPhysics1
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
                     
                      English
                    </Text>

                    <IconEnglish1
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
                        color: ' rgba(25, 40, 57, 0.7)',
                        fontFamily:'Poppins-Medium'
                      }}>
                     
                      English
                    </Text>

                    <IconEnglish1
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
          </View>
        </ScrollView>
      </View>
    );
  }

  function Recorded() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

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

                    <IconEnglish1
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
                  
                    <IconEnglish1
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

                    <IconPhysics1
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
                     
                      English
                    </Text>

                    <IconEnglish1
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
                        color: ' rgba(25, 40, 57, 0.7)',
                        fontFamily:'Poppins-Medium'
                      }}>
                     
                      English
                    </Text>

                    <IconEnglish1
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
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.maincontainer}>
        <View
          style={{
            width: '90%',
            marginLeft: 25,
            marginBottom: 20,
            // marginTop: 30,
          }}>
         
{/* open search */}
<View
        style={{
          marginTop: 10,
         
          justifyContent: 'space-between',
          width:'95%',
          flexDirection: 'row',
          ...styles.shadow,
        }}>
           <FontAwesome5
          name="search"
          style={{
            alignSelf: 'center',
            fontSize: 15,
            color: '#6A6A80',
          }}/>
       
        <TextInput
          style={{width: '80%', ...styles.text_input}}
          placeholder="Enter subject or batch name"
        />
        <TouchableOpacity
          style={{
            alignSelf: 'center',
          }}>
          <FontAwesome5
          name="filter"
          style={{
            alignSelf: 'center',
            fontSize: 21,
            color: '#6A6A80',
          }}
        
          />
        </TouchableOpacity>
      </View>
      {/* close search */}

         </View>
        <View style={styles.switchTabsView}>
          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Live' ? 2 : 0,
              borderBottomColor: '#B04305',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowContent('Live')}>
            <Text style={styles.switchText}>Live</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Recorded' ? 2 : 0,
              borderBottomColor: '#B04305',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowContent('Recorded')}>
            <Text style={styles.switchText}>Recorded</Text>
          </TouchableOpacity>
        </View>

        {showContent === 'Live' ? <Live /> : <Recorded />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
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
    shadowColor: '#333',
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
    backgroundColor: '#E5E5E5',
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
