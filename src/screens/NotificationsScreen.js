import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'

export const NotificationsScreen = () => {
    const {notifications} = useSelector(state => state.notification)

    console.log(notifications);
    return (
        <View>
            <Text>NotificationsScreen</Text>
            {
                notifications.map((n,i)=>(
                    <View key={i} style={{ marginVertical: 5, marginHorizontal:10 }}>
                        <Text>{ JSON.stringify(n.data,null,4) }</Text>
                    </View>
                ))
            }
        </View>
    )
}
