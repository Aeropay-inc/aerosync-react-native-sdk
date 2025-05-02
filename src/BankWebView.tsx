import { WebView } from 'react-native-webview';
import { env, type AeroSyncWebViewProps } from './Types';
import { Linking } from 'react-native';
import { constructUrl } from './utils/urlUtils';


export function BankWebView( params : AeroSyncWebViewProps) {
    const isWidget = params.type === 'widget';
    const isEmbedded = params.type === 'embedded';
    const urlParameters = {
        token: params.token,
        deeplink: params.deeplink,
        consumerId: params.consumerId,
        defaultTheme: params.theme,
        ...((isWidget) ? {
            manualLinkOnly: params.manualLinkOnly,
            handleMFA: params.handleMFA,
            jobId: params.jobId,
            userId: params.userId,
            stateCode: params.stateCode            
        }: {})
    }

    let baseUrl = env[params.environment];
    if (!baseUrl) {
        params.onError?.('Invalid environment specified.');
        return null;
    }
    if(isEmbedded) {
      baseUrl = `${baseUrl}/embedded-view`;
    }
    

    let source = constructUrl(baseUrl, urlParameters)

    return (
        <WebView
        source={{
          uri: source,
          headers: {
            deeplink: params.deeplink ?? '',
          },
        }}
        {...(isWidget ?( params.customWebViewProps || {}) : {})}
        onMessage={(event) => {
            try {
                const r = JSON.parse(event.nativeEvent.data);
                switch (r.type) {
                  case 'pageSuccess':
                      if (isWidget && r?.payload) {
                        params?.onSuccess(r.payload);
                      }
                    break;
                  case 'widgetClose':
                      if (isWidget) {
                        params?.onClose();
                      }
                    break;
                  case 'widgetPageLoaded':
                      if (isWidget && r?.payload) {
                        params?.onEvent(r.payload);
                      }
                    break;
                  case 'widgetError':
                      if (isWidget && r?.payload) {
                        params?.onError(r.payload);
                      }
                    break;
                    case 'widgetBankClick':
                      if (isEmbedded && r?.payload) {
                        params?.onBankClick(r.payload)
                      }
                    break;  
          }
            } catch(e) {
                params.onError?.(`Failed to parse WebView message: ${e}`);
            }            
                
        }}
        onLoad={() => params?.onLoad()}
        onOpenWindow={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          const { targetUrl } = nativeEvent;
          try {
            Linking.openURL(targetUrl);
          } catch (error) {
            params.onError?.(`Unable open the URL in the external browser: ${error}`);
          }
        }}
      />        
    );
}