import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { Comportamiento, Huella, Sentimiento } from '../components/DetailPetScreen/Icons'



const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const DetailPetScreen = () => {

  const { selectedPet } = useSelector( state => state.pets );
  const Caracteristica = (props)=> (
    <View style={styles.caracteristica}>
      <Text style={{lineHeight:18}}>{props.titulo}</Text>
      <Text style={{color:"black", lineHeight:18}}>{props.desc}</Text>
    </View>
  )
  const BuildComport = ()=> {
    return selectedPet["caracteristicas"].map((e,i)=>(
      <View key={i+"v"} style={styles.comportamiento}>
        <Text style={{lineHeight:18}}>{e}</Text>
      </View>))
  }


  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.title}>
            <Text style={{fontWeight:"bold", fontSize:22,color:"black"}}>{selectedPet.nombre}</Text>
            <Text>{selectedPet.raza}</Text>
          </View>
        </View>

        <ScrollView>
        <View style={styles.description}>
          
          <View style={{flexDirection:"row",alignItems:"center", width:"100%",marginBottom:10}}>
            <Huella/>
            <Text style={{fontWeight:"bold",color:"black", marginLeft:4}}> Acerca de {selectedPet.nombre}</Text>
          </View>

          <View style={{flexDirection:"row", alignItems:"center", width:"100%", justifyContent:"space-between",marginBottom:10}}>
            <Caracteristica titulo="Peso" desc="5.5kg"/>
            <Caracteristica titulo="Altura" desc="42 cm"/>
            <Caracteristica titulo="Color" desc="Marron"/>
          </View>

          <Text style={{marginBottom:10,width:"100%"}}>Loreasdas fasd asfosakias dasjdasl kfasha sjdhask ljhdkas jfhjaskjf as fafas fsa scrollBehavior: </Text>

          <View style={{flexDirection:"row",alignItems:"center", width:"100%",marginBottom:10}}>
            <Comportamiento/>
            <Text style={{fontWeight:"bold",color:"black", marginLeft:4}}> Comportamiento de {selectedPet.nombre}</Text>
          </View>

          <View style={{flexDirection:"row", alignItems:"center", width:"100%", justifyContent:"space-around",flexWrap:"wrap"}}>
            <BuildComport/>
          </View>
        </View>
        </ScrollView>
       
    </View>
  )
}
//  <Text>{ JSON.stringify(selectedPet,null,4) }</Text>
//<Text>{selectedPet.descripcion}</Text>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: "column",
    
  },
  imageContainer:{
    width: windowWidth,
    height: 300,
    backgroundColor: "yellow",
    marginBottom:40
  },
  title:{
    height:70,
    width: windowWidth*0.8,
    backgroundColor: '#B4B4B466',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    bottom:-35,
    marginHorizontal: "auto" ,
    alignSelf: 'center',
  },
  description:{
    width: windowWidth,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: windowWidth*0.1,
  },
  caracteristica:{
    width:80,
    height:70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#B5ECF3",
    borderRadius: 6,

  },
  comportamiento:{
    width:80,
    height:40,
    alignItems: "center",
    justifyContent: "center",
    borderColor:"#2782CA",
    borderWidth:1,
    borderRadius: 21,
    marginBottom: 5,

  }
})
