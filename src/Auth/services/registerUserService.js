//@ts-check
import {repetsAPI} from '../../api';

export const registerUserService = async (data = {}) => {
  const body = {
    ...data,
    google: false,
    rol: 'USER_ROLE',
  };

  try {
    const {data} = await repetsAPI.post('/usuarios', body);
    return data;
  } catch (error) {
    throw error;
  }
};
