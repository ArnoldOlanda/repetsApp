//@ts-check
import axios from "axios";
import { repetsApiUrl } from "../../api";

export const updatePetImageService = async(image, petUid)=>{
    try {
        const formData = new FormData();
        formData.append('image', image);

        const { data:{ pet } } = await axios.patch(`${ repetsApiUrl }/pets/updateImage/${petUid}`, formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        return pet;

    } catch (error) {
        console.log(error)
    }
}