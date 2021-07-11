// import React from 'react';
// import {View} from 'react-native';

// import {Text} from 'react-native-paper';

// export default function App({navigation}) {
//   return (
//     <View>
//       <Text>Attendance Screen Teacher</Text>
//     </View>
//   );
// }

import React, {useState} from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  RadioButton,
} from 'react-native-paper';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

export default function Attendance() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AttendanceScreen1" component={AttendanceScreen1} />
      <Stack.Screen name="AttendanceScreen2" component={AttendanceScreen2} />
    </Stack.Navigator>
  );
}

const AttendanceScreen1 = ({navigation}) => {
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



  const [nameMethod, setNameMethod] = useState('Name');
  const [checked, setChecked] = React.useState('first');

  const [checked2, setChecked2] = React.useState('');

  const [checked3, setChecked3] = React.useState('');

  const [checked4, setChecked4] = React.useState('');

  return (
    <View
      style={{
        backgroundColor: '#E5E5E5',
        flex: 1,
        // justifyContent: 'flex-start',
      }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Icon
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
            fontFamily:'NunitoSans-Regular'
          }}>
          Attendance
        </Text>
        <View style={{flex: 1, marginLeft: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AttendanceScreen2');
            }}>
            <MaterialCommunityIcon
              size={24}
              color="white"
              name="eye"
              style={{
                alignSelf: 'center',
                fontSize: 25,
                color: 'white',
                paddingLeft: 20,
                paddingTop: 15,
              }}
            />
          </TouchableOpacity>
          <Text style={{paddingLeft: 68,fontFamily:'Poppins-Regular', color: '#fff'}}>View</Text>
        </View>
      </View>

      <ScrollView></ScrollView>

      {/* 
<AttendanceTakeHeader/> */}
      {/* open list part */}
     


  
  
      <View style={{padding: 15}}>
        {/* <Dropdown
          icon="chevron-down"
          iconColor="#E1E1E1"
          label="Favorite Fruit"
          data={data}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            alignContent: 'flex-start',
            width:'99%'
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
        <ScrollView>
        {value !== null &&
        value1 !== null &&
        value2 !== null &&
        value3 !== null ? (
          <AttendancePart />
        ) : (
          <AttendancePart />
        )}
        </ScrollView>
      </View>
    
  


      {/* </View> */}

      <View style={{padding: 7}} />

      {/* close list part */}

      {/* Cards end */}
    </View>
  );
};


const AttendancePart = () => {



  
  const [nameMethod, setNameMethod] = useState('Name');
  const [checked, setChecked] = React.useState('first');

  const [checked2, setChecked2] = React.useState('');

  const [checked3, setChecked3] = React.useState('');

  const [checked4, setChecked4] = React.useState('');

  return (

    <View style={styles.container}>
    
      {/* <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Icon
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
          }}>
          Attendance
        </Text>
        <View style={{flex: 1, marginLeft: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AttendanceScreen2');
            }}>
            <MaterialCommunityIcon
              size={24}
              color="white"
              name="eye"
              style={{
                alignSelf: 'center',
                fontSize: 25,
                color: 'white',
                paddingLeft: 20,
                paddingTop: 15,
              }}
            />
          </TouchableOpacity>
          <Text style={{paddingLeft: 75, color: '#fff'}}>View</Text>
        </View>
      </View> */}

      {/* 
<AttendanceTakeHeader/> */}
      {/* open list part */}
      <View style={{padding: 5, justifyContent: 'center'}} />
{/* 
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
      </View> */}

      {/* </View> */}


      {/* close list part */}

      {/* open search */}
    
{/* open search */}
<View
        style={{
       
          //make search and card in same line
          marginLeft:5,
          justifyContent: 'space-between',
          width:'95%',
          flexDirection: 'row',
          ...styles.shadow,
        }}>
        <FontAwesome5
          name="search"
          style={{
            alignSelf: 'center',
            fontSize: 11,
            color: '#6A6A80',
          }}/>
        <TextInput
          style={{width: '80%', ...styles.text_input}}
          placeholder="Enter student's name"
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
            color: '#6A6A80',
          }}
        
          />
        </TouchableOpacity>
      </View>
      
