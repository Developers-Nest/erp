import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  Button,
  List,
  Card,
  Title,
  Paragraph,
  TextInput,
} from 'react-native-paper';

//icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function OnlineLecture({navigation}) {
  const [expanded, setExpanded] = React.useState(true);
  const [text, setText] = React.useState('');
  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Lectures');
          }}>
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontStyle: 'normal',
              fontSize: 28,
              fontFamily: 'NunitoSans-Light',
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
              color: 'white',
            }}>
            Go Live
          </Text>
        </View>
      </View>
      <View style={styles.Drop}>
        <List.Section style={{width: 120}}>
          <List.Accordion
            title="Class"
            style={{
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              borderWidth: 0.5,
              borderTopStartRadius: 5,
              backgroundColor: 'white',
            }}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
        </List.Section>

        <List.Section style={{width: 120}}>
          <List.Accordion
            title="Batch"
            style={{
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              borderWidth: 0.5,
              borderTopStartRadius: 5,
              backgroundColor: 'white',
            }}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
        </List.Section>

        <List.Section style={{width: 120}}>
          <List.Accordion
            title="Subject"
            style={{
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              borderWidth: 0.5,
              borderTopStartRadius: 5,
              backgroundColor: 'white',
            }}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
        </List.Section>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={{fontSize: 16, fontFamily: 'Poppins-Regular'}}>
            Chapter: Newton's Law of motion
          </Title>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.5,
            }}
          />
          <Title style={{fontSize: 16, fontFamily: 'Poppins-Regular'}}>
            Topic: First law of motion
          </Title>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.5,
            }}
          />
          <TextInput
            style={{
              height: 80,
              textAlignVertical: 'top',
              backgroundColor: 'white',
            }}
            multiline={true}
            numberOfLines={10}
            placeholder="Description (optional)"
            right={<TextInput.Affix text="/100" />}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 70,
              alignSelf: 'center',
            }}>
            <List.Item
              style={{
                width: 125,
                borderWidth: 0.3,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
              }}
              title="Date"
              right={props => <List.Icon {...props} icon="calendar" />}
            />
            <View style={{width: 100}}></View>
            <TouchableOpacity onPress={() => {}}>
              <List.Item
                style={{
                  width: 100,
                  borderWidth: 0.3,
                  alignContent: 'center',
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderTopLeftRadius: 5,
                }}
                title="Add Link"
              />
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      <Text
        style={{
          fontSize: 17,
          fontFamily: 'Poppins-Regular',
          paddingLeft: 15,
          marginTop: 15,
        }}>
        Reccurence Days
      </Text>
      <View style={styles.Week}>
        <View style={{marginTop: 15}}>
          <TouchableOpacity
            onPress={() => {
              /* do this */
            }}>
            <View
              style={{
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                width: 60,
                height: 40,
              }}>
              <Text style={{color: 'white'}}>Mon</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15, paddingLeft: 30}}>
          <TouchableOpacity
            onPress={() => {
              /* do this */
            }}>
            <View
              style={{
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                width: 60,
                height: 40,
              }}>
              <Text style={{color: 'white'}}>Tue</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15, paddingLeft: 30}}>
          <TouchableOpacity
            onPress={() => {
              /* do this */
            }}>
            <View
              style={{
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                width: 60,
                height: 40,
              }}>
              <Text style={{color: 'white'}}>Wed</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15, paddingLeft: 30}}>
          <TouchableOpacity
            onPress={() => {
              /* do this */
            }}>
            <View
              style={{
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                width: 60,
                height: 40,
              }}>
              <Text style={{color: 'white'}}>Thur</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 30}}>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => {
              /* do this */
            }}>
            <View
              style={{
                backgroundColor: 'blue',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                width: 100,
                height: 40,
              }}>
              <Text style={{color: 'white'}}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  header: {
    height: 65,
    flexDirection: 'row',
  },
  Drop: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    height: 310,
  },
  Week: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
