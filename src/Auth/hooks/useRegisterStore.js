//@ts-check
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from '../../hooks';
import {
  setErrorMessage,
  startLoading,
  verifyCode,
} from '../../store/slices/auth';
import {registerUserService} from '../services/registerUserService';

const initialForm = {
  nombre: '',
  apellido: '',
  celular: '',
  correo: '',
  password: '',
};

const formValidations = {
  nombre: [value => value.length >= 1, 'Este campo es obligatorio'],
  apellido: [value => value.length >= 1, 'Este campo es obligatorio'],
  celular: [value => value.length === 9, 'El celular debe ser de 9 digitos'],
  correo: [value => value.includes('@'), 'No es un correo valido'],
  password: [
    value => value.length >= 8,
    'El password debe ser de almenos 8 caracteres',
  ],
};

export const useRegisterStore = () => {
  const navigation = useNavigation();

  //@ts-ignore
  const {uid, errorMessage, isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    formState,
    onInputTextChange,
    onResetForm,
    formValidation,
    isFormValid,
  } = useForm(initialForm, formValidations);

  const onPressRegisterButton = async () => {
    try {
      setFormSubmitted(true);
      if (!isFormValid) {
        return ToastAndroid.show(
          'Revise la informacion ingresada',
          ToastAndroid.SHORT,
        );
      }

      dispatch(startLoading());

      const data = await registerUserService(formState);

      dispatch(verifyCode(data));

      setFormSubmitted(false);

      onResetForm();
    } catch (error) {
      const {data} = error.response;
      dispatch(setErrorMessage(data.err.errors[0].msg));
    }
  };

  useEffect(() => {
    //@ts-ignore
    if (uid) navigation.navigate('ConfirmEmailScreen');
  }, [uid]);

  useEffect(() => {
    if (errorMessage.length > 1)
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
  }, [errorMessage]);

  return {
    formState,
    formValidation,
    onInputTextChange,
    formSubmitted,
    isLoading,
    onPressRegisterButton,
  };
};
