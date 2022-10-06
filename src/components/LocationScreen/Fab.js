import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const Fab = ({ iconName, onPress, style={} }) => {
  return (
    <View style={{ ...style }}>

        <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.blackButton}
        >
            <Icon name={ iconName } color='white' size={30} />

        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

    blackButton:{
        zIndex:9999,
        height:50,
        width:50,
        backgroundColor:'#2782CA',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        elevation:6
    }

})