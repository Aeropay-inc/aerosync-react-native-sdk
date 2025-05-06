import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "../screens/LoginScreen";
import { Dashboard } from "./Dashboard";
import { useState } from "react";

export function MainApp() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const Stack = createNativeStackNavigator();
    
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <Stack.Screen name="Login">
              {() => <LoginScreen onLogin={() => setIsAuthenticated(true)} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Drawer" component={ Dashboard } />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );    
}