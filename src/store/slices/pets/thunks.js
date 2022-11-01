import axios from "axios";
import { repetsAPI, repetsApiUrl } from "../../../api";
import { setCurrentPet, setPets, startLoadingPets } from "./petsSlice"

export const obtenerMascotasUsuario = () => {
    return async (dispatch, getState) => {

        try {
            dispatch(startLoadingPets());

            const { uid } = getState().auth;

            const { data } = await repetsAPI.get(`/pets/${uid}`);

            dispatch( setPets(data) )

        } catch (error) {

            console.log( error );
            
        }

    }
}

export const startUpdatePetImage = (image) => {
    return async( dispatch, getState ) => {
        try {
            dispatch(startLoadingPets());
            const { pets } = getState();
            const { selectedPet } = pets

            const formData = new FormData();
            formData.append('image', image);

            const { data } = await axios.patch(`${ repetsApiUrl }/pets/updateImage/${selectedPet.uid}`, formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })

            dispatch(setCurrentPet(data.pet))

        } catch (error) {
            console.log(error);
        }
    }
}