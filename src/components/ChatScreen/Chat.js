import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "../Avatar"

export const Chat = (props) => {
  const navigation = useNavigation();
  
  return (
  <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate("Chat")}}>
    <Avatar/>
    <View style={{flexGrow: 1, paddingHorizontal:5}}>
        <Text style= {{fontWeight: 'bold', color:"black"}}>Nombre alojamiento</Text>
        <Text>Ultimo mensaje</Text>
    </View>
    <View style={{flexDirection: "column",alignItems:"flex-end"}}>
        <Text>6:37 PM</Text>
        <View style={styles.iconNum}><Text style={{color:"white"}}>4</Text></View>
    </View>
  </TouchableOpacity>
)}



const styles = StyleSheet.create({
    container: {
      
      width: "100%",
      height: "auto",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 10

    },
    iconNum: {
      backgroundColor:"#F24E1E",
      alignContent: "center",
      justifyContent:"center",
      alignItems:"center",
      textAlign:"center",
      alignItems:"center",
      width: 20,
      height:20,
      borderRadius: 10,
    }
  })