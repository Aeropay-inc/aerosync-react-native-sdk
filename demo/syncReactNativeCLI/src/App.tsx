/**
 * Demo React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { MD2LightTheme, PaperProvider, MD2DarkTheme } from 'react-native-paper';
import {
  Text,
  useColorScheme,
  View
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';
import PaymentScreen from './screens/PaymentScreen';



export default function App(): React.JSX.Element {
  const Drawer = createDrawerNavigator();
  const scheme = useColorScheme(); // returns 'light' or 'dark'
  const theme = (scheme === 'dark')? MD2DarkTheme : MD2LightTheme

   return (
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Drawer.Navigator initialRouteName='Home'>
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="Settings" component={SettingScreen} />
              <Drawer.Screen name="Payment" component={PaymentScreen} />
            </Drawer.Navigator>
          </NavigationContainer>
        </PaperProvider>
      );
}