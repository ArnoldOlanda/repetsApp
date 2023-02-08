//@ts-check

import React, { useEffect, useState } from 'react'
import { Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

//@ts-ignore

import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height


export const UploadImageModal = ({
    currentImage,
    title,
    actionText = "",
    isModalVisible,
    onChangeVisible,
    placeholderImage,
    onPressUpdate,
    imageStyles = {}
}) => {

    const [preloadImage, setPreloadImage] = useState({
        uri: currentImage,
        type: '',
        name: '',
        newImageSelected: false
    });

    const [showUploadButtons, setShowUploadButtons] = useState(false);

    //Valores iniciales de la animacion
    const opacityBox = useSharedValue(0)
    const positionBox = useSharedValue(-115)

    const style = useAnimatedStyle(() => (
        {
            opacity: withTiming(opacityBox.value,{ duration:100 }),
            transform: [{
                translateY: withTiming(positionBox.value, { duration: 100 }),
            }]
        }
    ))


    const onPressOpenMediaLibrary = async () => {
        try {
            const { assets } = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 })
            //@ts-ignore
            const [image] = assets
            setPreloadImage({
                uri: image.uri,
                name: image.fileName,
                type: image.type,
                newImageSelected: true
            })
            setShowUploadButtons(false);
            console.log(image)
        } catch (error) {
            console.log(error);
            setPreloadImage({
                uri: currentImage,
                name: "",
                type: "",
                newImageSelected: false
            })
            setShowUploadButtons(false);
        }
    }

    const onPressOpenCamera = async () => {
        try {
            const { assets } = await launchCamera({ saveToPhotos: true, mediaType: 'photo' })
            const [photo] = assets
            setPreloadImage({
                uri: photo.uri,
                name: photo.fileName,
                type: photo.type,
                newImageSelected: true
            })
            setShowUploadButtons(false);

            console.log(photo);
        } catch (error) {
            console.log(error);
            setPreloadImage({
                uri: currentImage,
                name: "",
                type: "",
                newImageSelected: false
            })
            setShowUploadButtons(false);
        }
    }

    const onCloseModal = () => {
        onChangeVisible(false);
        setShowUploadButtons(false);
        setPreloadImage({
            ...preloadImage,
            uri: currentImage,
            newImageSelected: false
        })
    }

    useEffect(() => {
      
        if(showUploadButtons){
            opacityBox.value = 1,
            positionBox.value = -115
        }else{
            opacityBox.value = 0,
            positionBox.value = -60
        }
    
    }, [showUploadButtons])
    

    return (
        <Modal
            isVisible={isModalVisible}
            onBackButtonPress={onCloseModal}
            animationIn='slideInUp'
            animationOut='slideOutDown'
            useNativeDriver={true}
            style={{ margin: 0, justifyContent: 'flex-end' }}
        >
            <View style={styles.modalContainer}>
                <View style={{ width: '100%', height: 50, alignItems: 'center', flexDirection: "row" }}>
                    <Text style={{ fontSize: 14, color: 'black', flex: 1 }}>{title}</Text>
                    <TouchableOpacity onPress={onCloseModal} >
                        <Icon name="close" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'black', width: '100%', height: 1, marginBottom: 20 }} />
                <View style={{ width: '100%', height: 50 }}>
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{actionText}</Text>
                </View>

                <Image
                    source={preloadImage.uri ? { uri: preloadImage.uri } : placeholderImage}
                    resizeMode='cover'
                    style={{
                        ...styles.preloadImageStyle,
                        ...imageStyles
                    }} />
                <View style={{ flex: 1 }} />

                <View style={{ width:'100%', alignItems:'center' }}>
                    <Animated.View style={[
                        { 
                            width: '100%', 
                            alignItems: 'center', 
                            position:'absolute',
                            top:5
                        }, 
                        style
                    ]}>
                        <View style={styles.uploadOptionsContainer}>
                            <TouchableOpacity
                                onPress={() => setShowUploadButtons(false)}
                                style={styles.closeBtn}
                            >
                                <Icon name='close' size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.uploadOptionItem}
                                onPress={onPressOpenCamera}
                            >
                                <Icon name='camera' size={25} color='black' style={{ marginRight: 10 }} />
                                <Text style={{ color: 'black' }}>Tomar una foto</Text>
                            </TouchableOpacity >
                            <TouchableOpacity
                                style={styles.uploadOptionItem}
                                onPress={onPressOpenMediaLibrary}
                            >
                                <Icon name='image' size={25} color='black' style={{ marginRight: 10 }} />
                                <Text style={{ color: 'black' }}>Escoger del album</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    <TouchableOpacity
                        onPress={() => setShowUploadButtons(true)}
                        style={{ ...styles.btn, backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }}
                    >
                        <Text style={{ color: 'black', fontSize: 16 }}>Escoger foto</Text>
                        <Icon name='chevron-up' size={20} color='black' style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>


                {
                    preloadImage.newImageSelected
                    && (
                        <TouchableOpacity
                            onPress={() => {
                                onPressUpdate(preloadImage)
                                onChangeVisible(false);
                                setShowUploadButtons(false)
                                console.log(preloadImage);
                            }}
                            style={styles.btn}
                            disabled={!preloadImage.newImageSelected}
                        >
                            <Text style={{ color: 'white', fontSize: 16 }}>Actualizar foto</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        alignItems: 'center',
        height: windowHeight * 0.8,
        width: windowWidth,
        backgroundColor: 'white',
        padding: 10,
        margin: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 40
    },
    preloadImageStyle: {
        width: 232,
        height: 232,
        marginVertical: 10,
    },
    closeBtn: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'black',
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    btn: {
        flexDirection: 'row',
        backgroundColor: 'black',
        width: '85%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 10
    },
    uploadOptionsContainer: {
        elevation: 4,
        width: '85%',
        height: 115,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 20,
        position: 'relative'
    },
    uploadOptionItem: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center'
    }
})