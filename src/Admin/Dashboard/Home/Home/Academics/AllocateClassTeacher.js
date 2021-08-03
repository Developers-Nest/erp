
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
//redux
import { useSelector } from 'react-redux';


const AllocateClassTeacher = ({ navigation }) => {
  //theming
  const institute = useSelector(state => state.institute);

    const [user, setuser] = useState([
        { label: 'Fiction', key: 'Fiction' },
        { label: 'Philosophy', key: 'Philosophy' },
        { label: 'history', key: 'History' },
    ]);
    const [department, setdepartment] = useState([
        { label: 'Fiction', key: 'Fiction' },
        { label: 'Philosophy', key: 'Philosophy' },
        { label: 'history', key: 'History' },
    ]);
    const [employee, setemployee] = useState([
        { label: 'Fiction', key: 'Fiction' },
        { label: 'Philosophy', key: 'Philosophy' },
        { label: 'history', key: 'History' },
    ]);

    return (



        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
           
                {/* header start */}

                <View
          style={{
            backgroundColor: institute ? institute.themeColor : 'black',
            ...styles.header,
          }}>
        <View style={{flexDirection:'row',alignItems:'center',paddingLeft:10}} >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ClassTeacherAllocation');
            }}>
            <AntDesign
              size={24}
              color="white"
              name="left"
              style={{
                alignSelf: 'center',
                fontSize: 25,
                color: 'white',
                // paddingLeft: 10,
                // paddingTop: 23,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontStyle: 'normal',
              fontSize: 28,
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 10,
              color: 'white',
              fontFamily: 'NunitoSans-Regular',
            }}>
           Class Teacher Allocation
          </Text>
          </View>
      
           </View>

        {/* header ends */}
            <ScrollView>

                <View style={{ flex:1,justifyContent: 'center'}}>

                 

                
                    <View style={{ flexDirection:'column', paddingTop: 15 }} >
                    <Text style={styles.section_heading}>Course's Name </Text>
                        <ModalSelector
                            data={user}
                            initValue="Introduction to the Python"
                            onChange={option => {
                                // setclass(option.key);
                            }}
                            style={styles.card}
                            initValueTextStyle={styles.SelectedValue}
                            selectTextStyle={styles.SelectedValue}
                        />

                    </View>
                    <View style={{  justifyContent: 'center', paddingTop: 15 }} >
                    <Text style={styles.section_heading}>Batch's Name </Text>
<ModalSelector
    data={department}
    initValue="Name of the Batch"
    onChange={option => {
        // setclass(option.key);
    }}
    style={styles.card}
    initValueTextStyle={styles.SelectedValue}
    selectTextStyle={styles.SelectedValue}
/>

</View>
<View style={{  justifyContent: 'center', paddingTop: 15 }} >
<Text style={styles.section_heading}>Class Teacher </Text>
<ModalSelector
    data={employee}
    initValue="Teacher's Name"
    onChange={option => {
        // setclass(option.key);
    }}
    style={styles.card}
    initValueTextStyle={styles.SelectedValue}
    selectTextStyle={styles.SelectedValue}
/>

</View>
                    <View style={styles.fixToText}>
                        <Pressable style={styles.button} >
                            <Text style={styles.text}>Save</Text>
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

    
    SelectedValue: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '200',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 30,
        paddingTop: 3,
        color: 'rgba(88, 99, 109, 0.85)',
    },

    card: {
        shadowColor: '#999',
        height: 50,
        shadowOffset: { width: 0, height: 1 },
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
        // justifyContent: 'center',
        // alignContent:'center',
        margin: 0,
        padding: 0,
        alignSelf:'center',
        width: '94%'
    },


    header: {
        height: 69,
        flexDirection: 'row',
    },

});




export default AllocateClassTeacher;