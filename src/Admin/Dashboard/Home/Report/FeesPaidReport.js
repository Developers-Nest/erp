import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity
    
} from 'react-native';
import { Searchbar,Button,Card, Title} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalSelector from 'react-native-modal-selector';
// date picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { useSelector } from 'react-redux';


export default function FeesPaidReport({navigation}) {

//theming
const institute = useSelector(state => state.institute);

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
       Name:"Pratyush",
       Date:"12/11/1999",
       Amount:290000,
   })

    return (
        <View style={styles.container}>
                     
<View 
          style={{
            backgroundColor: institute ? institute.themeColor : 'black',
            ...styles.header,
          }}
          
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
            Fees Paid Report
          </Text>
        </View> 
 
            <View style={styles.CardContainer}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 10,
                    }}>
                    <ModalSelector
                        data={classes}
                        initValue="Class"
                        onChange={option => {
                            setclass(option.key);
                        }}
                        style={styles.card}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />

                    <ModalSelector
                        data={batches}
                        initValue="Batch"
                        onChange={option => {
                            setbatch(option.key);
                        }}
                        style={styles.card}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />
                </View>
                <View style={styles.searchbar}>
                    <View style={{width:300}}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    
                    />
                    </View>
                    
              <View style={styles.date}>
                 {/* date picker */}
              <Button style={styles.dateButton}
                icon="calendar"
                mode="contained"
                color="white"
                onPress={() => setShowDatePicker(true)}>
              </Button>

              <DateTimePickerModal
                isVisible={showdatePicker}
                mode="date"
                onConfirm={handleDatePicker}
                onCancel={() => setShowDatePicker(!showdatePicker)}
              />
                </View>
                </View>
            </View>
            <ScrollView>
            <View style={styles.InfoCards}>
            <Card style={styles.cardContent}>
                    <Card.Content>
                        <Title>{Details.Name}</Title>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Title style={{fontSize:18,fontWeight:'normal'}}>Date:{Details.Date}</Title>
                        <Title >{Details.Amount}</Title>
                        </View>
                    </Card.Content>
                </Card>

                <Card style={styles.cardContent}>
                    <Card.Content>
                        <Title>{Details.Name}</Title>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Title style={{fontSize:18,fontWeight:'normal'}}>Date:{Details.Date}</Title>
                        <Title >{Details.Amount}</Title>
                        </View>
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
        
      },
    CardContainer: {
        marginTop: 10,
        flexDirection: 'column',
    },
    card: {
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 5,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        width: 150,
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
    searchbar: {
        margin:15,
        flexDirection:'row',
        justifyContent:'space-evenly',
        
    },
    dateButton: {
        height:49,
        width:20,
        justifyContent:'space-evenly',
    },
    InfoCards: {
            flex: 1,
            flexDirection: 'column',
    },
    cardContent: {
            borderRadius: 15,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
    
    },
});