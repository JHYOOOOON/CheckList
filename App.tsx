import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {RecoilRoot} from 'recoil';
import {ThemeProvider} from 'styled-components';
import * as Theme from './src/theme';
import {Checklist} from './src/pages';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <RecoilRoot>
      <ThemeProvider theme={Theme}>
        <SafeAreaView>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        </SafeAreaView>
        <Checklist />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
