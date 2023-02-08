//@ts-check
import React from 'react';
import {Dimensions, StyleSheet, Text, ScrollView} from 'react-native';

import {Button} from '../../components/Button';
import {InputText} from '../../components/InputText';
import {useRegisterStore} from '../hooks/useRegisterStore';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const RegisterScreen = ({navigation}) => {
  const {
    formState,
    formValidation,
    formSubmitted,
    isLoading,
    onInputTextChange,
    onPressRegisterButton,
  } = useRegisterStore();

  const {nombre, apellido, celular, correo, password} = formState;
  //@ts-ignore
  const {nombreValid, apellidoValid, celularValid, correoValid, passwordValid} =
    formValidation;

  return (
    <ScrollView contentContainerStyle={{alignItems: 'center', padding: 5}}>
      <Text style={styles.title}>Registrate</Text>
      <Text style={styles.text}>Create una cuenta</Text>

      <InputText
        label="Nombre"
        value={nombre}
        onChangeText={onInputTextChange}
        changeTextKey="nombre"
        placeholder="Su nombre"
        error={!!nombreValid && formSubmitted}
        errorMessage={nombreValid}
        keyboardType=""
      />

      <InputText
        label="Apellido"
        value={apellido}
        onChangeText={onInputTextChange}
        changeTextKey="apellido"
        placeholder="Su apellido"
        error={!!apellidoValid && formSubmitted}
        errorMessage={apellidoValid}
        keyboardType=""
      />

      <InputText
        label="Celular"
        value={celular}
        onChangeText={onInputTextChange}
        changeTextKey="celular"
        placeholder="Su celular"
        keyboardType="numeric"
        error={!!celularValid && formSubmitted}
        errorMessage={celularValid}
      />

      <InputText
        label="Email"
        value={correo}
        onChangeText={onInputTextChange}
        changeTextKey="correo"
        placeholder="Tu email"
        error={!!correoValid && formSubmitted}
        errorMessage={correoValid}
        keyboardType=""
      />

      <InputText
        label="Password"
        value={password}
        onChangeText={onInputTextChange}
        changeTextKey="password"
        placeholder="Tu password"
        error={!!passwordValid && formSubmitted}
        errorMessage={passwordValid}
        keyboardType=""
        typePassword
      />

      <Button
        text={'Aceptar'}
        onPress={onPressRegisterButton}
        isLoading={isLoading}
      />

      <Text style={{fontWeight: '500', color: '#B7B7B7', marginTop: 18}}>
        ¿Tienes una cuenta?
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('LoginScreen')}>
          Iniciar Sesión
        </Text>
      </Text>

      <Text
        style={{
          fontWeight: '500',
          color: '#B7B7B7',
          marginTop: 18,
        }}>
        Al hacer click en Registrar, estas aceptando nuestros
      </Text>
      <Text style={styles.link}> Terminos y Condiciones. </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginTop: 15,
    alignItems: 'flex-start',
    width: windowWidth * 0.9,
    marginBottom: 20,
  },
  container: {},
  title: {
    textAlign: 'left',
    width: windowWidth * 0.9,
    fontSize: 22,
    fontWeight: '800',
    color: 'black',
  },
  text: {
    width: windowWidth * 0.9,
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '500',
    color: '#B7B7B7',
    marginBottom: 11,
  },
  inputContainer: {
    width: windowWidth * 0.9,
    justifyContent: 'center',
    marginBottom: 6,
  },
  textInput: {
    fontWeight: '500',
    fontSize: 14,
    color: '#000',
    marginBottom: 3,
  },
  input: {
    width: windowWidth * 0.9,
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
    fontSize: 14,
  },
});
