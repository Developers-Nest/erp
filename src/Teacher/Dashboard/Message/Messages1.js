import React, {useState, useEffect} from 'react';
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
import {Icon} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

// helpers
import post from '../../../services/helpers/request/post';
import write from '../../../services/localstorage/write';
import read from '../../../services/localstorage/read';
import get from '../../../services/helpers/request/get';
import getTime from '../../../services/helpers/formatter/time';

import {useFocusEffect} from '@react-navigation/native';

import {useSelector} from 'react-redux';

import LoaderHook from '../../../components/LoadingScreen/LoadingScreen';

import socket from '../../../services/config/socket';

export default function ChatScreen1({route, navigation}) {
  // user id of current user
  const [currentUser, setCurrentUser] = useState('');

  // chat messages
  const [messages, setMessages] = useState([]);

  // chat information
  const [chat, setChat] = useState({});

  const institute = useSelector(state => state.institute);

  // input message
  const [inputMessage, setInputMessage] = useState('');

  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook();

  useEffect(async () => {
    setLoadingScreen();
    try {
      let c = route.params.chat;
      setChat(c);
    } catch (err) {
      alert('Cannot get chat details !!');
    }

    try {
      let chatToken = await read('chatToken');
      let userId = await read('chatUser');
      let chatId = route.params.chatId;

      if (chatToken) {
        let slug = `/chat/getchatmessages?userId=${userId}&chatId=${chatId}`;
        let res = await get(slug, chatToken, 1);
        setCurrentUser(userId);
        let messageArray = [];
        res &&
          res.map(message => {
            messageArray.push({
              sender: message.senderId,
              message: message.messageContent,
              status: message.status,
              time: getTime(new Date(message.timestamp)),
              id: message._id,
            });
          });
        setMessages(messageArray);
      } else {
        throw new Error('Cannot fetch chat list!!');
      }
    } catch (err) {
      alert('Cannot get chat list' + err);
    }

    hideLoadingScreen();

    socket.off('chatListUpdate');

    socket.on('chatListUpdate', data => {
      if (data.message) {
        let newMessage = {
          sender: data.message.senderId,
          message: data.message.messageContent,
          status: data.message.messageStatus,
          time: getTime(new Date(data.message.timestamp)),
          id: data.message._id,
        };

        setMessages(prevMess => {
          return [...prevMess, newMessage];
        });
      }
    });
  }, []);

  function sendMessage() {
    if (inputMessage === '') {
      return setInputMessage('');
    }

    const messageData = {
      _id: new Date().getMilliseconds(),
      senderId: currentUser,
      recId: chat.chatHeadId,
      message: inputMessage,
    };

    socket.emit('chatMessage', messageData);

    let newMessage = {
      sender: currentUser,
      message: inputMessage,
      time: getTime(new Date()),
      id: new Date().getMilliseconds(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {loadingScreen}
        <View
          style={{
            height: 69,
            backgroundColor: institute ? institute.themeColor : null,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
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
              {chat.chatHeadName}
            </Text>
          </View>
        </View>
        <FlatList
          style={{backgroundColor: '#f2f2ff'}}
          inverted={true}
          data={JSON.parse(JSON.stringify(messages)).reverse()}
          renderItem={({item}) => (
            <TouchableWithoutFeedback key={item.id}>
              <View style={{marginTop: 6}}>
                <View
                  style={{
                    maxWidth: Dimensions.get('screen').width * 0.8,
                    backgroundColor:
                      item.sender === currentUser ? '#62525D' : '#505069',
                    alignSelf:
                      item.sender === currentUser ? 'flex-end' : 'flex-start',
                    marginHorizontal: 10,
                    padding: 10,
                    borderRadius: 25,
                    borderBottomLeftRadius:
                      item.sender === currentUser ? 25 : 0,
                    borderBottomRightRadius:
                      item.sender === currentUser ? 0 : 25,
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

        <View style={{paddingVertical: 10}}>
          <View style={styles.messageInputView}>
            <TextInput
              defaultValue={inputMessage}
              style={styles.messageInput}
              placeholder="Message"
              placeholderTextColor="grey"
              color="black"
              onChangeText={text => setInputMessage(text)}
              onSubmitEditing={() => {}}
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={() => {
                sendMessage();
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
