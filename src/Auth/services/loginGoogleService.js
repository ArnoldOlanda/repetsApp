//@ts-check

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { repetsAPI } from "../../api";

export const loginGoogleService = async () => {
    try {
        const userInfo = await GoogleSignin.signIn();
        const { data } = await repetsAPI.post('/auth/google', {
            id_token: userInfo.idToken
        });
        const { token, usuario } = data;

        return {
            token,
            usuario
        }
    } catch (error) {
        console.log(error)
        throw error
    }

}