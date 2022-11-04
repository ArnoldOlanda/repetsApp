import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { Button } from '../components/Button'

import {Title} from '../components/Title'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export const ReservationScreen = () => {

  const { selectedPethouse } = useSelector(state => state.pethouses)

  return (
    <View style={styles.container}>
      <Title text='Reservar Hospedaje'/>
      <View style={styles.pethouseInfoContainer}>
        <Image 
        source={{ uri: selectedPethouse.galeria[0] }} 
        style={styles.image}
        />
        <View>
          <Text style={styles.pethouseNameText} >{ selectedPethouse.nombre }</Text>
          <View style={styles.calificationLocationContainer}>
            <Text style={{ marginRight:20, color:'black' }}><Icon name='star' /> 4.9</Text>
            <Text style={ styles.locationText }>{`${ selectedPethouse.distrito }, ${ selectedPethouse.provincia }`}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleText}>Fechas</Text>
          <Text>Nov 8 - 15 </Text>
        </View>
        <Icon name='chevron-forward' size={25} color='black' />
      </View>

      <View style={styles.sectionContainer}>
        <View style={{flex:1}}>
          <Text style={styles.titleText}>Detalles del Precio</Text>
          <View style={{ flexDirection:'row' }}>
            <Text style={{ flex: 1 }}>Total(Soles)</Text>
            <Text>S/.{selectedPethouse.tarifa_dia}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.titleText}>Escoje el metodo de pago</Text>
          <Text>Pagar en el hospedaje</Text>
          <Text>Pagar con Tarjeta</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.titleText}>Paga con</Text>
          <Text>Metodo de pago</Text>
        </View>
      </View>
      <Button text='Reservar' stylesProps={{marginTop: 20}} />
      {/* <Text>{JSON.stringify( selectedPethouse, null, 4 )}</Text> */}
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