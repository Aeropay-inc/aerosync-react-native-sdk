/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import BankLink from 'aerosync-react-native-sdk';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onLoad = () => {
    console.log('onLoad');
  };

  const onClose = () => {
    console.log('onClose');
  };

  const onSuccess = (event: object) => {
    console.log('onSuccess', event);
  };

  const onEvent = (event: object) => {
    console.log('onEvent', event);
  };

  const onError = (event: object) => {
    console.log('onError', event);
  };

  return (
    <SafeAreaView>
      <BankLink
        token=""
        environment="staging"
        onError={onError}
        onClose={onClose}
        onEvent={onEvent}
        onSuccess={onSuccess}
        onLoad={onLoad}
        deeplink="testaerosyncsample://"
        consumerId=""
        style={{
          width: '100%',
          height: '100%',
          opacity: 1,
          bgColor: '#FFFFFF',
        }}></BankLink>
    </SafeAreaView>
  );
}

export default App;
