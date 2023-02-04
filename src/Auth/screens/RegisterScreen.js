import React,{ useEffect } from 'react'
import { Dimensions, StyleSheet, Text, ScrollView, ToastAndroid, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { registerUser } from '../../store/slices/auth'
import { useForm } from '../../hooks'
import { Button } from '../../components/Button'
import { InputText } from '../../components/InputText';
import { useState } from 'react'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

const initialForm = {
    nombre: '',
    apellido: '',
    celular: '',
    correo: '',
    password: '',
}

const formValidations = {
    nombre: [value => value.length >= 1, 'Este campo es obligatorio'],
    apellido: [value => value.length >= 1, 'Este campo es obligatorio'],
    celular: [value => value.length === 9, 'El celular debe ser de 9 digitos'],
    correo: [value => value.includes('@'), 'No es un correo valido'],
    password: [value => value.length >= 8, 'El password debe ser de almenos 8 caracteres']
}

export const RegisterScreen = ({ navigation }) => {


    const { uid, errorMessage, isLoading } = useSelector( state => state.auth )
    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { formState, onInputTextChange, onResetForm, formValidation, isFormValid } = useForm(initialForm, formValidations);

    const { nombre, apellido, celular, correo, password } = formState;
    const { nombreValid, apellidoValid, celularValid, correoValid, passwordValid } = formValidation;

    const onPressRegisterButton = () => {
        setFormSubmitted(true);
        if (!isFormValid) {
            return ToastAndroid.show('Revise la informacion ingresada', ToastAndroid.SHORT)
        }

        dispatch( registerUser(formState) );
        setFormSubmitted(false);

        onResetForm();
    }

    const onPressLoginLink = () => { navigation.navigate('LoginScreen') }

    useEffect(() => {

        if(uid) navigation.navigate('ConfirmEmailScreen');

    }, [uid])
    
    useEffect(()=>{

        if(errorMessage.length > 1) ToastAndroid.show(errorMessage, ToastAndroid.LONG)

    },[errorMessage])

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 5, }} >
            <Text style={styles.title}>Registrate</Text>
            <Text style={styles.text}>Create una cuenta</Text>

            <InputText
                label='Nombre'
                value={nombre}
                onChangeText={onInputTextChange}
                changeTextKey='nombre'
                placeholder='Su nombre'
                error={!!nombreValid && formSubmitted}
                errorMessage={nombreValid}
            />

            <InputText
                label='Apellido'
                value={apellido}
                onChangeText={onInputTextChange}
                changeTextKey='apellido'
                placeholder='Su apellido'
                error={!!apellidoValid && formSubmitted }
                errorMessage={apellidoValid}
            />

            <InputText
                label='Celular'
                value={celular}
                onChangeText={onInputTextChange}
                changeTextKey='celular'
                placeholder='Su celular'
                keyboardType='numeric'
                error={!!celularValid && formSubmitted }
                errorMessage={celularValid}
            />

            <InputText
                label='Email'
                value={correo}
                onChangeText={onInputTextChange}
                changeTextKey='correo'
                placeholder='Tu email'
                error={!!correoValid && formSubmitted }
                errorMessage={correoValid}
            />

            <InputText
                label='Password'
                value={password}
                onChangeText={onInputTextChange}
                changeTextKey='password'
                placeholder='Tu password'
                error={!!passwordValid && formSubmitted }
                errorMessage={passwordValid}
                typePassword
            />

            <Button 
            text={'Aceptar'} 
            onPress={onPressRegisterButton} 
            isLoading={isLoading} 
            />

            <Text style={{ fontWeight: '500', color: '#B7B7B7', marginTop: 18 }}>
                ¿Tienes una cuenta?
                <Text style={styles.link} onPress={onPressLoginLink} >
                    Iniciar Sesión
                </Text>
            </Text>

            <Text style={{
                fontWeight: '500',
                color: '#B7B7B7',
                marginTop: 18
            }}
            >
                Al hacer click en Registrar, estas aceptando nuestros
            </Text>
            <Text style={styles.link}> Terminos y Condiciones. </Text>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginTop: 15,
        alignItems: 'flex-start',
        width: windowWidth * 0.90,
        marginBottom: 20
    },
    container: {

    },
    title: {
        textAlign: 'left',
        width: windowWidth * 0.90,
        fontSize: 22,
        fontWeight: '800',
        color: 'black',

    },
    text: {
        width: windowWidth * 0.90,
        textAlign: 'left',
        fontSize: 14,
        fontWeight: '500',
        color: '#B7B7B7',
        marginBottom: 11
    },
    inputContainer: {
        width: windowWidth * 0.90,
        justifyContent: 'center',
        marginBottom: 6
    },
    textInput: {
        fontWeight: '500',
        fontSize: 14,
        color: '#000',
        marginBottom: 3
    },
    input: {
        width: windowWidth * 0.90,
        height: 38,
        paddingLeft: 13,
        backgroundColor: '#ECF2F0',
        borderRadius: 5,
        fontSize: 14,
        color: '#111',

    },
    link: {
        color: '#2782CA',
        fontWeight: '500',
        fontSize: 14
    },
})