import {repetsAPI} from '../../api';

export const loadReservationDetailsService = async id => {
  try {
    const {data} = await repetsAPI(`/reserva/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
