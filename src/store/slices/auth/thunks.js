import { GoogleSignin, statusCodes, } from '@react-native-google-signin/google-signin';
import axios from 'axios';

import {
    login, logout, verifyCode,
    startLoading, loginNewUser, setErrorMessage,
    verifyNewUser, loginWithGoogle, updateProfilePhoto, setFavoritePethouse, startLoadingGoogle, updateUserInfo
} from "./authSlice";

import { repetsAPI, repetsApiUrl } from "../../../api";
import { checkVerifyCode } from "../../../helpers/checkVerifyCode";
import { storeData } from '../../../helpers/storeData';

export const getAuth = (data) => {

    const body = data;

    return async (dispatch, getState) => {

        try {

            dispatch(startLoading());

            const response = await repetsAPI.post('/auth/login', body);

            console.log(response.data);
            dispatch(login(response.data));


        } catch (error) {
            const { msg } = error.response.data;
            dispatch(logout({ error:  msg}));
            // throw error;
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
            const { data } = error.response

            // console.log(JSON.stringify(error.response,null,4));
            console.log(data.err.errors[0].msg);
            dispatch(setErrorMessage(data.err.errors[0].msg));
        }

    }
}

export const startLoginWithGoogle = () => {
    return async (dispatch, getState) => {
        try {
            const hasPlayService = await GoogleSignin.hasPlayServices();

            if (hasPlayService) {
                dispatch(startLoadingGoogle())
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
            const { data } = await axios.put(`${repetsApiUrl}/usuarios/photo/${uid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(data);

            dispatch(updateProfilePhoto(data.user.img))
        } catch (error) {
            console.log(error);
        }

    }
}

export const startUpdateFavoritesPethouses = (data) => {
    return async (dispatch, getState) => {

        try {
            const { uid } = getState().auth
            const { uid: pethouseId } = data
            const response = await repetsAPI.put(`/usuarios/favorites/${uid}`, { pethouseId })

            console.log(response.data);

            dispatch(setFavoritePethouse(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export const startUpdateInfoUser = (data) => {
    return async (dispatch, getState) => {
        try {

            dispatch(startLoading())
            const { uid } = getState().auth

            const response = await repetsAPI.patch(`/usuarios/${uid}`, data)

            console.log(response.data);

            dispatch(updateUserInfo(response.data.usuario))

        } catch (error) {
            console.log(error);
        }
    }
}