import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
// import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import ModalSelector from 'react-native-modal-selector';

export default function ExamReport({navigation}) {
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Final Reports', key: 'Final Reports'},
    {label: 'Mid Term', key: 'Mid Term'},
  ]);

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

  const [subject, setsubject] = useState(null);
  const [subjects, setsubjects] = useState([
    {label: 'Subject1', key: 'Subject1'},
    {label: 'Subject2', key: 'Subject2'},
    {label: 'Subject3', key: 'Subject3'},
  ]);

  //selected values
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
            fontFamily: 'NunitoSans-Regular',
            fontWeight: '600',
            alignSelf: 'center',
            paddingLeft: 30,
          }}>
          Exam Reports
        </Text>
      </View>
      <View style={{marginHorizontal: 15, marginVertical: 10}}>
        {/* <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.dropdown}
          labelStyle={{
            fontSize: 20,
            paddingHorizontal: 15,
            marginVertical: 10,
            fontFamily: 'Poppins-Regular',
            fontStyle: 'normal',
            fontWeight: '500',
          }}
          arrowStyle={{marginRight: 10}}
          placeholder="Final Report"
          placeholderStyle={{
            fontSize: 20,
            paddingHorizontal: 15,
            marginVertical: 10,
            fontFamily: 'Poppins-Regular',
            fontStyle: 'normal',
            fontWeight: '500',
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          {/* <DropDownPicker
            zIndex={1000}
            open={open1}
            value={class}
            items={classes}
            setOpen={setOpen1}
            setValue={setclass}
            setItems={setclasses}
            style={styles.dropdown}
            containerStyle={{width: '30%'}}
            placeholder="Class"
          />
          <DropDownPicker
            defaultIndex={0}
            open={open2}
            value={batch}
            items={batches}
            setOpen={setOpen2}
            setValue={setbatch}
            setItems={setbatches}
            style={styles.dropdown}
            containerStyle={{width: '30%'}}
            placeholder="Batch"
          />
          <DropDownPicker
            defaultIndex={0}
            open={open3}
            value={subject}
            items={subjects}
            setOpen={setOpen3}
            setValue={setsubject}
            setItems={setsubjects}
            style={styles.dropdown}
            containerStyle={{width: '30%'}}
            placeholder="Subject"
          /> */}
          <ModalSelector
            data={classes}
            initValue="Class1"
            onChange={option => {
              setclassName(option.key);
            }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
          <ModalSelector
            data={batches}
            initValue="Batch1"
            onChange={option => {
              setbatch(option.key);
            }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
          <ModalSelector
            data={subjects}
            initValue="Subject1"
            onChange={option => {
              setsubject(option.key);
            }}
            style={styles.card}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>
      </View>

      {value !== null &&
      className !== null &&
      batch !== null &&
      subject !== null ? (
        <ExamReport21 />
      ) : null}

      {value !== null &&
      className !== null &&
      batch !== null &&
      subject !== null ? (
        <ExamReport22 />
      ) : (
        <ExamReport1 />
      )}
    </View>
  );
}

const ExamReport1 = () => {
  return (
    <ScrollView style={{paddingHorizontal: 15}}>
      <Text style={{paddingVertical: 10, fontSize: 16}}>This Year</Text>
      <Image
        style={styles.image}
        source={{
          uri: 'https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
        }}
      />
      <Text style={{paddingVertical: 10, fontSize: 16}}>Previous Year</Text>
      <Image
        style={styles.image}
        source={{
          uri: 'https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
        }}
      />
    </ScrollView>
  );
};

const ExamReport21 = () => {
  return (
    <View style={{marginHorizontal: 15, marginTop: 10, ...styles.shadow}}>
      <View
        style={{
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
      </View>
    </View>
  );
};

const ExamReport22 = () => {
  return (
    <ScrollView>
      <View style={{marginHorizontal: 15, marginVertical: 20}}>
        <View style={styles.shadow}>
          <View style={styles.card}>
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
              <Text style={{color: 'black'}}>
                There are some issues on the writing methods of the answers.Try
                to improve them.
              </Text>
            </View>
            <View style={styles.card_bottom}>
              <Text style={{color: 'rgba(176, 67, 5, 1)', fontSize: 12}}>
                Max:21/30
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
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
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    justifyContent: 'center',
    minWidth: 110,
  },
  dropdown: {
    elevation: 3,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    justifyContent: 'center',
    minWidth: 110,
  },
  accordion: {margin: 0, padding: 0, backgroundColor: 'white'},
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
  card: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',

    minWidth: 110,
    elevation: 3,
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
  classes_card: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  classes_cardClass: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#58636D',
  },
  classes_cardTime: {
    fontSize: 12,
    color: '#5177E7',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  classes_cardBatch: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    paddingVertical: 5,
    color: '#58636D',
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
