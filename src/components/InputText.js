import React from 'react'
import { Keyboard } from 'react-native'
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const InputText = ({
    label,
    value,
    onChangeText,
    changeTextKey,
    placeholder,
    error,
    errorMessage,
    typePassword= false,
    keyboardType,
    multiline = false
}) => {

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.textInput}>{ label }</Text>
            <TextInput
                style={ error 
                    ? {
                        ...styles.input, 
                        borderWidth:1, 
                        borderColor:'red',
                        height: multiline ? 80 : 38,
                        

                    }
                    :{
                        ...styles.input,
                        height: multiline ? 80 : 38,
                        
                    } 
                }
                value={ value }
                onChangeText={ value => onChangeText(changeTextKey , value)}
                placeholder={ placeholder }
                placeholderTextColor="gray"  
                secureTextEntry={ typePassword }
                keyboardType={ keyboardType ? keyboardType : '' }
                multiline={ multiline }
                cursorColor='#2782CA'
                // onBlur={()=> Keyboard.dismiss }
            />
            {
                error && <Text style={styles.textError}>{ errorMessage }</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        justifyContent: 'center',
        marginBottom: 15,
        
    },
    textInput: {
        fontWeight: '500',
        fontSize: 16,
        
        //color: '#000',
        marginBottom: 3,
    },
    input: {
        width: '100%',
        paddingHorizontal: 15,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        fontSize: 14,
        color: '#111',
        textAlignVertical:'top'
    },
    textError:{
        fontSize:12,
        color:'red'
    }
})