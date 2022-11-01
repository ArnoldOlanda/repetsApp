import React from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'

const windowWidth = Dimensions.get('screen').width

export const Button = ({ text, onPress, isLoading, stylesProps = {}, colorText='white' }) => {

    return (
        <TouchableOpacity 
        activeOpacity={0.6}
        style={{ ...styles.btn, ...stylesProps }}
        onPress={ onPress }
        disabled={isLoading}
        >
            {
                (isLoading)
                ? (<ActivityIndicator size='small' color='#fff' />)
                : (<Text style={{fontSize: 16, color: colorText}}>{ text }</Text>)
            }
        </TouchableOpacity>
    )
}

const styles =StyleSheet.create({
    btn: {
        backgroundColor: '#2782CA',
        height: 40,
        width: windowWidth * 0.90,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
