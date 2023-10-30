import React from 'react';
import HomePage from './pages/HomePage.js';
import AddBank from './pages/AddBank.js';
import ViewBank from './pages/ViewBank.js';
import * as Linking from 'expo-linking';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
const prefix = Linking.createURL('/');
const linking = {
    prefixes: [prefix],
  };

export default class App extends React.Component {
    render() {
        return (
                <NavigationContainer linking={linking}>
                    <Stack.Navigator>
                        <Stack.Screen name="AddBank" component={AddBank} />
                        <Stack.Screen name="HomePage" component={HomePage} />
                        <Stack.Screen name="ViewBank" component={ViewBank} />
                    </Stack.Navigator>
                </NavigationContainer>
        );
    }
}
