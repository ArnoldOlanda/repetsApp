import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export const RadioButtonsMultiSelect = ({ options, currentValue, keyName, onChange }) => {

    const onAddNewValue = (e) => {
        const exists = currentValue.find(t => t === e);
        if (!exists) {
            onChange(keyName, [...currentValue, e])
        } else {
            const filtered = currentValue.filter(t => t !== e)
            onChange(keyName, [...filtered])
        }
    }

    return (
        <View style={{ height: 60 }}>
            <View style={styles.buttonOptionsContainer}>
                {
                    options.map(e => {

                        const selected = currentValue.find(t => t === e);

                        return (
                            <TouchableOpacity
                                key={e}
                                activeOpacity={0.6}
                                onPress={() => onAddNewValue(e)}
                                style={
                                    (selected)
                                        ? styles.buttonOption
                                        : styles.buttonOptionActive
                                }
                            >
                                <Text
                                    style={(!selected) ? styles.buttonOptionText : {}}
                                >
                                    {e}
                                </Text>
                                {
                                    selected && (
                                        <Icon
                                            name='checkmark-circle'
                                            size={18}
                                            color='#2782CA'
                                            style={styles.icon}
                                        />)
                                }
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            {
                currentValue.length > 0
                && <Text style={{ fontSize:12, flex: 1, textAlign:'right', marginTop: 5 }}>{currentValue.length} seleccionado(s)</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    buttonOptionsContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonOption: {
        position: 'relative',
        backgroundColor: '#ECF2F0',
        borderRadius: 5,
        height: 33,
        paddingVertical: 5,
        width: 85,
        alignItems: 'center'
    },
    buttonOptionText: {
        color: '#2782CA'
    },
    buttonOptionActive: {
        position: 'relative',
        backgroundColor: '#ECF2F0',
        borderRadius: 5,
        height: 33,
        paddingVertical: 5,
        width: 85,
        borderWidth: 1,
        borderColor: '#2782CA',
        alignItems: 'center'
    },
    icon: {
        position: 'absolute',
        right: -3,
        top: -5
    }
})