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
  'This event will be held today atkrhjfbckeirvbikhev place at wjbcferob hours';

const CONTENT = [
  {
    title: 'News1',
    content: text,
    type: 'News',
  },
  {
    title: 'Event1',
    content: text,
    type: 'Event',
  },
  {
    title: 'Event2',
    content: text,
    type: 'Event',
  },
  {
    title: 'News2',
    content: text,
    type: 'News',
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
      <Animatable.View
        duration={400}
        style={styles.header}
        transition="backgroundColor">
        <View style={styles.iconConatiner}>
          <FontAwesome5
            name={section.type === 'Event' ? 'video' : 'calendar-day'}
            size={27}
          />
          {section.type === 'Event' ? (
            <Text style={styles.iconText}>Event</Text>
          ) : (
            <Text style={styles.iconText}>News</Text>
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>{section.title}</Text>
          {isActive ? (
            <View style={styles.collapseIconContainer}>
              <Text style={styles.collapseIconText}>2 min ago</Text>

              <FontAwesome5 name="chevron-up" size={14} />
            </View>
          ) : (
            <View style={styles.collapseIconContainer}>
              <Text style={styles.collapseIconText}>2 min ago</Text>

              <FontAwesome5 name="chevron-down" size={14} />
            </View>
          )}
        </View>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View duration={100} style={{paddingHorizontal: 10}}>
        <Text animation={isActive ? 'bounceIn' : undefined}>
          {section.content}
        </Text>
      </Animatable.View>
    );
  }

  render() {
    const {activeSections} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
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
    backgroundColor: '#E5E5E5',
  },

  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
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
    elevation: 5,
    backgroundColor: 'white',
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 10,
  },
  iconText: {
    fontSize: 9,
    fontWeight: '400',
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
  },
});
