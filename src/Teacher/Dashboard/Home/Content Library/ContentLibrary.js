import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Button} from 'react-native-paper';

//icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

// redux
import {useSelector} from 'react-redux';

export default function ContentLibrary({navigation}) {
  const [showContent, setShowContent] = React.useState('Material');
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const institute = useSelector(state => state.institute);

  function Material() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <View style={styles.differentusers}>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      fontSize: 20,
                      color: '#211C5A',
                    }}>
                    Title
                  </Text>
                </View>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 16, color: 'blue'}}>
                    course and Batch
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 16}}>
                    Exams will be conducted via online mode in the upcoming week
                    and these are the notes for it so go through them and study
                    well
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.hey}>
                  <Text style={{fontSize: 16, marginRight: 100}}>
                    Teacher's Name
                  </Text>

                  <Button
                    styles={{flexDirection: 'flex-end'}}
                    mode="contained"
                    onPress={() => console.log('Pressed')}>
                    Send
                  </Button>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{height: 20}} />
        </ScrollView>
      </View>
    );
  }

  function Videos() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <View style={styles.details}>
              <View style={styles.userinhostels}>
                <View style={styles.differentusers}>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      fontSize: 20,
                      color: '#211C5A',
                    }}>
                    Title
                  </Text>
                </View>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 16, color: 'blue'}}>
                    course and Batch
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.differentusers}>
                  <Text style={{fontSize: 16}}>
                    Exams will be conducted via online mode in the upcoming week
                    and these are the notes for it so go through them and study
                    well
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.hey}>
                  <Text style={{fontSize: 16, marginRight: 100}}>
                    Teacher's Name
                  </Text>

                  <Button
                    styles={{flexDirection: 'flex-end'}}
                    mode="contained"
                    onPress={() => console.log('Pressed')}>
                    Send
                  </Button>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{height: 20}} />
        </ScrollView>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
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
            Content Library
          </Text>

          <TouchableOpacity
            style={{
              justifyContent: 'flex-end',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}></TouchableOpacity>
        </View>
        <View style={styles.maincontainer}>
          <View
            style={{
              width: '90%',
              marginLeft: 25,
              marginBottom: 10,
              marginTop: 30,
              justifyContent: 'flex-start',
            }}>
            {/* open search */}
            <View
              style={{
                justifyContent: 'space-between',
                width: '95%',
                flexDirection: 'row',
                ...styles.shadow,
              }}>
              <FontAwesome5
                name="search"
                style={{
                  alignSelf: 'center',
                  fontSize: 15,
                  color: '#6A6A80',
                }}
              />

              <TextInput
                style={{width: '80%', ...styles.text_input}}
                placeholder="Enter subject or batch name"
              />
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                }}>
                <FontAwesome5
                  name="filter"
                  style={{
                    alignSelf: 'center',
                    fontSize: 21,
                    color: '#6A6A80',
                  }}
                />
              </TouchableOpacity>
            </View>
            {/* close search */}
          </View>
          <View style={styles.switchTabsView}>
            <TouchableOpacity
              style={{
                // flex: 1,
                borderBottomWidth: showContent == 'Material' ? 2 : 0,
                borderBottomColor: 'black',
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowContent('Material')}>
              <Text style={styles.switchText}> Study Material</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                // flex: 1,
                borderBottomWidth: showContent == 'Videos' ? 2 : 0,
                borderBottomColor: 'black',
                paddingHorizontal: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowContent('Videos')}>
              <Text style={styles.switchText}>Videos</Text>
            </TouchableOpacity>
          </View>
          {showContent === 'Material' ? <Material /> : <Videos />}
        </View>
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

  header: {
    height: 69,
    flexDirection: 'row',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
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
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#333',
  },
  userinhostels: {
    marginTop: 10,
  },
  hey: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderTopWidth: 1,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  userstext: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '300',
  },

  search: {
    backgroundColor: 'white',
    color: 'black',
  },
  switchTabsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  switchText: {
    fontSize: 20,
    color: 'black',
    paddingHorizontal: 5,
  },
  maincontainer: {
    paddingTop: 10,
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
  },

  shadow: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
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
});
