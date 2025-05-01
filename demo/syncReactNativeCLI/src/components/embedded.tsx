import  { AeroSyncEmbeddedView, Environment, WidgetEventBankClickType } from "aerosync-react-native-sdk";
import { useStore } from "../context/StoreContext";
import { EmbeddedWidgetProps } from "../types/widget.interface";
import { useThemeContext } from "../context/ThemeContext";


export default function Embedded({onWidgetBankClick}: EmbeddedWidgetProps) {

    const { widgetConfig, setWidgetConfigAction } = useStore();
    const { isDarkTheme } = useThemeContext()

    const onLoad = () => {
      console.log('onLoad');
    }

    const onBankClick = (event: WidgetEventBankClickType) => {
      if(event.stateCode) {
        setWidgetConfigAction({
          ...widgetConfig!,
          stateCode: event.stateCode
        })
        onWidgetBankClick()
      }
    }; 
    
    const onError = (event: string) => {
      console.log('onError', event);
    };

    return (
        <AeroSyncEmbeddedView 
            onLoad={onLoad}
            onBankClick={onBankClick}
            onError={onError}
            theme={isDarkTheme? 'dark' : 'light'}
            token={widgetConfig!.token}
            deeplink="testaerosyncsample://"
            consumerId={widgetConfig?.configurationId}
            environment={(widgetConfig?.environment ?? 'dev') as Environment}
            {...(widgetConfig?.configurationId ? {configurationId: widgetConfig.configurationId}: {})}
        />
    );
}