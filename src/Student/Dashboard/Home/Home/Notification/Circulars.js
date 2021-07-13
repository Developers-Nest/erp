import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const text =
  'Exams will be conducted via online mode. All the best. It is requested from the students to maintain the.';

const CONTENT = [
  {
    title: 'Title1',
    content: text,
  },
  {
    title: 'Title2',
    content: text,
  },
  {
    title: 'Title3',
    content: text,
  },
];

export default class App extends Component {
  state = {
    activeSections: [],
    collapsed: true,
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
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
            <Text style={styles.collapseIconTextTime}>8 hrs ago</Text>

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
            <Text style={styles.collapseIconText}>8 hrs ago</Text>
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
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View duration={100} transition="backgroundColor">
        <Text
          style={styles.content}
          animation={isActive ? 'bounceIn' : undefined}>
          {section.content}
        </Text>
      </Animatable.View>
    );
  }

  render() {
    const {activeSections} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={{padding: 10}}>
          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
            renderAsFlatList={false}
            containerStyle={styles.cardsWrapper}
            sectionContainerStyle={styles.card}
          />
        </ScrollView>
      </View>
    );
  }
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
