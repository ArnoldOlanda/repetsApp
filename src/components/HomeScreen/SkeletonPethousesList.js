import React from 'react'
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const SkeletonPethousesList = () => {
    return (
        [1, 2, 3].map(e => (
            <View key={e} style={{ marginTop: 5, marginBottom: 10 }}>
                <SkeletonPlaceholder>
                    <SkeletonPlaceholder.Item alignItems="center">
                        <SkeletonPlaceholder.Item width={250} height={150} borderRadius={10} />
                        <SkeletonPlaceholder.Item>
                            <SkeletonPlaceholder.Item width={250} height={25} marginTop={6} borderRadius={6} />
                            <SkeletonPlaceholder.Item marginTop={6} width={120} height={20} borderRadius={6} />
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
            </View>
        ))
    )
}
