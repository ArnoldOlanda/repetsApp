import React from 'react'
import { useSelector } from 'react-redux';
import { ProgressStep } from 'react-native-progress-steps';

export const CustomProgressStep = ({label, onNext, errors = false, children}) => {
    
    const { colors } = useSelector(state => state.theme);

    console.log(onNext)

    return (
        <ProgressStep
            label={label}
            nextBtnStyle={{ backgroundColor: colors.blue, borderRadius: 5, right: -30, top: 20 }}
            nextBtnText='Siguiente'
            nextBtnTextStyle={{ color: 'white' }}
            previousBtnStyle={{ right: 30, top: 20 }}
            previousBtnText='Anterior'
            previousBtnTextStyle={{ color: colors.blue }}
            errors={errors}
            onNext={onNext}
        >
            { children }
        </ProgressStep>
    )
}
