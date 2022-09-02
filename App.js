
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
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            flex: 1,
            justifyContent:'center'
          }}>
          <ConfirmEmailScreen />
        </View>
    </SafeAreaView>
  );
};

export default App;
