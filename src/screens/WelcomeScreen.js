import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image, PermissionsAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

import logoW from './../assets/images/logoW.png'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height


export const WelcomeScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const onPressGetStartedButton = () => {
    navigation.navigate('RegisterScreen')
  }

  const onPressSignInButton = () => {
    navigation.navigate('LoginScreen')
  }
  

  return (

    <View style={styles.container}>

      <Image style={styles.img} source={logoW} />
      <Text style={styles.text1}>Encuentra el lugar<Text style={{ color: "#0060AC" }}> Perfecto</Text> para dejar a tu mascota</Text>
      <Text style={styles.text2}>Unete a nosotros y descubre el mejor lugar para hospedar a tu mascota</Text>
      <TouchableOpacity
        style={{ ...styles.btn, backgroundColor: '#2782CA', }}
        onPress={onPressGetStartedButton}
      >
        <Text style={styles.btnText}> Registrate </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.btn, backgroundColor: '#ECF2F0', }}
        onPress={onPressSignInButton}
      >
        <Text style={{ ...styles.btnText, color: '#2782CA' }}> Iniciar sesion </Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: windowWidth * 0.72,
    height: windowHeight * 0.4,
    marginBottom: 18,
  },
  btn: {
    height: 44,
    width: windowWidth * 0.90,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: windowWidth * 0.05,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Alata',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
  },
  text1: {
    width: 252,
    height: 55,
    color: 'black',
    fontFamily: 'Alata',
    fontSize: 20,
    fontStyle: 'normal',
    lineHeight: 28,
    fontWeight: '800',
    textAlign: 'left',
    marginBottom: 7,
  },
  text2: {
    width: 237,
    height: 40,
    color: '#B7B7B7',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    marginBottom: 25,

  },


})