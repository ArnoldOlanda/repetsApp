//@ts-check
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {checkVerifyCodeService} from '../services/checkVerifyCodeService';
import {
  setErrorMessage,
  startLoading,
  verifyNewUser,
} from '../../store/slices/auth';

const CELL_COUNT = 4;

export const useConfirmEmailStore = () => {
  const navigation = useNavigation();

  const {errorMessage, verifiedNewUser, isLoading, verifyCode, uid} =
    useSelector(
      //@ts-ignore
      state => state.auth,
    );
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onPressButton = async () => {
    try {
      dispatch(startLoading());

      const {ok, data, err} = await checkVerifyCodeService(
        uid,
        verifyCode,
        value,
      );

      if (ok) return dispatch(verifyNewUser(data));
      return dispatch(setErrorMessage(err));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //@ts-ignore
    verifiedNewUser && navigation.navigate('StartScreen');
  }, [verifiedNewUser]);

  return {
    CELL_COUNT,
    errorMessage,
    getCellOnLayoutHandler,
    isLoading,
    onPressButton,
    props,
    ref,
    setValue,
    value,
  };
};
