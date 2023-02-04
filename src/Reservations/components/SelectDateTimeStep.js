import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'

import Icon from 'react-native-vector-icons/Ionicons'
import { ChooseNumberDays } from './';

const windowWidth = Dimensions.get('window').width


export const SelectDateTimeStep = ({ state, onUpdate, setErrors }) => {

    const { colors } = useSelector(state => state.theme);
    const { fecha_reserva, hora_reserva } = state

    useEffect(() => {
        moment.locale('es')
    }, [])


    const onPressOpenDatePicker = () => {
        DateTimePickerAndroid.open({
            mode: 'date',
            value: fecha_reserva,
            onChange: (_, date) => {
                onUpdate('fecha_reserva', date)
            }
        })
    }

    const onPressOpenTimePicker = () => {
        DateTimePickerAndroid.open({
            mode: 'time',
            value: hora_reserva,
            onChange: (_, date) => {
                onUpdate('hora_reserva', date)
            }
        })
    }



    return (
        <ScrollView style={{ marginTop: 10 }}>
            <View style={{ paddingHorizontal: 10, marginBottom:20 }}>
                <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}>Establece una fecha y hora</Text>
                <TouchableOpacity
                    style={{ ...styles.buttonSelectDateTime, backgroundColor: colors.card }}
                    onPress={onPressOpenDatePicker}
                >
                    <Icon name='calendar' size={25} color={colors.gray} />
                    <Text style={{ color: colors.gray, marginLeft: 10 }}>{moment(fecha_reserva).locale('es').format('DD MMM YYYY')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ ...styles.buttonSelectDateTime, backgroundColor: colors.card }}
                    onPress={onPressOpenTimePicker}
                >
                    <Icon name='time' size={25} color={colors.gray} />
                    <Text style={{ color: colors.gray, marginLeft: 10 }}>{moment(hora_reserva).locale('es').format('HH:mm a')}</Text>
                </TouchableOpacity>
            </View>
            <ChooseNumberDays
                onUpdate={onUpdate}
                state={state}
                setErrors={setErrors}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    selectDateContainer: {
        width: windowWidth * 0.9
    },
    buttonSelectDateTime: {
        marginVertical: 10,
        elevation: 4,
        height: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6
    },
    inputStyle: {
        borderWidth: 1,
        width: 40,
        height: 40,
        fontSize: 18,
        textAlign: 'center',
        marginLeft: 20,
        borderRadius: 6
    }
})