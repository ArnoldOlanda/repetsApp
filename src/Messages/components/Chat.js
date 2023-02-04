import React, { useContext, useEffect } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "../../components/Avatar"
import { useDispatch, useSelector } from "react-redux";
import { resetNewMessagesCount, setCurrentRecipient } from "../../store/slices/messages/messagesSlice";

export const Chat = ({ data }) => {

  const miembrosData = {};
  let uri = "";

  const { colors } = useSelector(state => state.theme);
  const {uid} = useSelector(state=> state.auth);
  const { miembros } = data;
  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  miembros.map(e => {
    if (e._id === uid) {
      miembrosData.user = e;
      //uri = e.pethouse ? e.pethouse;
    }
    else {
      miembrosData.recipient = e;
      uri = e.pethouse ? e.pethouse.galeria[0] : e.img;
    }
  })


  // useEffect(() => {
  //   miembros.map(e => {
  //     if (!e.pethouse) {
  //       miembrosData.user = e;
  //       uri = e.img;
  //     }
  //     else {
  //       miembrosData.recipient = e;
  //       uri = e.pethouse.galeria[0];
  //     }
  //   })

  // }, [])


  const onPressOpenChat = () => {
    console.log(miembrosData);
    dispatch(setCurrentRecipient({
      uid: recipient._id,
      pethouse: recipient.pethouse,
      user: {
        nombre: recipient.nombre,
        apellido: recipient.apellido
      },
      avatar: uri
    }));

    dispatch(resetNewMessagesCount());

    navigation.navigate("ChatScreen")
  }
  const { user, recipient } = miembrosData

  return (
    <TouchableOpacity style={styles.container} onPress={onPressOpenChat}>
      <Image source={{ uri }} style={styles.avatarImage} />
      <View style={{ flex: 1 }}>
        <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', color: colors.text }}>
            {
              recipient.pethouse
                ? recipient.pethouse.nombre
                : `${recipient.nombre} ${recipient.apellido}`
            }
          </Text>
          <Text style={{ color: colors.text2 }}>{new Date(data.ultimo_mensaje.fecha).toLocaleDateString('en-US', { year: 'numeric' })}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>

          <Text style={{ color: colors.text2 }}>
            {
              data.ultimo_mensaje.mensaje.length > 26
                ? data.ultimo_mensaje.mensaje.substring(0, 26) + '...'
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