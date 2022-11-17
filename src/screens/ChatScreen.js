import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useRef } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'

import { ArrowBack, Audio, Call, Camera, Configuration, Video } from '../components/ChatScreen/Icons'
import { ChatContext } from '../context/ChatContext'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height


export const ChatScreen = ({ navigation }) => {

  const { uid } = useSelector(state => state.auth) // id del usuario logueado

  const { mensajes, currentRecipient } = useSelector(state => state.messages) //mensajes del chat y  destinatario actual

  const { socket } = useContext(ChatContext) //context con la conexion via socket

  const [textoMensaje, setTextoMensaje] = useState('');
  const [canSendMessage, setCanSendMessage] = useState(false);

  const viewChatScrollRef = useRef(null)
  const layoutRef = useRef(null)

  const onChangeMessageText = (value) =>{
    
    if(value.length > 0) setCanSendMessage(true)
    else setCanSendMessage(false)
    
    setTextoMensaje(value)
  }

  const sendMessage = () => {

    const bodyMensaje = {
      owner: uid,
      recipient: currentRecipient.uid,
      mensaje: textoMensaje
    }

    socket.emit('enviar-mensaje', bodyMensaje)


    setTextoMensaje('')
    setCanSendMessage(false)
  }

  const Message = ({ data }) => {

    const { emisor, mensaje, fecha } = data

    const hora = new Date(fecha).getHours()
    const minuto = new Date(fecha).getMinutes()

    return (
      <View style={{
        ...styles.message,
        backgroundColor: emisor === uid ? '#BFBFBF9E' : '#F8CF5087',
        alignSelf: emisor === uid ? 'flex-end' : 'flex-start',
      }}>
        <Text>{mensaje}</Text>
        <Text style={{ fontSize: 10, alignSelf: 'flex-end' }}>
          {`${hora > 12 ? hora - 12 : hora}:${minuto < 10 ? '0' + minuto : minuto} ${hora > 12 ? 'pm' : 'am'}`}
        </Text>
      </View>

    )
  }

  const BuildMessages = () => (
    mensajes.map((e, i) => (
      <View key={i} style={{ padding: 5 }}>
        <Message data={e} />
      </View>
    ))
  )



  useEffect(() => {

    viewChatScrollRef.current?.scrollTo({
      y: layoutRef.current?.y,
      animated: true
    });

  }, [mensajes])


  useEffect(() => {

    viewChatScrollRef.current?.scrollTo({
      y: layoutRef.current?.y,
      animated: true
    });

  }, [])




  return (
    <View style={styles.container}>
      <View style={styles.headerChat}>

        <TouchableOpacity onPress={() => { navigation.navigate('Message') }}>
          <ArrowBack />
        </TouchableOpacity>

        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
          <Image style={styles.avatarImage} source={{ uri: currentRecipient?.avatar }} />
          <View>
            <Text style={{ fontWeight: "bold", color: "black" }}>
              {
                currentRecipient.pethouse
                  ? currentRecipient.pethouse.nombre
                  : `${currentRecipient.user.nombre} ${currentRecipient.user.apellido}`
              }
            </Text>
            <Text>{currentRecipient.pethouse ? 'Tu hosting' : 'Cliente'}</Text>
          </View>
        </View>

        <View style={{ height: "100%", flex: 0.4, flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
          <Video />
          <Call />
          <Configuration />
        </View>

      </View>

      <ScrollView style={styles.bodyChat} ref={viewChatScrollRef}>
        {
          (mensajes)
            ? <BuildMessages />
            : <Text>no hay mensajes</Text>
        }
        <View onLayout={event => layoutRef.current = event.nativeEvent.layout} />
      </ScrollView>

      <View style={styles.footerChat}>
        <TextInput
          style={styles.messageInput}
          placeholder='Escribe un mensaje aqui'
          value={textoMensaje}
          onChangeText={(value)=>onChangeMessageText(value)}
          // onChange={()=> onChangeMessageText() }
        />
        <View style={{ width: "25%", flexDirection: "row", alignItems: "center", justifyContent: "space-around", }}>
          <Camera />
          <Audio />
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={sendMessage}
            disabled={!canSendMessage}
          >
            <Icon name='send-outline' size={25} color={canSendMessage ? '#2782CA' : '#d1d1d1'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: "column"

  },
  headerChat: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#B7B7B76B"
  },
  avatarImage: {
    width: 38,
    height: 38,
    marginRight: 5,
    borderRadius: 30
  },
  bodyChat: {
    flex: 1,
    height: 40,
    width: "100%",
    padding: 10,

  },
  footerChat: {
    flex: 0,
    height: 50,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#00000073",
    // paddingHorizontal: 10,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  message: {
    minHeight: 40,
    alignSelf: 'flex-start',
    maxWidth: "90%",
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
  },
  messageInput: {
    paddingLeft: 10,
    width: "75%"
  }
})