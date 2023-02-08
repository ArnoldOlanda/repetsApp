import React, { useState } from 'react'
import {
  Dimensions, Image, ScrollView,
  StyleSheet, Text, TouchableOpacity, View,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Modal from "react-native-modal";

import { logout, startUpdateProfilePicture } from '../store/slices/auth';
import { Arrow, Edit, EditPhoto, History, Hosp, Language, Learn, Notification, Pay, Pet } from '../components/ProfileScreen/Icons';
import profileDefault from '../assets/profile_default.jpg';
import { clearMessages } from '../store/slices/messages/messagesSlice';
import { UploadImageModal } from '../components/UploadImageModal';
import { resetStorePethouses } from '../store/slices/pethouses/pethousesSlice';
import { CustomSwitch } from '../components/ProfileScreen/CustomSwitch';
import { useEffect } from 'react';
import { setDarkTheme, setLightTheme } from '../store/slices/theme/themeSlice';


const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const ProfileScreen = ({ navigation }) => {

  const { image, user, apellido, phone, email, isLoading, loginWithGoogle } = useSelector(state => state.auth);
  const { currentTheme, colors, dark } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalThemeVisible, setModalThemeVisible] = useState(false);
  const [themeSwitchOn, setThemeSwitchOn] = useState(dark);

  const toggleModal = (visible) => setModalVisible(visible);
  const onPressUpdateUserImage = (image) => {
    dispatch(startUpdateProfilePicture(image))
  }


  const Rectangle = () => {
    return <View style={[{...styles.rectangle, backgroundColor:colors.card2}, styles.shadowProp]} />;
  };

  const onPressLogout = async () => {
    try {

      await GoogleSignin.signOut();
      dispatch(logout({ error: '' }))
      dispatch(clearMessages())
      //dispatch( resetStorePethouses() )
      

    } catch (error) {
      console.error(error);
    }
  }

  const onChangeThemeSwitch = (value) => {
    setThemeSwitchOn(value)
    console.log(value);
    if(value){
      dispatch( setDarkTheme() )
    } else {
      dispatch( setLightTheme() )
    }
  }

  useEffect(() => {

    if (currentTheme === 'light') {
      setThemeSwitchOn(false)
    } else {
      setThemeSwitchOn(true)
    }

  }, [])


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
              : (<Image source={profileDefault} style={styles.photo} />)
          }
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.5}
          >
            <EditPhoto style={{ position: "absolute", right: 5, bottom: 5 }} />
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 22, color: colors.text, fontWeight: "bold" }}>{user} {apellido}</Text>
        <Text style={{ color:colors.text2 }}>{email} {!loginWithGoogle ? `| ${phone}` : ''}</Text>
      </View>

      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View style={styles.boxChatListContainer}>
          <Text style={{...styles.title, color:colors.text}}>Mis Mascotas</Text>
          <TouchableOpacity
            style={styles.subtitle}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('MyPets')}
          >
            <View style={{ flexDirection: "row" }}>
              <Pet />
              <Text style={{ marginLeft: 5, color:colors.text2 }}>Ver mis mascotas</Text>
            </View>
            <Arrow />
          </TouchableOpacity>
          <View style={styles.subtitle}>
            <View style={{ flexDirection: "row" }}>
              <History />
              <Text style={{ marginLeft: 5, color:colors.text2 }}>Historial de Alojamientos</Text>
            </View>
            <Arrow />
          </View>
        </View>

        <View style={styles.boxChatListContainer}>
          <Text style={{...styles.title, color:colors.text2 }}>Configuracion de la cuenta</Text>
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
              <Text style={{ marginLeft: 5, color:colors.text2 }}>Notificaciones</Text>
            </View>
            <Text style={{ color: "#2782CA" }}>ON</Text>
          </View>

          <TouchableOpacity
            style={styles.subtitle}
            activeOpacity={0.5}
            onPress={() => setModalThemeVisible(true)}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon name='color-palette-outline' size={18} color='#6B6A6F' />
              <Text style={{ marginLeft: 5, color:colors.text2 }}>Tema</Text>
            </View>
            <Text>
              <Icon name={currentTheme === 'light' ? 'sunny' : 'moon'} size={20} color={colors.blue} />
            </Text>
          </TouchableOpacity>

          <View style={styles.subtitle}>
            <View style={{ flexDirection: "row" }}>
              <Language />
              <Text style={{ marginLeft: 5, color:colors.text2 }}>Lenguaje</Text>
            </View>
            <Text style={{ color: "#2782CA" }}>Español</Text>
          </View>
          <View style={styles.subtitle}>
            <View style={{ flexDirection: "row" }}>
              <Pay />
              <Text style={{ marginLeft: 5, color:colors.text2 }}>Pagos y abonos</Text>
            </View>
            <Arrow />
          </View>
        </View>

        <View style={styles.boxChatListContainer}>
          <Text style={{...styles.title, color:colors.text2}}>Hosting</Text>
          <View style={styles.subtitle}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => navigation.navigate('RegisterPethouse')}
            >
              <Hosp />
              <Text style={{ marginLeft: 5, color:colors.text2 }}>Hospedar</Text>
            </TouchableOpacity>
            <Arrow />
          </View>

          <View style={styles.subtitle}>
            <View style={{ flexDirection: "row" }}>
              <Learn />
              <Text style={{ marginLeft: 5, color:colors.text2 }}>Aprenda acerca de hosting</Text>
            </View>
            <Arrow />
          </View>
        </View>

        <View style={styles.boxChatListContainer}>
          <TouchableOpacity onPress={onPressLogout}>
            <View style={{ flexDirection: "row" }}>
              <Icon name='log-out-outline' size={18} color='#6B6A6Fd' />
              <Text style={{ marginLeft: 5, color:colors.text2 }}>Cerrar Sesion</Text>
            </View>
          </TouchableOpacity>

        </View>


      </ScrollView>

      <UploadImageModal
        currentImage={image}
        title="Foto de perfil"
        actionText="Actualizar foto de perfil"
        isModalVisible={isModalVisible}
        onChangeVisible={toggleModal}
        placeholderImage={profileDefault}
        onPressUpdate={onPressUpdateUserImage}
        imageStyles={{ borderRadius: 120 }}
      />

      <Modal
        isVisible={isModalThemeVisible}
        onBackButtonPress={() => setModalThemeVisible(false)}
        onBackdropPress={() => setModalThemeVisible(false)}
      >
        <View style={{ ...styles.modalContainer, backgroundColor: colors.background }}>
          <Text style={{ color:colors.text }}>Tema</Text>
          <View style={{height:'80%', flexDirection:'row', alignItems:'center', width:'50%', justifyContent:'space-around' }}>
            <Icon name='sunny' size={35} color={currentTheme==='light' ? colors.blue : colors.gray} />
            <CustomSwitch
              isOn={themeSwitchOn}
              onChange={onChangeThemeSwitch}
              color={colors.blue}
            />
            <Icon name='moon' size={30} color={currentTheme==='light' ? colors.gray : colors.blue} />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    alignItems: 'center',
    height: '15%',
    borderRadius: 10,
    padding: 10
  }
})
