import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

export const SkeletonPetList = () => {
    return (
        <>
            {
                [1, 2, 3].map(e => (
                    <View key={e} style={{ marginTop: 5, marginBottom: 10 }}>
                        <SkeletonPlaceholder>
                            <SkeletonPlaceholder.Item alignItems="center">
                                <SkeletonPlaceholder.Item width={244} height={177} borderRadius={10} />
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                    </View>
                ))
            }
        </>
    )
}
