import * as React from 'react';
// import { TextInput } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Swipeable from 'react-native-gesture-handler/Swipeable'

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Touchable,
  Alert,
} from 'react-native';

// redux
import {useSelector} from 'react-redux';

export default function HostelRequest({navigation}) {
  const [showContent, setShowContent] = React.useState('Unreviewed');
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  //theming
  const institute = useSelector(state => state.institute);

  function Unreviewed() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    const RightActions = () => {
      return (
        <TouchableOpacity 
        onPress={() => {
          Alert.alert('Rejected');
        }}>
        <View style={styles.iconbubblereject}>
        <FontAwesome5
                         size={38.5}
                         color="white"
                         name="trash-alt"
                       />
                       
                       <Text style={{color:'white'}}>Reject</Text>
                     </View>   
                     </TouchableOpacity> 
      )
     }
     //for left action swipe:
     const LeftActions = () => {
      return (
        <TouchableOpacity 
        onPress={() => {
          Alert.alert('Approved');
        }}
        >
        <View style={styles.iconbubbleapprove}>
        <FontAwesome5
          size={38.5}
          color="white"
          name="check-circle"
        />
        <Text style={{color:'white'}}>Approve</Text>
      </View>
</TouchableOpacity>
      )
     }

    return (
      <View style={styles.container}>
        <ScrollView>
      <View style={{flexDirection:'row',justifyContent:'center'}}>
      <Swipeable renderLeftActions={LeftActions} renderRightActions={RightActions}>
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
                            marginRight:150,
                            paddingRight:50
                          }}>
                          {' '}
                          User
                        </Text>

                        <TouchableOpacity
                          style={{flexDirection: 'row'}}
                          >
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Medium',
                            }}>
                            402,3rd Floor
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#58636D',
                            fontFamily: 'Poppins-Regular',
                          }}>
                           Hostel
                        </Text>
                       </TouchableOpacity>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#505069',
                            fontFamily: 'Poppins-Regular',
                          }}>
                          User Type
                        </Text>

                       </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.belowhr}>
                    <View style={{flexDirection: 'column'}}>
                    <Text style={{fontFamily:'Poppins-Regular',fontWeight:'500',
fontSize:12,lineHeight:18,color:'#211C5A'}}
>
                      {'  '}  Register:{''}21 May,2021
                        {/* {assignment.submissionDateString ||
                          'Submission date Not Found'} */}
                      </Text>
                      
                    </View>
                    <View >
<Text style={{fontFamily:'Poppins-Regular',fontWeight:'500',
fontSize:12,lineHeight:18,color:'#211C5A'}}
> {'  '}  Vacate:{''}21 Sept,2021</Text>
                    </View>
                  </View>
                </View>

</Swipeable>
                {/* close swipeable */}
   {/* for reject and approve icon */}
   {/* <View style={styles.iconbubblereject}>
   <FontAwesome5
                    size={38.5}
                    color="white"
                    name="trash-alt"
                  />
                  
                  <Text style={{color:'white'}}>Reject</Text>
                </View> */}


   </View>
        </ScrollView>
      </View>
    );
  }

  function Reviewed() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <ScrollView>

        <View style={styles.sectionreviewed}>
                  <View style={styles.details}>
                    <View style={styles.userinhostels}>
                      <View style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                            marginHorizontal: -5,
                            marginRight:100,
                            paddingRight:50
                          }}>
                          {' '}
                          User
                        </Text>

                        <TouchableOpacity
                          style={{flexDirection: 'row'}}
                          >
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Medium',
                            }}>
                           
                           402,3rd Floor
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#58636D',
                            fontFamily: 'Poppins-Medium',
  
                          }}>
                            Hostel
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'green',
                            fontFamily: 'Poppins-Medium',
                          }}>
                           Approved
                        </Text>


                       </TouchableOpacity>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#505069',
                            fontFamily: 'Poppins-Regular',
                          }}>
                          User Type
                        </Text>

                       </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.belowhr}>
                    <View style={{flexDirection: 'column'}}>
                    <Text style={{fontFamily:'Poppins-Regular',fontWeight:'500',
fontSize:12,lineHeight:18,color:'#211C5A'}}
>
                      {'  '}  Register:{''}21 May,2021
                        {/* {assignment.submissionDateString ||
                          'Submission date Not Found'} */}
                      </Text>
                      
                    </View>
                    <View >
