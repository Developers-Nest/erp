import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ModalSelector from 'react-native-modal-selector';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// redux
import {useSelector} from 'react-redux';

export default function AddNotes({navigation}) {
  const [className, setclassName] = useState(null);
  const [classes, setclasses] = useState([
    {label: 'Class1', key: 'Class1'},
    {label: 'Class2', key: 'Class2'},
    {label: 'Class3', key: 'Class3'},
  ]);

  const [batch, setbatch] = useState(null);
  const [batches, setbatches] = useState([
    {label: 'Batch1', key: 'Batch1'},
    {label: 'Batch2', key: 'Batch2'},
    {label: 'Batch3', key: 'Batch3'},
  ]);

  const institute = useSelector(state => state.institute);

  return (
    <View style={styles.container}>
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
        <Text
          style={{
            fontStyle: 'normal',
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
            color: 'white',
            fontFamily: 'NunitoSans-Regular',
          }}>
          Add Notes
        </Text>
      </View>
      <View style={{marginHorizontal: 15, marginVertical: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}>
          <ModalSelector
            data={classes}
            initValue="Class"
            onChange={option => {
              setclass(option.key);
            }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
          <View style={{width: 40}}></View>
          <ModalSelector
            data={batches}
            initValue="Batch"
            onChange={option => {
              setbatch(option.key);
            }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>
      </View>

      <Card style={styles.card1}>
        <Card.Content>
          <TextInput
            placeholder="Topic "
            onChange={val => setTopic(val)}
            style={{borderBottomWidth: 0.5, fontSize: 15}}
          />
          <TextInput
            placeholder="Description (optional) "
            onChange={val => setDiscription(val)}
            style={{
              height: 150,
              textAlignVertical: 'top',
              marginTop: 5,
              fontSize: 15,
            }}
            multiline
            numberOfLines={4}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Button
              mode="contained"
              color="white"
              onPress={() => console.log('Pressed')}>
              Chapter{' '}
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

      <View style={{alignItems: 'center'}}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Edit Notes')}
          style={styles.submitButton}>
          Save
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },

  header: {
    height: 69,
    flexDirection: 'row',
  },
  shadow: {
    elevation: 5,
    borderRadius: 8,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  card: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    width: 125,
  },
  card1: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 20,
  },
  submitButton: {
    margin: 20,
    backgroundColor: '#5177E7',
    width: 100,
  },
  SelectedValue: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 27,
    padding: 10,
    color: '#211C5A',
  },
  SelectedValueSmall: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 30,
    paddingTop: 3,
    color: '#211C5A',
  },
});
