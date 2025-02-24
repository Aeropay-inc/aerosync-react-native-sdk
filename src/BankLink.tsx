import { View, StyleSheet, Linking, BackHandler, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { env, type Options } from './Types';
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
  if (options.manualLinkOnly) {
    base_url = `${base_url}&manualLinkOnly=${options.manualLinkOnly}`;
  }
  if (options.aeroPassUserUuid) {
    base_url = `${base_url}&aeroPassUserUuid=${options.aeroPassUserUuid}`;
  }
  if (options.handleMFA) {
    base_url = `${base_url}&handleMFA=${options.handleMFA}&jobId=${options.jobId}&userId=${options.userId}`;
  }

  const [source, setSource] = useState(base_url);
  let canGoBack = false;
  let webViewRef: any;

  useEffect(() => {
    const onBackPress = () => {
      /**
       * When true is returned the event will not be bubbled up
       * & no other back action will execute
       */
      if (canGoBack && webViewRef) webViewRef.goBack();
      else options.onClose();
      return true;
    };
    // the backhandler API detects hardware button presses for back navigation
    if (Platform.OS === 'android')
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      if (Platform.OS === 'android')
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  const handleNavigationStateChange = (NavState: WebViewNavigation) => {
    const { url } = NavState;
    canGoBack = NavState.canGoBack;
    if (url.includes('/bank/connect')) canGoBack = false;
  };

  return (
    <View style={[styles.container]}>
      <WebView
        source={{
          uri: source,
          headers: {
            deeplink: options.deeplink || '',
          },
        }}
        onMessage={(event) => {
          const r = JSON.parse(event.nativeEvent.data);
          switch (r.type) {
            case 'pageSuccess':
              options.onSuccess && options.onSuccess(r.payload);
              break;
            case 'widgetClose':
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
        limitsNavigationsToAppBoundDomains={
          options?.limitsNavigationsToAppBoundDomains || false
        }
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
