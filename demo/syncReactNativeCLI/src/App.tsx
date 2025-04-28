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
import Icon from '@react-native-vector-icons/fontawesome6';



export default function App(): React.JSX.Element {
  const Drawer = createDrawerNavigator();
  const scheme = useColorScheme(); // returns 'light' or 'dark'
  const theme = (scheme === 'dark')? MD2DarkTheme : MD2LightTheme

   return (
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName='Home'
                screenOptions={{
                  drawerStyle: {
                    backgroundColor: '#0077cc', 
                  },
                  headerStyle: {
                    backgroundColor: '#0077cc',
                  },
                   headerTintColor: 'white',
                   headerTitleStyle: {
                    fontWeight: 'bold', 
                  },
                }}>
              <Drawer.Screen name="Home" component={HomeScreen} options={{
                drawerIcon: ({ focused, size}) => (
                  <Icon name="house" iconStyle="solid" size={size} color={focused ? '#00BFFF' : 'gray'} />
                ),
                drawerLabelStyle: {
                  color: 'white', 
                  fontWeight: 'bold'
                },
              }} />
              <Drawer.Screen name="Settings" component={SettingScreen} options={{
                drawerIcon: ({ focused, size}) => (
                  <Icon name="gear" iconStyle="solid" size={size} color={focused ? '#00BFFF': 'gray'} />
                ),
                drawerLabelStyle: {
                  color: 'white', 
                  fontWeight: 'bold'
                },
              }}/>
              <Drawer.Screen name="Payment" component={PaymentScreen} options={{
                drawerIcon: ({ focused, size}) => (
                  <Icon name="credit-card" iconStyle="solid" size={size} color={focused ? '#00BFFF': 'gray'} />
                ),
                drawerLabelStyle: {
                  color: 'white', 
                  fontWeight: 'bold'
                },
              }} />
            </Drawer.Navigator>
          </NavigationContainer>
        </PaperProvider>
      );
}