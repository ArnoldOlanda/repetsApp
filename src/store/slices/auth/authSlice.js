import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'no-authenticated', // 'authenticated'
        user: null, //object
        isLoading: false, //boolean,
        verifyCode: '',
        token: '',
        verifiedNewUser: false,
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
            state.status = "authenticated",
            state.user= payload.usuario,
            state.token= payload.token
        },
        logout: (state,{ payload })=>{
            state.status='no-authenticated'; 
            state.user= null; 
            state.isLoading= false; 
            state.verifyCode= '';
            state.token= '';
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
            //state.token = payload;
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
export const { startLoading, login, logout, verifyCode,verifyNewUser, loginNewUser, setErrorMessage } = authSlice.actions;