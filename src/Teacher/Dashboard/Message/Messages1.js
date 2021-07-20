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
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ChatScreen1({ navigation }) {
  const [chatUser] = useState({
    name: 'Sarah',
    profile_image: 'https://randomuser.me/api/portraits/women/79.jpg',
    last_seen: 'online',
  });

  const [currentUser] = useState({
    name: 'Deepsi',
  });

  const [messages, setMessages] = useState([
    { sender: 'Deepsi', message: 'Hey there!', time: '6:01 PM' },
    {
      sender: 'Sarah',
      message: 'This event will be held today and it is requested for you to come and also bring your family with you',
      time: '6:02 PM',
    },
    {
      sender: 'Deepsi',
      message: 'Yeah sure',
      time: '6:02 PM',
    },
    {
      sender: 'Deepsi',
      message: `😊😇`,
      time: '6:02 PM',
    },
    {
      sender: 'Deepsi',
      message: `The event was too good`,
      time: '6:03 PM',
    },
    {
      sender: 'Deepsi',
      message: `Well Done`,
      time: '6:03 PM',
    },
    {
      sender: 'Sarah',
      message: `Thank you so much.`,
      time: '6:03 PM',
    },
   ]);

  const [inputMessage, setInputMessage] = useState('');

  function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
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

  


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
      

<View
        style={{
          height: 70,
          backgroundColor: '#fff',
        }}
      >
        <View
          style={{
            // marginTop: Number(StatusBar.currentHeight),
            marginTop: 10,
            // backgroundColor: 'red',
            // paddingVertical: 20,
            paddingHorizontal: 10,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >

<TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <AntDesign
              size={24}
              color="#505069"
              name="left"
              style={{
                alignSelf: 'center',
                fontSize: 24.02,
               
                paddingLeft: 10,
              
              }}
            />
          </TouchableOpacity>
          <Image
            style={styles.userProfileImage}
            source={{ uri: chatUser.profile_image }}
          />
          <View
            style={{
              marginLeft: 20,

              justifyContent: 'center',
 
            }}
          >
            <Text style={{ color: '#505069', fontWeight: '600', fontSize: 28,fontFamily:'NunitoSans-Regular' }}>
              {chatUser.name}
            </Text>
            <Text style={{ color: 'black', fontWeight: '300' }}>
              {chatUser.last_seen}
            </Text>
          </View>
        </View>
      </View>
        <FlatList
          style={{ backgroundColor: '#f2f2ff' }}
          inverted={true}
          data={JSON.parse(JSON.stringify(messages)).reverse()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback>
              <View style={{ marginTop: 6 }}>
                <View
                  style={{
                    maxWidth: Dimensions.get('screen').width * 0.8,
                    backgroundColor:  item.sender === currentUser.name ?'#62525D' : '#505069',
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
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 14,
                      fontFamily:'Poppins-Regular'
                    }}
                  >
                    {item.message}
                  </Text>
                  <Text
                    style={{
                      color: '#dfe4ea',
                      fontSize: 14,
                      alignSelf: 'flex-end',
                    }}
                  >
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
              placeholder='Message'
              onChangeText={(text) => setInputMessage(text)}
              onSubmitEditing={() => {
                sendMessage();
              }}
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={() => {
                sendMessage();
              }}
            >
              <Icon name='send' type='material' />
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
  userProfileImage: { height: '80%', aspectRatio: 1, borderRadius: 100 ,marginLeft:20,marginBottom:5},
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