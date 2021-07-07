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
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';

export default function ExamReport({navigation}) {
  const [open, setOpen] = useState(null);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Final Reports', value: 'Final Reports'},
    {label: 'Mid Term', value: 'Mid Term'},
  ]);

  const [open1, setOpen1] = useState(null);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    {label: 'Class1', value: 'Class1'},
    {label: 'Class2', value: 'Class2'},
    {label: 'Class3', value: 'Class3'},
  ]);

  const [open2, setOpen2] = useState(null);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: 'Batch1', value: 'Batch1'},
    {label: 'Batch2', value: 'Batch2'},
    {label: 'Batch3', value: 'Batch3'},
  ]);

  const [open3, setOpen3] = useState(null);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    {label: 'Subject1', value: 'Subject1'},
    {label: 'Subject2', value: 'Subject2'},
    {label: 'Subject3', value: 'Subject3'},
  ]);
  let data = [
    {
      value: 'Banana',
    },
    {
      value: 'Mango',
    },
    {
      value: 'Pear',
    },
  ];
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
        {/* <Dropdown
          icon="chevron-down"
          iconColor="#E1E1E1"
          label="Favorite Fruit"
          data={data}
        /> */}
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            ...styles.shadow,
          }}
          labelStyle={{fontSize: 20, paddingHorizontal: 15}}
          arrowStyle={{marginRight: 10}}
          placeholder="Final Report"
          placeholderStyle={{
            fontSize: 20,
            paddingHorizontal: 15,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            alignContent: 'flex-start',
          }}>
          <DropDownPicker
            zIndex={1000}
            open={open1}
            value={value1}
            items={items1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setItems1}
            style={styles.shadow}
            containerStyle={{width: '30%'}}
            placeholder="Class"
          />
          <DropDownPicker
            zIndex={1000}
            defaultIndex={0}
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            style={styles.shadow}
            containerStyle={{width: '30%'}}
            placeholder="Batch"
          />
          <DropDownPicker
            zIndex={1000}
            defaultIndex={0}
            open={open3}
            value={value3}
            items={items3}
            setOpen={setOpen3}
            setValue={setValue3}
            setItems={setItems3}
            style={{
              ...styles.shadow,
            }}
            containerStyle={{width: '30%'}}
            placeholder="Subject"
          />
        </View>
        {value !== null &&
        value1 !== null &&
        value2 !== null &&
        value3 !== null ? (
          <ExamReport2 />
        ) : (
          <ExamReport1 />
        )}
      </View>
    </View>
  );
}

const ExamReport1 = ({navigation}) => {
  return (
    <ScrollView>
      <Text style={{paddingVertical: 10, fontSize: 16}}>This Year</Text>
      <Image
        style={styles.image}
        source={{
          uri: 'https://images.unsplash.com/photo-1514519273132-6a1abd48302c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWF0aW9uJTIwY2xvdWR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        }}
      />
      <Text style={{paddingVertical: 10, fontSize: 16}}>Previous Year</Text>
      <Image
        style={styles.image}
        source={{
          uri: 'https://images.unsplash.com/photo-1514519273132-6a1abd48302c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWF0aW9uJTIwY2xvdWR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        }}
      />
    </ScrollView>
  );
};

const ExamReport2 = () => {
  return (
    <View>
      <View
        style={{
          marginTop: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          ...styles.shadow,
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
      <ScrollView>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },

  header: {
    height: 69,
    backgroundColor: 'white',
    flexDirection: 'row',
  },

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
  accordion: {margin: 0, padding: 0, backgroundColor: 'white'},
  image: {
    minWidth: '100%',
    resizeMode: 'cover',
    height: 300,
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
});
