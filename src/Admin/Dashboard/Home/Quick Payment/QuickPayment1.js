import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  Button,
} from 'react-native-paper';
import { useSelector } from 'react-redux';

import ModalSelector from 'react-native-modal-selector';

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

        <Button color={institute ? institute.themeColor : '#5177E7'} mode="contained" onPress={() => navigation.navigate('QuickPayment2')}>
          Search
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroung: {
    backgroundColor: '#E5E5E5',
    height: '100%',
    flex: 1,
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
  header: {
    height: 69,
    flexDirection: 'row',
  },
});