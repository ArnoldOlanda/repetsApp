import { useState, useEffect, useMemo } from "react"



export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {

        createValidators();

    }, [formState])

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys( formValidation )) {

            if(formValidation[formValue] !== null) return false;
        }
        return true;
    }, [ formValidation ])

    const onInputTextChange = (key, value) => {

        setFormState({
            ...formState,
            [key]: value
        })
    }

    const onResetForm = () => {
        setFormState(initialForm)
    }

    const createValidators = () => {

        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {

            const [ fn, errorMessage ] = formValidations[ formField ];
            formCheckedValues[`${ formField }Valid`] = fn( formState[ formField ] ) ? null : errorMessage;

        }

        setFormValidation( formCheckedValues )
    }

    return {
        ...formState,
        formState,
        onInputTextChange,
        onResetForm,
        formValidation,
        isFormValid
    }

}