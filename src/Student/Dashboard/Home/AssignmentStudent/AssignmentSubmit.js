import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/AntDesign';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

// helpers

import { Button } from 'react-native-paper';
import DocumentPickerHandle from 'react-native-document-picker';
import { useSelector } from 'react-redux';
import formDataPatch from '../../../../services/helpers/request/formDataPatch'
import read from '../../../../services/localstorage/read'
import LoaderHook from '../../../../components/LoadingScreen/LoadingScreen';

export default function AssignmentSubmit({ navigation, route }) {


    const [assignment, setAssignments] = useState({})
    const [file, setFile] = useState({})

    const institute = useSelector((state) => state.institute)
    const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

    const filePicker = async () => {
        const res = await DocumentPickerHandle.pick({
            type: [DocumentPickerHandle.types.pdf],
          })
        console.log('Response ', res)
        setFile(res)
    }

    const Props = (props) => {
        return (
            <View style={styles.inner}>
                <TouchableOpacity onPress={() => filePicker()}>
                    <Icon1 size={105} color="rgba(88, 99, 109, 0.65)" name="addfile" style={{ padding: 0, marginLeft: 15 }} />
                    <Text style={{ marginTop: 20, fontSize: 12, color: '#58636D', fontFamily: 'Poppins-Regular' }}>{file? 'File Name '+ file.name : 'Tap to add the assignment'}</Text>
                </TouchableOpacity>
            </View>

        );
    }

    useEffect(() => {
        setAssignments(route.params.assignment)
    }, [])

    let handleSubmit = async()=>{
        setLoadingScreen()
        try{
            let slug = `/note/submit/assignment/${assignment._id}`
            let token = await read('token')
            let formData = new FormData()
            formData.append('text', 'N/A')
            formData.append('file', file)
            let response = await formDataPatch(slug, formData, token)
            console.log('File Submit Response ', response)
            if(response.error){
                alert(response.error)
            } else {
                alert('Assignemnt Submitted!!')
                navigation.navigate('AssignmentStudentDue')
            }
        } catch(err){
            alert('Cannot Submit! '+err)
        }
        hideLoadingScreen()
    }

    return ( 
        <View style={{ backgroundColor: "#E5E5E5", flex: 1 }}>

            <View style={{ backgroundColor: institute ? institute.themeColor : null, ...styles.header }}>
                <TouchableOpacity onPress={() => navigation.navigate('AssignmentStudentDue')}>
                    <Icon size={24} color="white" name="left" style={{ alignSelf: 'center', fontSize: 25, color: 'white', paddingTop: 8, paddingRight: 10 }} />

                </TouchableOpacity>
                <Text style={{
                    fontStyle: 'normal',
                    fontFamily: 'NunitoSans-Regular', fontSize: 28, fontWeight: '600', color: 'white'
                }}>
                    Submit Assignment
                </Text>

            </View>
            {loadingScreen}
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.section}>
                        <View style={styles.details}>

                            <View style={styles.userinhostels}>
                                <TouchableOpacity style={styles.differentusers}>
                                    <Text style={{ fontWeight: 'normal', fontSize: 18, color: '#211C5A', fontFamily: 'Poppins-Regular' }}>{' '}{assignment.subject ? assignment.subject.name : 'N/A'}</Text>

                                    {/* <Text style={styles.userstext}> Ph:9484422222</Text> */}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.differentusers}>
                                    <Text style={{ fontSize: 12, color: '#5177E7', fontFamily: 'Poppins-Medium' }}>{'  '}{assignment.title}</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.differentusers}>
                                    <Text style={{ fontSize: 12, marginRight: 30, fontFamily: 'Poppins-Regular', color: '#505069' }}>{'\n  '}{assignment.description}</Text>

                                    {/* <Text style={styles.userstext}>Graded</Text> */}
                                </TouchableOpacity>
                            </View>



                        </View>

                        <View style={styles.belowhr}>
                            <Text style={{ color: institute ? institute.themeColor : '#B04305', fontSize: 12, fontFamily: 'Poppins-Medium' }}>
                                {'  '}Due: {assignment.submissionDateString}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <Props />
                    </View>
                    <View style={{ padding: 20 }} />
                    <Button
                        style={styles.button}
                        onPress={() => handleSubmit()}
                        labelStyle={{ color: 'white' }}
                        uppercase={false}
                        color={institute ? institute.themeColor : 'blue'}
                        mode="contained">
                        Submit
                    </Button>

                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#E5E5E5',
        alignContent: "center",
        // alignItems: "center"
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
        elevation: 2,
        marginTop: 14,
        borderRadius: 12,
        paddingLeft: 10,
        paddingRight: 10,
        marginHorizontal: 20,
    },
    details: {
        flexDirection: 'column',
        marginTop: 10,
        borderBottomColor: ' rgba(88, 99, 109, 0.45)',
        borderBottomWidth: 0.5,
    },
    userinhostels: {
        marginTop: 10,
    },
    differentusers: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    belowhr: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        paddingBottom: 15,
    },
    box: {
        paddingTop: 20,
        marginTop: 20,
        width: 361,
        height: 320,
        marginLeft: 15,
        alignContent: 'space-around',
        borderStyle: 'dashed',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'black',
    },
    inner: {
        paddingVertical: 80,
        alignItems: "center"
    },

    header: {
        height: 65,
        flexDirection: 'row',
        padding: 10,

    },
    button: {
        alignSelf: 'flex-end',
        // marginTop: 10,
        color: '#F9F9F9',
        padding: 3,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginRight: 10
    },
});


