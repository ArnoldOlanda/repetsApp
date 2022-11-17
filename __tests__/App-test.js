/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import { render } from '@testing-library/react-native'

let component;


describe('Pruebas en <App/>', () => {

  beforeEach(()=>{
    component = render(<App />)
  })

  test('renderizar componente', () => {
    console.log(component);
  })
})
