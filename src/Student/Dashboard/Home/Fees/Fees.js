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
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: 'black',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
};

export default function Fees() {
  const [CurrentPosition, setCurrentPosition] = useState(0);

  const labels = ['Registration Form', 'Semester Fees', 'Extra Fees'];
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
      dateTime: 'Due on 15 Jun,2021',
    },
  ];

  return (
    <ScrollView style={{paddingHorizontal: 30, width: '100%'}}>
      <StepIndicator
        stepCount={labels.length}
        customStyles={customStyles}
        currentPosition={CurrentPosition}
        labels={labels}
        direction="vertical"
        renderLabel={({position, stepStaus, label, curentPosition}) => {
          return (
            <View style={styles.card}>
              <View>
                <Text>{labels[position]}</Text>
                <Text>{data[position] && data[position].fees}</Text>
                <Text>{data[position] && data[position].dateTime}</Text>
              </View>
            </View>
          );
        }}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  header: {
    height: 65,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  Drop: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  Week: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 10,
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
});
