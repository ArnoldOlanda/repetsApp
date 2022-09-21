import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import petListItem from '../../assets/petListItem.png'

export const PetListItem = () => {



    return (
        <View style={[styles.container, styles.shadowProp]}>
            <Image source={petListItem} style={{ flex: 1 }} />
            <View style={styles.cardFooter}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#2782CA', lineHeight: 19 }} > Itachi </Text>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#5F5F63', lineHeight: 18 }}> French Bulldog  1 año(s) </Text>
            </View>
        </View>
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