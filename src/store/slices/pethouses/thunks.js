import axios from "axios"
import { repetsAPI, repetsApiUrl } from "../../../api"
import { loadingPethouses, setNewPethouse, setPetHouses, stopLoading } from "./pethousesSlice"



export const startLoadPethouses = () => {
    return async ( dispatch ) => {
        try {
            dispatch( loadingPethouses() )

            const {data} = await repetsAPI.get('/pethouses')

            dispatch( setPetHouses(data.data) );

        } catch (error) {
            console.log(error);
        }
    }
}

export const startRegisterNewPethouse = (formData) => {

    return async (dispatch, getState) => {
        try {
            const { uid, currentLocation } = getState().auth

            const { 
                galleryImages, nombre, descripcion, distrito, 
                provincia, tamanioMascotas, tipoAlojamiento, 
                tipoMascota, tarifaHora, tarifaDia } = formData
            
            const body = {
                nombre,
                descripcion,
                distrito,
                provincia,
                propietario:      uid,
                tipo_mascotas:    tipoMascota,
                tamanio_mascotas: tamanioMascotas,
                tipo_alojamiento: tipoAlojamiento,
                tarifa_hora:      Number(tarifaHora.split(' ')[1]),
                tarifa_dia:      Number(tarifaDia.split(' ')[1]),
                coordenadas:{
                    latitud:`${ currentLocation.latitude }`,
                    longitud:`${ currentLocation.longitude }`
                },
                subscriptionData:{
                    subscription_date: new Date(),
                    user: uid,
                }
            }
            // console.log(body)

            dispatch(loadingPethouses())
            
            const {data} = await repetsAPI.post('/pethouses', body)
            
            if(galleryImages.length === 0) return dispatch(  setNewPethouse( data.pethouse ))
                
            const formDataImages = new FormData();
            for (const i in galleryImages) {
                formDataImages.append(`image${ Number(i)+1 }`, galleryImages[i])
            }
            
            const { data: data2 } = await axios.put(`${ repetsApiUrl }/pethouses/${data.pethouse.uid}`, 
                formDataImages,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            console.log(data2.pethouse)
            dispatch( setNewPethouse( data2.pethouse ) )

            

        } catch (error) {
            dispatch( stopLoading() )
            console.log(JSON.stringify(error.response.data,null,4));        
        }
    }
}