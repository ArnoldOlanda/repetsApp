import React, { createContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client'
import { agregarUltimoMensaje, obtenerChats, obtenerMensajes } from '../store/slices/messages/messagesSlice';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const { uid } = useSelector( state => state.auth );

    const dispatch = useDispatch();
    const [socketChat, setSocketChat] = useState(null);
    const setSocket = socket => setSocketChat(socket);

    useEffect(() => {

        // let socket = io('https://repetsapi-production.up.railway.app',{
        let socket = io('http://192.168.1.34:8000',{
            'extraHeaders':{ 'usuario-uid': uid }
        })
        setSocket(socket)

        socket.emit("solicitar-chats",{ uid })

        socket.on("obtener-chats", (data) => {

            console.log('socket-event: obtener-chats');

            dispatch(obtenerChats( data ));
        })


        socket.on("chat-privado", (data)=> {

            console.log('socket-event: chat-privado',);
            
            dispatch( agregarUltimoMensaje(data.mensaje) );

        })

        
        socket.on("obtener-mensajes",(data) => {
            dispatch( obtenerMensajes(data?.mensajes || []) )
        })

        return () => {

            socket.off("obtener-chats");
            socket.off("chat-privado");
            socket.off("obtener-mensajes");
            socket.disconnect();
        }
    }, [])
    

    return (
        <ChatContext.Provider value={{
            socket: socketChat,
            setSocket
        }} >
            {children}
        </ChatContext.Provider>
    )
}
