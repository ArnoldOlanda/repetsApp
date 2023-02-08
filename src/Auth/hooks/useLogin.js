//@ts-check

import React, {useState, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import {useForm} from '../../hooks';
import {postNotificationTokenService} from '../services/postNotificationTokenService';
import {
  login,
  loginWithGoogle,
  logout,
  startLoading,
  startLoadingGoogle,
} from '../../store/slices/auth';
import {loginUserService} from '../services/loginUserService';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {loginGoogleService} from '../services/loginGoogleService';

const initialState = {
  usuario: '',
  password: '',
};
const formValidations = {
  usuario: [
    value => value.includes('@') && value.includes('.'),
    'No es un correo valido',
  ],
  password: [
    value => value.length >= 8,
    'El password debe ser de almenos 8 caracteres',
  ],
};

export const useLogin = () => {
  const navigation = useNavigation();
  const {isLoading, isLoadingGoogle, uid, errorMessage} = useSelector(
    //@ts-ignore
    state => state.auth,
  );
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    onInputTextChange,
    formState,
    onResetForm,
    formValidation,
    isFormValid,
  } = useForm(initialState, formValidations);
  const {usuario, password} = formState;
  //@ts-ignore
  const {usuarioValid, passwordValid} = formValidation;

  const onPressLoginButton = async () => {
    try {
      setFormSubmitted(true);

      if (!isFormValid) {
        return ToastAndroid.show(
          'Revise la informacion ingresada',
          ToastAndroid.SHORT,
        );
      } else {
        dispatch(startLoading());
        const user = await loginUserService(formState);
        dispatch(login(user));

        setFormSubmitted(false);
      }

      // onResetForm();
    } catch (error) {
      console.log(error);
      const {msg} = error.response.data;
      dispatch(logout({error: msg}));
    }
  };

  const onPressGoogleLogin = async () => {
    try {
      const hasPlayService = await GoogleSignin.hasPlayServices();
      if (hasPlayService) {
        dispatch(startLoadingGoogle());
        const user = await loginGoogleService();
        dispatch(loginWithGoogle(user));
        return;
      }
      console.log('Google play services has disabled');
    } catch (error) {
      dispatch(logout(JSON.stringify(error)));
    }
  };

  useEffect(() => {
    messaging().registerDeviceForRemoteMessages();
    messaging()
      .getToken()
      .then(token => {
        return postNotificationTokenService(uid, token);
      });

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      postNotificationTokenService(uid, token);
    });
  }, [uid]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Notificacion recibida', remoteMessage);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (errorMessage.length > 1)
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
  }, [errorMessage]);

  return {
    formSubmitted,
    isLoading,
    isLoadingGoogle,
    onInputTextChange,
    onPressGoogleLogin,
    onPressLoginButton,
    password,
    passwordValid,
    usuario,
    usuarioValid,
  };
};
