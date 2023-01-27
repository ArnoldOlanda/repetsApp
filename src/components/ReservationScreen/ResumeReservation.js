import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';

export const ResumeReservation = ({ reservationData }) => {

    const { selectedPethouse } = useSelector(state => state.pethouses);
    const { colors } = useSelector(state => state.theme);

    return (
        <View style={{ alignItems: 'flex-start', marginTop: 10, paddingHorizontal:10 }}>
            <Text style={{ ...styles.title, color: colors.primary }}>Resumen de tu reserva</Text>
            {/* <Text>Alojamiento:  {selectedPethouse.nombre}</Text> */}

            <View style={styles.resumeContainer}>
                <View style={styles.resumeItemContainer}>
                    <Text style={{ flex: 1, color: colors.primary }}>Tipo de alojamiento: </Text>
                    <Text style={{ color: colors.primary }}>{reservationData.tipo_reserva}</Text>
                </View>

                <View style={styles.resumeItemContainer}>
                    <Text style={{ flex: 1, color: colors.primary }}>Fecha: </Text>
                    <Text style={{ color: colors.primary }}>{reservationData.fecha_reserva.toLocaleDateString()}</Text>
                </View>

                <View style={styles.resumeItemContainer}>
                    <Text style={{ flex: 1, color: colors.primary }}>Hora: </Text>
                    <Text style={{ color: colors.primary }}>{reservationData.hora_reserva.toLocaleTimeString()}</Text>
                </View>

                <View style={styles.resumeItemContainer}>
                    <Text style={{ flex: 1, color: colors.primary }}>Duracion de reserva: </Text>
                    {
                        reservationData.tipo_reserva === "dias"
                            ? <Text style={{ color: colors.primary }}>{reservationData.duracion_dias} dias</Text>
                            : <Text style={{ color: colors.primary }}>{reservationData.duracion_horas} horas</Text>
                    }
                </View>

                <View style={styles.resumeItemContainer}>
                    <Text style={{ flex: 1, color: colors.primary }}>Numero de mascotas: </Text>
                    <Text style={{ color: colors.primary }}>{reservationData.mascotas.length}</Text>
                </View>

                <View style={{ ...styles.resumeItemContainer, marginTop: 20 }}>
                    <Text style={{ ...styles.totalText, color: colors.blue, flex: 1 }}>Total: </Text>
                    <Text style={{ ...styles.totalText, color: colors.blue }}>S/.{reservationData.costo_total}</Text>
                </View>
            </View>

            <Text style={{ ...styles.title, color: colors.primary }}>Forma de pago</Text>
            <View style={styles.resumeContainer}>
                <Text style={{ color:colors.primary }}>{reservationData.tipo_pago.charAt(0).toUpperCase() + reservationData.tipo_pago.slice(1)}</Text>
            </View>
            {/* <Text>Mascota: { reservationData.mascota }</Text> */}
            {/* <Text>Precio por hora:   S/.{selectedPethouse.tarifa_hora}</Text>
            <Text>Precio por dia:   S/.{selectedPethouse.tarifa_dia}</Text>
            <Text>Subtotal: S/.{reservationData.costo_total}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight:'bold'
    },
    totalText: {
        fontSize: 18,
    },
    resumeContainer: {
        backgroundColor: 'white',
        width: "98%",
        padding: 10,
        borderRadius: 10,
        flex: 1,
        // elevation: 5,
        marginBottom:10
    },
    resumeItemContainer: {
        flexDirection: 'row'
    }
})