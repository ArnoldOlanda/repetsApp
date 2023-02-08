import axios from 'axios';
import {
  startLoading,
  updateProfilePhoto,
  setFavoritePethouse,
  updateUserInfo,
} from './authSlice';
import {repetsAPI, repetsApiUrl} from '../../../api';

export const startUpdateProfilePicture = image => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      const {auth} = getState();
      const {uid} = auth;

      const formData = new FormData();
      formData.append('image', image);
      const {data} = await axios.put(
        `${repetsApiUrl}/usuarios/photo/${uid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(data);

      dispatch(updateProfilePhoto(data.user.img));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startUpdateFavoritesPethouses = data => {
  return async (dispatch, getState) => {
    try {
      const {uid} = getState().auth;
      const {uid: pethouseId} = data;
      const response = await repetsAPI.put(`/usuarios/favorites/${uid}`, {
        pethouseId,
      });

      console.log(response.data);

      dispatch(setFavoritePethouse(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startUpdateInfoUser = data => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      const {uid} = getState().auth;

      const response = await repetsAPI.patch(`/usuarios/${uid}`, data);

      console.log(response.data);

      dispatch(updateUserInfo(response.data.usuario));
    } catch (error) {
      console.log(error);
    }
  };
};
