import { repetsAPI } from "../api";

export const registerReservation = async (data) => {

    const body = {
        ...data,
        fecha_solicitud: new Date()
    }

    try {

        const { data } = await repetsAPI.post(`/reserva`, body);

    } catch (error) {

        console.error(error.response.data);
        
    }

}