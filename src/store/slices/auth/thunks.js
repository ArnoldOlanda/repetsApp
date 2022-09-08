import { storeData } from "../../../helpers";
import { incrementOpenedNumber, setLogin, startLogin } from "./authSlice"

export const getAuth = () => {
    return async ( dispatch, getState ) => {

        dispatch( startLogin() );

        //Peticion Http

        dispatch( setLogin({
            user:"arti",
            name: "Arnold Olanda",
            pets:[
                {
                    name:"Layca",
                    especie:"perro"
                },
                {
                    name:"manchas",
                    especie:"gato"
                }
            ]
        }) )
    }
}

