import { View, StyleSheet, Linking, BackHandler } from 'react-native';
import { useState, useEffect } from 'react';
import { type Options } from './Types';
import { WebView, type WebViewNavigation } from 'react-native-webview';

export default function BankLink(options: Options) {
  // stylesheet
  const styles = StyleSheet.create({
    container: {
      height: options?.style?.height || '100%',
      width: options?.style?.width || '100%',
      backgroundColor: options?.style?.bgColor || '#FFFFFF',
      opacity: options?.style?.opacity || 1,
    },
  });

  // set the base url
  let base_url: string = `${env[options.environment]}/?token=${options.token}`;
  if (options.deeplink) {
    base_url = `${base_url}&deeplink=${options.deeplink}`;
  }
  if (options.configurationId) {
    base_url = `${base_url}&consumerId=${options.configurationId}`;
  }
  if (options.aeroPassUserUuid) {
    base_url = `${base_url}&aeroPassUserUuid=${options.aeroPassUserUuid}`;
  }
  if (options.handleMFA) {
    base_url = `${base_url}&handleMFA=${options.handleMFA}&jobId=${options.jobId}&userId=${options.userId}`;
  }

  const [source, setSource] = useState(base_url);
  let canGoBack = false;
  let widgetClosed = false;
  let webViewRef: any;

  useEffect(() => {
    const onBackPress = () => {
      /**
       * When true is returned the event will not be bubbled up
       * & no other back action will execute
       */
      if (canGoBack && webViewRef) {
        webViewRef.goBack();
        return true;
      } else {
        return false;
      }
    };
    // the backhandler API detects hardware button presses for back navigatio
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      if (!widgetClosed) {
        options.onClose();
      }
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [options, widgetClosed, canGoBack, webViewRef]);

  const handleNavigationStateChange = (NavState: WebViewNavigation) => {
    const { url } = NavState;
    canGoBack = NavState.canGoBack;
    if (
      url.includes('aerosync.com/redirect') &&
      !url.includes('&token=') &&
      !options.deeplink
    ) {
      setSource(`${url}&token=${options.token}`);
    }
  };

  return (
    <View style={[styles.container]}>
      <WebView
        source={{
          uri: source,
        }}
        onMessage={(event) => {
          const r = JSON.parse(event.nativeEvent.data);
          switch (r.type) {
            case 'pageSuccess':
              widgetClosed = true;
              options.onSuccess && options.onSuccess(r.payload);
              break;
            case 'widgetClose':
              widgetClosed = true;
              options.onClose && options.onClose();
              break;
            case 'widgetPageLoaded':
              options.onEvent && options.onEvent(r.payload);
              break;
            case 'widgetError':
              options.onError && options.onError(r.payload);
              break;
            default:
              options.onEvent && options.onEvent(r.payload);
          }
        }}
        ref={(webView) => (webViewRef = webView)}
        onLoad={() => options.onLoad()}
        onNavigationStateChange={handleNavigationStateChange}
        onOpenWindow={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          const { targetUrl } = nativeEvent;
          if (options.deeplink) {
            Linking.openURL(targetUrl);
          } else {
            setSource(targetUrl);
          }
        }}
      />
    </View>
  );
}

// environment constants
const env: { [key: string]: string } = {
  dev: 'https://qa-sync.aero.inc',
  staging: 'https://staging-sync.aero.inc',
  production: 'https://sync.aero.inc',
};
