import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable, TextInput } from 'react-native';

import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';



const AddBooks = ({navigation}) => {

   
   //for category in 4th row
    const [category, setcategory] = useState([
        { label: 'Fiction', key: 'Fiction' },
        { label: 'Philosophy', key: 'Philosophy' },
        { label: 'history', key: 'History' },
      ]);
    
//for condition in 5th row
const [condition, setcondition] = useState([
    { label: 'Good', key: 'Good' },
    { label: 'Bad', key: 'Bad' },
    { label: 'Worse', key: 'Worse' },
  ]);
  //date picker
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [date, setDate] = React.useState('21 May 2021')
    let index = 0;
    const dateMonths = {
        1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'June', 7: 'July', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec',
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", date.toString());
        setDate(date.getDate() + " " + dateMonths[date.getMonth() + 1] + " " + date.getFullYear())
        hideDatePicker();
    };

    return (



        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
           
            
<View style={styles.header}
          // style={{
          //   backgroundColor: institute ? institute.themeColor : 'black',
          //   ...styles.header,
          // }}
          
          >
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
            Add Books
          </Text>
        </View>

<ScrollView>


            <View style={{ justifyContent: 'space-around', alignContent: 'center' }}>

   {/* 1st row */}
   <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>ISBN Number </Text>
                    <Text style={styles.section_heading1}>Added On</Text>
                </View>
                <View style={{ flexDirection: 'row' }} >

                    <TextInput
                        style={styles.input}
                        placeholder="978-0-13-60197"


                    />
                    <TouchableOpacity style={styles.pickdate} onPress={showDatePicker}>
                        <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                            placeholder={date}

                        />
                        <Feather size={18} color="black" name="calendar"
                            style={{
                                marginTop: 16,
                                marginRight: 0,
                            }}


                        ></Feather>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            style={styles.pickdate}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </TouchableOpacity>

                </View>

    {/* 1st row ended */}



  {/* 2nd row starts */}

                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>Name of the Book</Text>
                </View>

                <View style={{ marginHorizontal: 10, ...styles.shadow }}>
                    <View style={styles.search}>
                        <TextInput
                            style={{ ...styles.search_input, fontFamily: 'Poppins-Regular' }}
                            placeholder="Harry Potter and Goblet of Fire"

                        />
                    </View>
                </View>
{/* 2nd row ends
3rd row starts */}
                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>Edition </Text>
                    <Text style={styles.section_heading1}>Author</Text>
                </View>
                <View style={{ flexDirection: 'row' }} >

                    <TextInput
                        style={styles.input}
                        placeholder="First"


                    />
                    <TextInput
                        style={styles.input}
                        placeholder="J.K. Rowling"

                    />

                </View>
    {/* 3rd row ends
    4th row starts */}

<View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>Category </Text>
                    <Text style={styles.section_heading4}>Publisher</Text>
                </View>
                <View style={{ flexDirection: 'row' }} >

<View style={{paddingHorizontal:10}}>
                    <ModalSelector
              data={category}
              initValue="Fiction"
              onChange={option => {
                // setclass(option.key);
              }}
              style={styles.card}
              initValueTextStyle={styles.SelectedValueSmall}
              selectTextStyle={styles.SelectedValueSmall}
            />
    </View>       
                    {/* <TextInput
                        style={styles.input}
                        placeholder="First"


                    /> */}
                    {/* <View style={styles.search}> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Evergreen Publications"

                    />
                    {/* </View> */}

                </View>

                {/* 4th row ends */}

{/* 5th row starts */}

<View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>Shelf No. </Text>
                    <Text style={styles.section_heading1}>{'          '}Condition</Text>
                    <Text style={styles.section_heading1}>No. of Copies</Text>
                </View>
                <View style={{ flexDirection: 'row' }} >

                    <TextInput
                        style={styles.input}
                        placeholder="78-A"


                    />
                    
                    <ModalSelector
              data={condition}
              initValue="Good"
              onChange={option => {
                // setclass(option.key);
              }}
              style={styles.card}
              initValueTextStyle={styles.SelectedValueSmall}
              selectTextStyle={styles.SelectedValueSmall}
            />
                    <TextInput
                        style={styles.input}
                        placeholder="450"

                    />

                </View>





{/* 5th row ends */}



{/* 6th row starts */}
<View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>Book Position </Text>
                    <Text style={styles.section_heading1}>Language</Text>
                </View>
                <View style={{ flexDirection: 'row' }} >

                    <TextInput
                        style={styles.input}
                        placeholder="45-B,78-A"


                    />
                    <TextInput
                        style={styles.input}
                        placeholder="English"

                    />

                </View>
{/* 
                6th row ends
                7th row starts */}

<View style={{ width: "100%", paddingTop: 15, flexDirection: 'row' }}>
                    <Text style={styles.section_heading}>Price of per copy </Text>
                    <Text style={styles.section_heading2}>Bill No.</Text>
                </View>
                <View style={{ flexDirection: 'row' }} >

                    <TextInput
                        style={styles.input}
                        placeholder="699.00 Rs"


                    />
                    <TextInput
                        style={styles.input}
                        placeholder="GSTIN45616465"

                    />

                </View>

                {/* 7th row ends */}


                <View style={styles.fixToText}>
                    <Pressable style={styles.button1} >
                        <Text style={styles.text1}>Delete</Text>
                    </Pressable>
                    <Pressable style={styles.button}  onPress={() => {
              navigation.navigate('IssuedBooksAdd');
            }}>
                        <Text style={styles.text}>CheckOut</Text>
                    </Pressable>


                </View>

            </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',


    },
    button1: {

    marginTop:0,
    marginBottom:0,
       
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        alignSelf: 'flex-end',
        padding: 3,
        paddingHorizontal: 25,
        paddingVertical:2,
        borderRadius: 4,
        marginRight: 30,
        height:46,
        borderColor:'#d2691e',
        borderWidth:1.5
        
    },
    text1: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 21,
      letterSpacing: 0.25,
      color: '#d2691e',
    },
    button: {

        
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#5177E7',
    },
    text: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: '500',
        letterSpacing: 0.25,
        color: 'white',
    },

    fixToText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 8,
        margin: 40,



    },
    search: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderColor: '#58636D',
        borderRadius: 8,
        borderWidth: 0.3,

    },

    section_heading: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 18,
        textAlign: 'left',
        color: 'rgba(88, 99, 109, 0.85)',
        paddingHorizontal: 15,
        marginBottom: 5,
    },

    search_input: {
        fontFamily: 'Poppins-Regular',
        borderRadius: 8,
        height: 50,
        fontSize: 15,


        paddingTop: 5,
        paddingHorizontal: 0,
        width: '90%',
        textAlign: 'left'

    },
    section_heading1: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 18,
        textAlign: 'center',
        color: 'rgba(88, 99, 109, 0.85)',

        marginBottom: 5,
    },
    section_heading4: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 18,
        textAlign: 'center',
       marginLeft:-100,


        color: 'rgba(88, 99, 109, 0.85)',



    },
   
    section_heading2: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 18,
        textAlign: 'center',
        marginRight: 35,


        color: 'rgba(88, 99, 109, 0.85)',



    },
   
   
    pickdate1: {
        width: 120,
        height: 50,
        backgroundColor: 'white',
        borderColor: '#58636D',
        borderRadius: 8,
        borderWidth: 0.3,
        marginLeft: 22,
        marginRight: 12,
        paddingHorizontal: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },


    input: {
        flex: 1,
        height: 50,
        margin: 12,
        width: 120,
        marginTop: 0,
        marginBottom: 0,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderColor: '#58636D',
        borderRadius: 8,
        borderWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Poppins-Regular',


    },
    inputfourthrow: {
        flex: 1,
        height: 50,
        margin: 12,
        width: 120,
        marginTop: 0,
        marginBottom: 0,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderColor: '#58636D',
        borderRadius: 8,
        borderWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Poppins-Regular',


    },

    pickdate: {
        width: 120,
        fontFamily: 'Poppins-Regular',
        height: 50,
        backgroundColor: 'white',
        borderColor: '#58636D',
        borderRadius: 8,
        borderWidth: 0.3,
        marginLeft: 12,
        marginRight: 0,
        paddingHorizontal: 20,

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    

    header: {
        height: 69,
        flexDirection: 'row',
        backgroundColor:'#FF5733'
      },
      SelectedValue: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 18,
        lineHeight: 27,
        padding: 10,
        color: 'rgba(88, 99, 109, 0.85)',
      },
      SelectedValueSmall: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight:'200',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 30,
        paddingTop: 3,
        color: 'rgba(88, 99, 109, 0.85)',
      },
    
  card: {
    shadowColor: '#999',
    height:50,
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


});




export default AddBooks;