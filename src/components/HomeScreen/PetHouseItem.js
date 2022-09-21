import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { HearthIcon } from './HearthIcon'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const PetHouseItem = ({ imgSource, favorite }) => {

    const [isFavorite, setIsFavorite] = useState(favorite)

    const onPressFavoriteButton = () => {
        setIsFavorite(!isFavorite);
    }

    return (
        <View style={styles.container}>
            <Image source={imgSource} style={{width:250,height:170}} />
            {/* Favorite icon */}
            <TouchableOpacity 
            style={styles.favoriteIconButton}
            onPress={onPressFavoriteButton}
            >
                {
                    !isFavorite 
                    ?(<HearthIcon  color={'#ADADAD'}/>)
                    :(<HearthIcon  color={'#FF4646'}/>)
                }
                
            </TouchableOpacity>
            <View style={styles.bottomTextContainer}>
                {/* Bottom texts */}
                <View>
                    <Text style={styles.text}>Paucarpata, Arequipa</Text>
                    <Text style={styles.text}>S/. 50 noche</Text>
                </View>
                <View>
                    <Text style={styles.text}><Icon name='star'/> 4.7</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: windowWidth * 0.7,
        marginBottom: 10
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
        fontSize:14,
        fontWeight:'400',
        lineHeight:20
    }
})