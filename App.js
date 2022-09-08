import 'react-native-gesture-handler';
import React from 'react';

import { SafeAreaView, StatusBar, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import { MainStackNavigator } from './src/navigation';
import { store } from './src/store/store';


const App = () => {
  //const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    //backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (

    <Provider store={ store }>
      <NavigationContainer>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
          //barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
          />
          <View
            style={{
              //backgroundColor: isDarkMode ? Colors.black : Colors.white,
              backgroundColor: '#fff',
              flex: 1,
              justifyContent: 'center'
            }}>

            <MainStackNavigator />

          </View>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
