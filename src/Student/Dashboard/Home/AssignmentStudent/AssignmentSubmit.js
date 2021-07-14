import * as React from 'react';

import Icon from 'react-native-vector-icons/AntDesign';

import Icon1 from 'react-native-vector-icons/AntDesign';
import AssignmentStudentDue from './AssignmentStudentDue';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import {
    event,
    onChange,
    setValue,
    target,
    value,
} from 'react-native-reanimated';
import { Searchbar } from 'react-native-paper';
// import HeaderAllocatedList from '../shared/headerallocatedlist';
// import {AntDesign} from '@expo/vector-icons';
import FilePickerManager from 'react-native-file-picker';

export default function AssignmentSubmit({navigation}) {
    const [activeTab, setActiveTab] = React.useState('Due');

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    // state = {
    //     filePicker: null
    //   }
    

   const filePicker = () => {
    FilePickerManager.showFilePicker(null, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled file picker');
        }
        else if (response.error) {
          console.log('FilePickerManager Error: ', response.error);
        }
        else {
          this.setState({
            file: response
          });
        }
      });
      }

      const Props=(props)=>{
          return(

<View style={styles.inner}>
                            <TouchableOpacity onPress={()=>filePicker()}>
                            <Icon1 size={105} color="rgba(88, 99, 109, 0.65)" name="addfile" style={{padding:0,marginLeft:15}} />
                            <Text style={{ marginTop: 20,fontSize:12,color:'#58636D',fontFamily:'Poppins-Regular' }}>Tap to add the assignment</Text>
                            </TouchableOpacity>
                        </View> 

          );
      }

    return (


        <View style={{ backgroundColor: "#E5E5E5", flex: 1 }}>

            <View style={styles.header}>
                <TouchableOpacity  onPress={() => navigation.navigate('AssignmentStudentDue')}>
                <Icon size={24} color="white" name="left" style={{ alignSelf: 'center', fontSize: 25, color: 'white',paddingTop:8,paddingRight:10 }} />

</TouchableOpacity>
<Text style={{fontStyle:'normal',
        fontFamily:'NunitoSans-Regular',fontSize:28,fontWeight:'600',color:'white'}}>
   Assignments
</Text>
               
            </View>
            <ScrollView>
                <View style={styles.container}>

                     <View style={styles.section}>
        <View style={styles.details}>
             
             <View style={styles.userinhostels}>
                <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontWeight: 'normal', fontSize: 18,color:'#211C5A',fontFamily:'Poppins-Regular'}}>{' '}Subject</Text>
 
                 {/* <Text style={styles.userstext}> Ph:9484422222</Text> */}
                </TouchableOpacity>
               <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize:12,color:'#5177E7',fontFamily:'Poppins-Medium'}}>{'  '}Title</Text>
                
               </TouchableOpacity>
               <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize:12,marginRight:30,fontFamily:'Poppins-Regular',color:'#505069'}}>{'\n  '}Exams will be conducted via online{'\n '} mode.All the best.It is requested
                {'\n  '}from the students to maintain the.</Text>
                
                {/* <Text style={styles.userstext}>Graded</Text> */}
              </TouchableOpacity>
            </View>
              


          </View>

          <View style={styles.belowhr}>
               <Text style={{color:'#B04305',fontSize:12,fontFamily:'Poppins-Medium'}}>{'  '}Due:21May,2021</Text>
              
              



          </View>
         </View>
  <View style={styles.box}>
      <Props/>
                        {/* <View style={styles.inner}>
                            <TouchableOpacity onPress={()=>filePicker()}>
                            <Icon1 size={105} color="rgba(88, 99, 109, 0.65)" name="addfile" style={{padding:0,marginLeft:15}} />
                            <Text style={{ marginTop: 20,fontSize:12,color:'#58636D',fontFamily:'Poppins-Regular' }}>Tap to add the assignment</Text>
                            </TouchableOpacity>
                        </View> */}


                    </View>
                    <View style={{padding:20}}/>
                    <Button
          style={styles.button}
          onPress={() => navigation.navigate('Teacher Dashboard')}
          labelStyle={{color: 'white'}}
          uppercase={false}
          mode="contained">
          Submit
        </Button>

                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#E5E5E5',
        alignContent: "center",
        // alignItems: "center"
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
        //display: 'flex',
        flexDirection: 'column',
        marginTop: 10,
        borderBottomColor: ' rgba(88, 99, 109, 0.45)',
        borderBottomWidth: 0.5,
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
        marginTop: 10,
        justifyContent: 'space-between',
        paddingBottom: 15,
        // borderBottomColor: '#333',
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
    },
    maincontainer: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    box: {

        paddingTop: 20,
        marginTop: 20,
        width: 361,
        height:320,
        marginLeft:15,
        alignContent:'space-around',
        borderStyle: 'dashed',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'black',
        // marginLeft:18,
        // alignContent:'center',
        // alignItems:'center'

    },
    inner: {
        paddingVertical: 80,
        //   justifyContent:'center'
        //for placing icon in the middle of the box created

        alignItems:"center"


    },

    header: {
        height: 65,

        backgroundColor: 'rgba(0, 73, 159, 1)',
        flexDirection: 'row',
        padding:10,

    },
    button: {
      backgroundColor: '#5177E7',
      alignSelf: 'flex-end',
      // marginTop: 10,
      color: '#F9F9F9',
      padding: 3,
      paddingHorizontal: 5,
      borderRadius: 5,
      marginRight:10
    },
});


