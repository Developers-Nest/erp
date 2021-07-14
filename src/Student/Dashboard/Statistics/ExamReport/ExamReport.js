import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
// import {Dropdown} from 'react-native-material-dropdown-v2-fixed';

import ModalSelector from 'react-native-modal-selector';

export default function ExamReport({navigation}) {
  // const [open, setOpen] = useState(null);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Final Reports', key: 'Final Reports'},
    {label: 'Mid Term', key: 'Mid Term'},
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Statistics')}>
          <FontAwesome5
            name="chevron-left"
            style={{
              alignSelf: 'center',
              fontSize: 25,
              color: 'black',
              paddingLeft: 20,
              paddingTop: 20,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontStyle: 'normal',
            fontSize: 28,
            fontFamily: 'NunitoSans-Light',
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
          }}>
          Exam Reports
        </Text>
      </View>
      <View style={{padding: 15}}>
        {/* <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.card}
          labelStyle={{
            fontSize: 20,
            paddingHorizontal: 15,

            fontFamily: 'Poppins-Regular',
            fontStyle: 'normal',
            lineHeight: 27,
            color: '#211C5A',
          }}
          arrowStyle={{marginRight: 10}}
          placeholder="Choose Exam"
          placeholderStyle={{
            fontSize: 20,
            paddingHorizontal: 15,

            fontFamily: 'Poppins-Regular',
            fontStyle: 'normal',
            lineHeight: 27,
            color: '#211C5A',
          }}
        /> */}
        <ModalSelector
          data={items}
          initValue="Final Exam"
          onChange={option => {
            setValue(option.key);
          }}
          style={styles.card}
          initValueTextStyle={styles.SelectedValue}
          selectTextStyle={styles.SelectedValue}
        />
        {value !== null ? <ExamReport2 /> : <ExamReport1 />}
      </View>
    </View>
  );
}

const ExamReport1 = ({navigation}) => {
  return (
    <View>
      <ScrollView>
        <Text style={styles.sectionHeading}>This Year</Text>
        <Image
          style={styles.image}
          source={{
            uri: 'https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
          }}
        />
        <Text style={styles.sectionHeading}>Previous Year</Text>
        <Image
          style={styles.image}
          source={{
            uri: 'https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
          }}
        />
      </ScrollView>
    </View>
  );
};

const ExamReport2 = () => {
  return (
    <View>
      {/* <View
        style={{
          marginTop: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          ...styles.card,
        }}>
        <FontAwesome5
          name="search"
          style={{
            alignSelf: 'center',
            fontSize: 15,
            color: 'black',
          }}
        />
        <TextInput
          style={{width: '80%', ...styles.text_input}}
          placeholder="Enter student’s name here"
        />
        <TouchableOpacity
          style={{
            alignSelf: 'center',
          }}>
          <FontAwesome5
            name="filter"
            style={{
              alignSelf: 'center',
              fontSize: 21,
              color: 'black',
            }}
          />
        </TouchableOpacity>
      </View> */}
      <ScrollView>
        <View style={{marginTop: 10, ...styles.card}}>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },

  header: {
    height: 69,
    backgroundColor: 'white',
    flexDirection: 'row',
  },

  card: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 12,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    minWidth: 110,
    elevation: 3,
  },
  sectionHeading: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 10,
    color: '#4D4D4D',
  },
  image: {
    minWidth: 100,
    height: 200,
  },
  text_input: {
    paddingHorizontal: 20,
    borderRadius: 10,
    // backgroundColor: 'rgba(249, 249, 249, 1)',
    height: 50,
    fontSize: 16,
    minWidth: 171,
    backgroundColor: 'white',
  },
  card_title: {fontSize: 18},
  card_marks: {
    justifyContent: 'center',
    backgroundColor: ' rgba(88, 99, 109, 1)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: 'white',
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
  SelectedValue: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 27,
    padding: 10,
    alignSelf: 'flex-start',
    color: '#211C5A',
  },
});
