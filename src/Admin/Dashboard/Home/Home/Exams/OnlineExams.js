import React, { useState, useEffect } from 'react';
import ModalSelector from 'react-native-modal-selector';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

//redux
import { useSelector } from 'react-redux';

// helpers
import read from '../../../../../services/localstorage/read';
import get from '../../../../../services/helpers/request/get';
import LoadingScreen from '../../../../../components/LoadingScreen/LoadingScreen';

export default function OnlineExams({ navigation }) {
  //theming
  const institute = useSelector(state => state.institute);

  //loading screen
  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoadingScreen();

  //exams
  const [exams, setexams] = useState([]);
  //for tab navigation
  const [publishedlist, setpublishedlist] = useState([])
  const [unpublishedlist, setunpublishedlist] = useState([])


  //on load
  useEffect(async () => {
    setLoadingScreen();
    try {
      let slug = `/class/getClassAssignment`;
      const token = await read('token');
      const res = await get(slug, token);
      console.log("OnlineExams ", res)
      let unpublished = []
      let published = []
      res && res.map((exam) => {
        if (exam.publishExam) {
          published.push(exam)
        } else unpublished.push(exam)
      })
      console.log('Published ', published)
      console.log('Unpublished ', unpublished)
      setpublishedlist(published)
      setunpublishedlist(unpublished)

    } catch (err) {
      alert('Cannot get Exams!!');
    }

    hideLoadingScreen();
  }, []);


  const [showContent, setShowContent] = React.useState('Unpublished');

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  function switchTab() {
    if (activeTab === 'Completed') {
      setActiveTab('Processed');
    } else {
      setActiveTab('Completed');
    }
  }

  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(0, 15);
  };

  function Unpublished() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        {loadingScreen}
        <ScrollView>

          <View flexDirection="column-reverse">
            {unpublishedlist &&
              unpublishedlist.map(exam =>
                // new Date(exam.due) >= new Date() ? (
                <View style={styles.section} key={exam._id}>
                  <View style={styles.details}>
                    <View style={styles.userinhostels}>
                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontWeight: 'normal',
                            fontSize: 18,
                            color: '#211C5A',
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {' '}
                          <Text
                            style={{
                              color: 'green',
                              fontFamily: 'Poppins-Regular',
                              // marginTop: -20,
                            }}>

                            TITLE:{' '}</Text> {exam.title ? exam.title : 'N/A'}
                        </Text>


                      </TouchableOpacity>

                      <TouchableOpacity style={styles.differentusers}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#58636D',
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {'  '}Due on:  {parseDate(exam.due)}
                        </Text>

                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#58636D',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {'  '}Instructions: {exam.instruction}
                      </Text>
                    </View>
                  </View>
                </View>
                // ) : null,
              )}
          </View>
        </ScrollView>
      </View>
    );
  }

  function Published() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        {loadingScreen}
        <ScrollView>
          <View flexDirection="column-reverse">

            {publishedlist &&
              publishedlist.map(exam =>
                new Date(exam.due) < new Date() ? (
                  <View style={styles.section} key={exam._id}>
                    <View style={styles.details}>
                      <View style={styles.userinhostels}>
                        <TouchableOpacity style={styles.differentusers}>
                          <Text
                            style={{
                              fontWeight: 'normal',
                              fontSize: 18,
                              color: '#211C5A',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {' '}
                            <Text
                              style={{
                                color: 'green',
                                fontFamily: 'Poppins-Regular',

                              }}>

                              TITLE:{' '}</Text> {exam.title ? exam.title : 'N/A'}
                          </Text>


                        </TouchableOpacity>

                        <TouchableOpacity style={styles.differentusers}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#58636D',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {'  '}Due on:  {parseDate(exam.due)}
                          </Text>

                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#58636D',
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {'  '}Instructions: {exam.instruction}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : null,
              )}
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.maincontainer}>
        {/* header start */}

        <View
          style={{
            backgroundColor: institute ? institute.themeColor : '#FF5733',
            // backgroundColor:'blue',
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
                marginTop: 22,
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
              marginLeft: 30,
              color: 'white',
            }}>
            View Online Exams
          </Text>
        </View>

        <View style={{ padding: 5 }} />

        <View style={styles.switchTabsView}>
          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Unpublished' ? 2 : 0,
              borderBottomColor: showContent == 'Unpublished' ? 'rgba(176, 67, 5, 1)' : '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowContent('Unpublished')}>

            <Text
              style={
                ([styles.switchText],
                  [
                    {
                      color:
                        showContent == 'Unpublished'
                          ? 'rgba(176, 67, 5, 1)'
                          : '#58636D',
                    },
                    { fontWeight: '700' },
                  ])
              }>Unpublished</Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderBottomWidth: showContent == 'Published' ? 2 : 0,
              borderBottomColor: showContent == 'Published' ? 'rgba(176, 67, 5, 1)' : '#58636D',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowContent('Published')}>
            <Text
              style={
                ([styles.switchText],
                  [
                    {
                      color:
                        showContent == 'Published'
                          ? 'rgba(176, 67, 5, 1)'
                          : '#58636D',
                    },
                    { fontWeight: 'bold' },
                  ])
              }>Published</Text>
          </TouchableOpacity>
        </View>
        {showContent === 'Unpublished' ? <Unpublished /> : <Published />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginTop: 14,
    marginBottom: 10,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: '#333',
    // borderBottomWidth:1,
  },
  userinhostels: {
    marginTop: 10,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userstext: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '300',
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
    //borderBottomWidth:1,
  },
  search: {
    backgroundColor: 'white',
    color: 'black',
  },
  switchTabsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginTop: 25,
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
  SelectedValue: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 27,
    padding: 10,
    color: '#211C5A',
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 30,
    paddingTop: 2,
    color: '#211C5A',
  },

  //for users

  iconbubble: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 1000,
    // alignSelf: 'center',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1.41,
    elevation: 5,
  },
  card: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',

    width: 110,
    elevation: 3,
  },
  header: {
    height: 69,
    flexDirection: 'row',
    alignContent: 'center',
  },
});
