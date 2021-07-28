import React,{useState} from 'react';
import { Appbar } from 'react-native-paper';
import { List } from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector';

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

import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//redux
import {useSelector} from 'react-redux';

export default function OnlineExams({navigation}) {
     //theming
  const institute = useSelector(state => state.institute);

    const [className, setclassName] = useState(null);
    const [classes, setclasses] = useState([
      {label: 'Class1', key: 'Class1'},
      {label: 'Class2', key: 'Class2'},
      {label: 'Class3', key: 'Class3'},
    ]);
  
    // const [open2, setOpen2] = useState(null);
    const [batch, setbatch] = useState(null);
    const [batches, setbatches] = useState([
      {label: 'Batch1', key: 'Batch1'},
      {label: 'Batch2', key: 'Batch2'},
      {label: 'Batch3', key: 'Batch3'},
    ]);
  
    // const [open3, setOpen3] = useState(null);
    const [subject, setsubject] = useState(null);
    const [subjects, setsubjects] = useState([
      {label: 'Subject1', key: 'Subject1'},
      {label: 'Subject2', key: 'Subject2'},
      {label: 'Subject3', key: 'Subject3'},
    ]);
  
   
    const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  const [showContent, setShowContent] = React.useState('Processed');

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  function switchTab() {
    if (activeTab === 'Completed') {
      setActiveTab('Processed');
    } else {
      setActiveTab('Completed');
    }
  }
  function Processed() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (

        
      <View style={styles.container}>
        <ScrollView>

            
       

      <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
              marginBottom:10,
              alignContent: 'flex-start',
              // width: '100%'
            }}>
            <ModalSelector
              data={classes}
              initValue="Class"
              onChange={option => {
                // setclass(option.key);
              }}
              style={styles.card}
              initValueTextStyle={styles.SelectedValueSmall}
              selectTextStyle={styles.SelectedValueSmall}
            />

            <ModalSelector
              data={batches}
              initValue="Batch"
              onChange={option => {
                // setsubject(option.key);
              }}
              style={styles.card}
              initValueTextStyle={styles.SelectedValueSmall}
              selectTextStyle={styles.SelectedValueSmall}
            />
         
         <ModalSelector
              data={subjects}
              initValue="Subjects"
              onChange={option => {
                // setsubject(option.key);
              }}
              style={styles.card}
              initValueTextStyle={styles.SelectedValueSmall}
              selectTextStyle={styles.SelectedValueSmall}
            />
         
          </View>
         {/* close list part */}
        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontWeight: 'normal', fontSize: 18,color:'#211C5A',fontFamily:'Poppins-Regular'}}> Title</Text>

                <Text style={{fontSize: 10,color:'#B04305',fontFamily:'Poppins-Regular',marginTop:-20}}>Difficult</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 12,color:"#58636D",fontFamily:'Poppins-Regular'}}>21May,2021</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 12,color:'#58636D',fontFamily:'Poppins-Regular'}}> 09:00 to 12:00 </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontWeight: 'normal', fontSize: 18,color:'#211C5A',fontFamily:'Poppins-Regular'}}> Title</Text>

                <Text style={{fontSize: 10,color:'#B04305',fontFamily:'Poppins-Regular',marginTop:-20}}>Difficult</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 12,color:"#58636D",fontFamily:'Poppins-Regular'}}>21May,2021</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 12,color:'#58636D',fontFamily:'Poppins-Regular'}}> 09:00 to 12:00 </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </ScrollView>
      </View>
    );
  }

  function Completed() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <ScrollView>
  

        <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
              marginBottom:10,
               alignContent: 'flex-start',
              // width: '100%'
            }}>
            <ModalSelector
              data={classes}
              initValue="Class"
              onChange={option => {
                // setclass(option.key);
              }}
              style={styles.card}
              initValueTextStyle={styles.SelectedValueSmall}
              selectTextStyle={styles.SelectedValueSmall}
            />

            <ModalSelector
              data={batches}
              initValue="Batch"
              onChange={option => {
                // setsubject(option.key);
              }}
              style={styles.card}
              initValueTextStyle={styles.SelectedValueSmall}
              selectTextStyle={styles.SelectedValueSmall}
            />
         
         <ModalSelector
              data={subjects}
              initValue="Subjects"
              onChange={option => {
                // setsubject(option.key);
              }}
              style={styles.card}
              initValueTextStyle={styles.SelectedValueSmall}
              selectTextStyle={styles.SelectedValueSmall}
            />
         
          </View>
         {/* close list part */}
<View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontWeight: 'normal', fontSize: 18,color:'#211C5A',fontFamily:'Poppins-Regular'}}> Title</Text>

                <Text style={{fontSize: 10,color:'#B04305',fontFamily:'Poppins-Regular',marginTop:-20}}>Difficult</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 12,color:"#58636D",fontFamily:'Poppins-Regular'}}>21May,2021</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 12,color:'#58636D',fontFamily:'Poppins-Regular'}}> 09:00 to 12:00 </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontWeight: 'normal', fontSize: 18,color:'#211C5A',fontFamily:'Poppins-Regular'}}> Title</Text>

                <Text style={{fontSize: 10,color:'#B04305',fontFamily:'Poppins-Regular',marginTop:-20}}>Medium</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 12,color:"#58636D",fontFamily:'Poppins-Regular'}}>21May,2021</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 12,color:'#58636D',fontFamily:'Poppins-Regular'}}> 09:00 to 12:00 </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>



        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontWeight: 'normal', fontSize: 18,color:'#211C5A',fontFamily:'Poppins-Regular'}}> Title</Text>

                <Text style={{fontSize: 10,color:'#B04305',fontFamily:'Poppins-Regular',marginTop:-20}}>Difficult</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 12,color:"#58636D",fontFamily:'Poppins-Regular'}}>21May,2021</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 12,color:'#58636D',fontFamily:'Poppins-Regular'}}> 09:00 to 12:00 </Text>
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
         {/* header start */}

         <View
          style={{
            backgroundColor: institute ? institute.themeColor : '#FF5733',
            // backgroundColor:'blue',
            ...styles.header,
          }}>
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
                paddingLeft: 20,
                marginTop: 22,
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
              marginLeft: 30,
              color: 'white',
            }}>
            Online Exams
          </Text>
          
        </View>

      
<View style={{padding:5}}/>

        <View style={styles.switchTabsView}>
          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Processed' ? 2 : 0,
              borderBottomColor: '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowContent('Processed')}>
            <Text style={styles.switchText}>Processed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderBottomWidth:showContent == 'Completed' ? 2 : 0,
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
      height: 1,
    },
    shadowOpacity: 1,
    elevation: 5,
    marginTop: 14,
    marginBottom:10,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom:10,
    paddingBottom: 10,
    borderBottomColor: '#333',
    // borderBottomWidth:1,
  },
  userinhostels: {
    marginTop: 10,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 20,
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
    marginTop:25
  },
  switchText: {

    fontSize: 14,
    color: '#58636D',
    paddingHorizontal: 5,
    fontFamily:'Poppins-Regular'
  },
  maincontainer: {

    flex: 1,
     backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  SelectedValue: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 27,
    padding: 10,
    color: '#211C5A',
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

  //for users

  iconbubble: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 1000,
    // alignSelf: 'center',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1.41,
    elevation: 5,
  },
  card: {
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

    width: 110,
    elevation: 3,
  },
  header: {
    height: 69,
    flexDirection: 'row',
    alignContent: 'center',
  },
});