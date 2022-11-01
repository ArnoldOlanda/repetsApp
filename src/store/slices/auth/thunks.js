import { GoogleSignin, statusCodes, } from '@react-native-google-signin/google-signin';

import { login, logout, verifyCode, startLoading, loginNewUser, setErrorMessage, verifyNewUser, loginWithGoogle, updateProfilePhoto } from "./authSlice"
import { repetsAPI, repetsApiUrl } from "../../../api";
import { checkVerifyCode } from "../../../helpers/checkVerifyCode";
import axios from 'axios';

export const getAuth = (data) => {

    const body = data;

    return async (dispatch, getState) => {

        try {

            dispatch(startLoading());

            const { data } = await repetsAPI.post('/auth/login', body);

            dispatch(login(data));

        } catch (error) {
            //const { msg } = error.response.data;
            console.log(error);
            dispatch(logout({ error: 'msg' }));
        }
    }
}

export const registerUser = (data) => {

    const body = {
        ...data,
        google: false,
        rol: 'USER_ROLE'
    }

    return async (dispatch, getState) => {
        try {

            dispatch(startLoading());

            const { data } = await repetsAPI.post('/usuarios', body);

            dispatch(verifyCode(data));
            console.log(data);

        } catch (error) {
            console.log(error);
            throw error
        }

    }
}

export const startLoginWithGoogle = () => {
    return async (dispatch, getState) => {
        try {
            const hasPlayService = await GoogleSignin.hasPlayServices();

            if (hasPlayService) {
                const userInfo = await GoogleSignin.signIn();
                const { data } = await repetsAPI.post('/auth/google', {
                    id_token: userInfo.idToken
                });
                const { token, usuario } = data;

                dispatch(loginWithGoogle({ token, usuario }))
            }
        } catch (error) {
            console.log(error);
            dispatch(logout(JSON.stringify(error)))
        }

    }
}

export const startCheckingVerifyAccount = (verifyCodeFromEmail) => {
    return async (dispatch, getState) => {
        dispatch(startLoading());
        const { auth } = getState();
        const { verifyCode, uid } = auth;

        const { ok, data, err } = await checkVerifyCode(uid, verifyCode, verifyCodeFromEmail);

        if (ok) {
            return dispatch(verifyNewUser(data))
        }
        return dispatch(setErrorMessage(err))
    }
}

export const startUpdateProfilePicture = (image) => {
    return async (dispatch, getState) => {

        try {
            dispatch(startLoading());
            const { auth } = getState();
            const { uid } = auth

            const formData = new FormData();
            formData.append('image', image);
            const { data } = await axios.put(`${ repetsApiUrl }/usuarios/photo/${uid}`, formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            console.log(data);

            dispatch(updateProfilePhoto(data.user.img))
        } catch (error) {
            console.log(error);
        }

    }
}