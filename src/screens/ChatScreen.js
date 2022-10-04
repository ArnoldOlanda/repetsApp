import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ArrowBack, Audio, Call, Camera, Configuration, Video } from '../components/ChatScreen/Icons'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const ChatScreen = ({ navigation }) => {

  const Message = ()=>{
    return (
      <View style={styles.message}>
        <Text style={{}}>asdasdasdasfa</Text>
      </View>
        
    )
  }
  const BuildMessages = () => {
    let lista = [1,2,3,5,7,8,9,78,8,4,15,5,71]
    return lista.map((e,i)=>(<View key= {i+"v"} style={{padding:5}}><Message key= {i}/></View>))
  }

  return (
    <View style={styles.container}>
       <View style={styles.headerChat}>
        <TouchableOpacity onPress={()=>{navigation.navigate('Message')}}>
          <ArrowBack/>
        </TouchableOpacity>
        <View style={{flex:1,flexDirection:"row", alignItems:"center", paddingHorizontal:10}}>
          <View style ={{height:38, width: 38, backgroundColor:"black", borderRadius:50, marginRight:5}}></View>
          <View>
            <Text style={{fontWeight:"bold", color:"black"}}>Nombre</Text>
            <Text>Etiqueta</Text>
          </View>
        </View>

        <View style={{height:"100%", flex:0.4,flexDirection:"row", alignItems:"center", justifyContent: "space-between",}}>
          <Video/>
          <Call/>
          <Configuration/>
        </View>

       </View>

      <ScrollView style={styles.bodyChat}>
        <BuildMessages></BuildMessages>
      </ScrollView>

      <View style={styles.footerChat}>
        <TextInput placeholder='Escribe un mensaje aqui' />
        <View style={{ width:50, flexDirection:"row", alignItems:"center", justifyContent: "space-between",}}>
          <Camera/>
          <Audio/>
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
  headerChat:{
    height:60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems:"center",
    borderBottomWidth: 1,
    borderBottomColor: "#B7B7B76B"
  },
  bodyChat:{
    flex: 1,
    height: 40,
    width: "100%",
    padding: 10,
    
  },
  footerChat:{
    flex: 0,
    height: 50,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#00000073",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    marginTop: 10
  },
  message: {
    minHeight: 40,
    alignSelf: 'flex-start', 
    maxWidth: "90%",
    justifyContent: "center",
    backgroundColor:"#F8CF5087",
    borderRadius:5,
    padding: 10,
  }
})