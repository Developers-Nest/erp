import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';

import {Button} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// helpers
import get from '../../../../../services/helpers/request/get';
import read from '../../../../../services/localstorage/read';

// redux
import {useSelector} from 'react-redux';

// loading screen
import LoadingScreen from '../../../../../components/LoadingScreen/LoadingScreen';

export default function Circular() {
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();
  const userInfo = useSelector(state => state.userInfo);
  const [circularList, setCircularList] = useState([]);
  const [fetched, setFetched] = useState(false);

  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(0, 15);
  };

  useEffect(async () => {
    showLoadingScreen();
    try {
      let token = await read('token');
      let slug = `/circular?course=${userInfo.course}&batch=${userInfo.batch}`;
      let res = await get(slug, token);
      let circularArray = [];
      res.map(cir => {
        circularArray.push({
          title: cir.circularsubject,
          content: cir.circularContent,
          time: parseDate(cir.circularDate),
          url: cir.url,
        });
      });
      setCircularList(circularArray);
      setFetched(true);
    } catch (err) {
      alert('Cannot fetch circular!!');
    }
    hideLoadingScreen();
  }, []);

  function renderHeader(section, _, isActive) {
    return (
      <View duration={400} style={styles.header} transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
        {isActive ? (
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}>
            <Text style={styles.collapseIconTextTime}>{section.time}</Text>

            <View style={styles.collapseIconContainer}>
              <FontAwesome5
                name="chevron-up"
                size={14}
                color={'rgba(62, 104, 228, 0.9)'}
              />
              <Text style={styles.collapseIconText}>Read Less</Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}>
            <Text style={styles.collapseIconText}>{section.time}</Text>
            <View style={styles.collapseIconContainer}>
              <FontAwesome5
                name="chevron-down"
                size={14}
                color={'rgba(62, 104, 228, 0.9)'}
              />
              <Text style={styles.collapseIconText}>Read More</Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  function renderContent(section, _, isActive) {
    return (
      <Animatable.View duration={100} transition="backgroundColor">
        <Text
          style={styles.content}
          animation={isActive ? 'bounceIn' : undefined}>
          {section.content}
        </Text>
        <Button
          mode="contained"
          style={{
            borderWidth: 0.5,
            borderColor: institute ? institute.themeColor : 'black',
          }}
          color={institute ? institute.themeColor : 'black'}
          onPress={() => Linking.openURL(section.url)}>
          Download Circular
        </Button>
      </Animatable.View>
    );
  }

  const [ActiveSections, setActiveSections] = useState([]);
  const [collapsed, setcollapsed] = useState(true);

  const setSections = sections => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  return (
    <View style={styles.container}>
      {loadingScreen}
      {fetched ? (
        <ScrollView style={{padding: 10}}>
          {circularList.length === 0 ? (
            <Text
              style={{
                marginVertical: 10,
                marginHorizontal: 30,
              }}>
              No Circulars
            </Text>
          ) : (
            <Accordion
              activeSections={ActiveSections}
              sections={circularList}
              touchableComponent={TouchableOpacity}
              renderHeader={renderHeader}
              renderContent={renderContent}
              duration={400}
              onChange={setSections}
              renderAsFlatList={false}
              containerStyle={styles.cardsWrapper}
              sectionContainerStyle={styles.card}
            />
          )}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  content: {
    padding: 10,
    /* BODY-12 */

    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,

    color: '#00499F',
  },
  header: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',

    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    lineHeight: 27,

    color: '#211C5A',
  },

  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    marginVertical: 10,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 3,
    backgroundColor: 'white',
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius:12,
    paddingHorizontal: 10,
  },
  collapseIconContainer: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingTop: 5,
  },
  collapseIconText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'OpenSans-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 14,
    color: '#58636D',
  },
  collapseIconTextTime: {
    fontSize: 10,
    fontFamily: 'OpenSans-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 14,
    color: '#58636D',
  },
});
