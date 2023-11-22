import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import * as Theme from './src/theme';
import {Checklist} from './src/pages';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeProvider theme={Theme}>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      </SafeAreaView>
      <Checklist />
    </ThemeProvider>
  );
}

export default App;
