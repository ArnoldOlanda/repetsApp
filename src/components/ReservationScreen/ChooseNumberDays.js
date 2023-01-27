import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useSelector } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select';

const re = /^[0-9]*$/

export const ChooseNumberDays = ({ onUpdate, state, setErrors }) => {

    const { duracion_dias, duracion_horas } = state;

    const { colors } = useSelector(state => state.theme)
    const { selectedPethouse } = useSelector(state => state.pethouses)

    const onChangeInput = (value) => {

        setErrors(value.length < 1 ? true : false);
        const numberValid = new RegExp(re).test(value);
        
        if(!numberValid) return;

        if (state.tipo_reserva === "horas") {
            onUpdate('duracion_horas', value);
            return;
        }
        onUpdate('duracion_dias', value);
    }

    useEffect(() => {
        if (state.tipo_reserva.length < 1) setErrors(true);
    }, [])


    return (
        <View style={styles.container}>
            <Text style={{ paddingHorizontal: 10, color: colors.text, fontSize: 18, fontWeight: '600' }}>¿Que tipo de alojamiento deseas?</Text>
            <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={{
                    inputAndroid: { ...styles.inputSelect, color: 'black' },
                    placeholder: { color: 'gray' }
                }}
                value={state.tipo_reserva}
                onValueChange={(value) => onUpdate('tipo_reserva', value)}
                items={[
                    { label: 'Por horas', value: 'horas' },
                    { label: 'Por dias', value: 'dias' },
                ]}
                placeholder={{
                    label: 'Selecciona una opcion',
                    value: '',
                    color: 'lightgray'
                }}

            />
            {
                (state.tipo_reserva.length > 1)
                && ((state.tipo_reserva === "horas")
                    ? (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginHorizontal: 10 }}>Ingrese el numero de horas: </Text>
                        <TextInput
                            style={{ ...styles.input }}
                            value={state.duracion_horas}
                            onChangeText={onChangeInput}
                            keyboardType='numeric'
                        />
                    </View>)
                    : (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginHorizontal: 10 }}>Ingrese la cantidad de dias: </Text>
                        <TextInput
                            style={{ ...styles.input }}
                            value={state.duracion_dias}
                            onChangeText={onChangeInput}
                            keyboardType='numeric'
                        />
                    </View>))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        marginVertical: 10,
        elevation: 2,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        fontSize: 16,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#2782CA',
    },
    inputSelect: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 50,
        paddingHorizontal: 13,
        paddingVertical: 5,
        marginVertical: 10,
        elevation: 5,
        width: "95%",
        marginHorizontal: 10
    },
})