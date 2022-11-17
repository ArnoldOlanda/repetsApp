import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View, TextInput, ScrollView,TouchableOpacity } from 'react-native'
import 'moment/locale/es'
import moment from 'moment'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { Button } from '../components/Button'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

const windowWidth = Dimensions.get('window').width


export const SelectDateScreen = () => {

    const { colors } = useSelector( state => state.theme )

    const [date, setDate] = useState(new Date())
    const [numDays, setNumDays] = useState('1')

    const [isVisibleModalCalendar, setIsVisibleModalCalendar] = useState(false)

    useEffect(() => {
        moment.locale('es')
    }, [])

    const onPressOpenDatePicker = ()=>{
        DateTimePickerAndroid.open({
            mode:'date',
            value: date,
            onChange: (_,date) => setDate(date)
        })
    }

    const onPressOpenTimePicker = () => {
        DateTimePickerAndroid.open({
            mode:'time',
            value: date,
            onChange: (_,date) => setDate(date)
        })
    }

    return (
        <ScrollView style={{marginTop:10}}>
            <View style={{ paddingHorizontal: 10 }}>
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

                <Text style={{ fontSize: 20, color: colors.text, fontWeight: '800' }}>Alojamiento por dias </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>Ingrese cantidad de dias</Text>
                    <TextInput style={{...styles.inputStyle, borderColor:colors.blue}} value={numDays} onChangeText={setNumDays} keyboardType='numeric' />
                </View>
                <Text>Fecha fin: {moment(date).add(Number(numDays), 'day').format('DD MMM')}</Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}><Button text='Hecho' /></View>

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