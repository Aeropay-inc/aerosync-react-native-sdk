import { WebView } from 'react-native-webview';
import { env, type AeroSyncWebViewProps } from './Types';
import { Linking } from 'react-native';
import { constructUrl } from './utils/urlUtils';


export function BankWebView( params : AeroSyncWebViewProps) {

    const urlParameters = {
        token: params.token,
        deeplink: params.deeplink,
        consumerId: params.consumerId,
        ...((params.type === 'widget') ? {
            manualLinkOnly: params.manualLinkOnly,
            handleMFA: params.handleMFA,
            jobId: params.jobId,
            userId: params.userId            
        }: {})
    }

    let baseUrl = env[params.environment];
    if (!baseUrl) {
        params.onError?.('Invalid environment specified.');
        return null;
    }
    if(params.type === 'embedded') {
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
        onMessage={(event) => {
            try {
                const r = JSON.parse(event.nativeEvent.data);
                switch (r.type) {
                  case 'pageSuccess':
                      (params.type === 'widget') && params?.onSuccess(r.payload);
                    break;
                  case 'widgetClose':
                      (params.type === 'widget') && params?.onClose();
                    break;
                  case 'widgetPageLoaded':
                      (params.type === 'widget') && params?.onEvent(r.payload);
                    break;
                  case 'widgetError':
                      (params.type === 'widget') && params?.onError(r.payload);
                    break;
                    case 'widgetBankClick':
                      (params.type === 'embedded') && params?.onBankClick();
                    break;  
          }
            } catch(e) {
                params.onError?.(`Failed to parse WebView message: ${e}`);
            }            
                
        }}
        // ref={(webView) => (webViewRef = webView)}
        onLoad={() => params?.onLoad()}
        // onNavigationStateChange={handleNavigationStateChange}
        // limitsNavigationsToAppBoundDomains={
        //   limitsNavigationsToAppBoundDomains ?? false
        // }
        onOpenWindow={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          const { targetUrl } = nativeEvent;
          try {
            Linking.openURL(targetUrl);
          } catch (error) {
            params.onError(`Unable open the URL in the external browser: ${error}`);
          }
        }}
      />        
    );
}