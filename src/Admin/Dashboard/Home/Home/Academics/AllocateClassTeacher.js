
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';

//redux
import { useSelector } from 'react-redux';

// helpers
import getCourse from '../../../../../services/helpers/getList/getCourse'
import getBatch from '../../../../../services/helpers/getList/getBatch'
import getTeachers from '../../../../../services/helpers/getList/getTeachers';
import post from '../../../../../services/helpers/request/post'
import LoaderHook from '../../../../../components/LoadingScreen/LoadingScreen';
import read from '../../../../../services/localstorage/read'
import get from '../../../../../services/helpers/request/get';


const AllocateClassTeacher = ({ navigation }) => {
    //theming
    const institute = useSelector(state => state.institute);

    // dropdown values
    const [courses, setcourses] = useState([]);
    const [batches, setbatches] = useState([]);
    const [teachers, setteachers] = useState([]);

    const [course, setCourse] = useState('')
    const [batch, setBatch] = useState('')
    const [teacher, setTeacher] = useState('')

    const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

    useEffect(async()=>{
        setLoadingScreen()
        try{
            let res = await getCourse()
            setcourses(res)
        } catch(err){
            alert('Cannot fetch courses!!')
        }

        try{
            let res = await getTeachers()
            setteachers(res)
        } catch(err){
            alert('Cannot fetch teachers!!'+err)
        }
        hideLoadingScreen()
    }, [])

    let fetchBatch = async(sel)=>{
        setLoadingScreen()
        try{
            setCourse(sel)
            let res = await getBatch(sel)
            setbatches(res)
        } catch(err){
            alert('Cannot get Batches!!')
        }
        hideLoadingScreen()
    }

    let handleSubmit = async()=>{
        setLoadingScreen()
        try{
            let slug = '/classteacher/add'
            let token = await read('token')
            let data = {
                batch: batch,
                classTeacher: teacher,
                course: course
            }
            let res = await post(slug, data, token)
            if(res.error){
                alert(res.error)
            } else if(res._id){
                alert('Teacher Allocated')
            }
        } catch(err){
            alert('Cannot Save')
        }
        hideLoadingScreen()
    }

    return (
        <View style={{ justifyContent: 'center', alignContent: 'center' }}>

            {/* header start */}
            {loadingScreen}
            <View
                style={{
                    backgroundColor: institute ? institute.themeColor : 'black',
                    ...styles.header,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ClassTeacherAllocation');
                        }}>
                        <AntDesign
                            size={24}
                            color="white"
                            name="left"
                            style={{
                                alignSelf: 'center',
                                fontSize: 25,
                                color: 'white',
                            }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontStyle: 'normal',
                            fontSize: 28,
                            fontWeight: '600',
                            alignSelf: 'center',
                            paddingLeft: 10,
                            color: 'white',
                            fontFamily: 'NunitoSans-Regular',
                        }}>
                        Class Teacher Allocation
                    </Text>
                </View>

            </View>

            {/* header ends */}
            <ScrollView>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'column', paddingTop: 15 }} >
                        <Text style={styles.section_heading}>Course's Name </Text>
                        <ModalSelector
                            data={courses}
                            initValue="Course Name"
                            onChange={option => {
                                fetchBatch(option.key)
                            }}
                            style={styles.card}
                            initValueTextStyle={styles.SelectedValue}
                            selectTextStyle={styles.SelectedValue}
                        />

                    </View>
                    <View style={{ justifyContent: 'center', paddingTop: 15 }} >
                        <Text style={styles.section_heading}>Batch's Name </Text>
                        <ModalSelector
                            data={batches}
                            initValue="Name of the Batch"
                            onChange={option => {
                                setBatch(option.key)
                            }}
                            style={styles.card}
                            initValueTextStyle={styles.SelectedValue}
                            selectTextStyle={styles.SelectedValue}
                        />

                    </View>
                    <View style={{ justifyContent: 'center', paddingTop: 15 }} >
                        <Text style={styles.section_heading}>Class Teacher </Text>
                        <ModalSelector
                            data={teachers}
                            initValue="Teacher's Name"
                            onChange={option => {
                                setTeacher(option.key)
                            }}
                            style={styles.card}
                            initValueTextStyle={styles.SelectedValue}
                            selectTextStyle={styles.SelectedValue}
                        />

                    </View>
                    <View style={styles.fixToText}>
                        <Pressable style={{ backgroundColor: institute? institute.themeColor: 'blue',...styles.button}} onPress={handleSubmit}>
                            <Text style={styles.text}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 4,
        elevation: 3,
    },
    text: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: '500',
        letterSpacing: 0.25,
        color: 'white',
    },

    fixToText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 8,
        margin: 40,



    },

    section_heading: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 18,
        textAlign: 'left',
        color: 'rgba(88, 99, 109, 0.85)',
        paddingHorizontal: 15,
        marginBottom: 5,
    },


    SelectedValue: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '200',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 30,
        paddingTop: 3,
        color: 'rgba(88, 99, 109, 0.85)',
    },

    card: {
        shadowColor: '#999',
        height: 50,
        shadowOffset: { width: 0, height: 1 },
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
        // justifyContent: 'center',
        // alignContent:'center',
        margin: 0,
        padding: 0,
        alignSelf: 'center',
        width: '94%'
    },


    header: {
        height: 69,
        flexDirection: 'row',
    },

});




export default AllocateClassTeacher;