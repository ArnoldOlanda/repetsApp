//@ts-check
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Appearance,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Pet} from '../components/Pet';
//@ts-ignore
import image from '../../assets/image1.png';
import {useReservationDetail} from '../hooks/useReservationDetail';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const colorScheme = Appearance.getColorScheme();

export const ReservationDetailsScreen = ({route}) => {
  const reservaId = route.params.id;

  const {reservationData, loading} = useReservationDetail(reservaId);

  const {
    tipo_reserva,
    fecha_reserva,
    duracion_dias,
    duracion_horas,
    costo_total,
    mascotas,
    pethouse,
    metodo_pago,
  } = reservationData;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.9,
              marginBottom: 15,
              alignItems: 'center',
            }}>
            {/* <Text>{JSON.stringify(pethouse.galeria[0])}</Text> */}
            <Image
              source={{uri: pethouse.galeria[0]}}
              style={{
                marginRight: 10,
                width: 119,
                height: 81,
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
              }}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>
                {pethouse.nombre}
              </Text>
              <Text style={{fontSize: 12}}>
                {pethouse.provincia + ' ' + pethouse.distrito}
              </Text>
              <Text style={{fontSize: 10}}>
                S/{pethouse.tarifa_hora} / hora
              </Text>
              <Text style={{fontSize: 10}}>S/{pethouse.tarifa_dia} / dia</Text>
            </View>
          </View>

          <ScrollView style={{width: '100%'}}>
            <View
              style={{
                backgroundColor: colorScheme === 'dark' ? '#181818' : '#F5F5F5',
                width: '100%',
                flex: 1,
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View>
                <Text style={styles.title2}>Resumen</Text>
                <View style={styles.box0}>
                  <View style={styles.text1}>
                    <Text>Forma de alojamiento</Text>
                    <Text>{tipo_reserva}</Text>
                  </View>

                  <View style={styles.text1}>
                    <Text>Fecha de Entrada</Text>
                    <Text>{new Date(fecha_reserva).toLocaleString()}</Text>
                  </View>

                  <View style={styles.text1}>
                    <Text>Fecha de Salida</Text>
                    <Text>{new Date(fecha_reserva).toLocaleTimeString()}</Text>
                  </View>

                  <View style={styles.text1}>
                    <Text>Duracion de reserva</Text>
                    <Text>
                      {duracion_dias} {tipo_reserva}
                    </Text>
                  </View>

                  <View style={styles.text1}>
                    <Text>Numero de Mascotas</Text>
                    <Text>{mascotas.length}</Text>
                  </View>

                  <View style={styles.text1}>
                    <Text style={{color: '#2782CA'}}>Total</Text>
                    <Text style={{color: '#2782CA'}}>S/{costo_total}</Text>
                  </View>
                </View>
              </View>

              <View>
                <Text style={styles.title2}>Forma de pago</Text>
                <View style={styles.box0}>
                  <Text>{metodo_pago}</Text>
                </View>
              </View>

              <View>
                <Text style={styles.title2}>Mascotas Alojadas</Text>
                <View style={styles.box0}>
                  {mascotas.map((e, i) => (
                    <View key={i} style={{padding: 2}}>
                      <Pet data={e} />
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 10,
  },
  box0: {
    paddingVertical: 11,
    paddingHorizontal: 11,
    width: windowWidth * 0.9,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colorScheme === 'dark' ? '#111111' : 'white',
    backgroundColor: colorScheme === 'dark' ? '#111111' : 'white',
  },
  text1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title2: {
    paddingVertical: 7,
    fontWeight: '800',
  },
});
