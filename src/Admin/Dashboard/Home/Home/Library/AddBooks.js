import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable, TextInput } from 'react-native';

import ModalSelector from 'react-native-modal-selector';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';

import get from '../../../../../services/helpers/request/get'
import post from '../../../../../services/helpers/request/post'
import read from '../../../../../services/localstorage/read'

import { useSelector } from 'react-redux';


const AddBooks = ({ navigation }) => {

    const institute = useSelector((state) => state.institute)
    //dropdown values
    const [category, setcategory] = useState([]);
    const [condition, setcondition] = useState([
        { label: 'As new', key: 'As new' },
        { label: 'Fine', key: 'Fine' },
        { label: 'Very Good', key: 'Very Good' },
        { label: 'Good', key: 'Good' },
        { label: 'Fair', key: 'Fair' },
        { label: 'Poor', key: 'Poor' },
        { label: 'Missing', key: 'Missing' },
        { label: 'Lost', key: 'Lost' },
    ]);

    //date picker
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [date, setDate] = React.useState('21 May 2021')


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        setDate(date.toString())
        hideDatePicker();
    };

    const [isbn, setIsbn] = useState('')
    const [title, setTitle] = useState('')
    const [edition, setEdition] = useState('')
    const [publisher, setPublisher] = useState('')
    const [shelf, setShelf] = useState('')
    const [bookCost, setBookCost] = useState('')
    const [bookCondition, setBookCondition] = useState('')
    const [billNo, setBillNo] = useState('')
    const [bookNo, setBookNo] = useState('')
    const [author, setAuthor] = useState('')
    const [bookCategory, setBookCategory] = useState('')
    const [copies, setCopies] = useState('')
    const [position, setPosition] = useState('')
    const [language, setLanguage] = useState('')

    const [categoryObject, setCatergoryObject] = useState({})

    let handleSubmit = async () => {
        try {
            if (!author || !billNo || !bookNo || !bookCategory || !bookCondition
                 || !copies || !bookCost || !edition || !isbn || !language 
                 || !position || !publisher || !date || !shelf || !title ) {
                alert('All fields are required!!');
                return;
              }
            let slug = '/library/books'
            let token = await read('token')
            let data = {
                author: author,
                billNumber: billNo,
                bookNumber: bookNo,
                category: bookCategory,
                condition: bookCondition,
                copies: copies,
                cost: bookCost,
                edition: edition,
                isbn: isbn,
                language: language,
                position: position,
                publisher: publisher,
                purchaseDate: date,
                shelf: shelf,
                title: title
            }
            console.log('Books Data ', data)
            let res = await post(slug, data, token)
            console.log('Book Res ', res)
            alert('book added!!');
            navigation.replace('LibraryMain')
        } catch (err) {
            alert('Cannot Save !!' + err)
        }
    }

    useEffect(async () => {
        try {
            let slug = '/library/category'
            let token = await read('token')
            let res = await get(slug, token)
            let catArray = []
            res && res.map((cat) => {
                catArray.push({
                    label: cat.name,
                    key: cat._id
                })
            })
            setCatergoryObject(res)
            setcategory(catArray)
        } catch (err) {
            alert('Cannot get Book categories!!')
        }
    }, [])

    return (
        <View style={{ justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(249, 249, 249, 1)', }}>


            <View
                style={{
                    backgroundColor: institute ? institute.themeColor : 'black',
                    ...styles.header,
                }}

            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('LibraryMain');
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
                    <View style={{ width: "100%", paddingTop: 20, flexDirection: 'row' }}>
                        <Text style={styles.section_heading}>ISBN Number </Text>
                        <Text style={styles.section_heading1}>Purchased On</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >

                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="978-0-13-60197"
                            placeholderTextColor='grey'
                            color='black'
                            keyboardType='numeric'
                            onChangeText={(val) => setIsbn(val)}
                        />
                        <TouchableOpacity style={[styles.pickdate, styles.shadow]} onPress={showDatePicker}>
                            <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                                placeholder={date}
                                placeholderTextColor='grey'
                                color='black'
                                //value={date}
                                editable={false}
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

                    <View style={{ width: "100%", marginTop: 20, flexDirection: 'row' }}>
                        <Text style={styles.section_heading}>Name of the Book</Text>
                    </View>

                    <View style={{ marginHorizontal: 10 }}>
                        <View style={[styles.search, styles.shadow]}>
                            <TextInput
                                style={{ ...styles.search_input, fontFamily: 'Poppins-Regular' }}
                                placeholder="Harry Potter and Goblet of Fire"
                                placeholderTextColor='grey'
                                color='black'
                                onChangeText={(val) => setTitle(val)}
                            />
                        </View>
                    </View>
                    {/* 2nd row ends
3rd row starts */}
                    <View style={{ width: "100%", marginTop: 20, flexDirection: 'row' }}>
                        <Text style={styles.section_heading}>Edition </Text>
                        <Text style={styles.section_heading1}>Author</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >

                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="First"
                            placeholderTextColor='grey'
                            color='black'
                            onChangeText={(val) => setEdition(val)}
                        />
                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="J.K. Rowling"
                            placeholderTextColor='grey'
                            color='black'
                            onChangeText={(val) => setAuthor(val)}
                        />

                    </View>
                    {/* 3rd row ends
    4th row starts */}

                    <View style={{ width: "100%", marginTop: 20, flexDirection: 'row' }}>
                        <Text style={styles.section_heading}>Category </Text>
                        <Text style={styles.section_heading4}>Publisher</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >

                        <View style={{ paddingHorizontal: 10 }}>
                            <ModalSelector
                                data={category}
                                initValue="Catergory"
                                onChange={option => {
                                    setBookCategory(option.key)
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
                            style={[styles.input, styles.shadow]}
                            placeholder="Evergreen Publications"
                            placeholderTextColor='grey'
                            color='black'
                            onChangeText={(val) => setPublisher(val)}
                        />
                        {/* </View> */}

                    </View>

                    {/* 4th row ends */}

                    {/* 5th row starts */}

                    <View style={{ width: "100%", marginTop: 20, flexDirection: 'row' }}>
                        <Text style={styles.section_heading}>Shelf No. </Text>
                        <Text style={styles.section_heading1}>{'          '}Condition</Text>
                        <Text style={styles.section_heading1}>No. of Copies</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >

                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="78-A"
                            placeholderTextColor='grey'
                            color='black'
                            onChangeText={(val) => setShelf(val)}

                        />

                        <ModalSelector
                            data={condition}
                            initValue="Good"
                            onChange={option => {
                                setBookCondition(option.key)
                            }}
                            style={styles.card}
                            initValueTextStyle={styles.SelectedValueSmall}
                            selectTextStyle={styles.SelectedValueSmall}
                        />
                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="450"
                            placeholderTextColor='grey'
                            color='black'
                            keyboardType='numeric'
                            onChangeText={(val) => setCopies(val)}
                        />
                    </View>
                    {/* 5th row ends */}
                    {/* 6th row starts */}
                    <View style={{ width: "100%", marginTop: 20, flexDirection: 'row' }}>
                        <Text style={styles.section_heading}>Book Position </Text>
                        <Text style={styles.section_heading1}>Book No.</Text>
                        <Text style={styles.section_heading1}>Language.</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >

                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="45-B,78-A"
                            placeholderTextColor='grey'
                            color='black'
                            onChangeText={(val) => setPosition(val)}
                        />
                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="Book No."
                            placeholderTextColor='grey'
                            color='black'
                            keyboardType='numeric'
                            onChangeText={(val) => setBookNo(val)}
                        />
                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="English"
                            placeholderTextColor='grey'
                            color='black'
                            onChangeText={(val) => setLanguage(val)}
                        />

                    </View>
                    {/* 
                6th row ends
                7th row starts */}

                    <View style={{ width: "100%", marginTop: 20, flexDirection: 'row' }}>
                        <Text style={styles.section_heading}>Price of per copy </Text>
                        <Text style={styles.section_heading2}>Bill No.</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >

                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="699.00 Rs"
                            placeholderTextColor='grey'
                            color='black'
                            keyboardType='numeric'
                            onChangeText={(val) => setBookCost(val)}
                        />
                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="GSTIN45616465"
                            placeholderTextColor='grey'
                            color='black'
                            keyboardType='numeric'
                            onChangeText={(val) => setBillNo(val)}
                        />
                    </View>

                    {/* 7th row ends */}
                    <View style={styles.fixToText}>
                        <Pressable style={{ backgroundColor: institute ? institute.themeColor : '#5177E7', ...styles.button }} onPress={handleSubmit}>
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
        marginTop: 0,
        marginBottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        alignSelf: 'flex-end',
        padding: 3,
        paddingHorizontal: 25,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 30,
        height: 46,
        borderColor: '#d2691e',
        borderWidth: 1.5

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
        borderTopEndRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderTopStartRadius: 8,
        borderBottomEndRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomStartRadius: 8,
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
        marginLeft: -100,
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
        borderTopEndRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderTopStartRadius: 8,
        borderBottomEndRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomStartRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Poppins-Regular'
    },
    shadow: {
        elevation: 5,
        borderRadius: 0,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
    },
    pickdate: {
        width: 120,
        fontFamily: 'Poppins-Regular',
        height: 50,
        backgroundColor: 'white',
        borderColor: '#58636D',
        borderTopEndRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderTopStartRadius: 8,
        borderBottomEndRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomStartRadius: 8,
        marginLeft: 12,
        marginRight: 10,
        paddingHorizontal: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    header: {
        height: 69,
        flexDirection: 'row',
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
        fontWeight: '200',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 30,
        paddingTop: 3,
        color: 'rgba(88, 99, 109, 0.85)',
    },

    card: {
        shadowColor: '#000',
        height: 50,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        // borderColor: '#ccc',
        // borderWidth: 1,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        // overflow: 'hidden',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        minWidth: '30%',
    },


});




export default AddBooks;