<View style={{padding:10}}/>


      {/* starting of Card loop-section,scroll for more number of cards */}
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 22, color: '#211C5A',fontFamily:'Poppins-Regular'}}> Name</Text>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80',fontFamily:'Poppins-Medium'}}>
                  Roll No.
                </Text>

                <Text style={{fontSize: 12, color: '#6A6A80',fontFamily:'Poppins-Medium'}}>
                  21 May,2021
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 22, color: '#211C5A'}}> Name</Text>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
                  Roll No.
                </Text>

                <Text style={{fontSize: 12, color: '#6A6A80'}}>
                  21 May,2021
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 22, color: '#211C5A'}}> Name</Text>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
                  Roll No.
                </Text>

                <Text style={{fontSize: 12, color: '#6A6A80'}}>
                  21 May,2021
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 22, color: '#211C5A'}}> Name</Text>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
                  Roll No.
                </Text>

                <Text style={{fontSize: 12, color: '#6A6A80'}}>
                  21 May,2021
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 22, color: '#211C5A'}}> Name</Text>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
                  Roll No.
                </Text>

                <Text style={{fontSize: 12, color: '#6A6A80'}}>
                  21 May,2021
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 22, color: '#211C5A'}}> Name</Text>
                <RadioButton
                  value="second"
                  status={checked2 === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked2('second')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
                  Roll No.
                </Text>

                <Text style={{fontSize: 12, color: '#6A6A80'}}>
                  21 May,2021
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 22, color: '#211C5A'}}> Name</Text>
                <RadioButton
                  value="third"
                  status={checked3 === 'third' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked3('third')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
                  Roll No.
                </Text>

                <Text style={{fontSize: 12, color: '#6A6A80'}}>
                  21 May,2021
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 22, color: '#211C5A'}}> Name</Text>
                <RadioButton
                  value="fourth"
                  status={checked4 === 'fourth' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked4('fourth')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
                  Roll No.
                </Text>

                <Text style={{fontSize: 12, color: '#6A6A80'}}>
                  21 May,2021
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Cards end */}
    
    </View>
  );
};



const AttendanceScreen2 = ({navigation}) => {
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



  const [nameMethod, setNameMethod] = useState('Name');
  const [checked, setChecked] = React.useState('first');

  const [checked2, setChecked2] = React.useState('');

  const [checked3, setChecked3] = React.useState('');

  const [checked4, setChecked4] = React.useState('');

  return (
    <View
      style={{
        backgroundColor: '#E5E5E5',
        flex: 1,
        // justifyContent: 'flex-start',
      }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AttendanceScreen1');
          }}>
          <Icon
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
            fontFamily:'NunitoSans-Regular'
          }}>
          Attendance
        </Text>
  
      </View>

      <ScrollView></ScrollView>

      {/* 
<AttendanceTakeHeader/> */}
      {/* open list part */}
     


  
  
      <View style={{padding: 15}}>
        {/* <Dropdown
          icon="chevron-down"
          iconColor="#E1E1E1"
          label="Favorite Fruit"
          data={data}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            alignContent: 'flex-start',
            width:'99%'
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
        <ScrollView>
        {value !== null &&
        value1 !== null &&
        value2 !== null &&
        value3 !== null ? (
          <AttendancePart2 />
        ) : (
          <AttendancePart2 />
        )}
        </ScrollView>
      </View>
    
  


      {/* </View> */}

      <View style={{padding: 7}} />

      {/* close list part */}

      {/* Cards end */}
    </View>
  );
};


const AttendancePart2 = () => {



  
  const [nameMethod, setNameMethod] = useState('Name');
  const [checked, setChecked] = React.useState('first');

  const [checked2, setChecked2] = React.useState('');

  const [checked3, setChecked3] = React.useState('');

  const [checked4, setChecked4] = React.useState('');

  return (

    <View style={styles.container}>
    
      {/* <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Icon
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
          }}>
          Attendance
        </Text>
        <View style={{flex: 1, marginLeft: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AttendanceScreen2');
            }}>
            <MaterialCommunityIcon
              size={24}
              color="white"
              name="eye"
              style={{
                alignSelf: 'center',
                fontSize: 25,
                color: 'white',
                paddingLeft: 20,
                paddingTop: 15,
              }}
            />
          </TouchableOpacity>
          <Text style={{paddingLeft: 75, color: '#fff'}}>View</Text>
        </View>
      </View> */}

      {/* 
<AttendanceTakeHeader/> */}
      {/* open list part */}
      <View style={{padding: 5, justifyContent: 'center'}} />
{/* 
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
      </View> */}

      {/* </View> */}


      {/* close list part */}

      {/* open search */}
    
{/* open search */}
<View
        style={{
       
          //make search and card in same line
          marginLeft:5,
          justifyContent: 'space-around',
          width:'95%',
          flexDirection: 'row',
          ...styles.shadow2,
        }}>
        <FontAwesome5
          name="search"
          style={{
            alignSelf: 'center',
           
            
            
            fontSize: 11,
            color: '#6A6A80',
          }}/>
        <TextInput
          style={{width: '70%', ...styles.text_input2}}
          placeholder="Enter student's name"
        />
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            flexDirection:'column'
          }}>

          <FontAwesome5
          name="calendar"
          style={{
            alignSelf: 'center',
            // paddingRight:20,
            // marginRight:20,
            fontSize: 20,
            color: '#6A6A80',
          }}
           
          />
          <Text style={{fontFamily:'Poppins-Medium',fontSize:12,color:'#6A6A80'}}>This Month</Text>
        </TouchableOpacity>
      </View>
      
