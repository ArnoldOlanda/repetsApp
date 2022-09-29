import { repetsAPI } from "../api"

export const registerPet = async ( data = {}, user = '' ) => {

    const { nombre, tipoMascota, raza, edad, descripcion, caracteristicasMascota } = data

    const body = {
        nombre,
        propietarioUid: user,
        tipo: tipoMascota,
        raza,
        edad: parseInt( edad ),
        descripcion,
        caracteristicas: caracteristicasMascota
    }

    try {
        const { data } = await repetsAPI.post(`/pets`, body)

        console.log(data);
    } catch (error) {
        console.log(error.response);
    }
}