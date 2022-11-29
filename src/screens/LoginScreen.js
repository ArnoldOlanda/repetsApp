import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Button as RNButton, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import messaging from '@react-native-firebase/messaging';

import { repetsAPI } from '../api'
import { getAuth, startLoginWithGoogle } from '../store/slices/auth'
import { useForm } from '../hooks'
import { Button } from '../components/Button'
import { GoogleIcon } from '../components/GoogleIcon'
import { InputText } from '../components/InputText'
import { Title } from '../components/Title'


const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

const initialState = {
    usuario: '',
    password: ''
}
const formValidations = {
    usuario: [value => value.includes('@') && value.includes('.'), 'No es un correo valido'],
    password: [value => value.length >= 8, 'El password debe ser de almenos 8 caracteres']
}


export const LoginScreen = ({ navigation }) => {

    const { isLoading, isLoadingGoogle, uid, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false)

    const { onInputTextChange, formState, onResetForm, formValidation, isFormValid } = useForm(initialState, formValidations);
    const { usuario, password } = formState;
    const { usuarioValid, passwordValid } = formValidation;

    const onPressForgotPasswordLink = () => {
        navigation.navigate('ResetPasswordScreen')
    }

    const onPressLoginButton = () => {


        setFormSubmitted(true);

        if (!isFormValid) {
            return ToastAndroid.show('Revise la informacion ingresada', ToastAndroid.SHORT)
        } else {
            dispatch(getAuth(formState));
            setFormSubmitted(false);
        }

        // onResetForm();
    }

    const onPressGoogleLogin = () => {
        dispatch(startLoginWithGoogle())
    }

    const onPressRegisterLink = () => {
        navigation.navigate('RegisterScreen')
    }

    const saveTokenToDatabase = async (token) => {

        try {
            if (uid !== null) {
                const { data } = await repetsAPI.put(`/usuarios/notification_token/${uid}`, {
                    token
                })

                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        messaging().registerDeviceForRemoteMessages();
        messaging().getToken().then(token => {
            return saveTokenToDatabase(token);
        })

        // Listen to whether the token changes
        return messaging().onTokenRefresh(token => {
            saveTokenToDatabase(token);
        });

    }, [uid])

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log("Notificacion recibida", remoteMessage);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {

        if (errorMessage !== '') {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }

    }, [errorMessage])

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', }}>
            <View style={{ alignItems: 'flex-start', width: windowWidth * 0.90, marginBottom: 20 }}>
                <Title text='Bienvenido de nuevo' icon='👋' />
                <Text style={styles.text}>Acceda a su cuenta</Text>
            </View>

            <InputText
                label='Email'
                value={usuario}
                onChangeText={onInputTextChange}
                changeTextKey='usuario'
                placeholder='Tu email'
                error={!!usuarioValid && formSubmitted}
                errorMessage={usuarioValid}
            />

            <InputText
                label='Password'
                value={password}
                onChangeText={onInputTextChange}
                changeTextKey='password'
                placeholder='Tu password'
                error={!!passwordValid && formSubmitted}
                errorMessage={passwordValid}
                typePassword
            />

            <View style={{ width: windowWidth * 0.90, alignItems: 'flex-start', marginVertical: 10 }}>
                <Text
                    style={styles.link}
                    onPress={onPressForgotPasswordLink}
                >¿Olvido su contraseña?</Text>
            </View>
            <Button text={'Login'} onPress={onPressLoginButton} isLoading={isLoading} />
            <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                <Text style={{ fontWeight: '500' }}>
                    ¿No tiene un cuenta?
                </Text>
                <Text
                    style={{ ...styles.link, paddingLeft: 10 }}
                    onPress={onPressRegisterLink}
                >
                    Registrese
                </Text>
            </View>
            <View
                style={{
                    marginTop: windowHeight * 0.05, //70
                    borderBottomColor: '#b7b7b7',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    alignSelf: 'stretch'
                }}
            />
            <View style={{
                backgroundColor: '#fff',
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                top: -25
            }}>
                <Text style={{ color: '#b7b7b7' }} >O</Text>
            </View>
            <TouchableOpacity
                style={styles.btnGoogle}
                onPress={onPressGoogleLogin}
            >

                <Text style={styles.btnGoogleText}>
                    {
                        isLoadingGoogle
                            ? (<ActivityIndicator color="#000" size={"small"} />)
                            : (<> <GoogleIcon /> Continuar con Google </>)
                    }
                </Text>
            </TouchableOpacity>
            <Text />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        marginTop: windowHeight * 0.05,
    },
    title: {
        textAlign: 'left',
        fontSize: 22,
        fontWeight: '800',
        color: 'black',
    },
    text: {
        textAlign: 'left',
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
    textInput: {
        fontWeight: '500',
        fontSize: 14,
        color: '#000',
        marginBottom: 3
    },
    input: {
        width: windowWidth * 0.90,
        height: 50,
        paddingLeft: 13,
        backgroundColor: '#ECF2F0',
        borderRadius: 5,
        fontSize: 16
    },
    link: {
        color: '#2782CA',
        fontWeight: '500',
        fontSize: 14
    },
    btnGoogle: {
        height: 40,
        width: windowWidth * 0.90,
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnGoogleText: {
        color: '#000',
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '500'
    }
})