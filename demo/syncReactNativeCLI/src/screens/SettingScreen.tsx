import { Text, View } from "react-native";
import { useStore } from "../context/StoreContext";


export default function SettingScreen() {
    const { widgetConfig, setWidgetConfigAction } = useStore();
    const setUser = () => {
        const newConfig = {
            token: 'some-token',
            environment: 'qa',
            configurationId: 'config123',
            aeroPassUserUuid: 'user-uuid-123',
            isEmbeddedFlow: true,
          };
          setWidgetConfigAction(newConfig); // Set widget config in context
      };
    
    return (
        <View>
            <Text>Settings screen</Text>
        </View>
    );
}