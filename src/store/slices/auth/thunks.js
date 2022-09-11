import { login, logout, verifyCode, startLoading, loginNewUser, setErrorMessage, verifyNewUser } from "./authSlice"
import { repetsAPI } from "../../../api";
import { checkVerifyCode } from "../../../helpers/checkVerifyCode";

export const getAuth = (data) => {

    const body = data;

    return async (dispatch, getState) => {

        try {
            
            dispatch(startLoading());

            const { data } = await repetsAPI.post('/auth/login', body);

            dispatch( login( data ) );

        } catch (error) {
            const { msg } = error.response.data;
            dispatch(logout({ error: msg }));
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

export const startCheckingVerifyAccount = (verifyCodeFromEmail) => {
    return async (dispatch, getState) => {
        dispatch( startLoading() );
        const { auth } = getState();
        const { uid } = auth.user;
        const { verifyCode } = auth

        const { ok, data, err } = await checkVerifyCode(uid, verifyCode, verifyCodeFromEmail );

        if( ok ){
            return dispatch( verifyNewUser( data ) )
        }
        return dispatch( setErrorMessage( err ) )
    }
}