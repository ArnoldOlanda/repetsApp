import React, { useContext, useEffect } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "../Avatar"
import { useDispatch, useSelector } from "react-redux";
import { obtenerMensajes, setCurrentRecipient } from "../../store/slices/messages/messagesSlice";
import { ChatContext } from "../../context/ChatContext";

export const Chat = ({ data }) => {

  const { colors } = useSelector(state => state.theme)
  const { usuario_recipient } = data

  const { socket } = useContext(ChatContext)

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const uri = usuario_recipient?.pethouse ? usuario_recipient.pethouse.galeria[0] : usuario_recipient.img

  const onPressOpenChat = () => {

    dispatch(setCurrentRecipient({
      uid: usuario_recipient._id,
      pethouse: usuario_recipient.pethouse,
      user: {
        nombre: usuario_recipient.nombre,
        apellido: usuario_recipient.apellido
      },
      avatar: uri
    }))

    dispatch(obtenerMensajes(data.mensajes))

    navigation.navigate("ChatScreen")
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPressOpenChat}>
      <Image source={{ uri }} style={styles.avatarImage} />
      <View style={{flex:1}}>
        <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent:'space-between' }}>
          <Text style={{ fontWeight: 'bold', color: colors.text }}>
            {usuario_recipient.pethouse
              ? usuario_recipient.pethouse.nombre
              : `${usuario_recipient.nombre} ${usuario_recipient.apellido}`
            }
          </Text>
          <Text style={{color:colors.text2}}>{new Date(data.ultimo_mensaje.fecha).toLocaleDateString('en-US', { year: 'numeric' })}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent:'space-between' }}>

          <Text style={{color:colors.text2}}>
            {
              data.ultimo_mensaje.mensaje.length>26
              ? data.ultimo_mensaje.mensaje.substring(0,26) + '...'
              : data.ultimo_mensaje.mensaje
            }</Text>
          <View style={styles.iconNum}><Text style={{ color: "white" }}>5</Text></View>
        </View>
      </View>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  container: {

    width: "100%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10

  },
  iconNum: {
    backgroundColor: "#F24E1E",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 30,
    marginRight: 10
  }
})