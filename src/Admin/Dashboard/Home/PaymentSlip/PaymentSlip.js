import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import {
  Searchbar,
  Appbar,
  List,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';
import { useSelector } from 'react-redux';

import ModalSelector from 'react-native-modal-selector';
import AntDesign from 'react-native-vector-icons/AntDesign';
import getDesignation from '../../../../services/helpers/getList/getDesignation';
import getHRname from '../../../../services/helpers/getList/getHRname';
import getYear from '../../../../services/helpers/getList/getYear';
import getMonth from '../../../../services/helpers/getList/getMonth';


// loading screem
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen.js';

export default function PaymentSlip({ navigation }) {
  
  const institute = useSelector(state => state.institute);

  // dropdown values
  const [Designations, setDesignations] = useState([]);
  const [Names, setNames] = useState([]);
  const [Months, setMonths] = useState([]);
  const [Years, setYears] = useState([]);
  
  // selected Values

  const [Designation, setDesignation] = useState(null);
  const [Name, setName] = useState(null);
  const [Month, setMonth] =useState(null);
  const [Year, setYear] = useState(null);
 
  // after fetching list
  const [fetched, setFetched] = useState(false);
  const [list, setList] = useState([]);

  // loading screen
  const [loadingScreen, showLoadingScreen, hideLoadingScreen] = LoadingScreen();
  useEffect(async () => {
    showLoadingScreen();
    try {
      const response = await getDesignation();
      setDesignations(response);
    } catch (err) {
      alert('Cannot get Designations!');
    }
   
   
    hideLoadingScreen();
  }, []);
//////////// get dropdown values ///////////////
const getNames = async selectedDesignation => {
  showLoadingScreen();
  try {
    await setDesignation(selectedDesignation);
    const response = await getHRname(selectedDesignation);
    setNames(response);
  } catch (err) {
    alert('Cannot get Names list');
  }
  hideLoadingScreen();
};

const getYears = async (m) => {
  showLoadingScreen();
  try {
    await setName(m);
  
    const response = await getYear();

    setYears(response);
  } catch (err) {
    alert('Cannot get Assessments!!');
  }
  hideLoadingScreen();
};
const getMonths = async (y) => {
  showLoadingScreen();
  try {
    await setYear(y);
  
    const response = await getMonth();

    setMonths(response);
  } catch (err) {
    alert('Cannot get Months!!');
  }
  hideLoadingScreen();
};
// let fetchVehicle = async(sel)=>{
//   setLoadingScreen()
//   try{
//       setVehicle(sel)
      
//   } catch(err){
//       alert('Cannot get vehicles!!')
//   }
//   hideLoadingScreen()
// }

const getList = async () => {
  showLoadingScreen();
  try {
    let slug = `
    /payroll/employeeSalary?designation=${Designation}&employee=${Name}&year=${Year}&month=${Month}`;
    let token = await read('token');
    let res = await get(slug, token);
    // res = res.students;
    let payslipArray = [];
    res.map(data => {
      payslipArray.push({

        nm:data.employee.firstName,
        desg:data.employee.designation.name,
        code:data.employee.code,
        dept:data.employee.department.name,
        dob:data.employee.dob,
        join:data.employee.joiningDate,
       account:data.bankDetails,
       earntype:data.earnings.earntype,
       deduct:data.deductions,
       gross:data.grossSalary,
       total:data.totalDeduction,
       netsal:data.netSaalary

      });
    });
    setList(res);
    setFetched(true);
  } catch (err) {
    alert('No Lists found!!');
  }
  hideLoadingScreen();
};

  return (
    <View style={styles.backgroung}>
      {/* <Appbar>
        <Appbar.BackAction onPress={() => {navigation.navigate('Home')}} />
        <Appbar.Content title="Payment Slip" />
      </Appbar> */}
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
            Payment Slip
          </Text>
        </View>
      </View>

      <ScrollView>
        <View style={{ padding: 10 }} />
        <View style={{ padding: 10 }} >

          <ModalSelector
           
            data={Designations}
        
          onChange={async option => {
            await getNames(option.key);
          }}
            initValue="Department"
           
            style={styles.card_picker1}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
          <View style={{ padding: 10 }} />
          <ModalSelector
            data={Names}
            initValue="Name"
            onChange={async option => {
              await getYears(option.key);
            }}
            style={styles.card_picker1}
            initValueTextStyle={styles.SelectedValueSmall}
            selectTextStyle={styles.SelectedValueSmall}
          />
          <View style={{ padding: 10 }} />
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>

            <ModalSelector
              data={Months}
              initValue="Month"
              onChange={async option => {
               setMonth(option.key);
              }}
              style={styles.card_picker}
              initValueTextStyle={styles.SelectedValueSmall}
              selectTextStyle={styles.SelectedValueSmall}
            />
            <View style={{ padding: 10 }} />
            <ModalSelector
              data={Years}
              initValue="Year"
              onChange={async option => {
              await getMonths(option.key);
              }}
              style={styles.card_picker}
              initValueTextStyle={styles.SelectedValueSmall}
              selectTextStyle={styles.SelectedValueSmall}
            />
          </View>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15
        }}>

          <Button
           color={ institute ? institute.themeColor : "#5177E7"}
           onPress={getList}
          mode="contained"
          >
            Get
          </Button>
        </View>
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
                    paddingHorizontal: 5,
                  }}>
                  {data.nm}
                </Text>
              </View>
              <View style={{ padding: 5 }} />
              <View style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Regular',
                    paddingHorizontal: 5,
                  }}>
                 {data.desg}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#211C5A',
                    fontFamily: 'Poppins-Medium',
                    paddingHorizontal: 5,
                  }}>
                  Code
                </Text>
              </View>
              <View style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Regular',
                    paddingHorizontal: 5,
                  }}>
                  Department
                </Text>
              </View>
              <View style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Medium',
                    paddingHorizontal: 5,
                  }}>
                  DOB: 31 July,2023
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Medium',
                    paddingHorizontal: 5,
                  }}>
                  Joining Date: 31 July, 2022
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.details}>
            <View style={styles.userinhostels}>
              <View style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#211C5A',
                    fontFamily: 'Poppins-Medium',
                    paddingHorizontal: 5,
                  }}>
                  Bank Name
                </Text>
              </View>
              <View style={{ padding: 2 }} />
              <View style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#211C5A',
                    fontFamily: 'Poppins-Medium',
                    paddingHorizontal: 5,
                  }}>
                  Ac. No.-446466464876434545
                </Text>
              </View>
              <View style={{ padding: 2 }} />
              <View style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#1F7C17',
                    fontFamily: 'Poppins-Medium',
                    paddingHorizontal: 5,
                  }}>
                  Earnings
                </Text>
              </View>
              <View style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Medium',
                    paddingHorizontal: 5,
                  }}>
                  Type
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Medium',
                    paddingHorizontal: 5,
                  }}>
                  20,000 Rs
                </Text>
              </View>

              <View style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#B04305',
                    fontFamily: 'Poppins-Medium',
                    paddingHorizontal: 5,
                  }}>
                  Deductions
                </Text>
              </View>
              <View style={styles.differentusers}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Medium',
                    paddingHorizontal: 5,
                  }}>
                  Type
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#211C5A',
                    fontFamily: 'Poppins-Medium',
                    paddingHorizontal: 5,
                  }}>
                  2000 Rs
                </Text>
              </View>
              <View style={{ padding: 5 }} />
            </View>
          </View>


          <View style={styles.belowhr}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
              <Text
                style={{
                  color: '#211C5A',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                }}>
                Gross Salary
              </Text>
            </View>
            <View style={{ marginBottom: 3 }}>
              <Text
                style={{
                  color: '#211C5A',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                  paddingHorizontal: 5
                }}>
                20,000 Rs
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                color: '#211C5A',
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
                paddingHorizontal: 5
              }}>
              Total
            </Text>
            <Text
              style={{
                color: '#211C5A',
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
                paddingHorizontal: 5,
              }}>
              2,000 Rs
            </Text>
          </View>
          <View style={{ padding: 8 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                color: '#211C5A',
                fontSize: 18,
                fontFamily: 'Poppins-Medium',
                paddingHorizontal: 5
              }}>
              Net Salary
            </Text>
            <Text
              style={{
                color: '#211C5A',
                fontSize: 18,
                fontFamily: 'Poppins-Medium',
                paddingHorizontal: 5,
              }}>
              18,000 Rs
            </Text>
          </View>
          <View style={{ padding: 15 }} />
        </View>

        ))
        : null}
        <View style={{ padding: 40 }} />
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
    marginTop: 14,
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