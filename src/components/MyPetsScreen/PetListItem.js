import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setCurrentPet } from '../../store/slices/pets'

import petListItem from '../../assets/petListItemNone.png'

export const PetListItem = ({ pet }) => {

    const navigation = useNavigation();
    const {nombre, raza, edad, img} = pet;
    const dispatch = useDispatch();

    const onPressPetListItem = () => {

        dispatch( setCurrentPet( pet ) );
        navigation.navigate('DetailPet');

    }

    return (
        
        <TouchableOpacity 
        activeOpacity={0.7}
        style={[styles.container, styles.shadowProp]}
        onPress={ onPressPetListItem }
        >
            <Image source={img ? {uri: img}: petListItem} style={{ flex: 1, width:244 }} />
            <View style={styles.cardFooter}>
                <Text style={{ 
                    fontSize: 16, 
                    fontWeight: '700', 
                    color: '#2782CA', 
                    lineHeight: 19 }} >{ nombre }</Text>
                <Text style={{ 
                    fontSize: 14, 
                    fontWeight: '400', 
                    color: '#5F5F63', 
                    lineHeight: 18 }}> { raza }  { edad } año(s) </Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        width: 244,
        height: 177,
        marginBottom: 23,
        borderRadius: 10,

    },
    cardFooter: {
        height: 40,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 22
    },
    shadowProp: {
        shadowColor: '#32006A',  
        elevation: 10,  
    },
})