import * as React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {Text, List} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Notifications({navigation}) {
  const [lines, setLines] = React.useState(1);

  function expand() {
    lines === 1 ? setLines(50) : setLines(1);
  }
  return (
    <View style={styles.container}>
      <List.Section style={styles.cardsWrapper}>
        <TouchableOpacity onPress={() => expand()}>
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <View style={{flexDirection: 'row', paddingVertical: 10}}>
                <View
                  style={{
                    paddingHorizontal: 20,
                    marginTop: 0,
                  }}>
                  <FontAwesome5 name="calendar-day" size={28} />
                  <Text style={{fontSize: 9, fontWeight: '400'}}>Event</Text>
                </View>
                <View>
                  <Text style={{fontSize: 18, fontWeight: '400'}}>Event</Text>
                  <Text
                    numberOfLines={lines}
                    style={{fontSize: 12, fontWeight: '400'}}>
                    This event will be held today at abc place. plaease
                    tadadadadaaaa blablablaa
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <View>
            <List.Icon icon="calendar-blank" style={{marginBottom: 0}} />
            <Text style={{paddingHorizontal: 10}}>News</Text>
          </View>
          <List.Accordion title="Controlled Accordion">
            <List.Item
              title=""
              left={props => (
                <View>
                  <Text>
                    hifffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                  </Text>
                </View>
              )}
            />
          </List.Accordion>
        </View>
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#333',
  },

  switchTabsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginTop: 20,
  },

  switchText: {
    fontSize: 14,
    color: 'black',
    paddingHorizontal: 9,
    paddingVertical: 2,
    fontFamily: 'Poppins',
    fontWeight: '600',
    height: 21,
  },

  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },

  header: {
    height: 69,
    backgroundColor: 'white',
    flexDirection: 'row',
  },

  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
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
});
