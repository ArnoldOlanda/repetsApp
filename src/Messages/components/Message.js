import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Button} from '../../components/Button';
import {NewReservationSvg} from './NewReservationSvg';

export const Message = ({data, currentRecipient, currentUser}) => {
  const navigation = useNavigation();

  const {emisor, mensaje, fecha, tipo, reserva_id} = data;
  const hora = new Date(fecha).getHours();
  const minuto = new Date(fecha).getMinutes();
  const horaFormateada = `${hora > 12 ? hora - 12 : hora}:${
    minuto < 10 ? '0' + minuto : minuto
  } ${hora > 12 ? 'pm' : 'am'}`;

  return (
    <View
      style={{
        ...styles.message,
        backgroundColor: emisor === currentUser ? '#2782CA99' : '#BFBFBF9E',
        alignSelf: emisor === currentUser ? 'flex-end' : 'flex-start',
      }}>
      {tipo === 'texto' ? (
        <Text style={{color: emisor === currentUser ? 'white' : 'black'}}>
          {mensaje}
        </Text>
      ) : (
        <View
          style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
          <NewReservationSvg />
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <View style={{width: '100%', marginVertical: 5}}>
              <Text style={{fontSize: 16}}>
                {!currentRecipient.pethouse
                  ? `${currentRecipient.user.nombre} quiere realizar una reserva`
                  : 'Esperando confirmacion'}
              </Text>
            </View>
            <Button
              text="Ver detalles"
              stylesProps={{width: '100%'}}
              onPress={() =>
                navigation.navigate('ReservationDetails', {id: reserva_id})
              }
            />
          </View>
        </View>
      )}
      <Text
        style={{
          fontSize: 10,
          alignSelf: 'flex-end',
          color: emisor === currentUser ? 'white' : 'black',
        }}>
        {horaFormateada}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    // height:40,
    minHeight: 40,
    alignSelf: 'flex-start',
    maxWidth: '90%',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 8,
  },
});
