import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useDispatch, useSelector } from 'react-redux';
import { StripeProvider, useConfirmPayment } from '@stripe/stripe-react-native';

import { ChoosePaymentMethodStep, ChoosePetStep, SelectDateTimeStep } from '../components/ReservationScreen';
import { registerReservation } from '../helpers/registerReservation';
import { obtenerMascotasUsuario } from '../store/slices/pets';
import { repetsAPI } from '../api';
import { ResumeReservation } from '../components/ReservationScreen/ResumeReservation';


export const ReservationStepsScreen = ({ navigation }) => {

    const [card, setCard] = useState({});
    const { confirmPayment, loading } = useConfirmPayment();

    const { colors } = useSelector(state => state.theme);
    const { selectedPethouse } = useSelector(state => state.pethouses);
    const { uid } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const [reservationData, setReservationData] = useState({
        fecha_solicitud: new Date(),
        fecha_reserva: new Date(),
        hora_reserva: new Date(),
        tipo_reserva: '',
        duracion_dias: "1",
        duracion_horas: "1",
        usuario: uid,
        pethouse: selectedPethouse.uid,
        mascotas: [],
        metodo_pago: 'tarjeta',
        costo_total: 0,
        estado: 'espera'
    })
    // const [date, setDate] = useState(new Date());
    const [errors, setErrors] = useState(true);

    const updateReservationData = (key, value) => {

        setReservationData({
            ...reservationData,
            [key]: value
        })

    }

    const fetchPaymentIntentClientSecret = async () => {
        try {

            const { data: { clientSecret } } = await repetsAPI.post(`/payment-intent`, {
                amount: ((reservationData.costo_total / 3.86).toFixed(0)) * 100, //TODO: obtener el tipo de cambio actual
                currency: 'usd',
            });

            return clientSecret;

        } catch (error) {
            console.log(error)
        }
    };

    const onSubmitReservationDataForm = async () => {

        if (reservationData.metodo_pago === 'contado') {
            await registerReservation(reservationData);
            ToastAndroid.show('La solicitud se realizo con exito', ToastAndroid.LONG)
        } else {
            const clientSecret = await fetchPaymentIntentClientSecret();
            const data = {
                ...reservationData,
                payment_intent_token: clientSecret
            }
            await registerReservation(data);
            ToastAndroid.show('La solicitud se realizo con exito, el pago no sera cargado a su tarjeta hasta que el dueño del alojamiento confirme la reserva', ToastAndroid.LONG)
        }
        navigation.navigate('HomeScreen');
    }

    useEffect(() => {
        dispatch(obtenerMascotasUsuario())
    }, [])


    return (
        <StripeProvider
            publishableKey='pk_test_51MR2e5DGlfAnj7PFbf63y18CuLKwr6F2qC3XssNj0u4npEZG66JEYRWPhXwlcz2TedBV6Fc8I0LkDKqwd5T8w88V00AUWFJeuC'
        >
            <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor:'#F8F8F8' }}>
                <ProgressSteps
                    completedProgressBarColor={colors.blue}
                    completedStepIconColor={colors.blue}
                    activeStepIconBorderColor={colors.blue}
                    activeLabelColor={colors.blue}
                    activeStepNumColor={colors.blue}
                    marginBottom={35}
                >
                    <ProgressStep
                        label="Selecciona tu mascota"
                        nextBtnStyle={{ backgroundColor: colors.blue, borderRadius: 5, right: -30, top: 20 }}
                        nextBtnText='Siguiente'
                        nextBtnTextStyle={{ color: 'white' }}
                        previousBtnStyle={{ right: 30, top: 20 }}
                        previousBtnText='Anterior'
                        previousBtnTextStyle={{ color: colors.blue }}
                        errors={errors}
                        onNext={() => {
                            if (errors) {
                                ToastAndroid.show('Por favor seleccione al menos una mascota', ToastAndroid.SHORT)
                            }
                        }}
                    >
                        <ChoosePetStep
                            onUpdate={updateReservationData}
                            currentSelected={reservationData.mascotas}
                            setErrors={setErrors}
                        />
                    </ProgressStep>
                    
                    <ProgressStep
                        label="Define una fecha y tipo de alojamiento"
                        nextBtnStyle={{ backgroundColor: colors.blue, borderRadius: 5, right: -30, top: 20 }}
                        nextBtnText='Siguiente'
                        nextBtnTextStyle={{ color: 'white' }}
                        previousBtnStyle={{ right: 30, top: 20 }}
                        previousBtnText='Anterior'
                        previousBtnTextStyle={{ color: colors.blue }}
                        errors={errors}
                        onNext={() => {
                            if (errors) {
                                return ToastAndroid.show('Revise la informacion ingresada', ToastAndroid.SHORT);
                            }
                            if (reservationData.tipo_reserva === "horas") {
                                updateReservationData('costo_total', Number(reservationData.duracion_horas * selectedPethouse.tarifa_hora));
                                return;
                            }
                            updateReservationData('costo_total', Number(reservationData.duracion_dias * selectedPethouse.tarifa_dia))
                        }}
                    >
                        <SelectDateTimeStep
                            state={reservationData}
                            onUpdate={updateReservationData}
                            setErrors={setErrors}
                        />
                    </ProgressStep>

                    <ProgressStep
                        label="Escoge un metodo de pago"
                        nextBtnStyle={{ backgroundColor: colors.blue, borderRadius: 5, right: -30, top: 20 }}
                        nextBtnText='Siguiente'
                        nextBtnTextStyle={{ color: 'white' }}
                        previousBtnStyle={{ right: 30, top: 20 }}
                        previousBtnText='Anterior'
                        previousBtnTextStyle={{ color: colors.blue }}
                        onNext={() => {
                            updateReservationData('fecha_solicitud', new Date());
                            console.log(reservationData)
                        }}
                    >
                        <ChoosePaymentMethodStep
                            onUpdate={updateReservationData}
                            setCardData={setCard}
                            cardData={card}
                        />
                    </ProgressStep>

                    <ProgressStep
                        label="Resumen de tu reserva"
                        nextBtnStyle={{ backgroundColor: colors.blue, borderRadius: 5, right: -30, top: 20 }}
                        nextBtnText='Siguiente'
                        nextBtnTextStyle={{ color: 'white' }}
                        previousBtnStyle={{ right: 30, top: 20 }}
                        previousBtnText='Anterior'
                        previousBtnTextStyle={{ color: colors.blue }}
                        finishBtnText='Reservar'
                        onSubmit={onSubmitReservationDataForm}
                    >
                        <ResumeReservation reservationData={reservationData} />
                    </ProgressStep>

                </ProgressSteps>
            </View>
        </StripeProvider>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    }
})