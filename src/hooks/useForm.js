import { useState } from "react"

export const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm)

    const onInputTextChange = ( key , value ) => {
    
        setFormState({
            ...formState,
            [ key ]:value
        })
    }

    const onResetForm = () => {
        setFormState(initialForm)
    }

    return {
        ...formState,
        formState,
        onInputTextChange,
        onResetForm
    }

}