import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {
  Button,
} from 'react-native-paper';
import { useSelector } from 'react-redux';

import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import getCourse from '../../../../services/helpers/getList/getCourse'
import getBatch from '../../../../services/helpers/getList/getBatch'
import LoaderHook from '../../../../components/LoadingScreen/LoadingScreen';
import get from '../../../../services/helpers/request/get'
import read from '../../../../services/localstorage/read'

export default function QuickPayment1({ navigation }) {

  // drop down values
  const [course, setCourse] = useState([]);
  const [batch, setBatch] = useState([]);
  const [FeeTypeCategory, setFeeTypeCategory] = useState([]);
  const [FeeSubTypeCategory, setFeeSubTypeCategory] = useState([]);

  const [loadingScreen, setLoadingScreen, hideLoadingScreen] = LoaderHook()

  // selected values
  const [scourse, setsCourse] = useState('')
  const [sbatch, setsBatch] = useState('')
  const [sfeetype, setsFeeType] = useState('')
  const [ssubfee, setsSubFee] = useState('')

  // after fetching list
  const [fetched, setFetched] = useState(false);
  const [list, setList] = useState([]);


  //date parser
  let parseDate = myDate => {
    let d = new Date(myDate);
    return d.toString().slice(4, 15);
  };


  useEffect(async () => {
    setLoadingScreen()
    try {
      let res = await getCourse()
      setCourse(res)
    } catch (err) {
      alert('Cannot get Courses!!')
    }

    try {
      let token = await read('token')
      let slug = '/fee/feeCategory'
      let res = await get(slug, token)
      let arr = []
      res && res.map((fee) => {
        arr.push({
          key: fee._id,
          label: fee.category
        })
      })
      setFeeTypeCategory(arr)
    } catch (err) {
      alert('Cannot get fee Category!!')
    }
    hideLoadingScreen()
  }, [])

  let getSubCategory = async (sf) => {
    setLoadingScreen()
    try {
      setsFeeType(sf)
      let token = await read('token')
      let slug = `/fee/feeSubCategory?feecategory=${sf}`
      let res = await get(slug, token)
      let arr = []
      res && res.map((fee) => {
        arr.push({
          label: fee.name,
          key: fee._id,
          feeDates: fee.feeDates,
          feeType: fee.feeType,
          feeCategory: fee.feeCategory
        })
      })
      setFeeSubTypeCategory(arr)
    } catch (err) {
      alert('Cannot get Sub Category!!')
    }
    hideLoadingScreen()
  }

  const fetchBatches = async (sc) => {
    setLoadingScreen()
    try {
      setsCourse(sc)
      let res = await getBatch(sc)
      setBatch(res)
    } catch (err) {
      alert('Cannot get Batches')
    }
    hideLoadingScreen()
  }

  const getList = async () => {
    setLoadingScreen();
    try {
      let slug = `/fee/feePayment?&course=${scourse}&batch=${sbatch}&feeCategory=${sfeetype}&feeSubCategory=${ssubfee}`;

      console.log(slug);
      let token = await read('token');
      let res = await get(slug, token);
      let quickpayArray = [];
      res.map(data => {
        quickpayArray.push({
          _id: data._id,
          nm: data.user.firstName,
          reg: data.userCode,
          amt: data.amount,
          dt: parseDate(data.date)
        });
        console.log(data);
      });
      setList(quickpayArray);
      setFetched(true);
    } catch (err) {
      alert('No Lists found!!');
      setList([]);
    }
    hideLoadingScreen();
  };

  const institute = useSelector(state => state.institute);
  return (
    <View style={styles.backgroung}>
      {loadingScreen}
      <View
        style={{
          backgroundColor: institute ? institute.themeColor : 'black',
          ...styles.header,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >
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
            Quick Payment
          </Text>
        </View>
      </View>
      <View style={{ padding: 10 }} />
      <View style={{ padding: 10 }} >
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <ModalSelector
            data={course}
            initValue="Course"
            onChange={async option => {
              fetchBatches(option.key)
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
          <ModalSelector
            data={batch}
            initValue="Batch"
            onChange={async option => {
              setsBatch(option.key)
            }}
            style={styles.card_picker}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
        </View>
        <View style={{ padding: 10 }} />
        <ModalSelector
          data={FeeTypeCategory}
          initValue="Fee Type Category"
          onChange={async option => {
            getSubCategory(option.key)
          }}
          style={styles.card_picker1}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
        <View style={{ padding: 10 }} />
        <ModalSelector
          data={FeeSubTypeCategory}
          initValue="Fee Sub Type Category"
          onChange={async option => {
            setsSubFee(option.key)
          }}
          style={styles.card_picker1}
          initValueTextStyle={styles.SelectedValueSmall}
          selectTextStyle={styles.SelectedValueSmall}
        />
      </View>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
      }}>

        <Button color={institute ? institute.themeColor : '#5177E7'} mode="contained" onPress={getList}>
          Search
        </Button>
      </View>


      <View style={{ marginHorizontal: 30, ...styles.shadow }}>
        {/* <View style={styles.search}>
          <TextInput
            style={{ ...styles.search_input }}
            placeholder="Enter the employee name here"
            placeholderTextColor='grey'
            color='black'
          />
          <TouchableOpacity
            style={{
              alignSelf: 'center',
            }}>
            <Icon
              name="search-sharp"
              style={{
                alignSelf: 'center',
                fontSize: 30,
                color: 'black',
                paddingRight: 5,
              }}
            />
          </TouchableOpacity>
        </View> */}
      </View>
      <View style={{ padding: 10 }} />
      <ScrollView>
        {fetched
          ? list &&
          list.map(data => (
            <View style={styles.section}>
              <View style={styles.details}>
                <View style={styles.userinhostels}>
                  <View style={styles.differentusers}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#211C5A',
                        fontFamily: 'Poppins-Regular',
                        marginHorizontal: -5,
                      }}>
                      Name:{' '}{data.nm}
                    </Text>
                  </View>
                  <View style={{ padding: 5 }} />
                  <View style={styles.differentusers}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#211C5A',
                        fontFamily: 'Poppins-Regular',
                        marginHorizontal: -5,
                      }}>
                      User Code:{' '}{data.reg}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#211C5A',
                        fontFamily: 'Poppins-Medium',
                        paddingRight: 5,
                      }}>
                      Amount:{data.amt}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.belowhr}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                  <Text
                    style={{
                      color: '#211C5A',
                      fontSize: 12,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    DATE OF PAYMENT: {data.dt}
                  </Text>
                </View>
                <View style={{ marginBottom: 3 }} />
              </View>
            </View>

          ))
          :
          null

        }

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
    width: '45%',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    elevation: 3,
  },
  card_picker1: {
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    elevation: 3,
  },
  Card: {
    borderRadius: 12,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
  },
  search: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: '#00499F',
    borderRadius: 8,
  },
  search_input: {
    borderRadius: 8,
    height: 59,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    paddingTop: 15,
    paddingHorizontal: 10,
    width: '90%',
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
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    elevation: 5,
    marginVertical: 14,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 0,
    borderBottomColor: '#333',
    borderBottomWidth: 0.5,
  },
  userinhostels: {
    marginTop: 10,
  },
  differentusers: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    justifyContent: 'space-between',
  },
  belowhr: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
  },
  header: {
    height: 69,
    flexDirection: 'row',
  },
});