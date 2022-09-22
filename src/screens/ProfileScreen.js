import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Arrow, Edit, EditPhoto, History, Hosp, Language, Learn, Notification, Pay, Pet } from '../components/ProfileScreen/Icons';
import { Rectangule } from '../components/ProfileScreen/Rectangule';

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height



export const ProfileScreen = () => {
  const Rectangle = () => {
    return <View style={styles.rectangle} />;
  };
  
  return (
    <View style={styles.container}>
      <Rectangle/>

      <View style={styles.header}>
        <View style={styles.photo}>
          <EditPhoto style={{position:"absolute", right: 5, bottom: 5}}></EditPhoto>
        </View>

        <Text style={{fontSize:22, color:"black", fontWeight:"bold"}}>Nombre</Text>
        <Text>correo | numero</Text>
      </View>
      
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
       <View style={styles.boxChatListContainer}>
        <Text style={styles.title}>Mis Mascotas</Text>
        <View style={styles.subtitle}>
          <View style={{flexDirection: "row"}}>
            <Pet/>
            <Text style={{marginLeft:5}}>Ver mis mascotas</Text>
          </View>
          <Arrow/>
        </View>
        <View style={styles.subtitle}>
          <View style={{flexDirection: "row"}}>
            <History/>
            <Text style={{marginLeft:5}}>Historial de Alojamientos</Text>
          </View>
          <Arrow/>
        </View>
       </View>

       <View style={styles.boxChatListContainer}>
        <Text style={styles.title}>Configuracion de la cuenta</Text>
        <View style={styles.subtitle}>
          <View style={{flexDirection: "row"}}>
            <Edit/>
            <Text style={{marginLeft:5}}>Editar informacion del personal</Text>
          </View>
          <Arrow/>
        </View>
        <View style={styles.subtitle}>
          <View style={{flexDirection: "row"}}>
            <Notification/>
            <Text style={{marginLeft:5}}>Notificaciones</Text>
          </View>
          <Text style={{color:"#2782CA"}}>ON</Text>
        </View>
        <View style={styles.subtitle}>
          <View style={{flexDirection: "row"}}>
            <Language/>
            <Text style={{marginLeft:5}}>Lenguaje</Text>
          </View>
          <Text style={{color:"#2782CA"}}>Español</Text>
        </View>
        <View style={styles.subtitle}>
          <View style={{flexDirection: "row"}}>
            <Pay/>
            <Text style={{marginLeft:5}}>Pagos y abonos</Text>
          </View>
          <Arrow/>
        </View>
       </View>

       <View style={styles.boxChatListContainer}>
        <Text style={styles.title}>Hosting</Text>
        <View style={styles.subtitle}>
          <View style={{flexDirection: "row"}}>
            <Hosp/>
            <Text style={{marginLeft:5}}>Hospedar</Text>
          </View>
          <Arrow/>
        </View>

        <View style={styles.subtitle}>
          <View style={{flexDirection: "row"}}>
            <Learn/>
            <Text style={{marginLeft:5}}>Aprenda acerca de hosting</Text>
          </View>
          <Arrow/>
        </View>
       </View>
      </ScrollView>

      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 39,
  },
  title:{
    fontWeight: 'bold',
    color: "black",
    fontFamily: 'Alata',
    fontSize: 16
  },
  subtitle:{
    width: "100%",
    paddingHorizontal:0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 3,
  },  
  boxChatListContainer: {
    paddingVertical:11,
    paddingHorizontal:17,
    marginTop: 16,
    width: windowWidth*0.90,
    borderRadius: 8, 
    boxSizing: "border-box",
    borderWidth: 1,
    borderColor: "#2782CA",
    maxHeight: windowHeight*0.35,
    
  },
  rectangle: {
    width: windowWidth,
    height: 100,
    backgroundColor: "#EBF0F0",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: "absolute",
    
  },
  header:{
    width: windowWidth,
    alignItems:"center",
  },
  photo:{
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "black",
  }
})
