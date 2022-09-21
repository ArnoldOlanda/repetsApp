import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, Button as RNButton } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'


import { Button } from '../components/Button'
import { GoogleIcon } from '../components/GoogleIcon'
import { Title } from '../components/Title'
import { useForm } from '../hooks'
import { getAuth, setLogin, startLoginWithGoogle } from '../store/slices/auth'


const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

const initialState = {
    usuario: '',
    password: ''
}


export const LoginScreen = ({ navigation }) => {

    const { isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const { onInputTextChange, formState, onResetForm } = useForm(initialState);
    const { usuario, password } = formState;

    const onPressForgotPasswordLink = () => {
        navigation.navigate('ResetPasswordScreen')
    }

    const onPressLoginButton = () => {
        dispatch(getAuth(formState));
    }

    const onPressGoogleLogin = () => {
        dispatch( startLoginWithGoogle() )   
    }

    const onPressRegisterLink = () => {
        navigation.navigate('RegisterScreen')
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'flex-start', width: windowWidth * 0.90 }}>
                <Title text='Bienvenido de nuevo' icon='👋' />
                <Text style={styles.text}>Acceda a su cuenta</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={usuario}
                    onChangeText={value => onInputTextChange('usuario', value)}
                    placeholder='Tu email' />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={value => onInputTextChange('password', value)}
                    placeholder='Tu password' />
            </View>
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
                    marginTop: 70,
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
                <GoogleIcon />
                <Text style={styles.btnGoogleText}>Continuar con Google</Text>
            </TouchableOpacity>
            <Text />
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