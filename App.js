import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import { ActivityIndicator, SafeAreaView, StatusBar, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'

import { MainStackNavigator } from './src/navigation';
import { store, persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';


const App = () => {
  const backgroundStyle = { flex: 1 };

  const LoadingMarkup = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );


  useEffect(() => {

    SplashScreen.hide();

  }, [])


  return (

    <Provider store={store}>

      <PersistGate loading={<LoadingMarkup />} persistor={persistor}>

        <NavigationContainer>

          <SafeAreaView style={backgroundStyle}>
            <StatusBar />
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1,
                justifyContent: 'center'
              }}>

              <MainStackNavigator />
            </View>
          </SafeAreaView>

        </NavigationContainer>

      </PersistGate>

    </Provider>
  );
};

export default App;
