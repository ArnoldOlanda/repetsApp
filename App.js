
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors, Header,
} from 'react-native/Libraries/NewAppScreen';
import { ConfirmEmailScreen } from './src/screens/ConfirmEmailScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ResetPasswordScreen } from './src/screens/ResetPasswordScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import { WelcomeScreen } from './src/screens/WelcomeScreen';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex:1
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View
          style={{
            //backgroundColor: isDarkMode ? Colors.black : Colors.white,
            backgroundColor: '#fff',
            flex: 1,
            justifyContent:'center'
          }}>
          <RegisterScreen></RegisterScreen>
          
        </View>
    </SafeAreaView>
  );
};

export default App;
