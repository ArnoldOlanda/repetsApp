import { repetsAPI } from "../../api";

export const getPets = async (user) => {
    try {

        const { data } = await repetsAPI.get(`/pets/${user}`);

        return data;
        
    } catch (error) {
        console.log(error);
    }
}