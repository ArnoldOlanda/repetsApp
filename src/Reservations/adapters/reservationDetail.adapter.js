export const adaptedReservationDetail = data => ({
  fecha_solicitud: data.fecha_solicitud,
  fecha_reserva: data.fecha_reserva,
  duracion_dias: data.duracion_dias,
  duracion_horas: data.duracion_horas,
  usuario: data.usuario,
  pethouse: data.pethouse,
  mascotas: data.mascotas,
  costo_total: data.costo_total,
  metodo_pago: data.metodo_pago,
  tipo_reserva: data.tipo_reserva,
  uid: data.uid,
});
