import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable, TextInput } from 'react-native';

import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
//redux
import { useSelector } from 'react-redux';


import patch from '../../../../../services/helpers/request/patch'
import deleteReq from '../../../../../services/helpers/request/delete'
import read from '../../../../../services/localstorage/read'
import LoaderHook from '../../../../../components/LoadingScreen/LoadingScreen';
import get from '../../../../../services/helpers/request/get';


const EditBooks = ({ route, navigation }) => {

    //theming
    const institute = useSelector(state => state.institute);
    //loading screen
    const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

    //dropdown values

    //modal selector values to be called from api
    const [categories, setcategories] = useState([]);
    //no api
    const [conditions, setconditions] = useState([
        { label: 'As new', key: 'As new' },
        { label: 'Fine', key: 'Fine' },
        { label: 'Very Good', key: 'Very Good' },
        { label: 'Good', key: 'Good' },
        { label: 'Fair', key: 'Fair' },
        { label: 'Poor', key: 'Poor' },
        { label: 'Missing', key: 'Missing' },
        { label: 'Lost', key: 'Lost' },
    ]);
    //data to be sent
    const [category, setcategory] = useState();
    const [condition, setcondition] = useState();

    //for textinputs

    const [id, setId] = useState('')
    const [author, setauthor] = useState('')
    const [billnum, setbillnum] = useState('')
    const [booknum, setbooknum] = useState('')

    const [copies, setcopies] = useState('')
    const [cost, setcost] = useState('')
    const [edition, setedition] = useState('')
    const [isbn, setisbn] = useState('')
    const [language, setlanguage] = useState('')
    const [obtcopy, setobtcopy] = useState('')
    const [pos, setpos] = useState('')
    const [pub, setpub] = useState('')

    const [shelf, setshelf] = useState('')

    const [title, settitle] = useState('')

    //date picker
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [date, setDate] = React.useState('21 May 2021')
    let index = 0;
    const dateMonths = {
        1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'June', 7: 'July', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec',
    }

  //date picker
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(4, 15);
  };
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
    const [categoryObject, setCatergoryObject] = useState({})

    //on load


    useEffect(async () => {
        
        let books = route.params.books
        console.log(books.inbn);
        console.log('Edit books ', books)
        setauthor(books.author)
        setbillnum(books.billNumber)
        setbooknum(books.bookNumber)
        setcategory(books.category)
        setcondition(books.condition)
        setcopies(books.copies)
        setcost(books.cost)
        setedition(books.edition)
        setisbn(books.isbn)
        setlanguage(books.language)
        setobtcopy(books.obtainedcopies)
        setpos(books.position)
        setpub(books.publisher)
        //set purchase date
        setshelf(books.shelf)
        settitle(books.title)
        setId(books._id)
        setDate(books.purchaseDate)


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
            setcategories(catArray)
        } catch (err) {
            alert('Cannot get Book categories!!')
        }
    }, [])


    //on save button press action
    let handleUpdate = async () => {
        setLoadingScreen();
        try {
            let slug = `/library/books/${id}`;
            let token = await read('token');
            let data = {
                author: author,
                billNumber: billnum,
                bookNumber: booknum,
                category: category,
                condition: condition,
                copies: copies,
                cost: cost,
                edition: edition,
                isbn: isbn,
                language: language,
                obtainedcopies: obtcopy,
                position: pos,
                publisher: pub,
                shelf: shelf,
                title: title,




            };
            let res = await patch(slug, data, token);
            if (res.error) {
                alert(res.error)
            } else if (res._id) {
                alert(' books added updated!!')
                navigation.replace('LibraryMain');
            }
        } catch (err) {
            alert('Cannot Update !!' + err);
        }
        hideLoadingScreen();
    }
    //delete
    let handleDelete = async () => {
        setLoadingScreen();
        try {
            let slug = `/library/books/${id}`;
            let token = await read('token')
            let res = await deleteReq(slug, token)
            if (res.error) {
                alert(res.error)
            } else {
                alert('Deleted')
                navigation.navigate('LibraryMain');
            }
        } catch (err) {
            alert('Cannot Delete !!')
        }
        hideLoadingScreen();
    }



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
                    Edit Books
                </Text>
            </View>

            <ScrollView>
                {loadingScreen}
                <View style={{ justifyContent: 'space-around', alignContent: 'center' }}>

                    {/* 1st row */}
                    <View style={{ width: "100%", paddingTop: 20, flexDirection: 'row' }}>
                        <Text style={styles.section_heading}>ISBN Number </Text>
                        <Text style={styles.section_heading1}>Added On</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >

                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="978-0-13-60197"
                            placeholderTextColor='grey'
                            color='black'
                            keyboardType="numeric"
                            value={isbn.toString()}
                            onChangeText={val => setisbn(val)}

                        />
                        <TouchableOpacity style={[styles.pickdate, styles.shadow]} onPress={showDatePicker}>
                            <TextInput style={{ marginLeft: 0, fontFamily: 'Poppins-Regular' }}
                                //placeholder={parseDate(date)}
                                value={parseDate(date)}
                                placeholderTextColor='grey'
                                color='black'
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

                                value={title.toString()}
                                onChangeText={val => settitle(val)}

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

                            value={edition.toString()}
                            onChangeText={val => setedition(val)}


                        />
                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="J.K. Rowling"
                            placeholderTextColor='grey'
                            color='black'
                            value={author.toString()}
                            onChangeText={val => setauthor(val)}

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
                                data={categories}
                                initValue="Fiction"
                                onChange={option => {
                                    setBookCategory(option.key)
                                }}
                                style={styles.card}
                                initValueTextStyle={styles.SelectedValueSmall}
                                selectTextStyle={styles.SelectedValueSmall}
                            />
                        </View>

                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="Evergreen Publications"
                            placeholderTextColor='grey'
                            color='black'

                            value={pub.toString()}
                            onChangeText={val => setpub(val)}
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
                            keyboardType="numeric"
                            value={shelf.toString()}
                            onChangeText={val => setshelf(val)}
                        />

                        <ModalSelector
                            data={conditions}
                            initValue={condition}
                            onChange={option => {
                                setcondition(option.key);
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
                            keyboardType="numeric"
                            value={copies.toString()}
                            onChangeText={val => setcopies(val)}
                        />

                    </View>





                    {/* 5th row ends */}



                    {/* 6th row starts */}
                    <View style={{ width: "100%", marginTop: 20, flexDirection: 'row' }}>
                        <Text style={styles.section_heading}>Book Position </Text>
                        <Text style={styles.section_heading1}>Language</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >

                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="45-B,78-A"
                            placeholderTextColor='grey'
                            color='black'
                            keyboardType="numeric"
                            value={pos.toString()}
                            onChangeText={val => setpos(val)}

                        />
                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="English"
                            placeholderTextColor='grey'
                            color='black'
                            value={language.toString()}
                            onChangeText={val => setlanguage(val)}
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
                            keyboardType="numeric"
                            value={cost.toString()}
                            onChangeText={val => setcost(val)}

                        />
                        <TextInput
                            style={[styles.input, styles.shadow]}
                            placeholder="GSTIN45616465"
                            placeholderTextColor='grey'
                            color='black'
                            keyboardType="numeric"
                            value={billnum.toString()}
                            onChangeText={val => setbillnum(val)}
                        />

                    </View>

                    {/* 7th row ends */}


                    <View style={styles.fixToText}>
                        <Pressable style={styles.button1} onPress={handleDelete}>
                            <Text style={styles.text1}>Delete</Text>
                        </Pressable>
                        <Pressable style={{ backgroundColor: institute ? institute.themeColor : 'blue', ...styles.button }} onPress={handleUpdate}>
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
        // backgroundColor: '#5177E7',
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
        fontFamily: 'Poppins-Regular',


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
        borderRadius: 8,
        // borderWidth: 0.3,
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
        shadowOpacity: 1,
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




export default EditBooks;