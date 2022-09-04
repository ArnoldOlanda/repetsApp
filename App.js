import 'react-native-gesture-handler';

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Colors, } from 'react-native/Libraries/NewAppScreen';
import { MainStackNavigator } from './src/navigation/MainStackNavigator';



const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex:1
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <View
           style={{
            //backgroundColor: isDarkMode ? Colors.black : Colors.white,
            backgroundColor: '#fff',
            flex: 1,
            justifyContent:'center'
          }}>
              <MainStackNavigator />
          </View>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
