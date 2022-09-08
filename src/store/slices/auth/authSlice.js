import { createSlice } from '@reduxjs/toolkit';
import { getData } from '../../../helpers';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authenticated: 'no authenticated',
        user: null,
        isLoading: false,
    },
    reducers: {
        startLogin: (state, /* action */ ) => {
            state.isLoading = true
        },
        setLogin: (state, { payload }) => {
            state.authenticated = "authenticated",
            state.user= payload
            state.isLoading = false
        }
    }
});


// Action creators are generated for each case reducer function
export const { startLogin, setLogin } = authSlice.actions;