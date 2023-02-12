import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { startUpdateFavoritesPethouses, updateFavoritesPethouses } from '../../store/slices/auth'

import { setCurrentPethouse } from '../../store/slices/pethouses/pethousesSlice'
import { HearthIcon } from './HearthIcon'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const PetHouseItem = ({ data, favorite, favoriteScreen }) => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { favoritesPethouses } = useSelector(state => state.auth)
    const { colors } = useSelector( state => state.theme )
    const { uid, distrito, provincia, galeria, tarifa_dia, tarifa_hora, nombre } = data

    const [isFavorite, setIsFavorite] = useState(favorite)

    const onPressFavoriteButton = () => {
        const exists = favoritesPethouses.find(e => e.uid === uid)

        if (!exists) {
            setIsFavorite(true);
            dispatch(startUpdateFavoritesPethouses(data)) //Actualiza en bd
            ToastAndroid.show('Agregado a favoritos', ToastAndroid.SHORT)
        } else {
            setIsFavorite(false);
            const favoritesList = favoritesPethouses.filter(e => e.uid !== uid)
            // dispatch(updateFavoritesPethouses(favoritesList)) //TODO: crear servicio para eliminar pethouse id de los favoritos del usuario
            ToastAndroid.show('Quitado de favoritos', ToastAndroid.SHORT)
        }
    }

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.5}
            onPress={() => {
                dispatch(setCurrentPethouse(data))
                navigation.navigate('DetailPethouse')
            }}
        >
            <Image source={{ uri: galeria[0] }} style={styles.image} />

            {
                !favoriteScreen
                    ? (<TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.favoriteIconButton}
                        onPress={onPressFavoriteButton}
                    >
                        <HearthIcon color={!isFavorite ? '#ADADAD' : '#FF4646'} />

                    </TouchableOpacity>)
                    : null
            }

            <View style={styles.bottomTextContainer}>
                <View>
                    <Text style={{...styles.text, color:colors.text}}>{nombre}</Text>
                    <Text style={{ fontSize: 12, color: colors.text2 }} >{distrito}, {provincia}</Text>
                    <Text style={{ color:colors.text2 }} >S/ {tarifa_dia} día - S/ {tarifa_hora} hora</Text>
                </View>
                <View>
                    <Text style={{...styles.text, color:colors.text}}><Icon name='star' /> 4.5</Text>
                    
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        marginBottom: 10
    },
    image: {
        width: 250,
        height: 170,
        borderRadius: 10
    },
    favoriteIconButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 21,
        height: 21,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: '#000',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20
    }
})