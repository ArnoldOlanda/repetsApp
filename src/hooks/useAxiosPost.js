import { useEffect, useState } from 'react'
import { repetsAPI } from '../api'

export const useAxiosPost = ( url, data ) => {

    const [state, setState] = useState({
        data,
        isLoading:true,
        hasError:null
    })

    const sendRequest = async () => {

        setState({
            ...state,isLoading: true
        })
        const body = JSON.stringify(data)

        const { data } = await repetsAPI.post( url, body );

        console.log(data);
        setState({
            data,
            isLoading: false,
            hasError: null
        })
    }
    
    useEffect(() => {
      
        sendRequest()
    
    }, [url])
    
    return {
        data:      state.data,
        isLoading: state.isLoading,
        hasError:  state.hasError
    };
}