//@ts-check
import { repetsAPI } from "../../api"

export const loginUserService = async (body={}) => {
    try {
        const {data} = await repetsAPI.post('/auth/login', body)
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}