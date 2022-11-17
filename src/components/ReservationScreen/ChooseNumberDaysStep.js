import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useSelector } from 'react-redux'

export const ChooseNumberDaysStep = ({ onUpdate, state }) => {

    const { duracion_dias } = state;
    const { colors } = useSelector(state => state.theme)
    const { selectedPethouse } = useSelector(state => state.pethouses)

    const [numDays, setNumDays] = useState(duracion_dias)

    const onChangeInput = (value) => {

        setNumDays(Number(value))
        onUpdate('duracion_dias',Number(value));
        
    }
    

    return (
        <View style={styles.container}>
            <Text style={{ color: colors.text, fontSize: 18, fontWeight:'600' }}>Selecciona la cantidad de dias de alojamiento</Text>
            <TextInput 
            style={{...styles.input}} 
            value={ numDays } 
            onChangeText={ onChangeInput } 
            keyboardType='numeric'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },  
    input:{
        backgroundColor:'white',
        borderRadius:5,
        marginVertical: 10,
        elevation:2,
        paddingHorizontal:20,
        fontSize: 18,
        borderWidth:1,
        borderColor:'#2782CA',
    }
})