import React, {useContext, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  loadingMensajes,
  obtenerMensajes,
} from '../../store/slices/messages/messagesSlice';
import {repetsAPI} from '../../api';
import {ChatContext} from '../context/ChatContext';

export const useChat = () => {
  const {uid} = useSelector(state => state.auth); // id del usuario logueado
  const dispatch = useDispatch();

  const {mensajes, currentRecipient} = useSelector(state => state.messages); //mensajes del chat y  destinatario actual

  const {socket} = useContext(ChatContext); //context con la conexion via socket

  const [textoMensaje, setTextoMensaje] = useState('');
  const [canSendMessage, setCanSendMessage] = useState(false);

  const viewChatScrollRef = useRef(null);

  const onChangeMessageText = value => {
    if (value.length > 0) setCanSendMessage(true);
    else setCanSendMessage(false);

    setTextoMensaje(value);
  };

  const sendMessage = () => {
    try {
      const bodyMensaje = {
        owner: uid,
        recipient: currentRecipient.uid,
        mensaje: textoMensaje,
        tipo: 'texto',
      };

      socket.emit('enviar-mensaje', bodyMensaje);

      setTextoMensaje('');
      setCanSendMessage(false);
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
    }
  };

  const fetchMessages = async () => {
    try {
      dispatch(loadingMensajes());
      const {data} = await repetsAPI.get(
        `/mensajes/${uid}/${currentRecipient.uid}`,
      );
      dispatch(obtenerMensajes(data.length > 15 ? data.slice(-15) : data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    uid,
    currentRecipient,
    viewChatScrollRef,
    mensajes,
    textoMensaje,
    sendMessage,
    canSendMessage,
    onChangeMessageText,
  };
};
