import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  Button,
  List,
  Card,
  Title,
  Paragraph,
  TextInput,
} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import StepIndicator from 'react-native-step-indicator';

const customStyles = {
  stepIndicatorSize: 10,
  currentStepIndicatorSize: 10,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: 'green',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: 'green',
  stepStrokeUnFinishedColor: 'red',
  separatorFinishedColor: 'green',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: 'green',
  stepIndicatorUnFinishedColor: 'red',
  stepIndicatorCurrentColor: 'green',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
};

export default function Fees() {
  const [CurrentPosition, setCurrentPosition] = useState(0);
  const labels = ['Registration Form', 'Semester Fees', 'Extra Fees'];

  const [collapsed, setcollapsed] = useState(Array(labels.length).fill(false));

  const data = [
    {
      fees: 'Paid: Rs500',
      dateTime: '21 May,2021',
    },
    {
      fees: 'Paid: Rs37,500',
      dateTime: '07 Jun,2021',
    },
    {
      fees: 'Due: Rs500',
      dateTime: '15 Jun,2021',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
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
          Fees
        </Text>
      </View>
      <View style={styles.section}>
        <View style={styles.shadow}>
          <View style={styles.card_headingContainer}>
            <Text style={styles.card_heading}>Today</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{paddingHorizontal: 30}}>
        <StepIndicator
          stepCount={data.length}
          customStyles={customStyles}
          currentPosition={CurrentPosition}
          labels={labels}
          direction="vertical"
          renderLabel={({position, stepStaus, label, curentPosition}) => {
            return (
              <View style={styles.shadow}>
                <View style={styles.card}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flex: 1,
                    }}>
                    <View style={{justifyContent: 'space-between'}}>
                      <Text style={styles.card_title}>{labels[position]}</Text>
                      <Text style={styles.card_fees}>
                        {data[position] && data[position].fees}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.card_date}>
                        {data[position] && data[position].dateTime}
                      </Text>
                      <FontAwesome5
                        name="chevron-down"
                        size={14}
                        color={'rgba(62, 104, 228, 0.9)'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
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
    margin: 10,
  },
  card: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    minWidth: 300,
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
  card_heading: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21,
    textAlign: 'left',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  card_headingContainer: {
    backgroundColor: '#58636D',
    borderColor: '#58636D',
    borderRadius: 8,
    alignItems: 'center',
  },
  section: {
    alignItems: 'flex-start',
    marginHorizontal: 50,
    marginTop: 5,
  },
  card_title: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 27,
    color: '#211C5A',
  },

  card_date: {
    fontFamily: 'OpenSans-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 14,
    color: '#58636D',
  },
  card_fees: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
    color: '#1F7C17',
  },
});
