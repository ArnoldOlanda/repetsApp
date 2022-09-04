import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { Button } from '../components/Button'
const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const RegisterScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.icon}>
                <Text>IC</Text>
        </View>
        <Text style={styles.title}>Registrate</Text>
        <Text style={styles.text}>Create una cuenta</Text>
        
        <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Nombre</Text>
                <TextInput style={styles.input} placeholder='Su nombre' />
        </View>

        <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Apellido</Text>
                <TextInput style={styles.input} placeholder='Su apellido' />
        </View>

        <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Celular</Text>
                <TextInput style={styles.input} placeholder='Su celular' />
        </View>

        <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Email</Text>
                <TextInput style={styles.input} placeholder='Tu email' />
        </View>

        <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Password</Text>
                <TextInput style={styles.input} placeholder='Tu password' />
        </View>

        <View style={{...styles.inputContainer,marginBottom: 27}}>
                <Text style={styles.textInput}>Nombre</Text>
                <TextInput style={styles.input} placeholder='Tu email' />
        </View>

        <Button text={'Aceptar'} />
        <Text style={{fontWeight:'500', color:'#B7B7B7', marginTop:18}}>¿Tienes una cuenta?  <Text style={styles.link}>Iniciar Sesión</Text></Text>
        <Text style={{fontWeight:'500', color:'#B7B7B7', marginTop:18 }}> Al hacer click en Registrar, estas aceptando nuestros</Text>
        <Text style={styles.link}>Terminos y Condiciones.</Text>

    </View>
  )
}

const styles = StyleSheet.create({
    icon:{
        marginTop: 15,
        alignItems:'flex-start', 
        width: windowWidth * 0.90,
        marginBottom: 20
    },
    container: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        
        
    },
    title: {
        textAlign:'left',
        width: windowWidth * 0.90,
        fontSize: 22,
        fontWeight: '800',
        color: 'black',
        
    },
    text: {
        width: windowWidth * 0.90,
        textAlign:'left',
        fontSize: 14,
        fontWeight: '500',
        color: '#B7B7B7',
        marginBottom: 11
    },
    inputContainer: {
        width: windowWidth * 0.90,
        justifyContent: 'center',
        marginBottom:10 
    },
    textInput:{
        fontWeight:'500',
        fontSize:14,
        color:'#000',
        marginBottom:3
    },
    input: {
        width: windowWidth * 0.90,
        height: 38,
        paddingLeft:13,
        backgroundColor: '#ECF2F0',
        borderRadius: 5,
        fontSize: 14,
        color: '#B7B7B7',
        
    },
    link:{
        color:'#2782CA', 
        fontWeight:'500',
        fontSize:14
    },
    
   
})