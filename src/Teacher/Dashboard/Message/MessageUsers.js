import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Image,
} from 'react-native';

import { Avatar } from 'react-native-paper';

//icons
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// redux
import { useSelector } from 'react-redux';

// helpers
import post from '../../../services/helpers/request/post'
import write from '../../../services/localstorage/write'
import read from '../../../services/localstorage/read'
import get from '../../../services/helpers/request/get'

import { useFocusEffect } from '@react-navigation/native';

const Chats = ({ navigation }) => {
  navigationByCondition = item => {
    const { navigation } = props.navigation;

    if (chat.userName === 'Sarah') {
      navigation.navigate('ChatScreen1');
    } else {
      navigation.navigate('Chats');
    }
  };

  const [messages, setMessages] = useState([
    // {
    //   userImage: 'https://randomuser.me/api/portraits/women/79.jpg',
    //   userName: 'Sarah',
    //   message: {
    //     sender: 'Sarah',
    //     text: 'I will catch join it in five minutes',
    //     seenByYou: true,
    //     seenByUser: true,
    //   },

    //   time: 'now',
    // },
    // {
    //   userImage: 'https://randomuser.me/api/portraits/women/81.jpg',
    //   userName: 'Deepsi',
    //   message: {
    //     sender: 'You',
    //     text: 'Kaisan baa 😊😇?',
    //     seenByYou: true,
    //     seenByUser: false,
    //   },
    //   time: '03:32 PM',
    //   // isTyping: true,
    // },
    // {
    //   userImage: 'https://randomuser.me/api/portraits/men/33.jpg',
    //   userName: 'Motha',
    //   message: {
    //     sender: 'Motha',
    //     text: 'Hii sis,bro,chachi,bhai,aunty!',
    //     seenByYou: true,
    //     seenByUser: true,
    //   },
    //   time: '01:40 PM',
    // },
    // {
    //   userImage: 'https://randomuser.me/api/portraits/women/21.jpg',
    //   userName: 'Thangarajan',
    //   message: {
    //     sender: 'Thangarajan',
    //     text: 'Badtameez dil..Thaane na thaane',
    //     seenByYou: false,
    //     seenByUser: false,
    //   },
    //   time: '10:37 AM',
    // },
    // {
    //   userImage: 'https://randomuser.me/api/portraits/men/60.jpg',
    //   userName: 'Thangirajan',
    //   message: {
    //     sender: 'Thangirajan',
    //     text: 'Thaane na Thaane na',
    //     seenByYou: true,
    //     seenByUser: true,
    //   },
    //   time: 'Yesterday',
    // },
    // {
    //   userImage: 'https://randomuser.me/api/portraits/men/47.jpg',
    //   userName: 'Christopher',
    //   message: {
    //     sender: 'Christopher',
    //     text: 'That is awesome',
    //     seenByYou: true,
    //     seenByUser: true,
    //   },
    //   time: '3 days ago',
    // },
    // {
    //   userImage: 'https://randomuser.me/api/portraits/women/21.jpg',
    //   userName: 'Danny',
    //   message: {
    //     sender: 'You',
    //     text: 'I have already completed it',
    //     seenByYou: true,
    //     seenByUser: true,
    //   },
    //   time: '4 days ago',
    // },
    // {
    //   userImage: 'https://randomuser.me/api/portraits/men/54.jpg',
    //   userName: 'Diana',
    //   message: {
    //     sender: 'Diana',
    //     text: 'What is the syllabus of java',
    //     seenByYou: true,
    //     seenByUser: true,
    //   },
    //   time: 'one month ago',
    // },
  ]);

  //theming
  const institute = useSelector(state => state.institute);

  const userInfo = useSelector(state => state.userInfo)

  useEffect(async () => {
    try {
      let email = userInfo.email
      let password = userInfo.password

      if (email && password) {

        let data = { username: email, password: password }

        let slug = '/login'
        let response = await post(slug, data, null, 1)
        await write('chatToken', response.accessToken)
        await write('chatUser', response._id)

        console.log('LOGIN ', response)
        console.log('Token ', response.accessToken)

      } else {
        throw new Error('Cannot Login to Chat Service!!')
      }
    } catch (err) {
      alert(err)
    }

    try{
      let chatToken = await read('chatToken')
      let userId = await read('chatUser')
      console.log('Chat Token ', chatToken)
  
      if (chatToken) {
        let slug = `/chat/loadchatlist?userId=${userId}`
        let res = await get(slug, chatToken, 1)
        console.log('Res ', res)
        setMessages(res)
      } else {
        throw new Error('Cannot fetch chat list!!')
      }

    } catch(err){
      console.log('Chat List error ', err)
    }

  }, [])

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
  
      const fetchUser = async () => {
        try{
          let chatToken = await read('chatToken')
          let userId = await read('chatUser')
          console.log('Chat Token ', chatToken)
      
          if (chatToken) {
            let slug = `/chat/loadchatlist?userId=${userId}`
            let res = await get(slug, chatToken, 1)
            console.log('Res ', res)
            // setMessages(res)
          } else {
            throw new Error('Cannot fetch chat list!!')
          }
    
        } catch(err){
          console.log('Chat List error ', err)
        }
      };
  
      fetchUser();
  
      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontStyle: 'normal',
              fontSize: 28,
              fontFamily: 'NunitoSans-Light',
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
              color: 'white',
            }}>
            Messages
          </Text>
        </View>
      </View>
      <View style={{ height: 20 }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stories */}

        {/* Chats View */}
        <View style={{ flex: 1 }}>
          {messages.map(chat => (
            <TouchableOpacity
              style={{
                marginTop: 10,
                alignSelf: 'center',
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fafafa',
                borderBottomWidth: 1,
                borderBottomColor: '#dfe4ea',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 1,
                elevation: 5,
                width: '92%',
              }}
              //for message of sarah

              //       onPress={

              //         chat.userName == 'Sarah'
              //         ? navigation.navigate('ChatScreen1'):
              //     navigation.navigate('Chats')
              // }
              key = {chat._id}
              onPress={() => navigation.navigate('ChatScreen1',{
                chat: chat
              })}

              onLongPress={() => {
                Alert.alert(
                  'Delete Chat?',
                  `Do you want to delete ${chat.chatHeadName}'s chats?`,
                  [
                    {
                      text: 'Cancel',
                      onPress: () => { },
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        let newChats = messages.filter(
                          m => m.userName !== chat.userName,
                        );
                        setMessages(newChats);
                      },
                    },
                  ],
                  { cancelable: false },
                );
              }}>

              <Avatar.Text size={70} label={'A'} />


              {/* </TouchableOpacity> */}
              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontWeight: '650',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 18,
                    }}>
                    {chat.chatHeadName}
                  </Text>
                  <Text style={{ fontSize: 14 }}>{chat.time}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <Text
                      style={{
                        fontFamily:
                          chat.senderId !== 'You'
                            ? chat.messageStatus
                              ? 'Poppins-Regular'
                              : 'OpenSans-Regular'
                            : 'NunitoSans-Regular',

                        color:
                          chat.senderId !== 'You'
                            ? chat.messageStatus
                              ? 'black'
                              : 'blue'
                            : 'grey',
                        fontSize: 16,
                      }}
                      >
                      {chat.chatMessages ? chat.chatMessages.messageContent : ''}
                    </Text>
                  

                  {/*
                 CONDITION FOR ICONS FOR FOUR DIFFERENT CONDITIONS(TWO FOR SENDER AND TWO FOR ME)
                 1st condition:
                 for icons:

                 if I am the sender,icons are like whatsapp:read and not read according to the key and value
                 2nd condition:
                 if sender is at the other side and he/she sent the message:
                 if seenbyme(seenByYou)-then no icon placed,return null,
                 if not seen by me,unread,then new icon is returned in place of that */}

                  {
                    chat.senderId === 'You' ? (
                      chat.messageStatus ? (
                        <MaterialIcon
                          name="done-all"
                          size={16}
                          color="#3c40c6"
                        />
                      ) : (
                        <MaterialIcon name="done" size={16} color={'#555'} />
                      )
                    ) : chat.messageStatus ? null : (
                      <EntypoIcon name="new" size={16} color="blue" />
                    )
                    // <EntypoIcon name='new' size={16} color='blue'/>
                  }
                </View>
              </View>
            </TouchableOpacity>
          ))}

        </View>
        <View style={{ height: 20 }}></View>
      </ScrollView>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  storiesView: {
    paddingVertical: 10,
    paddingRight: 10,
    backgroundColor: '#fafafa',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
  storyContentView: {
    width: 90,
    height: 130,
    borderRadius: 10,
    borderColor: '#dfe4ea',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyUserImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    height: '90%',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
