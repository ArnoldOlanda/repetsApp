import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'no-authenticated', // 'authenticated'
        user: null, //string
        apellido: null,
        uid: null,
        email: null, //string
        phone:null,
        image: null, //string
        isLoading: false, //boolean,
        location:{
            latitude:0,
            longitude:0
        },
        currentLocation:{
            latitude:0,
            longitude:0
        },
        verifyCode: '',
        token: '',
        verifiedNewUser: false,
        loginWithGoogle: false,
        errorMessage: '',
    },
    reducers: {
        startLoading: (state, /* action */ ) => {
            state.isLoading = true
            state.errorMessage = ''
        },
        setLocation:(state, { payload })=>{
            state.location = payload;
        },
        setCurrentLocation:(state,{payload}) => {
            state.currentLocation = payload
        },
        login: (state, { payload }) => {
            state.isLoading = false
            state.status = "authenticated"
            state.user = payload.usuario.nombre
            state.apellido = payload.usuario.apellido
            state.phone = payload.usuario.celular
            state.uid = payload.usuario.uid
            state.email= payload.usuario.correo
            state.image = payload.usuario.img
            state.token= payload.token
        },
        loginWithGoogle:(state, { payload }) => {
            state.isLoading = false
            state.status = "authenticated"
            state.user = payload.usuario.nombre
            state.apellido = payload.usuario.apellido
            state.uid = payload.usuario.uid
            state.email = payload.usuario.correo
            state.image = payload.usuario.img
            state.token = payload.token
            state.loginWithGoogle = true

        },
        logout: (state,{ payload })=>{
            state.isLoading= false; 
            state.status='no-authenticated'; 
            state.user= null;
            state.apellido = null;
            state.email = null; 
            state.uid = null;
            state.image = null;
            state.verifyCode= '';
            state.token= '';
            state.loginWithGoogle = false;
            state.errorMessage= payload.error;
        },
        verifyCode: (state, { payload }) => {
            state.isLoading = false;
            state.verifyCode = payload.verifyCode;
            state.user = payload.usuario.nombre
            state.apellido = payload.usuario.apellido
            state.uid = payload.usuario.uid
            state.email= payload.usuario.correo
            state.image = payload.usuario.img
        },
        verifyNewUser: ( state, { payload } ) => {
            state.verifiedNewUser = true;
            state.uid = payload.usuario.uid
            state.token = payload.token;
        },
        loginNewUser: ( state ) => {
            state.status = "authenticated";
            //state.token = payload.token;
        },
        setErrorMessage: (state,{ payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        },
        updateProfilePhoto: (state,{ payload }) => {
            state.isLoading = false;
            state.image = payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    startLoading,
    setLocation,
    setCurrentLocation,
    login,
    loginWithGoogle,
    logout,
    verifyCode,
    verifyNewUser,
    loginNewUser,
    setErrorMessage,
    updateProfilePhoto 
} = authSlice.actions;