import  React from 'react';

//stack navigation
import Recorded from './LectureRecorded';
import Live from './LectureLive';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';

// redux
import { useSelector } from 'react-redux';

export default function LecturesScreen({ navigation }) {
  const [showContent, setShowContent] = React.useState('Live');
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  //theming
  const institute = useSelector(state => state.institute);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.maincontainer}>
        <View
          style={{
            backgroundColor: institute ? institute.themeColor : 'black',
            ...styles.header,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
              fontFamily: 'NunitoSans-Regular',
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
              color: 'white',
            }}>
            Lectures
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('GoLive')}
            style={{
              justifyContent: 'flex-end',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IonIcons
              name="add-circle"
              color="#900"
              style={{
                fontSize: 35,
                color: 'white',
                paddingRight: 20,
              }}
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={{ padding: 10 }} />
          <View style={styles.switchTabsView}>
            <TouchableOpacity
              style={{
                borderBottomWidth: showContent == 'Live' ? 2 : 0,
                borderBottomColor:
                  showContent == 'Live' ? '#B04305' : '#58636D',
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowContent('Live')}>
              <Text
                style={{
                  color: showContent == 'Live' ? '#B04305' : '#58636D',
                  ...styles.switchText,
                }}>
                Live
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: showContent == 'Recorded' ? 2 : 0,
                borderBottomColor: '#B04305',
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowContent('Recorded')}>
              <Text
                style={{
                  color: showContent == 'Recorded' ? '#B04305' : '#58636D',
                  ...styles.switchText,
                }}>
                Recorded
              </Text>
            </TouchableOpacity>
          </View>

          {showContent === 'Live' ? (
            <Live navigation={navigation} />
          ) : (
            <Recorded navigation={navigation} />
          )}
        </ScrollView>
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

  maincontainer: {
    flex: 1,
    // justifyContent:'flex-start'
  },

  card: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
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
    minWidth: '30%',
  },
  section: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',

    paddingHorizontal: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 10,
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 10,
    width: 170,
    height: 170,
    //new added
    alignSelf: 'center',
    //new added to move english down
    paddingTop: 50,
  },

  details: {
    alignContent: 'center',
    flexDirection: 'column',

    borderBottomColor: '#333',
    // borderBottomWidth:1,
  },

  userinhostels: {
    //  paddingVertical:20,
  },

  //different users for two columns
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //for row spacing between two rows:done finally
    paddingBottom: 10,
  },
  userstext: {
    fontSize: 16,
    // paddingVertical:4,
    fontWeight: '300',
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
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
  teacher: {
    fontSize: 14,
    color: 'rgba(25, 40, 57, 0.63)',
    paddingLeft: 3,
    fontFamily: 'Poppins-Medium',
  },
  switchText: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 14,
    paddingHorizontal: 5,

    lineHeight: 21,

    // color: '#58636D',
  },
  maincontainer: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  header: {
    height: 65,
    flexDirection: 'row',
  },
  text_input: {
    paddingHorizontal: 20,
    borderRadius: 10,
    // backgroundColor: 'rgba(249, 249, 249, 1)',
    height: 50,
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
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
  },
});