<View style={{padding:10}}/>


      {/* starting of Card loop-section,scroll for more number of cards */}
      <ScrollView>
      <View style={styles.section}>
           <View style={styles.details}>
             <View style={styles.userinhostels}>
             <TouchableOpacity
                style={styles.differentusers}
                onPress={() => {
                  setNameMethod('Name');
                }}>
                <Text style={{fontSize: 22, color: '#211C5A',fontFamily:'Poppins-regular'}}> Balram</Text>

                <Text style={{fontSize: 22, paddingTop: 22, color: '#000000',fontFamily:'Poppins-regular'}}>
                  {' '}
                  78%
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80',fontFamily:'Poppins-regular'}}>
                  Roll No.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
           <View style={styles.details}>
             <View style={styles.userinhostels}>
             <TouchableOpacity
                style={styles.differentusers}
                onPress={() => {
                  setNameMethod('Name');
                }}>
                <Text style={{fontSize: 22, color: '#211C5A'}}> Balram</Text>

                <Text style={{fontSize: 22, paddingTop: 22, color: '#000000'}}>
                  {' '}
                  78%
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
                  Roll No.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
           <View style={styles.details}>
             <View style={styles.userinhostels}>
             <TouchableOpacity
                style={styles.differentusers}
                onPress={() => {
                  setNameMethod('Name');
                }}>
                <Text style={{fontSize: 22, color: '#211C5A'}}> Balram</Text>

                <Text style={{fontSize: 22, paddingTop: 22, color: '#000000'}}>
                  {' '}
                  78%
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
                  Roll No.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
           <View style={styles.details}>
             <View style={styles.userinhostels}>
             <TouchableOpacity
                style={styles.differentusers}
                onPress={() => {
                  setNameMethod('Name');
                }}>
                <Text style={{fontSize: 22, color: '#211C5A'}}> Balram</Text>

                <Text style={{fontSize: 22, paddingTop: 22, color: '#000000'}}>
                  {' '}
                  78%
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
                  Roll No.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
           <View style={styles.details}>
             <View style={styles.userinhostels}>
             <TouchableOpacity
                style={styles.differentusers}
                onPress={() => {
                  setNameMethod('Name');
                }}>
                <Text style={{fontSize: 22, color: '#211C5A'}}> Balram</Text>

                <Text style={{fontSize: 22, paddingTop: 22, color: '#000000'}}>
                  {' '}
                  78%
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.differentusers}>
                <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
                  Roll No.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Cards end */}
    
    </View>
  );
};


// const AttendanceScreen2 = ({navigation}) => {
//   const [nameMethod, setNameMethod] = useState('Name');
//   const [checked, setChecked] = React.useState('');

//   return (
//     <View
//       style={{
//         backgroundColor: '#E5E5E5',
//         flex: 1,
//         justifyContent: 'flex-start',
//       }}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate('AttendanceScreen1');
//           }}>
//           <Icon
//             size={24}
//             color="white"
//             name="left"
//             style={{
//               alignSelf: 'center',
//               fontSize: 25,
//               color: 'white',
//               paddingLeft: 20,
//               paddingTop: 20,
//             }}
//           />
//         </TouchableOpacity>
//         <Text
//           style={{
//             fontStyle: 'normal',
//             fontSize: 28,
//             fontWeight: '600',
//             alignSelf: 'center',
//             paddingLeft: 30,
//             color: 'white',
//           }}>
//           Attendance
//         </Text>
//       </View>
//       {/* open list part */}
//       <View style={{padding: 10, justifyContent: 'center'}} />

//       <View style={styles.Drop}>
//         <List.Section style={{width: 120}}>
//           <List.Accordion
//             title="Class"
//             style={{
//               borderTopRightRadius: 5,
//               borderBottomRightRadius: 5,
//               borderBottomLeftRadius: 5,
//               borderWidth: 0.5,
//               borderTopStartRadius: 5,
//               backgroundColor: 'white',
//             }}>
//             <List.Item title="First item" />
//             <List.Item title="Second item" />
//           </List.Accordion>
//         </List.Section>

