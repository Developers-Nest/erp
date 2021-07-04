import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {Text, Searchbar, Appbar} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//drawer navigation
import Assignment from './Assignment/Assignment';
import Attendance from './Attendance/Attendance';
import Books from './Books/Books';
import ContentLibrary from './Content Library/ContentLibrary';
import Feedback from './Feedback/Feedback';
import LessonPlan from './Lesson Plan/LessonPlan';
import Transport from './Transport/Transport';

//navigations from home screen
import Notification from './Home/Notification';

const Home = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  // const state = {drawer: 1};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <FontAwesome5
            name="book"
            style={{
              alignSelf: 'center',
              fontSize: 25,
              color: 'black',
              paddingLeft: 20,
              paddingTop: 20,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontStyle: 'normal',
            fontSize: 28,
            fontFamily: 'NunitoSans-Light',
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
          }}>
          Hi Youuu
        </Text>
        <View style={{flex: 1, marginLeft: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notification');
            }}>
            <MaterialCommunityIcons
              name="bell"
              style={{
                alignSelf: 'center',
                fontSize: 30,
                color: 'black',
                paddingLeft: 20,
                paddingTop: 20,
              }}
            />
          </TouchableOpacity>
          {/* <Text style={{paddingLeft: 80}}>Add event</Text> */}
        </View>
      </View>
      <SafeAreaView style={styles.main}>
        <Searchbar
          style={styles.search}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <View style={styles.classes}>
          {[1, 2, 3].map(() => {
            return (
              <View style={styles.infoBox}>
                <Text>{'Class'}</Text>
                <Text>{'09:30-10:30'}</Text>
                <Text>{'Batch'}</Text>
              </View>
            );
          })}
        </View>
        <View>
          <View style={styles.contentBox}>
            <Text>Title</Text>
            <Text>
              Exams will be conducted via online mode. All the best. It is
              requested from the students to maintain the.
            </Text>
          </View>
        </View>
        <ScrollView style={styles.classes} horizontal={true}>
          {[1, 2, 3, 4].map(() => {
            return (
              <View style={styles.infoBox}>
                <Text>{'Class'}</Text>
                <Text>{'09:30-10:30'}</Text>
                <Text>{'Batch'}</Text>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export function Default() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <SafeAreaView style={styles.main}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction
        //  onPress={_goBack}
        />
        <Appbar.Content title="Title" subtitle="Subtitle" />
        <Appbar.Action
          icon="magnify"
          //onPress={_handleSearch}
        />
        <Appbar.Action
          icon="dots-vertical"
          // onPress={_handleMore}
        />
      </Appbar.Header>
      <Searchbar
        style={styles.search}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={styles.classes}>
        {[1, 2, 3].map(() => {
          return (
            <View style={styles.infoBox}>
              <Text>{'Class'}</Text>
              <Text>{'09:30-10:30'}</Text>
              <Text>{'Batch'}</Text>
            </View>
          );
        })}
      </View>
      <View>
        <View style={styles.contentBox}>
          <Text>Title</Text>
          <Text>
            Exams will be conducted via online mode. All the best. It is
            requested from the students to maintain the.
          </Text>
        </View>
      </View>
      <ScrollView style={styles.classes} horizontal={true}>
        {[1, 2, 3, 4].map(() => {
          return (
            <View style={styles.infoBox}>
              <Text>{'Class'}</Text>
              <Text>{'09:30-10:30'}</Text>
              <Text>{'Batch'}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

const Home_Route = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export default function Route() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home_Route} />
      <Drawer.Screen name="Content Library" component={ContentLibrary} />
      <Drawer.Screen name="Attendance" component={Attendance} />
      <Drawer.Screen name="Assignment" component={Assignment} />
      <Drawer.Screen name="Lesson Plan" component={LessonPlan} />
      <Drawer.Screen name="Books" component={Books} />
      <Drawer.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen name="Transport" component={Transport} />
    </Drawer.Navigator>
  );
}

// const styles = StyleSheet.create({
//   main: {
//     backgroundColor: '#F9F9F9',
//     height: '100%',
//   },
//   classes: {
//     flexDirection: 'row',
//     'justify-content': 'center',
//   },
//   infoBox: {
//     position: 'relative',
//     width: '70px',
//     height: '70px',
//     marginTop: '20px',
//     margin: '5px',
//     border: '0.1px solid #00499F',
//     boxShadow: '4px 4px 24px -3px rgba(0, 0, 0, 0.08)',
//     borderRadius: '8px',
//     fontSize: 2,
//     padding: 15,
//     zoom: 0.2,
//     alignItems: 'center',
//   },

//   contentBox: {
//     position: 'relative',
//     width: '100%',
//     height: '70px',
//     marginTop: '20px',
//     margin: '5px',
//     border: '0.1px solid #00499F',
//     boxShadow: '4px 4px 24px -3px rgba(0, 0, 0, 0.08)',
//     borderRadius: '8px',
//     padding: 15,
//     fontSize: 10,
//   },
//   miscBox: {
//     position: 'relative',
//     width: '70px',
//     height: '70px',
//     top: '100px',
//     margin: '5px',
//     border: '0.1px solid #00499F',
//     boxShadow: '4px 4px 24px -3px rgba(0, 0, 0, 0.08)',
//     borderRadius: '8px',
//     fontSize: 10,
//     backgroundColor: 'red',
//   },
//   header: {
//     marginTop: 40,
//     backgroundColor: 'transparent',
//   },
//   search: {
//     marginTop: 20,
//     border: '0.2px solid #58636D',
//     boxShadow: '4px 4px 24px -3px #00000014',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  header: {
    height: 65,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  searchbar: {
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 150,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  cardDetails: {
    fontSize: 15,
    color: '#444',
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: 'black',
  },
  // main: {
  //   backgroundColor: '#F9F9F9',
  //   height: '100%',
  // },
  // classes: {
  //   flexDirection: 'row',
  //   // 'justify-content': 'center',
  // },
  // infoBox: {
  //   position: 'relative',
  //   width: '70px',
  //   height: '70px',
  //   marginTop: '20px',
  //   margin: '5px',
  //   border: '0.1px solid #00499F',
  //   boxShadow: '4px 4px 24px -3px rgba(0, 0, 0, 0.08)',
  //   borderRadius: '8px',
  //   fontSize: 2,
  //   padding: 15,
  //   zoom: 0.2,
  //   alignItems: 'center',
  // },

  // contentBox: {
  //   position: 'relative',
  //   width: '100%',
  //   height: '70px',
  //   marginTop: '20px',
  //   margin: '5px',
  //   border: '0.1px solid #00499F',
  //   boxShadow: '4px 4px 24px -3px rgba(0, 0, 0, 0.08)',
  //   borderRadius: '8px',
  //   padding: 15,
  //   fontSize: 10,
  // },
  // miscBox: {
  //   position: 'relative',
  //   width: '70px',
  //   height: '70px',
  //   top: '100px',
  //   margin: '5px',
  //   border: '0.1px solid #00499F',
  //   boxShadow: '4px 4px 24px -3px rgba(0, 0, 0, 0.08)',
  //   borderRadius: '8px',
  //   fontSize: 10,
  //   backgroundColor: 'red',
  // },
  // header: {
  //   marginTop: 40,
  //   backgroundColor: 'transparent',
  // },
  // search: {
  //   marginTop: 20,
  //   border: '0.2px solid #58636D',
  //   boxShadow: '4px 4px 24px -3px #00000014',
  // },
});
