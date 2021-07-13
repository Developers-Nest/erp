import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown';

export default function Dev()
{const [open, setOpen] = useState(null);
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
  // let data = [
  //   {
  //     value: 'Banana',
  //   },
  //   {
  //     value: 'Mango',
  //   },
  //   {
  //     value: 'Pear',
  //   },
  // ]; 
  
  return (
    <View style={{backgroundColor: '#F9F9F9', flex:1}}>
      <View style={{ backgroundcolor:'white'}}>

      <Appbar.Header backgroundColor="white">
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content title="GPA Marks" />
      <Appbar.Action icon="information" />
    </Appbar.Header>
      </View>
      <View style={{padding: 10}} />
      {/* <List.Section>
        <List.Accordion  style={styles.shadow} title="Subject">
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
        <View style={{padding: 8}} />
        <List.Accordion style={styles.shadow} title="Assesment Name">
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
        <View style={{padding: 8}} />
        <List.Accordion style={styles.shadow} title="Term">
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
        <View style={{padding: 8}} />
        <List.Accordion style={styles.shadow} title="Exam Name">
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section> */}

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
          {/* <DropDownPicker
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
          /> */}

          <ModalDropdown options={['option1','option2','option3','option4','option5']}/>
        </View>
      </View>
      <View style={{padding: 5,}}/>
      {/* <View style={{flexDirection:"row-reverse"}}>

        <Button
          mode="contained"
          color="#5177E7"
          onPress={() => console.log('Pressed')}
          style={{
            width: 90,
          }}>
          {' '}
          Get
        </Button>
      </View>
      <View style={{padding: 5,}}/>
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
        {/* <Devpart2/> */}
      {value !== null &&
        value1 !== null &&
        value2 !== null &&
        value3 !== null ? (
          <Devpart2 />
        ) : (
          <Devpart2 />
        )}
    </View>
    
  );
}

const Devpart2=()=>{


    return(
<View style={{marginTop:10}}> 
        <View style={{flexDirection:"row-reverse"}}>

        <Button
          mode="contained"
          color="#5177E7"
          onPress={() => console.log('Pressed')}
          style={{
            width: 90,
          }}>
          {' '}
          Get
        </Button>
      </View>
      <View style={{padding: 5,}}/>
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
        {/* <Devpart2/> */}
      </View>
      </View>
    );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 5,
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
  card_marks: {
    backgroundColor: '#58636D',
    borderRadius: 2,
    width: 61,
    textAlign: 'center',
    justifyContent: 'center',
    paddingLeft: 11,
  },
});