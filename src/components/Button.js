import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'

const windowWidth = Dimensions.get('screen').width

export const Button = ({ text, onPress }) => {

    return (
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>{ text }</Text>
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
    btnText: {
        color: 'white',
        fontSize: 16
    }
})
