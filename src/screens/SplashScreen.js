import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import logo from './../assets/images/logo.png'
export const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image style= {styles.img} source={logo}/>
        </View>
      )
    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
    img:{
        position: "absolute",
        width: 132,
        height: 131,
        left: 114,
        top: 255,
    }

})