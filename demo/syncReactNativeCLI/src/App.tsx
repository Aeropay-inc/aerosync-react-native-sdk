/**
 * Demo React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { MD2LightTheme, PaperProvider, MD2DarkTheme } from 'react-native-paper';
import {
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';
import PaymentScreen from './screens/PaymentScreen';
import Icon from '@react-native-vector-icons/fontawesome6';
import { StoreProvider } from './context/StoreContext'; 
import Toast from 'react-native-toast-message';
import { openLink } from './utils/openLink';

export default function App(): React.JSX.Element {
  const Drawer = createDrawerNavigator();
  const scheme = useColorScheme(); // returns 'light' or 'dark'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? MD2DarkTheme : MD2LightTheme

  const HeaderRight = (
    <View style={{ flexDirection: 'row', marginRight: 20, gap: 5 }}>
      <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)} style={{ marginRight: 15 }}>
        <Icon name="moon" size={22} color='white' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openLink('https://www.aeropay.com/support')}>
        <Icon name="circle-question" size={22} color='white'/>
      </TouchableOpacity>
    </View>
  );

   return (
        <StoreProvider>
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
                <Drawer.Screen 
                  name="Home" 
                  component={HomeScreen} options={{
                  drawerIcon: ({ focused, size}) => (
                    <Icon name="house" iconStyle="solid" size={size} color={focused ? '#00BFFF' : 'gray'} />
                  ),
                  drawerLabelStyle: {
                    color: 'white', 
                    fontWeight: 'bold'
                  },
                  headerRight: () => HeaderRight
                }} />
                <Drawer.Screen 
                  name="Settings" 
                  component={SettingScreen} options={{
                  drawerIcon: ({ focused, size}) => (
                    <Icon name="gear" iconStyle="solid" size={size} color={focused ? '#00BFFF': 'gray'} />
                  ),
                  drawerLabelStyle: {
                    color: 'white', 
                    fontWeight: 'bold'
                  },
                  headerRight: () => HeaderRight
                }}/>
                <Drawer.Screen 
                  name="Payment" 
                  component={PaymentScreen} options={{
                  drawerIcon: ({ focused, size}) => (
                    <Icon name="credit-card" iconStyle="solid" size={size} color={focused ? '#00BFFF': 'gray'} />
                  ),
                  drawerLabelStyle: {
                    color: 'white', 
                    fontWeight: 'bold'
                  },
                  headerRight: () => HeaderRight
                }} />
              </Drawer.Navigator>
            </NavigationContainer>
            <Toast />
          </PaperProvider>
        </StoreProvider>
      );
}