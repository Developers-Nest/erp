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

export default function Transport() {
  return (
    <View style={styles.backgroung}>
      <Appbar>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Transport" />
        <Appbar.Action icon="information" onPress={() => {}} />
      </Appbar>
      <View style={{padding: 10}} />
      <Card>
        <Card.Content>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View>
                <View
                  style={{
                    width: 10,
                  }}>
                  <Button color="#505069" icon="baby"></Button>
                </View>
                <Text
                  style={{
                    color: 'grey',
                    paddingLeft: 4,
                  }}>
                  Driver
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 2,
                  paddingLeft: 20,
                }}>
                <Text
                  style={{
                    fontSize: 25,
                  }}>
                  Dabbu Tripathi
                </Text>
                <Text>123456789</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingTop: 30,
              }}>
              <View>
                <View
                  style={{
                    width: 10,
                  }}>
                  <Button color="#505069" icon="bus"></Button>
                </View>
                <Text
                  style={{
                    color: 'grey',
                    paddingLeft: 10,
                  }}>
                  Bus
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 2,
                  paddingLeft: 25,
                }}>
                <Text
                  style={{
                    fontSize: 25,
                  }}>
                  Vehicle Name
                </Text>
                <Text>MP 19 2021 RS</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 30,
              }}>
              <View>
                <View
                  style={{
                    width: 10,
                  }}>
                  <Button color="#505069" icon="map"></Button>
                </View>
                <Text
                  style={{
                    color: 'grey',
                    paddingLeft: 10,
                  }}>
                  Route
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 2,
                  paddingLeft: 15,
                }}>
                <Text
                  style={{
                    fontSize: 25,
                  }}>
                  Civil Lines
                </Text>
                <Text>MP 19 2021 RS</Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
      <View style={{padding: 10}} />
      <Card>
        <Card.Content>
          <View>
            {/* <Image source={require()} /> */}
            <View
              style={{
                paddingTop: 180,
                flexDirection: 'row',
              }}>
              <Text>4 min</Text>
              <Text color="#D3D3D3"> (1.9km)</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroung: {
    backgroundColor: '#E5E5E5',
    height: '100%',
    flex: 1,
  },
});
