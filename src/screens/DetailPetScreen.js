import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { ComportamientoIcon, Huella, Sentimiento } from '../components/DetailPetScreen/Icons'
import Icon from 'react-native-vector-icons/Ionicons'

import { UploadImageModal } from '../components/UploadImageModal'

import placeholder from '../assets/pet_placeholder.png'
import { startUpdatePetImage } from '../store/slices/pets/thunks'


const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const DetailPetScreen = ({ navigation }) => {

  const { selectedPet, isLoading } = useSelector(state => state.pets);
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = (visible) => setIsModalVisible(visible);
  const onPressUpdatePetImage = (image) => {
    dispatch( startUpdatePetImage(image) )
  }

  const CaracteristicaItem = ({ titulo, desc }) => (
    <View style={styles.caracteristicaItem}>
      <Text style={{ lineHeight: 18 }}>{titulo}</Text>
      <Text style={{ color: "black", lineHeight: 18 }}>{desc}</Text>
    </View>
  )

  const Comportamiento = () => {
    return selectedPet["caracteristicas"].map((e, i) => (
      <View key={i + "v"} style={styles.comportamientoItem}>
        <Text style={{ lineHeight: 18 }}>{e}</Text>
      </View>))
  }

  console.log(selectedPet);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        
          { //TODO: Arreglar esta vaina se ve feo xd
            (selectedPet.img)
              ? (isLoading)
                  ? (
                    <View style={{
                      ...styles.imageContainer,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    >
                      <ActivityIndicator size='small' color='#000' />
                    </View>
                  )
                  : <Image source={{ uri: selectedPet.img }} style={styles.imageContainer} />
              : ( <Image source={placeholder} style={styles.imageContainer} /> )
          }
        <View style={styles.title}>
          <Text style={{ fontWeight: "bold", fontSize: 22, color: "black" }}>{selectedPet.nombre}</Text>
          <Text>{selectedPet.raza}</Text>
        </View>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity
          onPress={()=> navigation.pop()}
          >
            <Icon name='arrow-back' size={30} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.editBtn}
            onPress={()=> setIsModalVisible(true)}
          >
            <Icon name='pencil' size={20} color='black' />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View style={styles.description}>

          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", marginBottom: 10 }}>
            <Huella />
            <Text style={styles.subtitle}> Acerca de {selectedPet.nombre}</Text>
          </View>

          <View style={styles.caracteristicasContainer}>
            <CaracteristicaItem titulo="Peso" desc="5.5kg" />
            <CaracteristicaItem titulo="Altura" desc="42 cm" />
            <CaracteristicaItem titulo="Color" desc="Marron" />
          </View>

          <Text style={{ marginBottom: 10, width: "100%" }}>
            Loreasdas fasd asfosakias dasjdasl kfasha sjdhask ljhdkas jfhjaskjf as fafas fsa scrollBehavior:
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", marginBottom: 10 }}>
            <ComportamientoIcon />
            <Text style={styles.subtitle}> Comportamiento de {selectedPet.nombre}</Text>
          </View>

          <View style={styles.comportamientoContainer}>
            <Comportamiento />
          </View>
        </View>
      </ScrollView>

      <UploadImageModal
      title='Actualizar imagen de mascota'
      currentImage={ selectedPet.img }
      isModalVisible={ isModalVisible }
      onChangeVisible={ toggleModal }
      onPressUpdate={ onPressUpdatePetImage }
      imageStyles={{ width: 280, height: 220, borderRadius: 5 }}
      placeholderImage={placeholder}
      />
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
  imageContainer: {
    width: windowWidth,
    height: 300,
    marginBottom: 40
  },
  editBtn: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topButtonsContainer: {
    position: 'absolute',
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 20,
    paddingHorizontal: 20
  },
  title: {
    height: 70,
    width: windowWidth * 0.8,
    backgroundColor: '#B4B4B466',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: -35,
    marginHorizontal: "auto",
    alignSelf: 'center',
  },
  subtitle: {
    fontWeight: "bold",
    color: "black",
    marginLeft: 4
  },
  description: {
    width: windowWidth,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: windowWidth * 0.1,
  },
  caracteristicasContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 10
  },
  caracteristicaItem: {
    width: 80,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B5ECF3",
    borderRadius: 6,

  },
  comportamientoContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  comportamientoItem: {
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2782CA",
    borderWidth: 1,
    borderRadius: 21,
    marginBottom: 5,

  }
})
