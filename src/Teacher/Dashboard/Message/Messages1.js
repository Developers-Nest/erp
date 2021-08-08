import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

// helpers
import post from '../../../services/helpers/request/post'
import write from '../../../services/localstorage/write'
import read from '../../../services/localstorage/read'
import get from '../../../services/helpers/request/get'
import getTime from '../../../services/helpers/formatter/time'

import { useFocusEffect } from '@react-navigation/native';

import { useSelector } from 'react-redux';

import LoaderHook from '../../../components/LoadingScreen/LoadingScreen';

export default function ChatScreen1({ route, navigation }) {
  const [chatUser] = useState({
    name: 'Sarah',
    profile_image: 'https://randomuser.me/api/portraits/women/79.jpg',
    last_seen: 'online',
  });

  const [currentUser, setCurrentUser] = useState({
    name: 'Deepsi',
  });

  // chat messages
  const [messages, setMessages] = useState([]);

  // chat information
  const [chat, setChat] = useState({})

  const institute = useSelector((state) => state.institute)

  // input message
  const [inputMessage, setInputMessage] = useState('');

  useEffect(async () => {
    try {
      let c = route.params.chat
      setChat(c)
    } catch (err) {
      alert('Cannot get chat details !!')
    }

    try {
      let chatToken = await read('chatToken')
      let userId = await read('chatUser')
      let chatId = route.params.chatId

      if (chatToken) {
        let slug = `/chat/getchatmessages?userId=${userId}&chatId=${chatId}`
        let res = await get(slug, chatToken, 1)
        setCurrentUser(userId)
        let messageArray = []
        res && res.map((message) => {
          messageArray.push({
            sender: message.senderId,
            message: message.messageContent,
            status: message.status,
            time: getTime(message.timeStamp),
            id: message._id
          })
        })
        setMessages(messageArray)
      } else {
        throw new Error('Cannot fetch chat list!!')
      }

    } catch (err) {
      alert('Cannot get chat list' + err)
    }

    function sendMessage() {
      if (inputMessage === '') {
        return setInputMessage('');
      }
      let t = getTime(new Date());
      setMessages([
        ...messages,
        {
          sender: currentUser.name,
          message: inputMessage,
          time: t,
        },
      ]);
      setInputMessage('');
    }

  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View
          style={{
            height: 70,
            backgroundColor: institute ? institute.themeColor : null,
          }}>
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: 10,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <AntDesign
                size={24}
                color='white'
                name="left"
                style={{
                  alignSelf: 'center',
                  fontSize: 24.02,
                  paddingLeft: 10,
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                marginLeft: 20,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 28,
                  fontFamily: 'NunitoSans-Regular',
                }}>
                {chat.chatHeadName}
              </Text>
              <Text style={{ color: 'black', fontWeight: '300' }}>
                {/* {chatUser.last_seen} */}
              </Text>
            </View>
          </View>
        </View>
        <FlatList
          style={{ backgroundColor: '#f2f2ff' }}
          inverted={true}
          data={JSON.parse(JSON.stringify(messages)).reverse()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback key={item.id}>
              <View style={{ marginTop: 6 }}>
                <View
                  style={{
                    maxWidth: Dimensions.get('screen').width * 0.8,
                    backgroundColor:
                      item.sender === currentUser.name ? '#62525D' : '#505069',
                    alignSelf:
                      item.sender === currentUser.name
                        ? 'flex-end'
                        : 'flex-start',
                    marginHorizontal: 10,
                    padding: 10,
                    borderRadius: 25,
                    borderBottomLeftRadius:
                      item.sender === currentUser.name ? 25 : 0,
                    borderBottomRightRadius:
                      item.sender === currentUser.name ? 0 : 25,
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 14,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {item.message}
                  </Text>
                  <Text
                    style={{
                      color: '#dfe4ea',
                      fontSize: 14,
                      alignSelf: 'flex-end',
                    }}>
                    {item.time}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />

        <View style={{ paddingVertical: 10 }}>
          <View style={styles.messageInputView}>
            <TextInput
              defaultValue={inputMessage}
              style={styles.messageInput}
              placeholder="Message"
              placeholderTextColor="grey"
              color="black"
              onChangeText={text => setInputMessage(text)}
              onSubmitEditing={() => {
              }}
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={() => {
              }}>
              <Icon name="send" type="material" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfileImage: {
    height: '80%',
    aspectRatio: 1,
    borderRadius: 100,
    marginLeft: 20,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2ff',
  },
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
