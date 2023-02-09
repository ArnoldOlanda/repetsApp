import React, {useState} from 'react';
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
import image from '../../assets/perro.jpeg';

const colorScheme = Appearance.getColorScheme();
export const Pet = ({data}) => {
  return (
    <View style={styles.container}>
      <Image
        source={data.img ? {uri: data.img} : image}
        style={{
          marginRight: 10,
          width: 65,
          height: 55,
          borderBottomLeftRadius: 5,
          borderTopLeftRadius: 5,
        }}
      />
      <View>
        <Text style={{color: '#2782CA', fontWeight: 'bold', fontSize: 16}}>
          {data.nombre}
        </Text>
        <Text style={{fontSize: 14}}>{data.raza}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colorScheme === 'dark' ? '#181818' : '#F5F5F5',
    borderRadius: 5,

    marginVertical: 5,
  },
});
