import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import {
    Card,
    Button,
} from 'react-native-paper';

import ModalSelector from 'react-native-modal-selector';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//redux
import { useSelector } from 'react-redux';

import getCourse from '../../../../services/helpers/getList/getCourse'
import getBatch from '../../../../services/helpers/getList/getBatch'
import get from '../../../../services/helpers/request/get'
import read from '../../../../services/localstorage/read'
import post from '../../../../services/helpers/request/post'

import LoaderHook from '../../../../components/LoadingScreen/LoadingScreen'

export default function BulkSMS({ navigation }) {
    //theming
    const institute = useSelector(state => state.institute)
    const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

    const [SMS_for, setSMS_for] = useState([{ label: 'Common to all', key: 'Common to all'}, { label: 'Student', key: 'Student' }, { label: 'Employee', key: 'Employee' }]);
    const [forTypeStu, setForTypeStu] = useState([{ label: 'Selected Batches', key: 'Selected Batches' }, { label: 'Selected Courses', key: 'Selected Courses' }, { label: 'Common to all', key: 'Common to all' }])
    const [forTypeEmp, setFortypeEmp] = useState([{ label: 'Selected Departments', key: 'Selected Departments' }, { label: 'Common to all', key: 'Common to all' }])


    const [smsGroups, setSmsGroup] = useState([])
    const [courses, setCourses] = useState([])
    const [batches, setBatches] = useState([])
    const [departments, setDepartments] = useState([])
    const [templates, setTemplates] = useState([])


    // selected
    const [course, setCourse] = useState('')
    const [batch, setBatch] = useState('')
    const [department, setDepartment] = useState('')
    const [selectedList, setSelectedList] = useState([])
    const [smsFor, setSmsFor] = useState('')
    const [forStu, setForStu] = useState('')
    const [forEmp, setForEmp] = useState('')
    const [smsForSub, setSmsForSub] = useState('')
    const [template, setTemplate] = useState('')
    const [templateId, setTemplateId] = useState('')

    useEffect(async () => {
        setLoadingScreen()
        try {

            let slug = '/smsgroup'
            let token = await read('token')
            let res = await get(slug, token)
            let arr = []
            res && res.map((group) => {
                arr.push({
                    key: group._id,
                    label: group.name,
                    list: group.list
                })
            })
            setSmsGroup(arr)

            res = await getCourse()
            setCourses(res)

            slug = '/department'
            res = await get(slug, token)
            arr = []
            res && res.map((dep) => {
                arr.push({
                    label: dep.name,
                    key: dep._id
                })
            })
            setDepartments(arr)

            slug = '/smsTemplate'
            res = await get(slug, token)
            arr = []
            res && res.map((temp) => {
                arr.push({
                    key: temp._id,
                    label: temp.templateId,
                    message: temp.templateMessage
                })
            })
            setTemplates(arr)

        } catch (err) {
            alert('Error ' + err)
        }
        hideLoadingScreen()
    }, [])

    let fetchBatch = async(sc)=>{
        setLoadingScreen()
        try{
            let res = await getBatch(sc)
            setBatches(res)
        } catch(err){   
            alert('Cannot get Batches')
        }
        hideLoadingScreen()
    }

    let handleSend = async()=>{
        setLoadingScreen()
        try{
            let token = await read('token')
            let slug = '/bulksms/send'
            let data = {
                batch: batch? batch : '',
                course: course? course: '',
                department: department? department: '',
                message: template,
                mybatches: batch? [batch] : [],
                mycourses: course? [course]: [],
                mydepartments: department? [department]: [],
                myemployees: [],
                mygroups: [],
                mysmsrecep: "",
                mystudents: [],
                smsFor: smsFor,
                smsForSub: smsForSub,
                templateId: templateId
            }
            console.log('Data ', data)
            let res = await post(slug, data, token)
            console.log('Response ', res)
            if(res.error){
                alert(res.error)
            } else if(res.Status) {
                alert('Message Sent')
            }
        } catch(err){
            console.log('Error ', err)
            alert('Error ')
        }
        hideLoadingScreen()
    }

    return (
        <View style={styles.backgroung}>
            {loadingScreen}
            <View
                style={{
                    backgroundColor: institute ? institute.themeColor : '#FF5733',
                    ...styles.header,
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
                        fontSize: 28,
                        fontWeight: '600',
                        alignSelf: 'center',
                        paddingLeft: 30,
                        color: 'white',
                    }}>
                    Bulk SMS
                </Text>
                <View style={{ flex: 1, marginLeft: 20 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SmsAlert')}
                        style={{
                            justifyContent: 'center',
                            flex: 1,
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            paddingRight: 25,
                            marginTop: 5
                        }}>
                        <IonIcon size={30} color="white" name="add-circle-outline" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={{ padding: 5 }} />
                <View style={{ padding: 15 }} >
                    <ModalSelector
                        data={SMS_for}
                        initValue="SMS For"
                        onChange={option => {
                            setSmsFor(option.label)
                        }}
                        style={styles.card_picker}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />
                    <ModalSelector
                        data={templates}
                        initValue="Template ID"
                        onChange={option => {
                            setTemplate(option.message)
                            setTemplateId(option.label)
                        }}
                        style={{ marginTop: 10, ...styles.card_picker }}
                        initValueTextStyle={styles.SelectedValueSmall}
                        selectTextStyle={styles.SelectedValueSmall}
                    />
                    {
                        smsFor === "Student" ? (
                            <ModalSelector
                                data={forTypeStu}
                                initValue="SMS For Students In"
                                onChange={option => {
                                    setForStu(option.label)
                                    setSmsForSub(option.label)
                                }}
                                style={{ marginTop: 10, ...styles.card_picker }}
                                initValueTextStyle={styles.SelectedValueSmall}
                                selectTextStyle={styles.SelectedValueSmall}
                            />
                        ) : (null)

                    }
                    {
                        smsFor === "Employee" ? (
                            <ModalSelector
                                data={forTypeEmp}
                                initValue="SMS For Employee In"
                                onChange={option => {
                                    setForEmp(option.label)
                                    setSmsForSub(option.label)
                                }}
                                style={{ marginTop: 10, ...styles.card_picker }}
                                initValueTextStyle={styles.SelectedValueSmall}
                                selectTextStyle={styles.SelectedValueSmall}
                            />
                        ) : (null)

                    }

                    {
                        forStu === "Selected Batches" ? (
                            <View>
                            <ModalSelector
                                data={courses}
                                initValue="Select Course"
                                onChange={option => {
                                    setCourse(option.key)
                                    fetchBatch(option.key)
                                }}
                                style={{ marginTop: 10, ...styles.card_picker }}
                                initValueTextStyle={styles.SelectedValueSmall}
                                selectTextStyle={styles.SelectedValueSmall}
                            />
                            <ModalSelector
                                data={batches}
                                initValue="Select Batch"
                                onChange={option => {
                                    setForEmp(option.label)
                                }}
                                style={{ marginTop: 10, ...styles.card_picker }}
                                initValueTextStyle={styles.SelectedValueSmall}
                                selectTextStyle={styles.SelectedValueSmall}
                            />
                            </View>
                        ) : (null)

                    }

                    {
                        forStu === "Selected Courses" ? (
                            <ModalSelector
                                data={courses}
                                initValue="Select Course"
                                onChange={option => {
                                    setCourse(option.key)
                                }}
                                style={{ marginTop: 10, ...styles.card_picker }}
                                initValueTextStyle={styles.SelectedValueSmall}
                                selectTextStyle={styles.SelectedValueSmall}
                            />
                        ) : (null)

                    }

                    {
                        forEmp === "Selected Departments" ? (
                            <ModalSelector
                                data={departments}
                                initValue="Select Department"
                                onChange={option => {
                                    setDepartment(option.key)
                                }}
                                style={{ marginTop: 10, ...styles.card_picker }}
                                initValueTextStyle={styles.SelectedValueSmall}
                                selectTextStyle={styles.SelectedValueSmall}
                            />
                        ) : (null)
                    }
                    <View style={{ padding: 10 }} />
                    <Card style={{ height: 200, ...styles.Card }}>
                        <Card.Content>
                            <TextInput
                                placeholder="Write your message here "
                                placeholderTextColor='grey'
                                value={template}
                                color='black'
                                onChangeText={val => setTemplate(val)}
                                style={{ backgroundColor: 'white', textAlignVertical: 'top', fontFamily: 'Poppins-Regular', fontSize: 15 }}
                                multiline={true}
                            />
                        </Card.Content>
                    </Card>
                </View>
                <View style={{ padding: 10 }}>
                    <View
                        style={{
                            justifyContent: 'center',

                            alignItems: 'center',
                        }}>
                        <Button style={{ width: 90 }} color={ institute? institute.themeColor: '#5177E7'} mode="contained" onPress={handleSend}>
                            Send
                        </Button>
                    </View>
                </View>
                <View style={{ padding: 20 }} />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroung: {
        backgroundColor: '#E5E5E5',
        height: '100%',
        flex: 1,
    },
    header: {
        height: 69,
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#58636D',

        color: '#F9F9F9',
        padding: 3,
        paddingHorizontal: 5,
        borderRadius: 5,
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
    card_picker: {
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 0.5,
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        elevation: 3,
    },
    Card: {
        borderRadius: 12,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
    }

});
