import React, { useState } from 'react'
import {
  Dimensions, Image, ScrollView,
  StyleSheet, Text, TouchableOpacity, View, Button, ActivityIndicator
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-native-modal";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { Arrow, Edit, EditPhoto, History, Hosp, Language, Learn, Notification, Pay, Pet } from '../components/ProfileScreen/Icons';
import { Rectangule } from '../components/ProfileScreen/Rectangule';
import { startUpdateProfilePicture } from '../store/slices/auth';

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const ProfileScreen = ({ navigation }) => {

  const { image, user, email,isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch()

  const [isModalVisible, setModalVisible] = useState(false);
  const [preloadImage, setPreloadImage] = useState({
    uri:image,
    type:'',
    name:''
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressOpenMediaLibrary = async () => {
    try {
      const {assets} = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 })
      const [image] = assets
      setPreloadImage({
        uri: image.uri,
        name: image.fileName,
        type: image.type
      })
    } catch (error) {
      console.log(error);
    }
  }

  const onPressOpenCamera = async () => {
    try {
      const { assets } = await launchCamera({ saveToPhotos:true })
      const [photo] = assets
      setPreloadImage({
        uri: photo.uri,
        name: photo.fileName,
        type: photo.type
      })

      console.log(photo);
    } catch (error) {
      console.log(error);
    }
  }

  const Rectangle = () => {
    return <View style={[styles.rectangle, styles.shadowProp]} />;
  };

  return (
    <View style={styles.container}>
      <Rectangle />

      <View style={styles.header}>
        <View style={styles.photoContainer}>
          {
            (isLoading) 
            ? (
              <View style={{ 
                ...styles.photo, 
                justifyContent:'center', 
                alignItems:'center' }} 
              >
                <ActivityIndicator size='small' color='#fff' />
              </View>
            )
            : <Image source={{ uri: image }} style={styles.photo} />
          }
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.5}
          >
            <EditPhoto style={{ position: "absolute", right: 5, bottom: 5 }} />
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 22, color: "black", fontWeight: "bold" }}>{ user }</Text>
        <Text>{ email } | numero</Text>
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
          <View style={styles.subtitle}>
            <View style={{ flexDirection: "row" }}>
              <Edit />
              <Text style={{ marginLeft: 5 }}>Editar informacion del personal</Text>
            </View>
            <Arrow />
          </View>
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
            <View style={{ flexDirection: "row" }}>
              <Hosp />
              <Text style={{ marginLeft: 5 }}>Hospedar</Text>
            </View>
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
        <TouchableOpacity onPress={async () => {
                try {
                    await GoogleSignin.signOut();
                    dispatch( logout({error:''}) )
                    //sthis.setState({ user: null }); // Remember to remove the user from your app's state as well
                } catch (error) {
                    console.error(error);
                }
        }}>
          <View style={{flexDirection: "row"}}>
            <Learn/>
            <Text style={{marginLeft:5}}>Cerrar Sesion</Text>
          </View>
        </TouchableOpacity>
        
       </View>
       

      </ScrollView>

      <Modal 
      isVisible={isModalVisible}
      onBackButtonPress={()=>setModalVisible(false)}
      animationIn='fadeIn'
      animationOut='fadeOut'
      >
        <View style={styles.modalContainer}>
          <Text>Actualizar foto de perfil</Text>
          <View>
            <Button title="Choose a picture" onPress={onPressOpenMediaLibrary} />
            <Button title="Take a photo" onPress={onPressOpenCamera} />
          </View>
          <Image source={{ uri: preloadImage.uri }} resizeMode='cover' style={styles.preloadImageStyle} />
          <Button title='Actualizar foto' onPress={()=>{
            dispatch( startUpdateProfilePicture( preloadImage ) )
            setModalVisible(false)
          }} />
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
    shadowColor:'#000',
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
    borderBottomLeftRadius:360,
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
  photo:{ 
    width: 120, 
    height: 120, 
    borderRadius: 100 
  },
  modalContainer: {
    alignItems:'center',
    height: windowHeight * 0.6,
    backgroundColor: 'white',
    padding: 10,
    margin: 0
  },
  preloadImageStyle:{ 
    width: 232, 
    height: 232, 
    borderRadius: 150,
    marginVertical:10 
  }
})
