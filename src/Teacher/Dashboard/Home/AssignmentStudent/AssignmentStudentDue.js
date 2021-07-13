
import * as React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AssignmentSubmit from './AssignmentSubmit';

import {
  event,
  onChange,
  setValue,
  target,
  value,
} from 'react-native-reanimated';
import {Searchbar,Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';


export default function AssignmentStudentDue({navigation}) {
    var [ isPress, setIsPress ] = React.useState(false);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'blue',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
  };

    // const press=()=>{navigation.navigate('AssignmentsScreen2');}
  const [activeTab, setActiveTab] = React.useState('Due');

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  const[showContent,setShowContent]=React.useState('Due')
  function switchTab() {
    if (activeTab === 'Submitted') {
      setActiveTab('Due');
    }
    
    else{setActiveTab('Submitted');}
  }
  function Due() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (

        
      <View style={styles.container}>
          <ScrollView>
      <View style={styles.section}>
          <View style={styles.details}>
             
             <View style={styles.userinhostels}>
               <TouchableOpacity style={styles.differentusers}>
               <Text style={{fontWeight: 'normal', fontSize: 18,color:'#211C5A',fontFamily:'Poppins-Regular'}}> Title</Text>
 
                {/* <Text style={styles.userstext}> Ph:9484422222</Text> */}
               </TouchableOpacity>
               <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize:12,color:'#5177E7',fontFamily:'Poppins-Medium'}}>{'  '}Subject</Text>
                
               </TouchableOpacity>
               <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize:12,marginRight:30,fontFamily:'Poppins-Regular',color:'#505069'}}>{'\n  '}Exams will be conducted via online{'\n '} mode.All the best.It is requested
                {'\n  '}from the students to maintain the.</Text>
                
                {/* <Text style={styles.userstext}>Graded</Text> */}
               </TouchableOpacity>
             </View>
              


          </View>

          <View style={styles.belowhr}>
               <Text style={{color:'#58636D',fontSize:12,fontFamily:'Poppins-Medium'}}>{'  '}Due:21May,2021</Text>
              
               <Button
          style={styles.button}
          onPress={() => navigation.navigate('AssignmentSubmit')}
          labelStyle={{color: 'white',fontFamily:'Poppins-Regular',fontWeight:'bold'}}
          uppercase={false}
          mode="contained">
          Submit
        </Button>
              



          </View>
         </View>
         </ScrollView>  
      </View>
    );
  }

  function Submitted() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
          <ScrollView>
            <View style={styles.section}>
          <View style={styles.details}>
             
             <View style={styles.userinhostels}>
               <TouchableOpacity style={styles.differentusers}>
               <Text style={{fontWeight: 'normal', fontSize: 18,color:'#211C5A',fontFamily:'Poppins-Regular'}}> Title</Text>
 
                {/* <Text style={styles.userstext}> Ph:9484422222</Text> */}
               </TouchableOpacity>
               <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize:12,color:'#5177E7',fontFamily:'Poppins-Medium'}}>{'  '}Subject</Text>
                <Text style={{fontSize:12,color:'#5177E7',fontFamily:'Poppins-Regular'}}>Not Graded</Text>
                
               </TouchableOpacity>
               <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize:12,marginRight:30,fontFamily:'Poppins-Regular',color:'#505069'}}>{'\n  '}Exams will be conducted via online{'\n '} mode.All the best.It is requested
                {'\n  '}from the students to maintain the.</Text>
                
                {/* <Text style={styles.userstext}>Graded</Text> */}
               </TouchableOpacity>
             </View>
              


          </View>

          <View style={styles.belowhr}>
               <Text style={{color:'#58636D',fontSize:12,fontFamily:'Poppins-Medium'}}>{'  '}Due:21May,2021</Text>
              
               <Button
          style={styles.button}
          onPress={() => navigation.navigate('Teacher Dashboard')}
          labelStyle={{color: 'white',fontFamily:'Poppins-Regular',fontWeight:'bold'}}
          uppercase={false}
          mode="contained">
          View
        </Button>
              



          </View>
         </View>
         <View style={styles.section}>
          <View style={styles.details}>
             
             <View style={styles.userinhostels}>
               <TouchableOpacity style={styles.differentusers}>
               <Text style={{fontWeight: 'normal', fontSize: 18,color:'#211C5A',fontFamily:'Poppins-Regular'}}> Title</Text>
 
                {/* <Text style={styles.userstext}> Ph:9484422222</Text> */}
               </TouchableOpacity>
               <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize:12,color:'#5177E7',fontFamily:'Poppins-Medium'}}>{'  '}Subject</Text>
                <Text style={{fontSize:12,color:'#58636D',fontFamily:'Poppins-Regular'}}>Not Graded</Text>
                
               </TouchableOpacity>
               <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize:12,marginRight:30,fontFamily:'Poppins-Regular',color:'#505069'}}>{'\n  '}Exams will be conducted via online{'\n '} mode.All the best.It is requested
                {'\n  '}from the students to maintain the.</Text>
                
                {/* <Text style={styles.userstext}>Graded</Text> */}
               </TouchableOpacity>
             </View>
              


          </View>

          <View style={styles.belowhr}>
               <Text style={{color:'#58636D',fontSize:12,fontFamily:'Poppins-Medium'}}>{'  '}Due:21May,2021</Text>
              
               <Button
          style={styles.button}
          onPress={() => navigation.navigate('Teacher Dashboard')}
          labelStyle={{color: 'white',fontFamily:'Poppins-Regular',fontWeight:'bold'}}
          uppercase={false}
          mode="contained">
          Edit
        </Button>
              



          </View>
         </View>
         </ScrollView>
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.maincontainer}>
          
