import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Text, Appbar, Card, Button, Title, Paragraph} from 'react-native-paper';

//selector
import ModalSelector from 'react-native-modal-selector';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// redux
import {useSelector} from 'react-redux';

// helpers
import read from '../../../../services/localstorage/read';
import get from '../../../../services/helpers/request/get';
import post from '../../../../services/helpers/request/post';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

export default function FeedbackMain({navigation}) {
  const [feedback, setFeedback] = useState('');

  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen();

  //theming
  const institute = useSelector(state => state.institute);

  //modal content
  const [types, setTypes] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);

  //selected values
  const [type, setType] = React.useState([]);

  //userinfo
  let userInfo = useSelector(state => state.userInfo);

  //on load fetch feedback type
  useEffect(async () => {
    setLoadingScreen();
    try {
      let slug = `/feedback/type?`;
      let token = await read('token');
      let response = await get(slug, token);
      let list = [];
      response &&
        response.map(response => {
          list.push({
            label: response.feedbacktype,
            key: response._id,
          });
        });
      setTypes(list);
    } catch (err) {
      alert('Cannot get feedback types!!');
    }

    hideLoadingScreen();
  }, []);

  let getQuestions = async type => {
    setLoadingScreen();
    setType(type);
    try {
      let slug = `/feedback/question?`;
      let token = await read('token');
      let response = await get(slug, token);
      let list = [];
      setQuestions(response);
    } catch (err) {
      alert('Cannot get your Batches!!');
    }
    hideLoadingScreen();
  };

  let handleSubmit = async () => {
    setLoadingScreen();
    try {
      let slug = `/feedback`;
      let token = await read('token');
      let data = {
        department: userInfo.department,
        comment: feedback,
        feedbackBy: userInfo._id,
        feedbacktype: type,
        questions: [],
      };
      console.log('data: ', data);
      let response = await post(slug, data, token);
      console.log('response: ', response);
      alert('feedback created');
    } catch (err) {
      alert('Cannot get your Batches!!');
    }
    hideLoadingScreen();
  };

  return (
    <View style={{backgroundColor: 'rgba(249, 249, 249, 1)'}}>
      {loadingScreen}

      <View
        style={{
          backgroundColor: institute ? institute.themeColor : '#FF5733',
          ...styles.header,
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
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
              }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontStyle: 'normal',
            fontFamily: 'NunitoSans-Regular',
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 20,
            color: 'white',
          }}>
          Feedback
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddQuestion')}
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: 5,
            }}>
            <MaterialIcon
              name="align-horizontal-right"
              color="#900"
              style={{
                fontSize: 35,
                color: 'white',
                paddingRight: 20,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{padding: 10}} />
      <View style={{paddingHorizontal: 20}}>
        <View>
          <ModalSelector
            data={types}
            initValue="Type"
            onChange={option => {
              getQuestions(option.key);
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>
        <View style={{padding: 10}} />
        <Card style={styles.card_picker}>
          <Card.Content>
            <Title>Questionnarie</Title>
            <View style={{padding: 2}} />
            <Paragraph>
              This feedback is about the form that was given to you yesterday
              dealing with one of the issues of teachers.
            </Paragraph>
          </Card.Content>
        </Card>
        <View style={{padding: 10}} />
        <Card style={{height: 200, ...styles.card_picker}}>
          <Card.Content>
            <TextInput
              placeholder="Write down your feedback question here..... "
              placeholderTextColor="black"
              onChangeText={val => setFeedback(val)}
              style={{backgroundColor: 'white'}}
            />
          </Card.Content>
        </Card>
        <Button
          onPress={handleSubmit}
          mode="contained"
          color={institute.themeColor}
          style={{marginVertical: 20}}>
          submit
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 69,
    flexDirection: 'row',
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 30,
    paddingTop: 3,
    color: '#211C5A',
  },
  card_picker: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',

    minWidth: 110,
    elevation: 3,
  },
});
