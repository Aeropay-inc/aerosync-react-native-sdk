import { WebView } from 'react-native-webview';
import { env, type AeroSyncWebViewProps, type WidgetPostMessageOnClose, type WidgetPostMessageOnSuccess } from './Types';
import { Linking } from 'react-native';
import { constructUrl } from './utils/urlUtils';
import { useEffect, useRef } from 'react';
import AeroSyncSDK from './AeroSyncSDK';
import { postMessageToWebView } from './utils/webviewHelpers';

export function BankWebView( {type, props}: AeroSyncWebViewProps) {
    const isWidget = type === 'widget';
    const isEmbedded = type === 'embedded';
    const webViewRef = useRef<WebView>(null);
    const { 
      token = null, 
      deeplink = null,
      consumerId = null,
      theme = 'light',
      environment = 'production',
      onLoad = () => {},
      onError = () => {}
    } =  props;
    const urlParameters = {
        token: token,
        deeplink: deeplink,
        consumerId: consumerId,
        defaultTheme: theme,
        ...((isWidget) ? {
            manualLinkOnly: props.manualLinkOnly ?? false,
            handleMFA: props.handleMFA,
            jobId: props.jobId,
            aeroPassUserUuid: props.aeroPassUserUuid,
            connectionId: props.connectionId,
            stateCode: props.stateCode            
        }: {})
    }

    useEffect(() => {
      if(isWidget && webViewRef.current) {
        AeroSyncSDK.setWidgetWebViewRef(webViewRef);
      } 
      if(isEmbedded && webViewRef.current) {
        AeroSyncSDK.setEmbeddedWebViewRef(webViewRef);
      } 
    }, [isWidget, isEmbedded])

    let baseUrl = env[environment];
    if(isEmbedded) {
      baseUrl = `${baseUrl}/embedded-view`;
    }
    let source = constructUrl(baseUrl, urlParameters)

    return (
        <WebView
        source={{
          uri: source,
          headers: {
            deeplink: deeplink,
          },
        }}
        {...(isWidget ?( props.customWebViewProps || {}) : {})}
        ref={webViewRef}
        onMessage={(event) => {
            try {
                const r = JSON.parse(event.nativeEvent.data);
                switch (r.type) {
                  case 'pageSuccess':
                      // embedded event
                      if(AeroSyncSDK?.getEmbeddedWebViewRef?.current) {
                        const message: WidgetPostMessageOnSuccess = {
                          type: 'embeddedView',
                          payload: { name: 'onSuccess' }
                        }
                        postMessageToWebView(AeroSyncSDK.getEmbeddedWebViewRef, message)
                      }                    
                      if (isWidget && r?.payload) {
                        props.onSuccess(r.payload);
                        AeroSyncSDK.clear();
                      }
                    break;
                  case 'widgetClose':
                      // embedded event
                      if(AeroSyncSDK?.getEmbeddedWebViewRef?.current) {
                        const message: WidgetPostMessageOnClose = {
                          type: 'embeddedView',
                          payload: { name: 'onClose' }
                        }
                        postMessageToWebView(AeroSyncSDK.getEmbeddedWebViewRef, message)
                      }
                      if (isWidget) {
                        props.onClose();
                      }
                    break;
                  case 'widgetPageLoaded':
                      if (isWidget && r?.payload) {
                        props.onEvent(r.payload);
                      }
                    break;
                  case 'widgetError':
                      if (r?.payload) {
                        onError(r.payload);
                      }
                    break;
                    case 'widgetBankClick':
                      if (isEmbedded && r?.payload) {
                        props.onBankClick(r.payload)
                      }
                    break;  
          }
            } catch(e) {
                onError(`Failed to parse WebView message: ${e}`)
            }            
                
        }}
        onLoad={() => onLoad()}
        onOpenWindow={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          const { targetUrl } = nativeEvent;
          try {
            Linking.openURL(targetUrl);
          } catch (e) {
            onError(`Unable open the URL in the external browser: ${e}`)
          }
        }}
      />        
    );
}