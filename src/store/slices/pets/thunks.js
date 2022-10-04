import { repetsAPI } from "../../../api";
import { loadingPets, setPets } from "./petsSlice"

export const obtenerMascotasUsuario = () => {
    return async (dispatch, getState) => {

        try {
            dispatch(loadingPets());

            const { uid } = getState().auth;

            const { data } = await repetsAPI.get(`/pets/${uid}`);

            dispatch( setPets(data) )

        } catch (error) {

            console.log( error );
            
        }

    }
}