//@ts-check
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';

import {Button} from '../../components/Button';
import {useConfirmEmailStore} from '../hooks/useConfirmEmailStore';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const ConfirmEmailScreen = () => {
  const {
    CELL_COUNT,
    errorMessage,
    getCellOnLayoutHandler,
    isLoading,
    onPressButton,
    props,
    ref,
    setValue,
    value,
  } = useConfirmEmailStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificacion de Email</Text>
      <Text style={styles.text}>Escriba el codigo enviado a su correo</Text>
      <Text style={{...styles.text, color: '#000000'}}>
        ejemplodecorreo@gmail.com
      </Text>

      <View style={styles.inputContainer}>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          caretHidden={false}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      {errorMessage !== '' && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessageText}>{errorMessage}</Text>
        </View>
      )}
      <View style={{flexDirection: 'row', paddingBottom: 15}}>
        <Text style={{fontWeight: '500'}}>¿No recibiste el codigo? </Text>
        <Text style={{color: '#2782CA', fontWeight: '500'}}>Reenviar</Text>
      </View>
      <Button
        text={'Continuar'}
        onPress={onPressButton}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: 'black',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#B7B7B7',
  },
  inputContainer: {
    width: windowWidth,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  //
  codeFieldRoot: {
    width: windowWidth,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  cell: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#ECF2F0',
    marginHorizontal: 15,
    lineHeight: 38,
    fontSize: 22,
    borderColor: '#ECF2F0',
    borderWidth: 1,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#2782CA',
  },
  errorMessageContainer: {
    paddingVertical: 5,
    paddingHorizontal: 2,
    backgroundColor: '#facaca',
    width: windowWidth * 0.9,
    marginVertical: 15,
  },
  errorMessageText: {
    color: '#f00',
  },
});
