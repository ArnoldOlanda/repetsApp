//@ts-check
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {Button} from '../../components/Button';
import {GoogleIcon} from '../../components/GoogleIcon';
import {InputText} from '../../components/InputText';
import {Title} from '../../components/Title';
import {useLogin} from '../hooks/useLogin';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const LoginScreen = ({navigation}) => {
  const {
    formSubmitted,
    isLoadingGoogle,
    isLoading,
    onInputTextChange,
    onPressGoogleLogin,
    onPressLoginButton,
    password,
    passwordValid,
    usuario,
    usuarioValid,
  } = useLogin();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}
      keyboardShouldPersistTaps="handled">
      <View
        style={{
          alignItems: 'flex-start',
          width: windowWidth * 0.9,
          marginBottom: 20,
        }}>
        <Title text="Bienvenido de nuevo" icon="👋" />
        <Text style={styles.text}>Acceda a su cuenta</Text>
      </View>

      <InputText
        label="Email"
        value={usuario}
        onChangeText={onInputTextChange}
        changeTextKey="usuario"
        placeholder="Tu email"
        error={!!usuarioValid && formSubmitted}
        errorMessage={usuarioValid}
        keyboardType="email-address"
      />
      {/* @ts-ignore */}
      <InputText
        label="Password"
        value={password}
        onChangeText={onInputTextChange}
        changeTextKey="password"
        placeholder="Tu password"
        error={!!passwordValid && formSubmitted}
        errorMessage={passwordValid}
        typePassword
      />

      <View
        style={{
          width: windowWidth * 0.9,
          alignItems: 'flex-start',
          marginVertical: 10,
        }}>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          ¿Olvido su contraseña?
        </Text>
      </View>
      <Button
        text={'Login'}
        onPress={onPressLoginButton}
        isLoading={isLoading}
      />
      <View style={{flexDirection: 'row', marginVertical: 15}}>
        <Text style={{fontWeight: '500'}}>¿No tiene un cuenta?</Text>
        <Text
          style={{...styles.link, paddingLeft: 10}}
          onPress={() => navigation.navigate('RegisterScreen')}>
          Registrese
        </Text>
      </View>
      <View
        style={{
          marginTop: windowHeight * 0.05, //70
          borderBottomColor: '#b7b7b7',
          borderBottomWidth: StyleSheet.hairlineWidth,
          alignSelf: 'stretch',
        }}
      />
      <View
        style={{
          backgroundColor: '#fff',
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          top: -25,
        }}>
        <Text style={{color: '#b7b7b7'}}>O</Text>
      </View>
      <TouchableOpacity style={styles.btnGoogle} onPress={onPressGoogleLogin}>
        <Text style={styles.btnGoogleText}>
          {isLoadingGoogle ? (
            <ActivityIndicator color="#000" size={'small'} />
          ) : (
            <>
              {' '}
              <GoogleIcon /> Continuar con Google{' '}
            </>
          )}
        </Text>
      </TouchableOpacity>
      <Text />
    </ScrollView>
  );
};

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
    width: windowWidth * 0.9,
    height: 70,
    justifyContent: 'center',
    marginVertical: 10,
  },
  textInput: {
    fontWeight: '500',
    fontSize: 14,
    color: '#000',
    marginBottom: 3,
  },
  input: {
    width: windowWidth * 0.9,
    height: 50,
    paddingLeft: 13,
    backgroundColor: '#ECF2F0',
    borderRadius: 5,
    fontSize: 16,
  },
  link: {
    color: '#2782CA',
    fontWeight: '500',
    fontSize: 14,
  },
  btnGoogle: {
    height: 40,
    width: windowWidth * 0.9,
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
    fontWeight: '500',
  },
});
