/**
 * Demo React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { ThemeProvider, useThemeContext } from './context/ThemeContext';
import { StoreProvider,  } from './context/StoreContext'; 
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { MainApp } from './navigation/MainApp';


function AppWrapper() {
  const { theme } = useThemeContext();
  return (
    <PaperProvider theme={theme}>
      <MainApp />
      <Toast />
    </PaperProvider>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <ThemeProvider>
        <AppWrapper />
      </ThemeProvider>
    </StoreProvider>

  );
}