//         <List.Section style={{width: 120}}>
//           <List.Accordion
//             title="Batch"
//             style={{
//               borderTopRightRadius: 5,
//               borderBottomRightRadius: 5,
//               borderBottomLeftRadius: 5,
//               borderWidth: 0.5,
//               borderTopStartRadius: 5,
//               backgroundColor: 'white',
//             }}>
//             <List.Item title="First item" />
//             <List.Item title="Second item" />
//           </List.Accordion>
//         </List.Section>

//         <List.Section style={{width: 120}}>
//           <List.Accordion
//             title="Subject"
//             style={{
//               borderTopRightRadius: 5,
//               borderBottomRightRadius: 5,
//               borderBottomLeftRadius: 5,
//               borderWidth: 0.5,
//               borderTopStartRadius: 5,
//               backgroundColor: 'white',
//             }}>
//             <List.Item title="First item" />
//             <List.Item title="Second item" />
//           </List.Accordion>
//         </List.Section>
//       </View>

//       <View style={{padding: 7}} />

//       {/* close list part */}

//       {/* open search */}
//       <View
//         style={{
//           width: '89%',
//           marginLeft: 20,
//           marginBottom: 10,
//           // marginTop: 30,
//         }}>
//         <View style={{marginTop: 10, ...styles.card}}>
//           <TextInput
//             left={<TextInput.Icon name="magnify" />}
//             right={<TextInput.Icon name="calendar" />}
//             theme={{
//               colors: {
//                 primary: '#999',
//                 underlineColor: 'transparent',
//                 background: 'white',
//               },
//             }}
//             placeholder="Enter student's name"
//             outlineColor="transparent"
//             styles={{
//               margin: 10,
//               padding: 10,
//               backgroundColor: 'white',
//             }}
//             mode="outline"
//           />
//         </View>
//       </View>
//       {/* close search */}
//       <ScrollView>
//         {/* Cards */}
//         <View style={styles.section}>
//           <View style={styles.details}>
//             <View style={styles.userinhostels}>
//               <TouchableOpacity
//                 style={styles.differentusers}
//                 onPress={() => {
//                   setNameMethod('Name');
//                 }}>
//                 <Text style={{fontSize: 22, color: '#211C5A'}}> Balram</Text>

//                 <Text style={{fontSize: 22, paddingTop: 22, color: '#000000'}}>
//                   {' '}
//                   78%
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.differentusers}>
//                 <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
//                   Roll No.
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//         <View style={styles.section}>
//           <View style={styles.details}>
//             <View style={styles.userinhostels}>
//               <TouchableOpacity
//                 style={styles.differentusers}
//                 onPress={() => {
//                   setNameMethod('Name');
//                 }}>
//                 <Text style={{fontSize: 22, color: '#211C5A'}}> Balram</Text>

//                 <Text style={{fontSize: 22, paddingTop: 22, color: '#000000'}}>
//                   {' '}
//                   78%
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.differentusers}>
//                 <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
//                   Roll No.
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.details}>
//             <View style={styles.userinhostels}>
//               <TouchableOpacity
//                 style={styles.differentusers}
//                 onPress={() => {
//                   setNameMethod('Name');
//                 }}>
//                 <Text style={{fontSize: 22, color: '#211C5A'}}> Balram</Text>

//                 <Text style={{fontSize: 22, paddingTop: 22, color: '#000000'}}>
//                   {' '}
//                   78%
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.differentusers}>
//                 <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
//                   Roll No.
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.details}>
//             <View style={styles.userinhostels}>
//               <TouchableOpacity
//                 style={styles.differentusers}
//                 onPress={() => {
//                   setNameMethod('Name');
//                 }}>
//                 <Text style={{fontSize: 22, color: '#211C5A'}}> Balram</Text>

//                 <Text style={{fontSize: 22, paddingTop: 22, color: '#000000'}}>
//                   {' '}
//                   78%
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.differentusers}>
//                 <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
//                   Roll No.
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.details}>
//             <View style={styles.userinhostels}>
//               <TouchableOpacity
//                 style={styles.differentusers}
//                 onPress={() => {
//                   setNameMethod('Name');
//                 }}>
//                 <Text style={{fontSize: 22, color: '#211C5A'}}> Balram</Text>

