import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Button } from '../components/Button'


const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height


export const ConfirmEmailScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificacion de Email</Text>
      <Text style={styles.text}>Escriba el codigo enviado a su correo</Text>
      <Text style={{...styles.text,color:'#000000'}}>ejemplodecorreo@gmail.com</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} keyboardType='number-pad' />
        <TextInput style={styles.input} keyboardType='number-pad' />
        <TextInput style={styles.input} keyboardType='number-pad' />
        <TextInput style={styles.input} keyboardType='number-pad' />
      </View>

      <View style={{flexDirection:'row',paddingBottom:15}}>
        <Text style={{fontWeight:'500'}}>¿No recibiste el codigo?  </Text><Text style={{color:'#2782CA', fontWeight:'500'}}>Reenviar</Text>
      </View>
      <Button text={'Continuar'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems:'center',
    marginTop:40
  },
  title:{
    fontSize:22,
    fontWeight:'800',
    color:'black',
  },
  text:{
    fontSize:14,
    fontWeight:'500',
    color:'#B7B7B7',
  },
  inputContainer: {
    width: windowWidth,
    height: 60,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:20
  },
  input:{
    width: 50,
    height: 50,
    backgroundColor:'#ECF2F0',
    borderRadius:5,
    marginHorizontal:15,
    textAlign:'center',
    fontSize:20
  },
})