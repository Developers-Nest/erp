
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';


//redux
import { useSelector } from 'react-redux';

// helpers
import deleteReq from '../../../../../services/helpers/request/delete'
import read from '../../../../../services/localstorage/read'
import getCourse from '../../../../../services/helpers/getList/getCourse'
import getBatch from '../../../../../services/helpers/getList/getBatch'
import LoaderHook from '../../../../../components/LoadingScreen/LoadingScreen';



const EditAllocationTeacher = ({ route, navigation }) => {
    //theming
    const institute = useSelector(state => state.institute);

    // dropdown values
    const [courses, setcourses] = useState([]);
    const [batches, setbatches] = useState([]);
    const [employee, setemployee] = useState([]);

    const [teacher, setTeacher] = useState({})
    const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

    const [course, setCourse] = useState('')
    const [batch, setBatch] = useState('')

    useEffect(async()=>{
        setLoadingScreen()
        let t = route.params.teacher
        console.log('Edit Teacher ', t)
        setTeacher(t)

        try{
            let res = await getCourse()
            setcourses(res)
        } catch(err){
            alert('Cannot fetch courses!!')
        }
        hideLoadingScreen()
    },[])

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

    let handleUpdate = async()=>{
        setLoadingScreen()
        try{
            let slug = `/classteacher/${teacher._id}`
            let token = await read('token')
            alert('Updated!!')
        } catch(err){
            alert('Cannot Update !!'+err)
        }
        hideLoadingScreen()
    }

    let handleDelete = async()=>{
        setLoadingScreen()
        try{
            let slug = `/classteacher/${teacher._id}`
            let token = await read('token')
            let res = await deleteReq(slug, token)
            if(res.error){
                alert(res.error)
            } else{
                alert('Teacher Deleted!!')
            }
        } catch(err){
            alert('Cannot Delete !!'+err)
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
                                // paddingLeft: 10,
                                // paddingTop: 23,
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
                        Allocate Teachers
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
                            initValue={teacher.course? teacher.course.courseName : 'N/A'}
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
                            initValue={teacher.batch? teacher.batch.batchName: 'N/A'}
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
                            data={employee}
                            initValue={teacher.classTeacher? teacher.classTeacher.firstName: 'N/A'}
                            onChange={option => {
                                // setclass(option.key);
                            }}
                            disabled={true}
                            style={styles.card}
                            initValueTextStyle={styles.SelectedValue}
                            selectTextStyle={styles.SelectedValue}
                        />

                    </View>
                    <View style={styles.fixToText}>
                        <Pressable style={styles.button1} onPress={handleDelete}>
                            <Text style={styles.text1}>Delete</Text>
                        </Pressable>
                        <Pressable style={{ backgroundColor: institute? institute.themeColor: 'blue' ,...styles.button}} onPress={handleUpdate} >
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
        paddingTop: 2,
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
        borderRadius:12,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        alignSelf: 'center',
        width: '94%'
    },


    header: {
        height: 69,
        flexDirection: 'row',
    },
    button1: {

        marginTop: 0,
        marginBottom: 0,

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        alignSelf: 'flex-end',
        padding: 3,
        paddingHorizontal: 25,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 30,
        height: 46,
        borderColor: '#d2691e',
        borderWidth: 1.5

    },
    text1: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#d2691e',
    },

});

export default EditAllocationTeacher;