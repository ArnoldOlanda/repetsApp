import React, { useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useSelector} from 'react-redux';

import {Button} from '../../components/Button';
import {InputText} from '../../components/InputText';
import {Modal} from '../../Pets/components/Modal';
import {Title} from '../../components/Title';
import {GalleryImages} from '../components/GalleryImages';
import {RadioButtonsMultiSelect} from '../components/RadioButtonsMultiSelect';
import {useRegisterPethouse} from '../hooks/useRegisterPethouse';

const tamanioMascotasOptions = ['Pequeños', 'Medianos', 'Grandes'];
const tipoAlojamientoOptions = ['Horas', 'Dias'];

const windowWidth = Dimensions.get('window').width;

export const RegisterPetHouseScreen = () => {
  const {isLoading} = useSelector(state => state.pethouses);
  const {
    formState,
    formSubmited,
    formValidation,
    galleryImages,
    onCloseModalTipoMascota,
    onInputTextChange,
    onPressRegisterPetHouse,
    onRemoveImageFromArray,
    onSelectOptionTipoMascota,
    onSetNewImageToArray,
    setTipoMascotaModalVisible,
    tipoMascotaModalVisible,
  } = useRegisterPethouse();

  const {
    nombre,
    descripcion,
    provincia,
    distrito,
    tipoMascota,
    tamanioMascotas,
    tipoAlojamiento,
    tarifaHora,
    tarifaDia,
  } = formState;

  const {
    nombreValid,
    descripcionValid,
    provinciaValid,
    distritoValid,
    tipoMascotaValid,
    tarifaHoraValid,
    tarifaDiaValid,
  } = formValidation;

  

  
  return (
    <View style={styles.container}>
      {/*<View style={{width: windowWidth, paddingHorizontal: 27}}>
        <Title text="Registra tu Hospedaje" icon="🏠" />
      </View>
      <Text style={{width: windowWidth, paddingHorizontal: 27}}>
        Ingresa la informacion para tu hospedaje
      </Text>*/}

      <ScrollView
        style={styles.formContainer}
        keyboardShouldPersistTaps="handled">
        <InputText
          label="Nombre"
          placeholder="Nombre de tu hospedaje"
          onChangeText={onInputTextChange}
          changeTextKey="nombre"
          value={nombre}
          error={!!nombreValid && formSubmited}
          errorMessage={nombreValid}
        />

        <InputText
          label="Descripción"
          placeholder="Escribe una pequeña descripción de tu hospedaje"
          onChangeText={onInputTextChange}
          changeTextKey="descripcion"
          value={descripcion}
          error={!!descripcionValid && formSubmited}
          errorMessage={descripcionValid}
          multiline
        />

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Provincia</Text>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            style={{
              inputAndroid:
                !!tipoMascotaValid && formSubmited
                  ? {
                      ...styles.input,
                      borderWidth: 1,
                      borderColor: 'red',
                      color: 'gray',
                    }
                  : {...styles.input, color: 'gray'},
              placeholder: {color: 'gray'},
            }}
            value={provincia}
            onValueChange={value => onInputTextChange('provincia', value)}
            items={[
              {label: 'Arequipa', value: 'arequipa'},
              // { label: 'Camana', value: 'camana' },
              // { label: 'Caravelí', value: 'caravelí' },
              // { label: 'Caylloma', value: 'caylloma' },
              // { label: 'Condesuyos', value: 'condesuyos' },
              // { label: 'Islay', value: 'islay' },
              // { label: 'La union', value: 'la union' },
            ]}
            placeholder={{
              label: 'Seleccione una provincia',
              value: '',
              color: 'lightgray',
            }}
          />
          {!!provinciaValid && formSubmited && (
            <Text style={styles.textError}>{provinciaValid}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Distrito</Text>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            value={distrito}
            style={{
              inputAndroid:
                !!tipoMascotaValid && formSubmited
                  ? {
                      ...styles.input,
                      borderWidth: 1,
                      borderColor: 'red',
                      color: 'gray',
                    }
                  : {...styles.input, color: 'gray'},
              placeholder: {color: 'gray'},
            }}
            onValueChange={value => onInputTextChange('distrito', value)}
            items={[
              {label: 'Cercado', value: 'cercado'},
              {label: 'Paucarpata', value: 'paucarpata'},
              {label: 'Miraflores', value: 'miraflores'},
              {label: 'Hunter', value: 'hunter'},
              {label: 'Tiabaya', value: 'tiabaya'},
              {label: 'Yura', value: 'yura'},
              {label: 'Selva alegre', value: 'selva alegre'},
            ]}
            placeholder={{
              label: 'Seleccione un distrito',
              value: '',
              color: 'lightgray',
            }}
          />
          {!!distritoValid && formSubmited && (
            <Text style={styles.textError}>{distritoValid}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Tipo de mascota que permites</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={
              !!tipoMascotaValid && formSubmited
                ? {...styles.input, borderWidth: 1, borderColor: 'red'}
                : styles.input
            }
            onPress={() => setTipoMascotaModalVisible(true)}>
            {tipoMascota.length === 0 ? (
              <Text style={{color:'gray'}}>Presione para elegir un tipo de mascota</Text>
            ) : (
              <Text>{tipoMascota}</Text>
            )}
          </TouchableOpacity>
          {!!tipoMascotaValid && formSubmited && (
            <Text style={styles.textError}>{tipoMascotaValid}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Tamaño de mascotas que permites</Text>

          <RadioButtonsMultiSelect
            options={tamanioMascotasOptions}
            currentValue={tamanioMascotas}
            keyName="tamanioMascotas"
            onChange={onInputTextChange}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Tipo de tarifa que aceptas</Text>

          <RadioButtonsMultiSelect
            options={tipoAlojamientoOptions}
            currentValue={tipoAlojamiento}
            keyName="tipoAlojamiento"
            onChange={onInputTextChange}
          />
        </View>

        {
          tipoAlojamiento.includes("horas")?
        <View style={{...styles.inputContainer, marginBottom: 0}}>
          <InputText
            label="Establezca una tarifa por horas"
            placeholder="Tarifa por hora"
            onChangeText={onInputTextChange}
            changeTextKey="tarifaHora"
            value={tarifaHora}
            error={!!tarifaHoraValid && formSubmited}
            errorMessage={tarifaHoraValid}
            keyboardType="numeric"
          />
        </View>:<></>
        }

        { tipoAlojamiento.includes("dias")?
            <View style={{...styles.inputContainer, marginBottom: 0}}>
            <InputText
              label="Establezca una tarifa por dia"
              placeholder="Tarifa por dia"
              onChangeText={onInputTextChange}
              changeTextKey="tarifaDia"
              value={tarifaDia}
              error={!!tarifaDiaValid && formSubmited}
              errorMessage={tarifaDiaValid}
              keyboardType="numeric"
            />
          </View>:<></>
          
        }
      


        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>
            Seleccione las fotos de su hospedaje
            <Text style={{fontSize: 12}}> (Maximo 3)</Text>
          </Text>
          <GalleryImages
            onChange={onSetNewImageToArray}
            onDelete={onRemoveImageFromArray}
            galleryImages={galleryImages}
          />
        </View>

        <Button
          text="Registrar"
          onPress={onPressRegisterPetHouse}
          stylesProps={{marginTop: 10, width: '100%'}}
          isLoading={isLoading}
        />
      </ScrollView>

      <Modal
        modalFor="tipoMascota"
        visible={tipoMascotaModalVisible}
        onCloseModal={onCloseModalTipoMascota}
        onOptionSelected={onSelectOptionTipoMascota}
        modalHeight={230}
        currentOption={tipoMascota}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: windowWidth,
  },
  input: {
    backgroundColor: '#ECF2F0',
    borderRadius: 5,
    height: 33,
    paddingLeft: 13,
    paddingTop: 0,
    paddingBottom: 0,
    
    justifyContent: 'center'
  },
  inputContainer: {
    marginBottom: 15,
    //backgroundColor: 'red'
    
  },
  labelText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 3,
    //color: '#000',
  },
  formContainer: {
    width: windowWidth,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  buttonOptionsContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonOption: {
    backgroundColor: '#ECF2F0',
    borderRadius: 5,
    height: 33,
    paddingVertical: 5,
    width: 85,
    alignItems: 'center',
  },
  buttonOptionTextActive: {
    color: '#2782CA',
  },
  buttonOptionActive: {
    backgroundColor: '#ECF2F0',
    borderRadius: 5,
    height: 33,
    paddingVertical: 5,
    width: 85,
    borderWidth: 1,
    borderColor: '#2782CA',
    alignItems: 'center',
  },
  textError: {
    fontSize: 12,
    color: 'red',
  },
});
