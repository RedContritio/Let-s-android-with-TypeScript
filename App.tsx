/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {CounterDisplay} from './src/container/counter';
import {HiddenTimer, TimerDisplay} from './src/container/timer';
import store from './src/store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <HiddenTimer />
      <SafeAreaView style={backgroundStyle}>
        <StatusBar hidden={true} />
        <TimerDisplay />
        <CounterDisplay />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
