import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';

const MySearchbar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};
export default function CceMarks2() {
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <Appbar>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="CCE Marks" />
        <Appbar.Action icon="information" onPress={() => {}} />
      </Appbar>
      <View
        style={{
          padding: 10,
        }}
      />
      <List.Section
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <List.Accordion
          style={{
            width: 120,
          }}
          title="Class">
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>

        <List.Accordion
          style={{
            width: 120,
          }}
          title="Batch">
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <List.Section
          style={{
            // flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <List.Accordion style={{}} title="Assesment Name">
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
          <View style={{padding: 5}} />
          <List.Accordion style={{}} title="Term">
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
          <View style={{padding: 5, height: 1}} />
          <List.Accordion style={{}} title="Exam Name">
            <ScrollView>
              <List.Item title="First item" />
              <List.Item title="Second item" />
              <List.Item title="Second item" />
              <List.Item title="Second item" />
              <List.Item title="Second item" />
              <List.Item title="Second item" />
              <List.Item title="Second item" />
              <List.Item title="Second item" />
            </ScrollView>
          </List.Accordion>
        </List.Section>
      </View>
      <View
        style={{
          paddingTop: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          mode="contained"
          color="#5177E7"
          onPress={() => console.log('Pressed')}
          style={{
            width: 90,
          }}>
          {' '}
          Get
        </Button>
      </View>
      <View
        style={{
          padding: 5,
        }}>
        <MySearchbar />
      </View>
      <View
        style={{
          padding: 5,
        }}></View>
      <View style={{marginTop: 10, ...styles.shadow}}>
        <View style={styles.card_top}>
          <View>
            <Text style={styles.card_title}>Title</Text>
            <Text style={{color: 'blue', fontSize: 12}}>Remarks</Text>
          </View>
          <View style={styles.card_marks}>
            <Text style={{color: 'white'}}>18/30</Text>
          </View>
        </View>
        <View style={styles.card_middle}>
          <Text>
            There are some issues on the writing methods of the answers.Try to
            improve them.
          </Text>
        </View>
        <View style={styles.card_bottom}>
          <Text style={{color: 'rgba(176, 67, 5, 1)', fontSize: 12}}>
            Max:21/30
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
  card_top: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card_middle: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  card_bottom: {
    borderTopColor: 'rgba(88, 99, 109, 0.45)',
    borderTopWidth: 1,
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 20,
  },
  card_marks: {
    backgroundColor: '#58636D',
    borderRadius: 2,
    width: 61,
    textAlign: 'center',
    justifyContent: 'center',
    paddingLeft: 11,
  },
});
