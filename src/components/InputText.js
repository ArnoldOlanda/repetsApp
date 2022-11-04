import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const InputText = ({ label, value, onChangeText, changeTextKey , placeholder, error, errorMessage, typePassword= false, keyboardType }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.textInput}> { label } </Text>
            <TextInput
                style={ error ? {...styles.input, borderWidth:1, borderColor:'red'}: styles.input }
                value={ value }
                onChangeText={value => onChangeText(changeTextKey , value)}
                placeholder={ placeholder } 
                secureTextEntry={ typePassword }
                keyboardType={keyboardType ? keyboardType : ''}
            />
            {
                error && <Text style={styles.textError}>{ errorMessage }</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: windowWidth * 0.90,
        justifyContent: 'center',
        marginBottom: 6
    },
    textInput: {
        fontWeight: '500',
        fontSize: 14,
        color: '#000',
        marginBottom: 3
    },
    input: {
        width: windowWidth * 0.90,
        height: 38,
        paddingLeft: 13,
        backgroundColor: '#ECF2F0',
        borderRadius: 5,
        fontSize: 14,
        color: '#111',
    },
    textError:{
        fontSize:10,
        color:'red'
    }
})