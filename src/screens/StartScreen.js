import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from '../components/Button'
import { WelcomeText } from '../components/StartScreen/WelcomeText'
import { Icon } from '../components/StartScreen/Icon'

export const StartScreen = ({ navigation }) => {

    const onPressStartButton = () => {
        navigation.navigate('MainBottomTab')
    } 

  return (
    <View style={styles.container}>

        <Icon/>

        <View style={{height:32}} />

        <WelcomeText />

        <View style={{height:10}} />
        <Text style={styles.subtitle} >Se cuenta esta completa, encuentre el mejor hospedaje para su mascota</Text>
        <Button text='Empezar' onPress={onPressStartButton} />

    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    subtitle:{
        fontSize:14,
        fontWeight:'400',
        lineHeight:16.56,
        color:'#b7b7b7',
        textAlign:'center',
        paddingHorizontal:50,
        marginBottom:44
    }
})