import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Ionicons'

import placeholderImage from '../../assets/placeholder_image.png'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export const GalleryImages = ({ onChange, onDelete, galleryImages }) => {
    
    const [modalVisible, setModalVisible] = useState(false)

    const [preloadCurrentImage, setPreloadCurrentImage] = useState('')

    const onPressOpenMediaLibrary = async () => {
        try {
            const { assets } = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 })
            const [image] = assets

            onChange({ uri: image.uri, name: image.fileName, type: image.type })
            setPreloadCurrentImage(image.uri)

        } catch (error) {
            console.log(error);
        }
    }

    const onPressOpenCamera = async () => {
        try {
            const { assets } = await launchCamera({ saveToPhotos: true })
            const [photo] = assets

            onChange({ uri: photo.uri, name: photo.fileName, type: photo.type })
            setPreloadCurrentImage(photo.uri)

            console.log(photo);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <View style={styles.galleryContainer}>
            {
                galleryImages.map((e) => (
                    <View key={ e.name }>
                        <Image source={{ uri: e.uri }} style={ styles.galleryItem } />
                        <TouchableOpacity 
                        onPress={() => onDelete(e)}
                        style={ styles.buttonRemoveItem }>
                            <Icon name='close-outline' size={ 15 } color='black' />
                        </TouchableOpacity>
                    </View>
                ))
            }

            {
                galleryImages.length <= 2
                && (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => setModalVisible(true)}
                        style={{
                            ...styles.galleryItem,
                            backgroundColor: '#DFDFDF',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Icon name='add-outline' size={50} color='#2782CA' />
                    </TouchableOpacity>
                )
            }

            <Modal
                isVisible={modalVisible}
                onBackButtonPress={() => setModalVisible(false)}
                animationIn='fadeIn'
                animationOut='fadeOut'
            >
                <View style={styles.modalContainer}>
                    <Text>Agrega imagen a la galeria</Text>
                    <View>
                        <Button title="Escoger una imagen" onPress={onPressOpenMediaLibrary} />
                        <Button title="Tomar una foto" onPress={onPressOpenCamera} />
                    </View>
                    {
                        ( preloadCurrentImage !== '' )
                            ? <Image source={{ uri: preloadCurrentImage }} resizeMode='cover' style={styles.preloadImageStyle} />
                            : <Image source={placeholderImage} style={styles.preloadImageStyle} />
                    }
                    <Button title='Hecho' onPress={() => {
                        setModalVisible(false)
                        setPreloadCurrentImage('')
                    }} />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    galleryContainer: {
        backgroundColor: '#ECF2F0',
        borderRadius: 5,
        marginBottom: 8,
        marginTop: 5,
        height: 108,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    galleryItem: {
        width: 72,
        height: 72,
        marginHorizontal: windowWidth * 0.04,
        borderRadius: 6
    },
    preloadImageStyle: {
        width: 232,
        height: 232,
        borderRadius: 8,
        marginVertical: 10
    },
    modalContainer: {
        alignItems: 'center',
        height: windowHeight * 0.6,
        backgroundColor: 'white',
        padding: 10,
        margin: 0
    },
    buttonRemoveItem: {
        width:20,
        height:20,
        backgroundColor:'white',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        right:10,
        top:-10 
    }
})