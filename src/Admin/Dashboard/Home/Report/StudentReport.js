import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity
    
} from 'react-native';
import { Searchbar,Button,Card, Title} from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector';
// date picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function StudentReport({navigation}) {

    const [className, setclassName] = useState(null);
    const [classes, setclasses] = useState([
        { label: 'Class1', key: 'Class1' },
        { label: 'Class2', key: 'Class2' },
        { label: 'Class3', key: 'Class3' },
    ]);

    const [batch, setbatch] = useState(null);
    const [batches, setbatches] = useState([
        { label: 'Batch1', key: 'Batch1' },
        { label: 'Batch2', key: 'Batch2' },
        { label: 'Batch3', key: 'Batch3' },
    ]);

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const [showdatePicker, setShowDatePicker] = useState(false);

    let handleDatePicker = async date => {
        showLoadingScreen();
        console.log('Date ', date);
        await setDateString(date.toString());
        await setDate(date.toString());
        setShowDatePicker(false);
        hideLoadingScreen();
      };
  
   const Details=({
       Name:"karan",
       Category : "1st",
       Religion:"Christian",
       Parents : "Pratyush",
       DOB : "10/02/2000",
       JoiningDate :"11/02/2000",
       Transport:"Tractor",
       Bus:'VIT bus',
       Driver:'Shivansh',
       PhoneDri:'7668532731',
       Destination:'130,Avtar Singh Road',
       YourDetails:'Good Animal',
       Phone:"nahi pata",
       Email:'karan@gmail.com',
       Address:'130,Avtar Singh Road'

  
   })

    return (
        <View style={styles.container}>
                     
<View style={styles.header}
          // style={{
          //   backgroundColor: institute ? institute.themeColor : 'black',
          //   ...styles.header,
          // }}
          
          >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ReportList');
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
            Student Report
          </Text>
        </View> 
 
            <View style={styles.ModalContainer}>
                    <ModalSelector
                        data={classes}
                        initValue="Class"
                        onChange={option => {
                            setclass(option.key);
                        }}
                        style={styles.Modal}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />
                   

                    <ModalSelector
                        data={batches}
                        initValue="Batch"
                        onChange={option => {
                            setbatch(option.key);
                        }}
                        style={styles.Modal}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />
                    
                    <Searchbar
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={styles.searchbar}
                    
                    />
                    </View>
            
            <ScrollView>
            <View style={styles.InfoCards}>
            <Card style={styles.cardContent}>
                    <Card.Content>
                    <Text>
                            Name :{Details.Name}
                        </Text> 
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>
                            Category :{Details.Category}
                        </Text> 
                        <Text>
                            Religion: {Details.Religion}
                        </Text> 
                        </View>
                        <Text>
                            Guardian/Parents :{Details.Parents}
                        </Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>
                            DOB :{Details.DOB}
                        </Text> 
                        <Text>
                            Joining Date :{Details.JoiningDate}
                        </Text> 
                        </View>
                        <View style={{marginTop:10,marginBottom:10,borderWidth:0.5,borderColor:'grey'}}></View>
                        <Text>
                            Transport Details :{Details.Transport
                            }
                        </Text> 
                        <Text>
                            Bus :{Details.Bus}
                        </Text> 
                        <Text>
                            Driver :{Details.Driver}
                        </Text> 
                        <Text>
                            Phone :{Details.PhoneDri}
                        </Text> 
                        <Text>
                            Destination :{Details.Destination}
                        </Text> 
                        <View style={{marginTop:10,marginBottom:10,borderWidth:0.5,borderColor:'grey'}}></View>
                        <Text>
                           Your Details :{Details.YourDetails}
                        </Text> 
                        <Text>
                            Phone :{Details.Phone}
                        </Text> 
                        <Text>
                          Email :{Details.Email}
                        </Text> 
                        <Text>
                          Address :{Details.Address}
                        </Text> 
                       
                    </Card.Content>
                </Card>

                <Card style={styles.cardContent}>
                    <Card.Content>
                    <Text>
                            Name
                        </Text> 
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>
                            Category
                        </Text> 
                        <Text>
                            Religion
                        </Text> 
                        </View>
                        <Text>
                            Guardian/Parents
                        </Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>
                            DOB :
                        </Text> 
                        <Text>
                            Joining Date
                        </Text> 
                        </View>
                        <View style={{marginTop:10,marginBottom:10,borderWidth:0.5,borderColor:'grey'}}></View>
                        <Text>
                            Transport Details
                        </Text> 
                        <Text>
                            Bus :
                        </Text> 
                        <Text>
                            Driver :
                        </Text> 
                        <Text>
                            Phone :
                        </Text> 
                        <Text>
                            Destination :
                        </Text> 
                        <View style={{marginTop:10,marginBottom:10,borderWidth:0.5,borderColor:'grey'}}></View>
                        <Text>
                           Your Details :
                        </Text> 
                        <Text>
                            Phone :
                        </Text> 
                        <Text>
                          Email :
                        </Text> 
                        <Text>
                          Address :
                        </Text> 
                       
                    </Card.Content>
                </Card>

            </View>
            </ScrollView>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    },

    header: {
        height: 65,
        flexDirection: 'row',
        backgroundColor:'#FF5733'
      },
    ModalContainer: {
        marginTop: 10,
        flexDirection: 'column',
        justifyContent:'center',
        marginLeft:5
    },
    Modal :{
        backgroundColor:'white',
        margin:5,
        borderRadius:5
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
    searchbar: {
        margin:8,
       
    },
    InfoCards: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center'
},
cardContent: {
    borderRadius: 15,
    marginTop: 10,
    marginLeft:10,
    marginRight:10,
    

},
});