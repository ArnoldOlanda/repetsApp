import { repetsAPI } from "../api"

export const registerPet = async (data={}, user='') => {

    const { nombre, tipoMascota, raza, edad, descripcion, caracteristicasMascota } = data

    const body = {
        nombre,
        tipo: tipoMascota,
        raza,
        edad: parseInt( edad ),
        descripcion,
        caracteristicas: caracteristicasMascota
    }

    console.log(body);
    try {
        const { data } = await repetsAPI.post(`/pets/${ user }`, body)

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}