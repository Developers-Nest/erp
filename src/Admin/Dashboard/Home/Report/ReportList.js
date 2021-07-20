
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import { Card, Title } from 'react-native-paper';
import FeesPaidReport from './FeesPaidReport';

export default function ReportList({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ color: 'white', fontSize: 28 }}>
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
                    navigation.navigate('FessPaidReport');
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
        backgroundColor: 'black'
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