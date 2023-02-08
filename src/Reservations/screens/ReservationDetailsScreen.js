import React from 'react'
import { Text, View } from 'react-native'

export const ReservationDetailsScreen = ({ route }) => {

    const reservaId = route.params.id
    return (
        <View>
            <Text>{ reservaId }</Text>
        </View>
    )
}