//                 <Text style={{fontSize: 22, paddingTop: 22, color: '#000000'}}>
//                   {' '}
//                   78%
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.differentusers}>
//                 <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
//                   Roll No.
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.details}>
//             <View style={styles.userinhostels}>
//               <TouchableOpacity
//                 style={styles.differentusers}
//                 onPress={() => {
//                   setNameMethod('Name');
//                 }}>
//                 <Text style={{fontSize: 22, color: '#211C5A'}}> Balram</Text>

//                 <Text style={{fontSize: 22, paddingTop: 22, color: '#000000'}}>
//                   {' '}
//                   78%
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.differentusers}>
//                 <Text style={{fontSize: 14, marginLeft: 5, color: '#6A6A80'}}>
//                   Roll No.
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Cards end */}
//       <View
//         style={{
//           paddingLeft: 11,
//           paddingRight: 11,
//         }}></View>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    
    backgroundColor: '#E5E5E5',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 4,
    marginTop: 10,
    borderRadius: 12,
    
   
    padding:10,
    marginVertical:10,
    width:'100%'
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    
    borderBottomColor: '#333',
    
  },
  userinhostels: {
    marginTop: 1,
    marginHorizontal: 10,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    justifyContent: 'space-between',
  },
  userstext: {
    fontSize: 16,
   
    fontWeight: '300',
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
    //borderBottomWidth:1,
  },
  search: {
    backgroundColor: 'white',
    color: 'black',
  },
  switchTabsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  switchText: {
    fontSize: 14,
    color: '#58636D',
    paddingHorizontal: 5,
  },
  maincontainer: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#E5E5E5',
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
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    minWidth: '30%',
  },
  
  

  text_input: {
    paddingHorizontal: 10,
    borderRadius: 10,
    // backgroundColor: 'rgba(249, 249, 249, 1)',
    height: 50,
    fontSize: 16,
    minWidth: 171,
    backgroundColor: 'white',
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
  
  text_input2: {
    paddingHorizontal: 10,
    borderRadius: 10,
    // backgroundColor: 'rgba(249, 249, 249, 1)',
    height: 50,
    fontSize: 16,
    minWidth: 171,
    backgroundColor: 'white',
  },


  shadow2: {
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
  


  Drop: {
    marginTop: 5,
    flexDirection: 'row',

    justifyContent: 'space-evenly',
  },

  // container: {
  //   paddingTop: 10,
  //   flex: 1,
  //   backgroundColor: '#E5E5E5',
  // },
  // section: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   backgroundColor: '#fff',
  //   shadowColor: '#333',
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.2,
  //   elevation: 2,
  //   marginTop: 14,
  //   borderRadius: 12,
  //   paddingLeft: 10,
  //   paddingRight: 10,
  //   marginHorizontal: 20,
  // },

  // details: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   marginTop: 3,
  //   paddingBottom: 10,
  //   borderBottomColor: '#333',
  //   // borderBottomWidth: 1,
  // },
  // userinhostels: {
  //   marginTop: 10,
  // },
  // differentusers: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 2,
  //   justifyContent: 'space-between',
  // },
  // userstext: {
  //   fontSize: 16,
  //   paddingVertical: 4,
  //   fontWeight: '300',
  // },
  // belowhr: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   marginTop: 10,
  //   justifyContent: 'space-between',
  //   paddingBottom: 10,
  //   borderBottomColor: '#333',
  //   //borderBottomWidth:1,
  // },
  // search: {
  //   backgroundColor: 'white',
  //   color: 'black',
  // },
  // switchTabsView: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 40,
  // },
  // switchText: {
  //   fontSize: 14,
  //   color: '#58636D',
  //   paddingHorizontal: 5,
  // },
  // maincontainer: {
  //   paddingTop: 10,
  //   flex: 1,
  //   backgroundColor: '#E5E5E5',
  // },
  // card: {
  //   shadowColor: '#999',
  //   shadowOffset: {width: 0, height: 1},
  //   shadowOpacity: 0.5,
  //   shadowRadius: 12,
  //   elevation: 5,
  //   backgroundColor: 'white',
  //   borderColor: '#ccc',
  //   borderWidth: 1,
  //   borderBottomLeftRadius: 12,
  //   borderBottomRightRadius: 12,
  //   borderTopRightRadius: 12,
  //   borderTopLeftRadius: 12,
  //   overflow: 'hidden',
  //   justifyContent: 'center',
  //   margin: 0,
  //   padding: 0,
  //   minWidth: '30%',
  // },
  // Drop: {
  //   marginTop: 5,
  //   flexDirection: 'row',

  //   justifyContent: 'space-evenly',
  // },
  header: {
    height: 65,
    marginTop: 0,
    backgroundColor: 'rgba(0, 73, 159, 1)',
    flexDirection: 'row',
  },
});
