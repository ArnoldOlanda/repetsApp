import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, View, Alert,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'


import { MainStackNavigator } from './src/navigation';
import { persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { setDarkTheme, setLightTheme } from './src/store/slices/theme/themeSlice';
import { useColorScheme } from 'react-native';
import { InAppNotification } from './src/components/InAppNotification';


const App = () => {

  const backgroundStyle = { flex: 1 };
  const colorScheme = useColorScheme()

  const theme = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const LoadingMarkup = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color="#000000" />
    </View>
  );


  useEffect(() => {

    SplashScreen.hide();

  }, [])

  useEffect(() => {

    (colorScheme === 'light')
      ? dispatch(setLightTheme())
      : dispatch(setDarkTheme())

  }, [colorScheme])

 


  return (
    <PersistGate loading={<LoadingMarkup />} persistor={persistor}>

      <NavigationContainer theme={theme} >

        <SafeAreaView style={backgroundStyle}>

          <StatusBar />

          <View style={styles.mainContainer}>

            <InAppNotification />
            <MainStackNavigator />
          </View>

        </SafeAreaView>

      </NavigationContainer>

    </PersistGate>
  );
};


export default App;

const styles = StyleSheet.create({
  mainContainer: {
    position:'relative',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  }
})