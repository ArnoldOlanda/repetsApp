import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';

import profileDefault from '../assets/profile_default.jpg'

import { Chat } from '../components/ChatScreen/Chat';
import { SubTitle1 } from '../components/ChatScreen/SubTitle1';
import { SubTitle2 } from '../components/ChatScreen/SubTitle2';
import { Title } from '../components/ChatScreen/Title';
import { Avatar } from '../components/Avatar';

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const MessagesScreen = () => {

  const { image } = useSelector( state => state.auth )

  const BuildChat1 = ()=>{
    let lista = [1,2,3,5,7]
    return lista.map((e,i)=>(
      <View key= {i} style={{width: "100%"}}>
        <Chat key= {i.toString+"c"}/>
        {
          i<lista.length?<View key= {i.toString+"l"} style={{width: "100%",borderBottomColor: 'rgba(180, 171, 171, 0.66)',borderBottomWidth: 1,}}/>:<></>
        }
      </View>))
  }

  const BuildChat2 = ()=>{
    let lista = [1,2,3,5]
    return lista.map((e,i)=>(
      <View key= {i} style={{width: "100%"}}>
        <Chat key= {i.toString+"c"}/>
        {
          i<lista.length?<View key= {i.toString+"l"} style={{width: "100%",borderBottomColor: 'rgba(180, 171, 171, 0.66)',borderBottomWidth: 1,}}/>:<></>
        }
      </View>))
  }
  return (
    <View style={styles.container}>
       <View style={styles.titleContainer}>
        <Title/> 
        {
          (image)
          ? <Image source={{ uri:image }} style={{ width:42, height:42, borderRadius: 50 }} />
          : <Image source={ profileDefault } style={{ width:42, height:42, borderRadius: 50 }} />
        }
       </View>

       <View style={styles.boxChatListContainer}>
        <SubTitle1 style={{marginBottom: 5}}/>
        <ScrollView 
          
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <BuildChat1></BuildChat1>
        </ScrollView>
       </View>

       <View style={styles.boxChatListContainer}>
        <SubTitle2 style={{marginBottom: 5}} ></SubTitle2>
        <ScrollView 
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <BuildChat2></BuildChat2>
        </ScrollView>
       </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 39,
  },
  titleContainer:{
    width: windowWidth*0.9,
    paddingHorizontal:0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },  
  boxChatListContainer: {
    paddingVertical:11,
    paddingHorizontal:17,
    marginTop: 16,
    width: windowWidth*0.90,
    borderRadius: 25, 
    boxSizing: "border-box",
    borderWidth: 1,
    borderColor: "#2782CA",
    maxHeight: windowHeight*0.35,
    
  },


})