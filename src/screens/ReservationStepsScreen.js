import React,{ useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useDispatch, useSelector } from 'react-redux';

import { ChooseNumberDaysStep } from '../components/ReservationScreen/ChooseNumberDaysStep';
import { ChoosePaymentMethodStep } from '../components/ReservationScreen/ChoosePaymentMethodStep';
import { ChoosePetStep } from '../components/ReservationScreen/ChoosePetStep';
import { SelectDateTimeStep } from '../components/ReservationScreen/SelectDateTimeStep';
import { registerReservation } from '../helpers/registerReservation';
import { obtenerMascotasUsuario } from '../store/slices/pets';


export const ReservationStepsScreen = () => {

    const { colors } = useSelector( state => state.theme )
    const { selectedPethouse } = useSelector( state => state.pethouses )
    const { uid } = useSelector( state => state.auth )
    const dispatch = useDispatch()


    const [reservationData, setReservationData] = useState({
        fecha_solicitud:'',
        fecha_reserva:'',
        duracion_dias:0,
        duracion_horas:0,
        usuario:uid,
        pethouse:selectedPethouse.uid,
        mascota:'',
        costo_total:0,
        horaReserva:'',
        estado:'espera'
    })

    const updateReservationData = (key, value) => {

        setReservationData({
            ...reservationData,
            [key]:value
        })

    }

    const [date, setDate] = useState(new Date())

    useEffect(() => {
    
        dispatch(obtenerMascotasUsuario())
    
    }, [])


    return (
        <View style={{ flex: 1, paddingHorizontal:10 }}>
            <ProgressSteps
            completedProgressBarColor={ colors.blue }
            completedStepIconColor={ colors.blue }
            activeStepIconBorderColor={ colors.blue }
            activeLabelColor={ colors.blue }
            activeStepNumColor={ colors.blue }
            marginBottom={35}
            >
                <ProgressStep  
                label="Paso 1" 
                nextBtnStyle={{ backgroundColor:colors.blue, borderRadius:5,right:-30, top: 20  }}
                nextBtnText='Siguiente'
                nextBtnTextStyle={{ color:'white' }}
                // errors={true}
                >
                        <ChoosePetStep onUpdate={ updateReservationData } currentSelected={ reservationData.mascota } />
                </ProgressStep>

                <ProgressStep 
                label="Paso 2"
                nextBtnStyle={{backgroundColor:colors.blue,borderRadius:5,right:-30, top: 20}}
                nextBtnText='Siguiente'
                nextBtnTextStyle={{ color:'white' }}
                previousBtnStyle={{right:30, top: 20}}
                previousBtnText='Anterior'
                previousBtnTextStyle={{ color:colors.blue }}
                
                >
                    <SelectDateTimeStep initialDate={ date } onUpdate={ updateReservationData } />
                </ProgressStep>

                <ProgressStep 
                label="Paso 3"
                nextBtnStyle={{backgroundColor:colors.blue,borderRadius:5,right:-30, top: 20}}
                nextBtnText='Siguiente'
                nextBtnTextStyle={{ color:'white' }}
                previousBtnStyle={{right:30, top: 20}}
                previousBtnText='Anterior'
                previousBtnTextStyle={{ color:colors.blue }}
                onNext={()=>{
                    updateReservationData('costo_total',Number(reservationData.duracion_dias * selectedPethouse.tarifa_dia))
                }}
                >

                    <ChooseNumberDaysStep onUpdate={ updateReservationData } state={reservationData} />

                </ProgressStep>

                <ProgressStep 
                label="Paso 4"
                nextBtnStyle={{backgroundColor:colors.blue,borderRadius:5,right:-30, top: 20}}
                nextBtnText='Siguiente'
                nextBtnTextStyle={{ color:'white' }}
                previousBtnStyle={{right:30, top: 20}}
                previousBtnText='Anterior'
                previousBtnTextStyle={{ color:colors.blue }}
                >
                    <ChoosePaymentMethodStep onUpdate={ updateReservationData }/>
                </ProgressStep>

                <ProgressStep 
                label="Resumen"
                nextBtnStyle={{backgroundColor:colors.blue,borderRadius:5,right:-30, top: 20}}
                nextBtnText='Siguiente'
                nextBtnTextStyle={{ color:'white' }}
                previousBtnStyle={{right:30, top: 20}}
                previousBtnText='Anterior'
                previousBtnTextStyle={{ color:colors.blue }}
                finishBtnText='Reservar'
                onSubmit={()=>{
                    registerReservation(reservationData)
                }}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Text>Resumen de tu reserva</Text>
                        <Text>{ JSON.stringify(reservationData,null,4) }</Text>
                    </View>
                </ProgressStep>

            </ProgressSteps>
        </View>
    )
}
