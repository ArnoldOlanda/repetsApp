import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'

import Icon from 'react-native-vector-icons/Ionicons'

const windowWidth = Dimensions.get('window').width


export const SelectDateTimeStep = ({ initialDate, onUpdate }) => {

    const { colors } = useSelector( state => state.theme )
    const [date, setDate] = useState( initialDate )

    useEffect(() => {
        moment.locale('es')
    }, [])


    const onPressOpenDatePicker = ()=>{
        DateTimePickerAndroid.open({
            mode:'date',
            value: date,
            onChange: (_,date) => {
                setDate(date);
                onUpdate('fecha_reserva',date)
            }
        })
    }

    const onPressOpenTimePicker = () => {
        DateTimePickerAndroid.open({
            mode:'time',
            value: date,
            onChange: (_,date) => {
                setDate(date)
                onUpdate('horaReserva',date.toLocaleTimeString())
            }
        })
    }

    return (
        <ScrollView style={{ marginTop:10 }}>
            <View style={{ paddingHorizontal: 10 }}>
                <Text>Establece una fecha y hora</Text>
                <TouchableOpacity 
                style={{ ...styles.buttonSelectDateTime, backgroundColor: colors.card }}
                onPress={ onPressOpenDatePicker }
                >
                    <Icon name='calendar' size={20} color={ colors.gray }/>
                    <Text style={{color:colors.gray, marginLeft: 10}}>{ moment(date).locale('es').format('DD MMM YYYY')}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={{ ...styles.buttonSelectDateTime, backgroundColor: colors.card }}
                onPress={ onPressOpenTimePicker }
                >
                    <Icon name='time' size={20} color={ colors.gray }/>
                    <Text style={{color:colors.gray, marginLeft: 10}}>{ moment(date).locale('es').format('HH:mm a')}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    selectDateContainer: {
        width: windowWidth * 0.9
    },
    buttonSelectDateTime:{
        marginVertical:10,
        elevation:4,
        height:35,
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems: 'center',
        borderRadius:6
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