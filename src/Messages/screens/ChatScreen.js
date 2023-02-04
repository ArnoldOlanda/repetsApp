
import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { repetsAPI } from '../../api'
import { resetNewMessagesCount } from '../../store/slices/messages/messagesSlice'
import { HeaderChat } from '../components/HeaderChat'

import { Message } from '../components/Message'
import { useChat } from '../hooks/useChat'

export const ChatScreen = () => {


  const {newMessagesCount} = useSelector(state=> state.messages);
  const dispatch = useDispatch();

  const {
    canSendMessage,
    currentRecipient,
    mensajes,
    onChangeMessageText,
    sendMessage,
    textoMensaje,
    uid,
    viewChatScrollRef
  } = useChat();


  useEffect(() => {
    
      dispatch(resetNewMessagesCount());

  }, [ newMessagesCount ])
  
  

  return (
    <View style={styles.container}>

      <HeaderChat currentRecipient={ currentRecipient } />

      <ScrollView 
      style={styles.bodyChat} 
      ref={viewChatScrollRef}
      onContentSizeChange={() => viewChatScrollRef.current.scrollToEnd({ animated: true })}
      >
        {
          (!mensajes)
            ? <Text>no hay mensajes</Text>
            : ( mensajes.map((e, i) => (
                <View key={i} style={{ padding: 2 }}>
                  <Message
                    data={e}
                    currentRecipient={currentRecipient}
                    currentUser={uid}
                  />
                </View>
              ))
            )
        }
        <View style={{ height:20 }}/>
      </ScrollView>

      <View style={styles.footerChat}>
        <TextInput
          style={styles.messageInput}
          placeholder='Escribe un mensaje aqui'
          value={textoMensaje}
          onChangeText={(value) => onChangeMessageText(value)}
        />
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingRight: 10,
          height:'100%'
        }}>
          {/* <Camera />
          <Audio /> */}
          <TouchableOpacity
            style={styles.sendBtn}
            activeOpacity={0.4}
            onPress={sendMessage}
            disabled={!canSendMessage}
          >
            <Icon 
              name='send-outline' 
              size={25} 
              color={canSendMessage ? '#2782CA' : '#d1d1d1'} 
            />
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
  bodyChat: {
    width: "100%",
    padding: 10,
  },
  footerChat: {
    height: 50,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#00000073",
    flexDirection: "row",
    alignItems: "center",
  },
  messageInput: {
    paddingLeft: 10,
    height:'100%',
    flex: 1
  },
  sendBtn:{
    width:35,
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  }
})