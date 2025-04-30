import  { AeroSyncEmbeddedView, Environment, SuccessEventType, WidgetEventType } from "aerosync-react-native-sdk";
import { useStore } from "../context/StoreContext";
import Toast from 'react-native-toast-message';
import { AeroSyncWidgetProps } from "../types/widget.interface";


export default function Embedded() {

    const { widgetConfig } = useStore();

    const onLoad = () => {
        console.log('onLoad');
      };

    const onBankClick = () => {
      console.log('onBankClick');
    }; 
    
    const onError = (event: string) => {
      console.log('onError', event);
    };

    return (
        <AeroSyncEmbeddedView 
            onLoad={onLoad}
            onBankClick={onBankClick}
            onError={onError}
            token={widgetConfig!.token}
            deeplink="testaerosyncsample://"
            environment={(widgetConfig?.environment ?? 'dev') as Environment}
            {...(widgetConfig?.configurationId ? {configurationId: widgetConfig.configurationId}: {})}
        />
    );
}