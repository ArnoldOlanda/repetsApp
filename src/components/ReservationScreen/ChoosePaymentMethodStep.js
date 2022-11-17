import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const windowWidth = Dimensions.get('window').width

export const ChoosePaymentMethodStep = () => {
  return (
    <View>
        <Text>ChoosePaymentMethodStep</Text>
        <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.titleText}>Escoje el metodo de pago</Text>
          <Text>Pagar en el hospedaje</Text>
          <Text>Pagar con Tarjeta</Text>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      paddingHorizontal: 16,
      marginTop:20
    },
    pethouseInfoContainer:{
      flexDirection:'row',
      justifyContent:'center',
      marginTop:10,
      marginBottom:15
    },
    image:{
      height:60,
      width:85,
      borderRadius: 6,
      marginRight:20
    },
    calificationLocationContainer:{
      width: windowWidth * 0.6,
      height:40,
      flexDirection:'row',
      alignItems:'center'
    },
    pethouseNameText:{
      fontSize:16,
      fontWeight:'500',
      color:'black'
    },
    locationText:{
      fontSize:15,
      fontWeight:'300',
      color:'black'
    },
    sectionContainer:{
      borderWidth:1,
      borderColor:'#2782CA',
      borderRadius:5,
      flexDirection:'row',
      alignItems:'center',
      padding:10,
      marginVertical:8,
      elevation: 3,
      backgroundColor:'white'
    },
    titleText:{
      fontSize:20,
      color:'black',
      fontWeight:'500'
    }
  })