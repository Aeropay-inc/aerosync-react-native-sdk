import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import PaymentScreen from '../screens/PaymentScreen';
import Icon from "@react-native-vector-icons/fontawesome6";
import { View } from "react-native";
import { Support } from "../components/Support";


export const Dashboard = () => {
  const Drawer = createDrawerNavigator();
  
    const HeaderRight = (
        <View style={{ flexDirection: 'row', marginRight: 20, gap: 10 }}>
          <Support />
        </View>
      );
    return (
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
    );
}

