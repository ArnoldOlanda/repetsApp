import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from '../components/Button'

const windowWidth = Dimensions.get('screen').width

export const ResetPasswordScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.topTextContainer}>
                <Text style={styles.title}>Contraseña olvidada</Text>
                <Text style={styles.text}>Seleccione de que manera quiere restablecer su contraseña</Text>
            </View>

            <TouchableOpacity style={styles.resetOptionButtonContainer}>
                <View style={styles.resetOptionButtonLeft}>
                    <View style={styles.iconContainer}>
                        <Text>ic</Text>
                    </View>
                </View>
                <View style={styles.resetOptionButtonRight}>
                    <Text style={{...styles.text, color:'#000'}}>Email</Text>
                    <Text style={styles.text}>Enviar a tu correo</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{...styles.resetOptionButtonContainer, marginBottom:34}}>
                <View style={styles.resetOptionButtonLeft}>
                    <View style={styles.iconContainer}>
                        <Text>ic</Text>
                    </View>
                </View>
                <View style={styles.resetOptionButtonRight}>
                    <Text style={{...styles.text, color:'#000'}}>Numero de telefono</Text>
                    <Text style={styles.text}>Enviar a tu numero de telefono</Text>
                </View>
            </TouchableOpacity>

            <Button text='Continuar' />
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
    topTextContainer:{
        alignItems: 'flex-start', 
        width: windowWidth * 0.90,
        marginBottom:20
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
    resetOptionButtonContainer:{
        width: windowWidth * 0.9,
        height: 60,
        borderRadius:5,
        backgroundColor:'#ECF2F0',
        flexDirection:'row',
        marginTop:10,
        marginBottom:16
    },
    resetOptionButtonLeft:{
        width:50,
        height:60,
        justifyContent:'center',
        alignItems:'center'
    },
    resetOptionButtonRight:{
        justifyContent:'center'
    },
    iconContainer:{
        backgroundColor:'#fff',
        width: 25,
        height: 25,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'
    }
})