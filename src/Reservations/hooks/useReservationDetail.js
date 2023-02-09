//@ts-check

import React, {useEffect, useState} from 'react';
import {adaptedReservationDetail} from '../adapters/reservationDetail.adapter';
import {loadReservationDetailsService} from '../services/loadReservationDetailsService';

export const useReservationDetail = reservaId => {
  const [loading, setLoading] = useState(true);
  const [reservationData, setReservationData] = useState({
    fecha_solicitud: '',
    fecha_reserva: '',
    duracion_dias: 0,
    duracion_horas: 0,
    usuario: {},
    pethouse: {},
    mascotas: [],
    costo_total: 0,
    metodo_pago: '',
    tipo_reserva: '',
    uid: '',
  });

  const getReservationDetails = async () => {
    // setLoading(true);

    const data = await loadReservationDetailsService(reservaId);
    setReservationData(adaptedReservationDetail(data));

    setLoading(false);
  };

  useEffect(() => {
    getReservationDetails();
  }, []);

  return {
    reservationData,
    loading,
  };
};
