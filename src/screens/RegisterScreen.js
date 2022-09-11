import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../components/Button'
import { useForm } from '../hooks'
import { setErrorMessage,registerUser } from '../store/slices/auth'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

const initialForm = {
    nombre: '',
    apellido: '',
    celular: '',
    correo: '',
    password: '',
}

export const RegisterScreen = ({ navigation }) => {

    const { errorMessage } = useSelector( state => state.auth )
    const dispatch = useDispatch();

    const { formState, onInputTextChange, onResetForm } = useForm(initialForm);
    const { nombre, apellido, celular, correo, password } = formState;

    const onPressRegisterButton = () => {
        if( nombre.length < 1 || apellido.length <1  || celular.length < 9 || 
        !correo.includes('@') || password.length <8 ){
            return dispatch( setErrorMessage('Revise la informacion ingresada') )
        }

        dispatch( registerUser( formState ) );
        onResetForm();
        navigation.navigate('ConfirmEmailScreen');
    }

    const onPressLoginLink = () => {
        navigation.navigate('LoginScreen')
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 5, }} >
            <View style={styles.icon}>
                <Text>IC</Text>
            </View>
            <Text style={styles.title}>Registrate</Text>
            <Text style={styles.text}>Create una cuenta</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.textInput}> Nombre </Text>
                <TextInput
                    style={styles.input}
                    value={ nombre }
                    onChangeText={value => onInputTextChange('nombre', value)}
                    placeholder='Su nombre' />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.textInput}> Apellido </Text>
                <TextInput
                    style={styles.input}
                    value={ apellido }
                    onChangeText={value => onInputTextChange('apellido', value)}
                    placeholder='Su apellido' />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.textInput}> Celular </Text>
                <TextInput 
                    style={styles.input} 
                    value={ celular }
                    onChangeText={value => onInputTextChange('celular', value)} 
                    placeholder='Su celular' />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.textInput}> Email </Text>
                <TextInput
                    style={styles.input}
                    value={ correo }
                    onChangeText={value => onInputTextChange('correo', value)}
                    placeholder='Tu email' />
            </View>

            <View style={ styles.inputContainer }>
                <Text style={styles.textInput}> Password </Text>
                <TextInput
                    style={styles.input}
                    value={ password }
                    onChangeText={value => onInputTextChange('password', value)}
                    placeholder='Tu password' />
                <Text style={{ fontSize:10 }} >El password debe contener al menos 8 caracteres</Text>
            </View>

            {
                errorMessage !== ''
                && (
                    <View style={styles.errorMessageContainer}>
                        <Text style={styles.errorMessageText} >{ errorMessage }</Text>
                    </View>
                )
            }
            <Button
                text={'Aceptar'}
                onPress={onPressRegisterButton} />
            <Text
                style={{ fontWeight: '500', color: '#B7B7B7', marginTop: 18 }}>
                ¿Tienes una cuenta?
                <Text
                    style={styles.link}
                    onPress={onPressLoginLink}
                >
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
    errorMessageContainer:{
        paddingVertical:5,
        paddingHorizontal:2,
        backgroundColor:'#facaca',
        width: windowWidth * 0.9,
        marginVertical: 15,
    },
    errorMessageText:{
        color:'#f00'
    }

})