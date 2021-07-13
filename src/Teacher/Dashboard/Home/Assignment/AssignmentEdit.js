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

export default function EditAssignments({route}) {

  const {assignment} = route.params
  console.log("Assignement ", assignment)

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
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
              <Text style={{fontWeight: 'bold'}}>Chapter:</Text>
              <Text> Newton's Laws Of Motion</Text>
            </Title>
            <View style={{padding: 2}} />
            <View style={{borderWidth: 0.5}} />
            <View style={{padding: 10}} />
            <Paragraph>Topic: First Law Of Motion</Paragraph>
            <View style={{padding: 2}} />
            <View style={{borderWidth: 0.5}} />
            <View style={{padding: 10}} />
            <Paragraph>Description (optional)</Paragraph>
            <View style={{padding: 80}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Button
                icon="calendar"
                mode="contained"
                color="white"
                onPress={() => console.log('Pressed')}>
                13:00{' '}
              </Button>
              <View style={{padding: 10}} />
              <Button
                mode="contained"
                color="white"
                onPress={() => console.log('Pressed')}>
                Add file
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
        <View
          style={{
            flexDirection: 'row',
          }}></View>
        <View
          style={{
            flexDirection: 'row',
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
          <View style={{paddingLeft: 70}} />
          <Button
            mode="contained"
            color="red"
            onPress={() => console.log('Pressed')}>
            Delete
          </Button>
        </View>
      </View>
    </View>
  );
}
