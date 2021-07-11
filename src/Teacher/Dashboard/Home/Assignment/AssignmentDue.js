// import React from 'react';
// import {View} from 'react-native';

// import {Text} from 'react-native-paper';

// export default function App({navigation}) {
//   return (
//     <View>
//       <Text>Assignment Screen Teacher</Text>
//     </View>
//   );
// }

//<Button title="Send" mode="contained" color="#5177E7" />
import * as React from 'react';

import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import AssignmentDueHeader from '../shared/assignmentsdueheader';
// import HeaderAssignmentDue from '../../shared/headerassignmentdue';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function AssignmentsDue({navigation}) {
  
  const [showContent, setShowContent] = React.useState('Due');

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
 
  function Due() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <View style={styles.differentusers}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#211C5A',
                      fontFamily:'Poppins-Regular',
                      marginHorizontal:-5
                    }}>
                    {' '}
                    Title
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    
                      <Text style={{fontSize: 12, color: '#211C5A',fontFamily:'Poppins-Medium'}}>Edit</Text>
                      <Icon onPress={() => navigation.navigate('Assignment Edit')}
                        size={12} color="#211C5A" name="edit" 
                        style={{paddingTop:2,paddingRight:10}}
                        />
                    
                  </View>
                </View>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#5177E7',fontFamily:'Poppins-Medium'}}>
                    Course and Batch
                  </Text>
                  {/*                 
                <Text style={{fontSize:12,color:'blue'}}> Not Graded</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#505069', fontFamily:'Poppins-Regular'}}>
                    Exams will be conducted via online mode in the upcoming week
                    and these are notes for it.So,go through them and study well
                  </Text>

                  {/* <Text style={styles.userstext}>Graded</Text> */}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.belowhr}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#B04305', fontSize: 12,fontFamily:'Poppins-Medium'}}>
                  Due:21 May,2021
                </Text>
                <Text style={{color: '#58636D', fontSize: 12,fontFamily:'Poppins-Medium'}}>
                  Saved as Draft
                </Text>
              </View>
              <View style={{marginBottom:3}}>
              <Button
                title="Send"
                mode="contained"
                color="#58636D"
                
                //   labelStyle={{color:'white'}}
              />
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
                      fontFamily:'Poppins-Regular',
                      marginHorizontal:-5
                    }}>
                    {' '}
                    Title
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    
                      <Text style={{fontSize: 12, color: '#211C5A',fontFamily:'Poppins-Medium'}}>Edit</Text>
                      <Icon onPress={() => navigation.navigate('Assignment Edit')}
                        size={12} color="#211C5A" name="edit" 
                        style={{paddingTop:2,paddingRight:10}}
                        />
                    
                  </View>
                </View>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#5177E7',fontFamily:'Poppins-Medium'}}>
                    Course and Batch
                  </Text>
                  {/*                 
                <Text style={{fontSize:12,color:'blue'}}> Not Graded</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#505069', fontFamily:'Poppins-Regular'}}>
                    Exams will be conducted via online mode in the upcoming week
                    and these are notes for it.So,go through them and study well
                  </Text>

                  {/* <Text style={styles.userstext}>Graded</Text> */}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.belowhr}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#B04305', fontSize: 12,fontFamily:'Poppins-Medium'}}>
                  Due:21 May,2021
                </Text>
                <Text style={{color: '#58636D', fontSize: 12,fontFamily:'Poppins-Medium'}}>
                  Saved as Draft
                </Text>
              </View>
              <View style={{marginBottom:3}}>
              <Button title="Send" mode="contained" color="#5177E7" />
              </View>
            </View>
          </View>
          
        </ScrollView>
      </View>
    );
  }

  function Submitted()  {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <View style={styles.differentusers}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#211C5A',
                      fontFamily:'Poppins-Regular',
                      marginHorizontal:-5
                    }}>
                    {' '}
                    Title
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    
                      <Text style={{fontSize: 12, color: '#211C5A',fontFamily:'Poppins-Medium'}}>Edit</Text>
                      <Icon onPress={() => navigation.navigate('Assignment Edit')}
                        size={12} color="#211C5A" name="edit" 
                        style={{paddingTop:2,paddingRight:10}}
                        />
                    
                  </View>
                </View>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#5177E7',fontFamily:'Poppins-Medium'}}>
                    Course and Batch
                  </Text>
                  {/*                 
                <Text style={{fontSize:12,color:'blue'}}> Not Graded</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#505069', fontFamily:'Poppins-Regular'}}>
                    Exams will be conducted via online mode in the upcoming week
                    and these are notes for it.So,go through them and study well
                  </Text>

                  {/* <Text style={styles.userstext}>Graded</Text> */}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.belowhr}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#B04305', fontSize: 12,fontFamily:'Poppins-Medium'}}>
                  Due:21 May,2021
                </Text>
                <Text style={{color: '#58636D', fontSize: 12,fontFamily:'Poppins-Medium'}}>
                  Saved as Draft
                </Text>
              </View>
              <View style={{marginBottom:3}}>
              <Button
                title="Send"
                mode="contained"
                color="#58636D"
                
                //   labelStyle={{color:'white'}}
              />
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
                      fontFamily:'Poppins-Regular',
                      marginHorizontal:-5
                    }}>
                    {' '}
                    Title
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    
                      <Text style={{fontSize: 12, color: '#211C5A',fontFamily:'Poppins-Medium'}}>Edit</Text>
                      <Icon onPress={() => navigation.navigate('Assignment Edit')}
                        size={12} color="#211C5A" name="edit" 
                        style={{paddingTop:2,paddingRight:10}}
                        />
                    
                  </View>
                </View>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#5177E7',fontFamily:'Poppins-Medium'}}>
                    Course and Batch
                  </Text>
                  {/*                 
                <Text style={{fontSize:12,color:'blue'}}> Not Graded</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 12, color: '#505069', fontFamily:'Poppins-Regular'}}>
                    Exams will be conducted via online mode in the upcoming week
                    and these are notes for it.So,go through them and study well
                  </Text>

                  {/* <Text style={styles.userstext}>Graded</Text> */}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.belowhr}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#B04305', fontSize: 12,fontFamily:'Poppins-Medium'}}>
                  Due:21 May,2021
                </Text>
                <Text style={{color: '#58636D', fontSize: 12,fontFamily:'Poppins-Medium'}}>
                  Saved as Draft
                </Text>
              </View>
              <View style={{marginBottom:3}}>
              <Button title="Send" mode="contained" color="#5177E7" />
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
            width: '94%',
            marginLeft: 18,
            marginBottom: 20,
            marginTop: 20,
            alignSelf:'center'
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
              borderBottomWidth:showContent == 'Due' ? 1 : 0,
              borderBottomColor: '#B04305',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>setShowContent('Due')}>
            <Text style={styles.switchTextDue}>Due</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Submitted' ? 1 : 0,
              borderBottomColor: '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>setShowContent('Submitted')}>
            <Text style={styles.switchText}>Submitted</Text>
          </TouchableOpacity>
        </View>

        {showContent === 'Due' ? <Due /> : <Submitted />}
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
  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 2,
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
    marginHorizontal:4,
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
    marginHorizontal:10,
    justifyContent: 'space-between',
  },
  userstext: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '300',
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingBottom: 3,
    borderBottomColor: '#333',
    marginHorizontal:20
    //borderBottomWidth:1,
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
  switchText: {
    fontSize: 14,
    color: '#58636D',
    paddingHorizontal: 5,
    fontWeight:'bold',
    
    fontFamily:'Poppins-SemiBold',
  },
  switchTextDue: {
    fontSize: 14,
    color: '#B04305',
    fontWeight:'bold',
    
    fontFamily:'Poppins-SemiBold',
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

  maincontainer: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  
});