<View  style={styles.header}>
      <TouchableOpacity  onPress={()=>{}}>
      <Icon size={24} color="white" name="left" style={{ alignSelf: 'center', fontSize: 25, color: 'white',paddingTop:8,paddingRight:10 }} />

        </TouchableOpacity>
        <Text style={{fontStyle:'normal',
        fontFamily:'NunitoSans-Regular',fontSize:28,fontWeight:'600',color:'white'}}>
           Assignments
        </Text>
    {/* <View style={{flex:1,marginLeft:20}}>
    <TouchableOpacity onPress={()=>{}}>
    <Ionicons name="add-circle-outline" style={{alignSelf:'center',fontSize:25,color:'white',paddingLeft:20,paddingTop:15}}/>
    </TouchableOpacity>
    <Text style={{paddingLeft:20,color:'#fff'}}>Issue Books</Text>
    </View> */}
    </View>




        <View
          style={{
            width: '90%',
            marginLeft: 25,
            marginBottom: 30,
            marginTop: 30,
          }}>
         
 {/* open search */}
       <View
        style={{
          marginTop: 10,
          //make search and card in same line
          marginLeft:5,
          justifyContent: 'space-between',
          width:'95%',
          flexDirection: 'row',
          ...styles.shadow,
        }}>
       
        <TextInput
          style={{width: '80%', ...styles.text_input}}
          placeholder="Enter subject name"
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
        
        <View style={styles.switchTabsView}>
        <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Due' ? 1 : 0,
              borderBottomColor: 'rgba(176, 67, 5, 1)',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowContent('Due')}>
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
            onPress={() => setShowContent('Submitted')}>
            <Text style={styles.switchText}>Submitted</Text>
          </TouchableOpacity>
        </View>
        {showContent === 'Due' ? <Due /> : <Submitted />}
          {/* <TouchableOpacity
            style={{
              borderBottomWidth: activeTab == 'Due' ? 4 : 0,
              borderBottomColor: '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => switchTab()}> */}
            
            {/* <Text style={styles.switchText}>Due</Text> */}
          {/* </TouchableOpacity> */}
{/* 
          <TouchableOpacity
            style={{
              borderBottomWidth: activeTab == 'Submitted' ? 4 : 0,
              borderBottomColor: '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => switchTab()}> */}
            
            {/* <Button title="Submitted" style={{
              borderBottomWidth: showContent == 'Submitted' ? 4 : 0,
              borderBottomColor: '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            mode="contained"
            color="grey"
            onPress={() => {
                
                 setShowContent('Submitted')}}
            /> */}
          {/* </TouchableOpacity> */}
        
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
      height: 3,
    },
    shadowOpacity: 2.0,
    elevation: 10,
    marginTop: 14,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
  },

  details: {
    //display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 0,
    borderBottomColor: 'rgba(88, 99, 109, 0.45)',
    borderBottomWidth:0.8,
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
  },
   switchText: {
    fontSize: 14,
    color: '#58636D',
    paddingHorizontal: 5,
    fontFamily:'Poppins-SemiBold',
    fontWeight:'bold',
    
  },
  maincontainer: {
    // paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  header: {
    height:65,
    backgroundColor:'rgba(0, 73, 159, 1)',
    flexDirection:'row',
    // justifyContent:'flex-start'   ,
    padding:10 
  },
  button: {
    backgroundColor: 'rgba(81, 119, 231, 1)',
    alignSelf: 'flex-end',
    marginTop: -8,
    color: 'white',
    padding: 2,
    paddingHorizontal: 1,
    borderRadius: 6,
  },
    switchTextDue: {
    fontSize: 14,
    color: '#B04305',
    paddingHorizontal: 5,
    fontFamily:'Poppins-SemiBold',
    fontWeight:'bold',
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
