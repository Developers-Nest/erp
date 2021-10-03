import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Button,
} from 'react-native-paper';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

// redux
import {useSelector} from 'react-redux';

export default function Transport({navigation}) {
  //theming
  const institute = useSelector(state => state.institute);
  return (
    <View style={styles.backgroung}>
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
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
            Transport
          </Text>
        </View>
      </View>
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
  header: {
    height: 69,
    flexDirection: 'row',
  },
});
