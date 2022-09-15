import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'no-authenticated', // 'authenticated'
        user: null, //string
        email: null, //string
        //image: null, //string
        isLoading: false, //boolean,
        verifyCode: '',
        token: '',
        verifiedNewUser: false,
        loginWithGoogle: false,
        errorMessage: '',
        pets: []
    },
    reducers: {
        startLoading: (state, /* action */ ) => {
            state.isLoading = true
            state.errorMessage = ''
        },
        login: (state, { payload }) => {
            state.isLoading = false
            state.status = "authenticated"
            state.user= payload.usuario.nombre + " " + payload.usuario.apellido
            state.email= payload.usuario.correo
            state.token= payload.token
        },
        loginWithGoogle:(state, { payload }) => {
            state.isLoading = false
            state.status = "authenticated"
            state.user = payload.usuario.nombre
            state.email = payload.usuario.correo
            state.token = payload.token
            state.loginWithGoogle = true

        },
        logout: (state,{ payload })=>{
            state.isLoading= false; 
            state.status='no-authenticated'; 
            state.user= null;
            state.email=null; 
            state.verifyCode= '';
            state.token= '';
            state.loginWithGoogle = false;
            state.errorMessage= payload.error;
            state.pets= []
        },
        verifyCode: (state, { payload }) => {
            state.isLoading = false;
            state.verifyCode = payload.verifyCode;
            state.user = payload.usuario;
        },
        verifyNewUser: ( state, { payload } ) => {
            state.verifiedNewUser = true;
            state.token = payload.token;
        },
        loginNewUser: ( state ) => {
            state.status = "authenticated";
            //state.token = payload.token;
        },
        setErrorMessage: (state,{ payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { startLoading, login,loginWithGoogle, logout, verifyCode,verifyNewUser, loginNewUser, setErrorMessage } = authSlice.actions;