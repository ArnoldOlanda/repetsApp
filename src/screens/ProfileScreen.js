import React, { useState } from 'react'
import {
  Dimensions, Image, ScrollView,
  StyleSheet, Text, TouchableOpacity, View, Button, ActivityIndicator
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { logout, startUpdateProfilePicture } from '../store/slices/auth';
import { Arrow, Edit, EditPhoto, History, Hosp, Language, Learn, Notification, Pay, Pet } from '../components/ProfileScreen/Icons';


import profileDefault from '../assets/profile_default.jpg';
import { clearMessages } from '../store/slices/messages/messagesSlice';
import { UploadImageModal } from '../components/UploadImageModal';
import { resetStorePethouses } from '../store/slices/pethouses/pethousesSlice';


const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const ProfileScreen = ({ navigation }) => {

  const { image, user, apellido, phone, email, isLoading, loginWithGoogle } = useSelector(state => state.auth);
  const dispatch = useDispatch()

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = (visible) => setModalVisible(visible);
  const onPressUpdateUserImage = (image) => {
    dispatch( startUpdateProfilePicture(image) )
  }


  const Rectangle = () => {
    return <View style={[styles.rectangle, styles.shadowProp]} />;
  };

  return (
    <View style={styles.container}>
      <Rectangle />

      <View style={styles.header}>
        <View style={styles.photoContainer}>
          { //TODO: Arreglar esta vaina se ve feo xd
            (image)
              ? (isLoading)
                  ? (
                    <View style={{
                      ...styles.photo,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    >
                      <ActivityIndicator size='small' color='#fff' />
                    </View>
                  )
                  : <Image source={{ uri: image }} style={styles.photo} />
              : ( <Image source={ profileDefault } style={styles.photo} /> )
          }
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.5}
          >
            <EditPhoto style={{ position: "absolute", right: 5, bottom: 5 }} />
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 22, color: "black", fontWeight: "bold" }}>{user} {apellido}</Text>
        <Text>{email} {!loginWithGoogle ? `| ${phone}` : ''}</Text>
      </View>

      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View style={styles.boxChatListContainer}>
          <Text style={styles.title}>Mis Mascotas</Text>
          <TouchableOpacity
            style={styles.subtitle}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('MyPets')}
          >
            <View style={{ flexDirection: "row" }}>
              <Pet />
              <Text style={{ marginLeft: 5 }}>Ver mis mascotas</Text>
            </View>
            <Arrow />
          </TouchableOpacity>
          <View style={styles.subtitle}>
            <View style={{ flexDirection: "row" }}>
              <History />
              <Text style={{ marginLeft: 5 }}>Historial de Alojamientos</Text>
            </View>
            <Arrow />
          </View>
        </View>

        <View style={styles.boxChatListContainer}>
          <Text style={styles.title}>Configuracion de la cuenta</Text>
          {
            !loginWithGoogle
            && (
              <View style={styles.subtitle}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => navigation.navigate('UpdateUserInfo')}
                >
                  <Edit />
                  <Text style={{ marginLeft: 5 }}>Editar informacion del personal</Text>
                </TouchableOpacity>
                <Arrow />
              </View>
            )}
          <View style={styles.subtitle}>
            <View style={{ flexDirection: "row" }}>
              <Notification />
              <Text style={{ marginLeft: 5 }}>Notificaciones</Text>
            </View>
            <Text style={{ color: "#2782CA" }}>ON</Text>
          </View>
          <View style={styles.subtitle}>
            <View style={{ flexDirection: "row" }}>
              <Language />
              <Text style={{ marginLeft: 5 }}>Lenguaje</Text>
            </View>
            <Text style={{ color: "#2782CA" }}>Español</Text>
          </View>
          <View style={styles.subtitle}>
            <View style={{ flexDirection: "row" }}>
              <Pay />
              <Text style={{ marginLeft: 5 }}>Pagos y abonos</Text>
            </View>
            <Arrow />
          </View>
        </View>

        <View style={styles.boxChatListContainer}>
          <Text style={styles.title}>Hosting</Text>
          <View style={styles.subtitle}>
            <TouchableOpacity 
            style={{ flexDirection: "row" }}
            onPress={ ()=> navigation.navigate('RegisterPethouse') }
            >
              <Hosp />
              <Text style={{ marginLeft: 5 }}>Hospedar</Text>
            </TouchableOpacity>
            <Arrow />
          </View>

          <View style={styles.subtitle}>
            <View style={{ flexDirection: "row" }}>
              <Learn />
              <Text style={{ marginLeft: 5 }}>Aprenda acerca de hosting</Text>
            </View>
            <Arrow />
          </View>
        </View>

        <View style={styles.boxChatListContainer}>
          <TouchableOpacity onPress={ async () => {
            try {
              await GoogleSignin.signOut();
              dispatch( logout({ error: '' }) )
              dispatch( clearMessages() )
              dispatch( resetStorePethouses() )
            } catch (error) {
              console.error(error);
            }
          }}>
            <View style={{ flexDirection: "row" }}>
              <Learn />
              <Text style={{ marginLeft: 5 }}>Cerrar Sesion</Text>
            </View>
          </TouchableOpacity>

        </View>


      </ScrollView>

      <UploadImageModal 
      currentImage={image}
      title="Actualizar foto de perfil" 
      isModalVisible={isModalVisible}
      onChangeVisible={toggleModal}
      onPressUpdate={onPressUpdateUserImage}
      imageStyles={{ borderRadius:120 }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 39,
  },
  title: {
    fontWeight: 'bold',
    color: "black",
    fontFamily: 'Alata',
    fontSize: 16
  },
  subtitle: {
    width: "100%",
    paddingHorizontal: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 3,
  },
  shadowProp: {
    // shadowColor: '#2782CA',
    shadowColor: '#000',
    elevation: 20,
  },
  boxChatListContainer: {
    paddingVertical: 11,
    paddingHorizontal: 17,
    marginTop: 16,
    width: windowWidth * 0.90,
    borderRadius: 8,
    boxSizing: "border-box",
    borderWidth: 1,
    borderColor: "#2782CA",
    maxHeight: windowHeight * 0.35,

  },
  rectangle: {
    width: windowWidth + 150,
    height: 200,
    backgroundColor: "#EBF0F0",
    position: "absolute",
    borderBottomLeftRadius: 360,
    borderBottomRightRadius: 360,
    top: -100

  },
  header: {
    width: windowWidth,
    alignItems: "center",
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "black",
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 100
  },
})