<Text style={{fontFamily:'Poppins-Regular',fontWeight:'500',
fontSize:12,lineHeight:18,color:'#211C5A'}}
> {'  '}  Vacate:{''}21 Sept,2021</Text>
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
        {/* <IssuedBooksheader /> */}

        {/* header start */}

        <View
          style={{
            backgroundColor: institute ? institute.themeColor :'#FF5733',
            ...styles.header,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('HostelDetails');
            }}>
            <AntDesign
              size={24}
              color="white"
              name="left"
              style={{
                alignSelf: 'center',
                fontSize: 25,
                color: 'white',
                paddingLeft: 20,
                paddingTop: 20,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontStyle: 'normal',
              fontFamily: 'NunitoSans-Regular',
              fontSize: 28,
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
              color: 'white',
            }}>
            Hostel Requests
          </Text>
        </View>

        {/* header ends */}

        <View
          style={{
            alignItems:'center',
            marginBottom: 20,
            marginTop: 20,
          }}>
            <View style={{alignItems:'center',width:'90%'}}>
          {/* open search */}
          <View
            style={{
              marginTop: 10,
              //make search and card in same line
              marginLeft: 5,
              justifyContent: 'space-between',
              width: '95%',
              flexDirection: 'row',
              ...styles.shadow,
            }}>
            <TextInput
              style={{width: '80%', ...styles.text_input}}
              placeholder="Enter user's name here"
              placeholderTextColor='grey'
              color='black'
  
            />
            <TouchableOpacity
              style={{
                alignSelf: 'center',
              }}>
              <FontAwesome5
                name="search"
                style={{
                  alignSelf: 'center',
                  fontSize: 21,
                  color: '#505069',
                }}
              />
            </TouchableOpacity>
          </View>
          </View>
        </View>

        {/* close search */}

        {/* tabs section open */}
        <ScrollView>
        <View style={styles.switchTabsView}>
          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Unreviewed' ? 1 : 0,
              borderBottomColor: '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowContent('Unreviewed')}>
            <Text style={styles.switchText}>Unreviewed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Reviewed' ? 1 : 0,
              borderBottomColor: '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowContent('Reviewed')}>
            <Text style={styles.switchText}>Reviewed</Text>
          </TouchableOpacity>
        </View>
        {showContent === 'Unreviewed' ? <Unreviewed /> : <Reviewed />}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  
 
  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    elevation: 5,
    // marginTop: 5,
    borderRadius: 8,
    paddingHorizontal:10,
    marginLeft:5,
    marginRight:5,
    // paddingLeft: 10,
    // paddingRight: 10,
    
    // marginHorizontal: 20,
    marginBottom: 20,
  },

  sectionreviewed: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    elevation: 5,
    marginTop: 14,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    
    marginHorizontal: 20,
    marginBottom: 10,
  },

 
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 4,
    // paddingBottom: 10,
    borderBottomColor: '#333',
    paddingHorizontal: 10,
    borderBottomWidth:0.5
  },
  userinhostels: {
    marginBottom: 10,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userstext: {
    fontSize: 16,
    // paddingVertical: 4,
    fontWeight: '300',
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
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
    marginBottom: 10,
  },
  switchText: {
    fontSize: 14,
    color: '#58636D',
    paddingHorizontal: 5,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
  },
  maincontainer: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },

  switchTextDue: {
    fontSize: 14,
    color: '#B04305',
    paddingHorizontal: 5,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
  },

  text_input: {
    // paddingHorizontal: 20,
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
  iconbubblereject: {
    width: 80,
    height: 123,
    backgroundColor: 'red',
    // borderRadius: 1000,
    // alignSelf: 'center',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
   
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1.41,
    elevation: 5
  },

  iconbubbleapprove: {
    width: 80,
    height: 123,
    backgroundColor: 'green',
    // borderRadius: 1000,
    // alignSelf: 'center',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
   
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1.41,
    elevation: 5
  },

  header: {
    height: 69,
    flexDirection: 'row',
  },
});
