
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import { Card, Title } from 'react-native-paper';
import FeesPaidReport from './FeesPaidReport';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function ReportList({navigation}) {
    return (
        <View style={styles.container}>
           
<View style={styles.header}
          // style={{
          //   backgroundColor: institute ? institute.themeColor : 'black',
          //   ...styles.header,
          // }}
          
          >
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
              fontFamily: 'NunitoSans-Regular',
              fontSize: 28,
              fontWeight: '600',
              alignSelf: 'center',
              paddingLeft: 30,
              color: 'white',
            }}>
            Report List
          </Text>
        </View> 
        <View style={styles.CardContainer}>
                
                <TouchableWithoutFeedback 
                onPress={() => {
                    navigation.navigate('StudentReport');
                  }}
                >
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={styles.title}>Student Details</Title>
                    </Card.Content>
                </Card>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback 
                 onPress={() => {
                    navigation.navigate('AbsenteesReport');
                  }}
                >
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={styles.title}>Absentees Report</Title>
                    </Card.Content>
                </Card>
                </TouchableWithoutFeedback>


                <TouchableWithoutFeedback 
                 onPress={() => {
                    navigation.navigate('FeesPaidReport');
                  }}
                >
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={styles.title}>Fees Paid Report</Title>
                    </Card.Content>
                </Card>
                </TouchableWithoutFeedback>


                <TouchableWithoutFeedback 
                 onPress={() => {
                    navigation.navigate('FeesDueReport');
                  }}
                >
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={styles.title}>Fees Due Report</Title>
                    </Card.Content>
                </Card>
                </TouchableWithoutFeedback>

            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    },

    header: {
        height: 65,
        flexDirection: 'row',
        backgroundColor:'#FF5733'
      },
    CardContainer: {
        marginTop: 10,

        flex: 1,
        flexDirection: 'column',
    },
    card: {
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,

    },
    title: {
        marginLeft:15
    }
});