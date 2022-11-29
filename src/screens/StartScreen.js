import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from '../components/Button'
import { WelcomeText } from '../components/StartScreen/WelcomeText'
import { Icon } from '../components/StartScreen/Icon'
import { useDispatch } from 'react-redux'
import { loginNewUser } from '../store/slices/auth'

export const StartScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const onPressStartButton = () => {
        dispatch( loginNewUser() )
    } 

  return (
    <View style={styles.container}>

        <Icon/>

        <View style={{height:32}} />

        <WelcomeText />

        <View style={{height:10}} />
        <Text style={styles.subtitle} >Su cuenta esta verificada, encuentre el mejor hospedaje para su mascota</Text>
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