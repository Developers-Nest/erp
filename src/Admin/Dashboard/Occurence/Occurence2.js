import * as React from 'react';
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
import Icon from 'react-native-vector-icons/AntDesign';


import ModalSelector from 'react-native-modal-selector';
// date picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';
export default function Occurence2({navigation}){
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [date, setDate] = React.useState('17 July 2021')
    let index = 0;
    const dateMonths={1:'Jan',2:'Feb',3:'Mar',4:'Apr',5:'May',6:'June',7:'July',8:'Aug',9:'Sept',10:'Oct',11:'Nov',12:'Dec',
    }
    const data = [
        { key: index++, section: true, label: 'Fruits' },
        { key: index++, label: 'Red Apples' },
        { key: index++, label: 'Cherries' },
        { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
        // etc...
        // Can also add additional custom keys which are passed to the onChange callback
        { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
    ];
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date.toString());
        setDate(date.getDate()+" "+dateMonths[date.getMonth()]+" "+date.getFullYear())
        hideDatePicker();
      };
    return(
        <View>
    <View
        style={{
          width: '90%',
          margin:10,
          flex:1,
          flexWrap: 'wrap',
          flexDirection:'row',
          alignContent:'space-between',
          justifyContent: 'flex-start',
        }}>
        <View 
        style={styles.pickdate}>
        <ModalSelector
        initValue="Name"
        style={{marginTop:10,width:100,shadowOpacity:0,borderWidth:0,}}
        data={data}
        />
        <Icon size={24} color="black" name="down"
        style={{
            marginTop:16,
            marginRight:10,
        }}
        ></Icon>
        </View>
        <TouchableOpacity style={styles.pickdate} onPress={showDatePicker}>
            <Text style={{marginTop:20,marginLeft:10,}}>
        {date}{'  '}
        </Text>
        <Icon size={24} color="black" name="calendar"
        style={{
            marginTop:16,
            marginRight:10,
        }}
        ></Icon>
        <DateTimePickerModal 
        isVisible={isDatePickerVisible} 
        style={styles.pickdate} 
        mode="date" 
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        />
        </TouchableOpacity>
        
        </View>
        <View
         style={{
             width:'90%',
             margin:10,
             flex:1,
             flexDirection:'row',
            //  alignContent:'center',
             justifyContent:'center',
             marginTop:100,
         }}>
        <TextInput
                    multiline
                    // mode='outlined'
                    placeholder='Write your remarks'
                    numberOfLines={20}
                    // value={Description}
                    // onChangeText={(Description) => { setDescription(Description) }}
                    style={styles.text_input } />
                    </View>
                    <View style={{alignContent:'space-between',position:'absolute',marginTop:340,
                    flex:1,
                    flexDirection:'row',
                    justifyContent:'space-evenly',
                    alignContent:'center',
                    marginLeft:20,
                }}>
                    <TouchableOpacity style={{...styles.btn,
                        alignSelf:'flex-start',marginLeft:100,
                        backgroundColor:'white',
                        borderColor:'#B04305',
                        borderWidth:1,
                        }}>
                        <Text style={{
                            flex:0,
                            flexDirection:'row',
                            marginTop:8,
                            color:'#B04305',
                            marginLeft:15,
                            fontSize:18,
                            // padding:5,
                        }}>
                            {'Delete'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.btn,alignSelf:'flex-end',
        backgroundColor:'#5177E7',}}>
                        <Text style={{
                            flex:0,
                            flexDirection:'row',
                            marginTop:8,
                            marginLeft:22,
                            fontSize:18,
                            // padding:5,
                            color:'white',
                        }}>
                            {'Save'}
                        </Text>
                    </TouchableOpacity>
                    </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      flex: 1,
      backgroundColor: '#E5E5E5',
    },
    btn: {
        width:80,
        height:40,
        marginLeft:20,
        borderRadius:5,
        shadowColor:'black',
        elevation:5,
    },
    
    text_input: {
        justifyContent:'flex-start',
        alignItems:'center',
        minHeight:200,
        alignSelf:'center',
        width:'90%',
        color:'grey',
        marginLeft:20,
        marginTop:150,
        padding:20,
        backgroundColor: 'white',
        fontFamily: 'Poppins-Regular',
        borderRadius:10,
        textAlignVertical:'top',
        shadowColor:'black',
        elevation:3,
    },
    pickdate:{
        width:155,
        height:60,
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        shadowColor:'black',
        shadowOpacity:5,
        elevation:3,
        borderWidth:0,
        marginLeft:28,
        // flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
    }
}
)