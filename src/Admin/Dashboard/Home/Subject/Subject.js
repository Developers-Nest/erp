import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Appbar} from 'react-native-paper';

export default function Subjects() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction />
        <Appbar.Content title="Subjects" />
        <Appbar.Action icon="information" />
      </Appbar.Header>

      <ScrollView>
        {/* <View style={styles.maincontainer}>     */}

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Physics
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  PHY:20345
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  Batch
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Class
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Physics
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  PHY:20345
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  Batch
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Class
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Physics
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  PHY:20345
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  Batch
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Class
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Physics
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  PHY:20345
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  Batch
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Class
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Physics
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  PHY:20345
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  Batch
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Class
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Physics
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  PHY:20345
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  Batch
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Class
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Physics
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  PHY:20345
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  Batch
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Class
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Physics
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  PHY:20345
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  Batch
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'PoppinsRegular',
                  }}>
                  {' '}
                  Class
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },

  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingVertical: 2,
    paddingHorizontal: 13,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 10,
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 25,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    paddingBottom: 10,
    borderBottomColor: '#333',
    // borderBottomWidth:1,
  },
  userinhostels: {
    marginTop: 0,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userstext: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '300',
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
  },
  search: {
    backgroundColor: 'white',
    color: 'black',
  },
});
