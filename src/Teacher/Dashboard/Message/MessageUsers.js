import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
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
import getTime from '../../../services/helpers/formatter/time';

import { useFocusEffect } from '@react-navigation/native';

import LoaderHook from '../../../components/LoadingScreen/LoadingScreen';

const Chats = ({ navigation }) => {

  const [messages, setMessages] = useState([]);

  //theming
  const institute = useSelector(state => state.institute);

  const userInfo = useSelector(state => state.userInfo)

  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

  useEffect(async () => {
    setLoadingScreen()
    try {
      let email = userInfo.email
      let password = userInfo.password

      if (email && password) {

        let data = { username: email, password: password }

        let slug = '/login'
        let response = await post(slug, data, null, 1)
        await write('chatToken', response.accessToken)
        await write('chatUser', response._id)

      } else {
        throw new Error('Cannot Login to Chat Service!!')
      }
    } catch (err) {
      alert(err)
    }

    try {
      let chatToken = await read('chatToken')
      let userId = await read('chatUser')

      if (chatToken) {
        let slug = `/chat/loadchatlist?userId=${userId}`
        let res = await get(slug, chatToken, 1)
        setMessages(res)
      } else {
        throw new Error('Cannot fetch chat list!!')
      }

    } catch (err) {
      alert('Cannot get chat list')
    }

    hideLoadingScreen()

  }, [])

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          let chatToken = await read('chatToken')
          let userId = await read('chatUser')

          if (chatToken) {
            let slug = `/chat/loadchatlist?userId=${userId}`
            let res = await get(slug, chatToken, 1)
            setMessages(res)
          } else {
            throw new Error('Cannot fetch chat list!!')
          }

        } catch (err) {
          alert('Cannot get chat list')

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
              // fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
              color: 'white',
            }}>
            Messages
          </Text>
        </View>
      </View>
      <View style={{ height: 20 }} />
      {loadingScreen}
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

              key={chat._id}
              onPress={() => navigation.navigate('ChatScreen1', {
                chat: chat,
                chatId: chat._id
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
                      // fontWeight: '650',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 18,
                      color: institute ? institute.themeColor : 'black'
                    }}>
                    {chat.chatHeadName}
                  </Text>
                  <Text style={{ fontSize: 14 }}>{chat.chatMessages && getTime(chat.chatMessages.timestamp)}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'NunitoSans-Regular',
                      color: 'black',
                      fontSize: 16,
                    }}
                  >
                    Message: {chat.chatMessages ? chat.chatMessages.messageContent : ''}
                  </Text>

                  {
                    chat.unreadMessage > 0 ? <Text>{chat.unreadMessage}</Text> : null
                  }
                  {
                    chat.chatMuted ? (<EntypoIcon name="new" size={16} color="blue" />) :
                      chat.chatMessages && chat.chatMessages.messageStatus === 'sent' ? <MaterialIcon name="done" size={16} color={'#555'} />
                        : <MaterialIcon name="done-all" size={16} color="#3c40c6" />
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
