import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput
} from 'react-native';



import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// redux
import { useSelector } from 'react-redux';

//helpers
import get from '../../../../../services/helpers/request/get'
import read from '../../../../../services/localstorage/read'
import LoadingScreen from '../../../../../components/LoadingScreen/LoadingScreen'

export default function IssuedStatus({ navigation }) {
    const userInfo = useSelector(state => state.userInfo)
    //theming
    const institute = useSelector(state => state.institute);

    const [showContent, setShowContent] = React.useState('Due');
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen()

    const [dueBooks, setDueBooks] = useState([])
    const [clearedBooks, setClearedBooks] = useState([])
    //for search
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);


    useEffect(async () => {
        setLoadingScreen()
        try {
            let slug = `/library/issue`
            const token = await read('token')
            const res = await get(slug, token)
            console.log("Books ", res)
            let due = []
            let cleared = []
            res && res.map((book) => {
                if (book.returned) {
                    cleared.push(book)
                } else due.push(book)
            })
            console.log('Due ', due)
            console.log('Cleared ', cleared)
            setDueBooks(due)
            setClearedBooks(cleared)
        } catch (err) {
            alert('Cannot get Books!!')
        }
        hideLoadingScreen()
    }, [])

    function Cleared() {
        const [searchQuery, setSearchQuery] = React.useState('');

        const onChangeSearch = query => setSearchQuery(query);

        return (
            <View style={styles.container}>
                {filteredUsers.length > 0 ?
                    (
                        <ScrollView>
                            {
                                clearedBooks.length > 0 ? filteredUsers.map((book) => (
                                    <View style={styles.section} key={book._id}>
                                        <View style={styles.details}>
                                            <View style={styles.userinhostels}>
                                                <View style={styles.differentusers}>
                                                    <Text> </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            color: '#505069',
                                                            fontFamily: 'OpenSans-Regular',
                                                        }}>
                                                        ID: {book.bookNumber}
                                                    </Text>
                                                </View>
                                                <View style={styles.differentusers}>
                                                    <Text
                                                        style={{
                                                            fontWeight: 'normal',
                                                            fontSize: 18,
                                                            color: '#211C5A',
                                                            fontFamily: 'Poppins-Regular',
                                                        }}>
                                                        {' '}
                                                        Title: {book.bookName ? book.bookName.title : 'N/A'}
                                                    </Text>
                                                </View>



                                                <View style={styles.differentusers}>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            color: '#58626C',
                                                            fontFamily: 'Poppins-Regular',
                                                            paddingLeft: 5,
                                                        }}>
                                                        Issued: {book.issueDate ? book.issueDate.slice(0, 10) : 'N/A'}
                                                    </Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                color: '#58636D',
                                                                fontFamily: 'Poppins-Regular',
                                                            }}>
                                                            {' '}
                                                            Due: {book.dueDate ? book.dueDate.slice(0, 10) : 'N/A'}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )) : (<Text style={{ display: 'flex', textAlign: 'center' }}>Nothing to Display!</Text>)
                            }
                            <View style={{ height: 20 }} />
                        </ScrollView>
                    ) : (
                        <ScrollView>
                            {
                                clearedBooks.length > 0 ? clearedBooks.map((book) => (
                                    <View style={styles.section} key={book._id}>
                                        <View style={styles.details}>
                                            <View style={styles.userinhostels}>
                                                <View style={styles.differentusers}>
                                                    <Text> </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            color: '#505069',
                                                            fontFamily: 'OpenSans-Regular',
                                                        }}>
                                                        ID: {book.bookNumber}
                                                    </Text>
                                                </View>
                                                <View style={styles.differentusers}>
                                                    <Text
                                                        style={{
                                                            fontWeight: 'normal',
                                                            fontSize: 18,
                                                            color: '#211C5A',
                                                            fontFamily: 'Poppins-Regular',
                                                        }}>
                                                        {' '}
                                                        Title: {book.bookName ? book.bookName.title : 'N/A'}
                                                    </Text>
                                                </View>



                                                <View style={styles.differentusers}>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            color: '#58626C',
                                                            fontFamily: 'Poppins-Regular',
                                                            paddingLeft: 5,
                                                        }}>
                                                        Issued: {book.issueDate ? book.issueDate.slice(0, 10) : 'N/A'}
                                                    </Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                color: '#58636D',
                                                                fontFamily: 'Poppins-Regular',
                                                            }}>
                                                            {' '}
                                                            Due: {book.dueDate ? book.dueDate.slice(0, 10) : 'N/A'}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )) : (<Text style={{ display: 'flex', textAlign: 'center' }}>Nothing to Display!</Text>)
                            }
                            <View style={{ height: 20 }} />
                        </ScrollView>
                    )
                }

            </View>
        );
    }

    function Due() {
        const [searchQuery, setSearchQuery] = React.useState('');

        const onChangeSearch = query => setSearchQuery(query);

        return (
            <View style={styles.container}>
                {filteredUsers.length > 0 ?
                    (
                        <ScrollView>
                            {
                                dueBooks.length > 0 ? filteredUsers.map((book) => (
                                    <View style={styles.section} key={book._id}>
                                        <View style={styles.details}>
                                            <View style={styles.userinhostels}>
                                                <View style={styles.differentusers}>
                                                    <Text> </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            color: '#505069',
                                                            fontFamily: 'OpenSans-Regular',
                                                        }}>
                                                        ID: {book.bookNumber}
                                                    </Text>
                                                </View>
                                                <View style={styles.differentusers}>
                                                    <Text
                                                        style={{
                                                            fontWeight: 'normal',
                                                            fontSize: 18,
                                                            color: '#211C5A',
                                                            fontFamily: 'Poppins-Regular',
                                                        }}>
                                                        {' '}
                                                        Title: {book.bookName ? book.bookName.title : 'N/A'}
                                                    </Text>
                                                </View>


                                                <View style={styles.differentusers}>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            color: '#1F7C17',
                                                            fontFamily: 'Poppins-Regular',
                                                            paddingLeft: 5,
                                                        }}>
                                                        Issued: {book.issueDate ? book.issueDate.slice(0, 10) : 'N/A'}
                                                    </Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                color: '#B04305',
                                                                fontFamily: 'Poppins-Regular',
                                                            }}>
                                                            {' '}
                                                            Due: {book.dueDate ? book.dueDate.slice(0, 10) : 'N/A'}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )) : (<Text style={{ display: 'flex', textAlign: 'center' }}>No Dues!!</Text>)
                            }
                            <View style={{ height: 20 }} />
                        </ScrollView>
                    ) : (
                        <ScrollView>
                            {
                                dueBooks.length > 0 ? dueBooks.map((book) => (
                                    <View style={styles.section} key={book._id}>
                                        <View style={styles.details}>
                                            <View style={styles.userinhostels}>
                                                <View style={styles.differentusers}>
                                                    <Text> </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            color: '#505069',
                                                            fontFamily: 'OpenSans-Regular',
                                                        }}>
                                                        ID: {book.bookNumber}
                                                    </Text>
                                                </View>
                                                <View style={styles.differentusers}>
                                                    <Text
                                                        style={{
                                                            fontWeight: 'normal',
                                                            fontSize: 18,
                                                            color: '#211C5A',
                                                            fontFamily: 'Poppins-Regular',
                                                        }}>
                                                        {' '}
                                                        Title: {book.bookName ? book.bookName.title : 'N/A'}
                                                    </Text>
                                                </View>


                                                <View style={styles.differentusers}>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            color: '#1F7C17',
                                                            fontFamily: 'Poppins-Regular',
                                                            paddingLeft: 5,
                                                        }}>
                                                        Issued: {book.issueDate ? book.issueDate.slice(0, 10) : 'N/A'}
                                                    </Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                color: '#B04305',
                                                                fontFamily: 'Poppins-Regular',
                                                            }}>
                                                            {' '}
                                                            Due: {book.dueDate ? book.dueDate.slice(0, 10) : 'N/A'}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )) : (<Text style={{ display: 'flex', textAlign: 'center' }}>No Dues!!</Text>)
                            }
                            <View style={{ height: 20 }} />
                        </ScrollView>
                    )}
            </View>
        );
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.maincontainer}>


                {/* header start */}
                <View
                    style={{
                        backgroundColor: institute ? institute.themeColor : 'black',
                        ...styles.header,
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }} >
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('LibraryMain')
                            }}>
                            <AntDesign
                                size={24}
                                color="white"
                                name="left"
                                style={{
                                    alignSelf: 'center',
                                    fontSize: 25,
                                    color: 'white',


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
                            Issued Status
                        </Text>
                    </View>
                </View>

                {/* header ends */}
                {loadingScreen}
                <View
                    style={{
                        width: '90%',
                        marginLeft: 25,
                        marginBottom: 20,
                        marginTop: 20,
                    }}>
                    {/* open search */}
                    <View
                        style={{
                            marginTop: 10,
                            marginLeft: 5,
                            justifyContent: 'space-between',
                            width: '95%',
                            flexDirection: 'row',
                            ...styles.shadow,
                        }}>
                        <TextInput
                            style={{ width: '80%', ...styles.text_input }}
                            placeholder="Enter book name or ID here"
                            placeholderTextColor="grey"
                            placeholderTextColor="grey"
                            defaultValue={searchText}
                            textContentType='name'
                            onChangeText={(text) => {
                                setSearchText(text);
                                if (text === '') {
                                    return setFilteredUsers([]);
                                }
                                if (showContent === 'Due') {
                                    const filtered_users = dueBooks.filter((book) =>
                                        book.bookName.title.toLowerCase().startsWith(text.toLowerCase())
                                    );
                                    setFilteredUsers(filtered_users);
                                }
                                if (showContent === 'Cleared') {
                                    const filtered_users = clearedBooks.filter((book) =>
                                        book.bookName.title.toLowerCase().startsWith(text.toLowerCase())
                                    );
                                    setFilteredUsers(filtered_users);
                                }
                            }}
                            returnKeyType='search'
                        />
                        {searchText.length === 0 ? (
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

                        ) : (
                            <TouchableOpacity
                                onPress={() => {
                                    setSearchText('');
                                    setFilteredUsers([]);
                                }}
                                style={{
                                    alignSelf: 'center',
                                }}
                            >
                                <MaterialIcon name='cancel'
                                    style={{
                                        alignSelf: 'center',
                                        fontSize: 24,
                                        color: '#505069',
                                    }}
                                />
                            </TouchableOpacity>
                        )}

                    </View>
                </View>

                {/* close search */}

                {/* tabs section open */}
                <View style={styles.switchTabsView}>
                    <TouchableOpacity
                        style={{

                            borderBottomWidth: showContent == 'Due' ? 1.5 : 0,
                            borderBottomColor: 'rgba(176, 67, 5, 1)',
                            paddingHorizontal: 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => setShowContent('Due')}>
                        <Text
                            style={
                                ([styles.switchText],
                                    [
                                        {
                                            color:
                                                showContent == 'Due'
                                                    ? 'rgba(176, 67, 5, 1)'
                                                    : '#58636D',
                                        },
                                        { fontWeight: 'bold' },
                                    ])
                            }>Due</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            borderBottomWidth: showContent == 'Cleared' ? 1.5 : 0,
                            borderBottomColor: showContent == 'Cleared' ? 'rgba(176, 67, 5, 1)' : '#58636D',
                            paddingHorizontal: 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => setShowContent('Cleared')}>
                        <Text
                            style={
                                ([styles.switchText],
                                    [
                                        {
                                            color:
                                                showContent == 'Cleared'
                                                    ? 'rgba(176, 67, 5, 1)'
                                                    : '#58636D',
                                        },
                                        { fontWeight: 'bold' },
                                    ])
                            }>Submitted</Text>
                    </TouchableOpacity>
                </View>
                {showContent === 'Due' ? <Due /> : <Cleared />}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
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
        marginVertical: 10,
        borderRadius: 12,

        marginHorizontal: 20,
    },

    details: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 4,
        paddingBottom: 10,
        borderBottomColor: '#333',
        paddingHorizontal: 20,
    },
    userinhostels: {
        paddingVertical: 5
    },
    differentusers: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userstext: {
        fontSize: 16,
        fontWeight: '300',
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
        paddingHorizontal: 5,
        fontFamily: 'Poppins-Regular',


    },
    maincontainer: {
        flex: 1,
        backgroundColor: 'rgba(249, 249, 249, 1)',
    },


    text_input: {
        paddingHorizontal: 20,
        borderRadius: 10,
        height: 50,
        fontSize: 16,
        minWidth: 171,
        backgroundColor: 'white',
        color: 'black'
    },

    shadow: {
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
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

    header: {
        height: 65,
        flexDirection: 'row',
    },
});
