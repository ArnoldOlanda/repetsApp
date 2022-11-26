import React,{ useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group';
import { GooglePayIcon, MastercardIcon, PaypalIcon, VisaIcon } from './PaymentMethodsIcons';

const windowWidth = Dimensions.get('window').width

const radioButtonsData = [{
  id: '1', // acts as primary key, should be unique and non-empty string
  label: 'Paga en el hospedaje',
  value: 'efectivo',
  color:'#2782CA',
  selected:true
}, {
  id: '2',
  label: 'Pagar con tarjeta',
  value: 'tarjeta',
  disabled:true
}]

export const ChoosePaymentMethodStep = () => {
  const [radioButtons, setRadioButtons] = useState(radioButtonsData)

  const onPressRadioButton = (radioButtonsArray) => {
    setRadioButtons(radioButtonsArray);
  }

  return (
    <View>

      <View style={styles.sectionContainer}>
        <View style={{width:'100%'}}>
          <Text style={styles.titleText}>Escoje el metodo de pago</Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            containerStyle={{ alignItems:'flex-start' }}
            
          />
          <View style={styles.paymentMethodsContainer}>
            <VisaIcon/>
            <MastercardIcon />
            <PaypalIcon />
            <GooglePayIcon />
          </View>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20
  },
  pethouseInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15
  },
  image: {
    height: 60,
    width: 85,
    borderRadius: 6,
    marginRight: 20
  },
  calificationLocationContainer: {
    width: windowWidth * 0.6,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  pethouseNameText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black'
  },
  locationText: {
    fontSize: 15,
    fontWeight: '300',
    color: 'black'
  },
  sectionContainer: {
    borderWidth: 1,
    borderColor: '#2782CA',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    elevation: 3,
    backgroundColor: 'white'
  },
  titleText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    marginBottom: 20
  },
  paymentMethodsContainer:{
    flexDirection:'row',
    width:'60%',
    padding:10,
    justifyContent:'space-between',
    marginTop:10
  },
})