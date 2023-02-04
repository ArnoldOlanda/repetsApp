import React, { createContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client'
import { repetsAPI } from '../../api';
import { agregarChat, agregarUltimoMensaje, increaseNewMessagesCount, obtenerChats } from '../../store/slices/messages/messagesSlice';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { uid } = useSelector( state => state.auth );

    const dispatch = useDispatch();
    const [socketChat, setSocketChat] = useState(null);
    const setSocket = socket => setSocketChat(socket);

    const fetchChats = async () => {
        try {

            const {data} = await repetsAPI.get(`/mensajes/chats/${uid}`);
            dispatch(obtenerChats(data));

        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        fetchChats();
    }, [])
    

    useEffect(() => {

        // let socket = io('https://repetsapi-production.up.railway.app',{
        let socket = io('http://192.168.1.34:8000',{
            'extraHeaders':{ 'usuario-uid': uid }
        })
        setSocket(socket)

        //socket.emit("solicitar-chats",{ uid })

        socket.on("obtener-chats", (data) => { 
            try {
                console.log('socket-event: obtener-chats');
                dispatch(obtenerChats( data ));
            } catch (error) {
                console.log(error)
            }
        })


        socket.on("chat-privado", (data)=> {
            console.log({mensajePrivado: data})
            dispatch( agregarUltimoMensaje(data.mensaje) );
            if(data.mensaje.emisor !== uid){
                dispatch( increaseNewMessagesCount() );
            }
        })

        
        // socket.on("obtener-mensajes",(data) => {
        //     dispatch( obtenerMensajes(data?.mensajes.slice(-10) || []) )
        // })

        socket.on("new-reservation",(data)=> {
            dispatch( agregarUltimoMensaje({...data}) )
        })

        return () => {

            socket.off("obtener-chats");
            socket.off("chat-privado");
            socket.off("obtener-mensajes");
            socket.off("new-reservation");
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
