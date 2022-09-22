import { repetsAPI } from "../api"

export const registerPet = async (data={}, user='') => {

    try {
        const body = JSON.stringify( data )
        const { data } = await repetsAPI.post(`/pets/${ user }`, body)

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}