import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';

export default function RecordedClasses() {
  return (
    <View style={{backgroundColor: '#E5E5E5', height: '100%'}}>
      <Appbar>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Recorded Classes" />
      </Appbar>
      <View style={{padding: 10}} />
      <List.Section
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
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
        <List.Accordion
          style={{
            width: 130,
          }}
          title="Subject">
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
      <View style={{padding: 10}} />
      <View
        style={{
          paddingLeft: 11,
          paddingRight: 11,
        }}>
        <Card>
          <Card.Content>
            <Title>
              <Text style={{fontWeight: 'bold'}}>Title:</Text>
              <Text> Newton's Laws Of Motion</Text>
            </Title>
            <View style={{padding: 2}} />
            <View style={{borderWidth: 0.5}} />
            <View style={{padding: 4}} />
            <Paragraph>Description (optional)</Paragraph>
            <View style={{padding: 80}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Button
                mode="contained"
                color="white"
                onPress={() => console.log('Pressed')}>
                Chapter
              </Button>
              <View style={{padding: 10}} />
              <Button
                mode="contained"
                color="white"
                onPress={() => console.log('Pressed')}>
                Add Link
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
      <View style={{padding: 30}} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={{
            width: 90,
          }}>
          {' '}
          Save
        </Button>
      </View>
    </View>
  );
}
