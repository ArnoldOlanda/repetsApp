import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Button } from '../components/Button'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const LoginScreen = ({ navigation }) => {

    const onPressForgotPasswordLink = () =>{
        navigation.navigate('ResetPasswordScreen')
    }

    return (
        <View style={styles.container}>
            <View style={{alignItems:'flex-start', width: windowWidth * 0.90}}>
                <Text style={styles.title}>Bienvenido de nuevo ic</Text>
                <Text style={styles.text}>Acceda a su cuenta</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Email</Text>
                <TextInput style={styles.input} placeholder='Tu email' />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Password</Text>
                <TextInput style={styles.input} secureTextEntry placeholder='Tu password' />
            </View>
            <View style={{width:windowWidth * 0.90, alignItems:'flex-start', marginVertical:10}}>
                <Text 
                style={styles.link}
                onPress={onPressForgotPasswordLink}
                >¿Olvido su contraseña?</Text>
            </View>
            <Button text={'Login'} />
            <View style={{flexDirection:'row',marginVertical:15}}>
                <Text style={{fontWeight:'500'}}>
                    ¿No tiene un cuenta?
                </Text>
                <Text style={{...styles.link, paddingLeft:10}}>
                    Registrese
                </Text>
            </View>
            <View
            style={{
                marginTop:70,
                borderBottomColor: '#b7b7b7',
                borderBottomWidth: StyleSheet.hairlineWidth,
                alignSelf:'stretch'
            }}
            />
            <View style={{
                backgroundColor:'#fff',
                width: 50,
                height: 50,
                justifyContent:'center',
                alignItems:'center',
                top: -25
            }}>
                <Text style={{color:'#b7b7b7'}} >O</Text>
            </View>
            <TouchableOpacity style={styles.btnGoogle}>
                <Text style={styles.btnGoogleText}>ic Continuar con Google</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        marginTop: 40,
    },
    title: {
        textAlign:'left',
        fontSize: 22,
        fontWeight: '800',
        color: 'black',
    },
    text: {
        textAlign:'left',
        fontSize: 14,
        fontWeight: '500',
        color: '#B7B7B7',
    },
    inputContainer: {
        width: windowWidth * 0.90,
        height: 70,
        justifyContent: 'center',
        marginVertical: 10
    },
    textInput:{
        fontWeight:'500',
        fontSize:14,
        color:'#000',
        marginBottom:3
    },
    input: {
        width: windowWidth * 0.90,
        height: 50,
        paddingLeft:13,
        backgroundColor: '#ECF2F0',
        borderRadius: 5,
        fontSize: 16
    },
    link:{
        color:'#2782CA', 
        fontWeight:'500',
        fontSize:14
    },
    btnGoogle:{
        height: 40,
        width: windowWidth * 0.90,
        borderColor:'#bfbfbf',
        borderWidth:1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnGoogleText:{
        color:'#000',
        fontSize:14,
        fontWeight:'500'
    }
})