import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        mensajes: [], //[]
        chats: [], //[]
        activeChat: null, //{}
        currentRecipient: {}, //{ uid, pethouse, user, avatar }
        newMessagesCount: 0,
        isLoading: false
    },
    reducers: {

        loadingMensajes: (state) => {
            state.isLoading = true
        },
        obtenerMensajes: (state, { payload }) => {
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
        // agregarChat: (state, { payload }) => {
        //     state.isLoading = false
        //     const chatExists = state.chats.find(chat => chat.uid === payload.uid);
        //     if(!chatExists) state.chats = [...state.chats, payload]
        //     else {
        //         chatExists
        //         state.chats = [...state.chats];
        //     }
        // },
        setCurrentRecipient: (state, { payload }) => {
            state.currentRecipient = payload
        },
        clearMessages: (state) => {
            state.mensajes = []
            state.chats = null
            state.activeChat = null
            state.currentRecipient = {}
        },
        increaseNewMessagesCount: (state) => {
            state.newMessagesCount++;
        },
        resetNewMessagesCount: (state) => {
            state.newMessagesCount = 0;
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    loadingMensajes,
    obtenerMensajes,
    obtenerChats,
    agregarChat,
    agregarUltimoMensaje,
    setCurrentRecipient,
    clearMessages,
    increaseNewMessagesCount,
    resetNewMessagesCount
} = messagesSlice.actions;