import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// helpers
import read from '../../../../../services/localstorage/read';
import get from '../../../../../services/helpers/request/get';
import deleteReq from '../../../../../services/helpers/request/delete';

import LoadingScreen from '../../../../../components/LoadingScreen/LoadingScreen';

import { useFocusEffect } from '@react-navigation/native';

export default function Notification() {
  let userInfo = useSelector(state => state.userInfo);

  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();

  const [content, setContent] = useState([]);
  const [fetched, setFetched] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        showLoadingScreen();
        try {
          let slug = `/notification`;
          let token = await read('token');
          let res = await get(slug, token);
          let Content = [];
          res.map(noti => {
            Content.push({
              title: noti.title,
              content: noti.message,
              type: 'News',
              _id: noti._id
            });
          });
          setContent(Content);
          setFetched(true);
        } catch (err) {
          alert('Cannot get Notifications!!');
        }
        hideLoadingScreen();
      }
      fetchUser();

      return () => {
        isActive = false;
      };
    }, [])
  );

  let deleteNotification = async (id) => {
    showLoadingScreen()
    try {
      let slug = `/notification/${id}`
      console.log('Slug ', slug)
      let token = await read('token')
      let res = await deleteReq(slug, token)
      if (res.error) {
        alert(res.error)
      } else if (res._id) {
        alert('Deleted')
        setContent(content.filter((c) => c._id != id))
      }
    } catch (err) {
      alert('Cannot Delete Notification!!')
    }
    hideLoadingScreen()
  }

  function renderHeader(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={styles.header}
        transition="backgroundColor">
        <View style={styles.iconConatiner}>
          <FontAwesome5
            name={section.type === 'Event' ? 'video' : 'calendar-day'}
            size={27}
            style={{ color: '#58636D' }}
          />
          {section.type === 'Event' ? (
            <Text style={styles.iconText}>Event</Text>
          ) : (
            <Text style={styles.iconText}>News</Text>
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>{section.title}</Text>
          <TouchableOpacity onPress={() => deleteNotification(section._id)}>
            <View>
              <FontAwesome5
                name="trash"
                size={14}
                style={styles.collapseIconIcon}
              />
            </View>
          </TouchableOpacity>
          {isActive ? (
            <View style={styles.collapseIconContainer}>
              <FontAwesome5
                name="chevron-up"
                size={14}
                style={styles.collapseIconIcon}
              />
            </View>
          ) : (
            <View style={styles.collapseIconContainer}>
              <FontAwesome5
                name="chevron-down"
                size={14}
                style={styles.collapseIconIcon}
              />
            </View>
          )}
        </View>
      </Animatable.View>
    );
  }

  function renderContent(section, _, isActive) {
    return (
      <Animatable.View duration={100} style={{ paddingHorizontal: 10 }}>
        <Text
          animation={isActive ? 'bounceIn' : undefined}
          style={styles.collapseContent}>
          {section.content}
        </Text>
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
        <ScrollView style={{ padding: 10 }}>
          <Accordion
            activeSections={ActiveSections}
            sections={content}
            touchableComponent={TouchableOpacity}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}
            renderAsFlatList={false}
            containerStyle={styles.cardsWrapper}
            sectionContainerStyle={styles.card}
          />
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

  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',

    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 18,

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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 3,
    backgroundColor: 'white',
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 10,
  },
  iconText: {
    fontSize: 9,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
  },
  iconConatiner: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    padding: 10,
  },
  collapseIconContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collapseIconText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'OpenSans-Regular',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  collapseIconIcon: {
    color: 'rgba(62, 104, 228, 0.9)',
  },
  collapseContent: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,

    color: '#00499F',
  },
});
