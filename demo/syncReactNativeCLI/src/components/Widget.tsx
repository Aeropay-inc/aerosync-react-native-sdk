import  { AeroSyncWidget, Environment, SuccessEventType, WidgetEventType } from "aerosync-react-native-sdk";
import { useStore } from "../context/StoreContext";
import { AeroSyncWidgetProps } from "../types/widget.interface";
import { useThemeContext } from "../context/ThemeContext";
import { DEEPLINK } from "../constants/configs";


export default function Widget({onWidgetClose, onBankLink}: AeroSyncWidgetProps) {

    const { widgetConfig } = useStore();
    const { isDarkTheme } = useThemeContext()

    const onLoad = () => {
        console.log('onLoad');
      };
    
      const onClose = () => {
        console.log('onClose');
        onWidgetClose?.();
      };
    
      const onSuccess = (event: SuccessEventType) => {
        console.log('onSuccess', event);
        onBankLink?.();
      };
    
      const onEvent = (event: WidgetEventType) => {
        console.log('onEvent', event);
      };
    
      const onError = (event: string) => {
        console.log('onError', event);
      };

    return (
        <AeroSyncWidget 
            onLoad={onLoad}
            onError={onError}
            onClose={onClose}
            onEvent={onEvent}
            onSuccess={onSuccess}
            theme={isDarkTheme? 'dark' : 'light'}
            token={widgetConfig!.token}
            deeplink={DEEPLINK}
            aeroPassUserUuid={widgetConfig!.aeroPassUserUuid}
            configurationId={widgetConfig?.configurationId}
            environment={(widgetConfig?.environment ?? 'dev') as Environment}
            {...(widgetConfig?.stateCode ? {stateCode: widgetConfig.stateCode}: {})}
            {...(widgetConfig?.configurationId ? {configurationId: widgetConfig.configurationId}: {})}
            {...((widgetConfig?.isHandleMFAFlow && widgetConfig?.jobId) ? {jobId: widgetConfig.jobId}: {})}
            {...((widgetConfig?.isHandleMFAFlow && widgetConfig?.connectionId) ? {connectionId: widgetConfig.connectionId}: {})}
            customWebViewProps={{
              style:{ marginTop: 30, backgroundColor: (isDarkTheme? '#000000': '#FFFFFF') }
            }}
        />
    );
}