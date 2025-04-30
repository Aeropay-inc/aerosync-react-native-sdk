import BankLink, { Environment, SuccessEventType, WidgetEventType } from "aerosync-react-native-sdk";
import { useStore } from "../context/StoreContext";
import Toast from 'react-native-toast-message';
import { AeroSyncWidgetProps } from "../types/widget.interface";


export default function AeroSyncWidget({onWidgetClose}: AeroSyncWidgetProps) {

    const { widgetConfig } = useStore();

    const onLoad = () => {
        console.log('onLoad');
      };
    
      const onClose = () => {
        console.log('onClose');
        onWidgetClose?.();
      };
    
      const onSuccess = (event: SuccessEventType) => {
        // setoutput(JSON.stringify(event));
        console.log('onSuccess', event);
        onWidgetClose?.();
      };
    
      const onEvent = (event: WidgetEventType) => {
        console.log('onEvent', event);
      };
    
      const onError = (event: string) => {
        console.log('onError', event);
      };


      /* Widget props guard */
      if (!widgetConfig?.token) {
        onWidgetClose?.();
        Toast.show({
            type: 'error',
            text1: 'Oops! It looks like you haven’t set your token yet.',
            text2: 'Head over to the Settings page to add it.'
            });
        return null;
      };

    return (
        <BankLink 
            onLoad={onLoad}
            onError={onError}
            onClose={onClose}
            onEvent={onEvent}
            onSuccess={onSuccess}
            token={widgetConfig.token}
            deeplink="testaerosyncsample://"
            environment={(widgetConfig?.environment ?? 'dev') as Environment}
            {...(widgetConfig?.configurationId ? {configurationId: widgetConfig.configurationId}: {})}
            {...(widgetConfig?.aeroPassUserUuid ? {aeroPassUserUuid: widgetConfig.aeroPassUserUuid}: {})}
            aeroPassUserUuid={widgetConfig!.aeroPassUserUuid}
            limitsNavigationsToAppBoundDomains={false}
            style={{
                width: '100%',
                height: '100%',
                opacity: 1,
                bgColor: '#FFFFFF',
            }}
        />
    );
}