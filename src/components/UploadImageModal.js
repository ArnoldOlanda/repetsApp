import React, { useState } from 'react'
import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height


export const UploadImageModal = ({ currentImage, placeholderImage, title, isModalVisible, onChangeVisible, onPressUpdate, imageStyles = {} }) => {

    const [preloadImage, setPreloadImage] = useState({
        uri: currentImage,
        type: '',
        name: ''
    });

    const onPressOpenMediaLibrary = async () => {
        try {
            const { assets } = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 })
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
            const { assets } = await launchCamera({ saveToPhotos: true })
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


    return (
        <Modal
            isVisible={isModalVisible}
            onBackButtonPress={() => onChangeVisible(false)}
            animationIn='fadeIn'
            animationOut='fadeOut'
        >
            <View style={styles.modalContainer}>
                <Text>{title}</Text>
                <View>
                    <Button title="Escoger una imagen" onPress={onPressOpenMediaLibrary} />
                    <Button title="Tomar una foto" onPress={onPressOpenCamera} />
                </View>


                <Image 
                source={preloadImage.uri ? { uri: preloadImage.uri } : placeholderImage } 
                resizeMode='cover' 
                style={{ 
                    ...styles.preloadImageStyle,
                    ...imageStyles 
                }} />

                <Button title='Actualizar foto' onPress={() => {
                    onPressUpdate(preloadImage)
                    onChangeVisible(false)
                }} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        alignItems: 'center',
        height: windowHeight * 0.6,
        backgroundColor: 'white',
        padding: 10,
        margin: 0
    },
    preloadImageStyle: {
        width: 232,
        height: 232,
        marginVertical: 10
    }
})