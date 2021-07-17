import * as React from 'react';
// import { TextInput } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/AntDesign';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';


export default function IssuedBooksScreen1({ navigation }) {

  const [showContent, setShowContent] = React.useState('Processed')

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  function Completed() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (


      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <TouchableOpacity style={styles.differentusers}>

                  <Text> </Text>
                  <Text style={{ fontSize: 10, color: '#B04305', fontFamily: 'OpenSans-Regular' }}>Difficult</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{ fontWeight: 'normal', fontSize: 18, color: '#211C5A', fontFamily: 'Poppins-Regular' }}> Title</Text>


                </TouchableOpacity>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{ fontSize: 12, color: "#58626C", fontFamily: 'Poppins-Regular', paddingLeft: 5 }}>21May,2021</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 12, color: '#58636D', fontFamily: 'Poppins-Regular' }}>09:00 to 12:00</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <TouchableOpacity style={styles.differentusers}>

                  <Text>  </Text>
                  <Text style={{ fontSize: 10, color:'#BD9400', fontFamily: 'OpenSans-Regular' }}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{ fontWeight: 'normal', fontSize: 18, color: '#211C5A', fontFamily: 'Poppins-Regular' }}> Title</Text>


                </TouchableOpacity>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{ fontSize: 12, color: "#58626C", fontFamily: 'Poppins-Regular', paddingLeft: 5 }}>21May,2021</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 12, color: '#58636D', fontFamily: 'Poppins-Regular' }}>09:00 to 12:00</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <TouchableOpacity style={styles.differentusers}>

                  <Text> </Text>
                  <Text style={{ fontSize: 10, color: '#1F7C17', fontFamily: 'OpenSans-Regular' }}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{ fontWeight: 'normal', fontSize: 18, color: '#211C5A', fontFamily: 'Poppins-Regular' }}> Title</Text>


                </TouchableOpacity>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{ fontSize: 12, color: "#58626C", fontFamily: 'Poppins-Regular', paddingLeft: 5 }}>21May,2021</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 12, color: '#58636D', fontFamily: 'Poppins-Regular' }}>09:00 to 12:00</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  function Processed()  {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (


      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <TouchableOpacity style={styles.differentusers}>

                  <Text> </Text>
                  <Text style={{ fontSize: 10, color: '#B04305', fontFamily: 'OpenSans-Regular' }}>Difficult</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{ fontWeight: 'normal', fontSize: 18, color: '#211C5A', fontFamily: 'Poppins-Regular' }}> Title</Text>


                </TouchableOpacity>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{ fontSize: 12, color: "#58626C", fontFamily: 'Poppins-Regular', paddingLeft: 5 }}>21May,2021</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 12, color: '#58636D', fontFamily: 'Poppins-Regular' }}>09:00 to 12:00</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <TouchableOpacity style={styles.differentusers}>

                  <Text>  </Text>
                  <Text style={{ fontSize: 10, color:'#BD9400', fontFamily: 'OpenSans-Regular' }}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{ fontWeight: 'normal', fontSize: 18, color: '#211C5A', fontFamily: 'Poppins-Regular' }}> Title</Text>


                </TouchableOpacity>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{ fontSize: 12, color: "#58626C", fontFamily: 'Poppins-Regular', paddingLeft: 5 }}>21May,2021</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 12, color: '#58636D', fontFamily: 'Poppins-Regular' }}>09:00 to 12:00</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <TouchableOpacity style={styles.differentusers}>

                  <Text> </Text>
                  <Text style={{ fontSize: 10, color: '#1F7C17', fontFamily: 'OpenSans-Regular' }}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{ fontWeight: 'normal', fontSize: 18, color: '#211C5A', fontFamily: 'Poppins-Regular' }}> Title</Text>


                </TouchableOpacity>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{ fontSize: 12, color: "#58626C", fontFamily: 'Poppins-Regular', paddingLeft: 5 }}>21May,2021</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 12, color: '#58636D', fontFamily: 'Poppins-Regular' }}>09:00 to 12:00</Text>
                  </View>
                </TouchableOpacity>
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

        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.goBack(); }}>
            <Icon size={24} color="white" name="left" style={{ alignSelf: 'center', fontSize: 25, color: 'white', paddingLeft: 20, paddingTop: 20 }} />
          </TouchableOpacity>
          <Text style={{ fontStyle: 'normal', fontFamily: 'NunitoSans-Regular', fontSize: 28, fontWeight: '600', alignSelf: 'center', paddingLeft: 30, color: 'white' }}>
            Online Exams
          </Text>

        </View>

        {/* header ends */}

        <View
          style={{
            width: '90%',
            marginLeft: 25,
            marginBottom: 20,
            marginTop: 20,
          }}>


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
              style={{ width: '80%', ...styles.text_input }}
              placeholder="Enter book name or ID here"
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

        {/* close search */}

        {/* tabs section open */}
        <View style={styles.switchTabsView}>
          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Processed' ? 1 : 0,
              borderBottomColor: '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowContent('Processed')}>
            <Text style={styles.switchTextDue}>Processed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Completed' ? 1 : 0,
              borderBottomColor: '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowContent('Completed')}>
            <Text style={styles.switchText}>Completed</Text>
          </TouchableOpacity>
        </View>
        {showContent === 'Processed' ? <Processed /> : <Completed />}
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
    marginTop: 14,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
    marginBottom:10

  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 4,
    paddingBottom: 10,
    borderBottomColor: '#333',
    paddingHorizontal:10

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


  search: {
    backgroundColor: 'white',
    color: 'black',
  },
  switchTabsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginBottom:10
  },
  switchText: {
    fontSize: 14,
    color: '#58636D',
    paddingHorizontal: 5,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',

  },
  maincontainer: {
    paddingTop: 10,
    
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
    shadowOffset: { width: 0, height: 1 },
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


  header: {
    height: 65,
    marginTop: -10,
    backgroundColor: 'rgba(0, 73, 159, 1)',
    flexDirection: 'row',

  },

});