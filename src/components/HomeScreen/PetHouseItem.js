import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch } from 'react-redux'

import { setCurrentPethouse } from '../../store/slices/pethouses/pethousesSlice'
import { HearthIcon } from './HearthIcon'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const PetHouseItem = ({ data, favorite }) => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { distrito, provincia, galeria, tarifa_dia, tarifa_hora, nombre } = data

    const [isFavorite, setIsFavorite] = useState(favorite)

    const onPressFavoriteButton = () => {
        setIsFavorite(!isFavorite);
    }

    return (
        <TouchableOpacity 
        style={styles.container} 
        activeOpacity={0.5}
        onPress={()=> {
            dispatch( setCurrentPethouse( data ))
            navigation.navigate('DetailPethouse')
        }}
        >
            <Image source={{ uri:galeria[0] }} style={styles.image} />
            
            <TouchableOpacity 
            activeOpacity={0.5}
            style={styles.favoriteIconButton}
            onPress={onPressFavoriteButton}
            >
            <HearthIcon  color={!isFavorite ? '#ADADAD' : '#FF4646'}/>
                
            </TouchableOpacity>

            <View style={styles.bottomTextContainer}>
                <View>
                    <Text style={styles.text}>{ nombre }</Text>
                    <Text style={{ fontSize: 12 }} >{ distrito }, { provincia }</Text>
                    <Text>S/.{tarifa_dia} día - S/.{ tarifa_hora } hora</Text>
                </View>
                <View>
                    <Text style={styles.text}><Icon name='star'/> 4.5</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 250,
        marginBottom: 10
    },
    image:{
        width:250,
        height:170, 
        borderRadius:10
    },
    favoriteIconButton:{
        position: 'absolute',
        top: 5,
        right: 5,
        width: 21,
        height: 21,
        backgroundColor:'#fff',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    },
    bottomTextContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    text:{
        color:'#000',
        fontSize:15,
        fontWeight:'400',
        lineHeight:20
    }
})