import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        mensajes: [], //[]
        chats: null, //[]
        activeChat: null, //{}
        currentRecipient: {}, //{ uid, pethouse, user, avatar }
        isLoading: false
    },
    reducers: {

        loadingMensajes: (state)=>{
            state.isLoading = true
        },
        obtenerMensajes:(state, { payload }) => {
            state.isLoading;
            state.mensajes = payload
        },
        agregarUltimoMensaje: (state, { payload }) => {
            state.isLoading = false
            state.mensajes = [...state.mensajes, payload]
        },
        obtenerChats: (state, { payload }) => {
            state.isLoading = false
            state.chats = payload
        },
        setCurrentRecipient: (state, { payload }) => {
            state.currentRecipient = payload
        },
        clearMessages:(state)=>{
            state.mensajes= []
            state.chats=null
            state.activeChat=null
            state.currentRecipient=null
        }
    }
});


// Action creators are generated for each case reducer function
export const { loadingMensajes, obtenerMensajes,obtenerChats,agregarUltimoMensaje, setCurrentRecipient, clearMessages } = messagesSlice.actions;