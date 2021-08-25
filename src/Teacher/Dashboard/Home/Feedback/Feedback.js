import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Text,
  TextInput,
  Appbar,
  Card,
  Button,
  Title,
  Paragraph,
} from 'react-native-paper';

//selector
import ModalSelector from 'react-native-modal-selector';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

// redux
import {useSelector} from 'react-redux';

// helpers
import read from '../../../../services/localstorage/read';
import get from '../../../../services/helpers/request/get';
import post from '../../../../services/helpers/request/post';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

export default function Feedback({navigation}) {
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
      let slug = `/feedback/type`;
      let token = await read('token');
      let response = await get(slug, token);
      let list = [];

      response.map(type => {
        type.feedbackfor === 'Employee'
          ? list.push({
              label: type.feedbacktype,
              key: type._id,
            })
          : null;
      });
      setTypes(list);
    } catch (err) {
      alert('Cannot get feedback types!!' + err);
    }

    hideLoadingScreen();
  }, []);

  let getQuestions = async type => {
    setLoadingScreen();
    setType(type);
    try {
      let slug = `/feedback/question`;
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
      let response = await post(slug, data, token);
      alert('feedback created');
    } catch (err) {
      alert('Cannot get your Batches!!');
    }
    hideLoadingScreen();
  };

  return (
    <View
      style={{
        backgroundColor: 'rgba(249, 249, 249, 1)',
      }}>
      {loadingScreen}
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
        <Text
          style={{
            fontStyle: 'normal',
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
            color: 'white',
            fontFamily: 'NunitoSans-Regular',
          }}>
          Feedback
        </Text>
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
        <Card style={{elevation: 3}}>
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
        <Card style={{height: 200, elevation: 3}}>
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
          style={{marginTop: 10}}
          mode="contained"
          color={institute.themeColor}>
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
