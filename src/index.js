import { View, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { useState } from 'react';

/**
 * AeroSync UI Web View
 * Function AerosyncWebView: Display AeroSync portal via React Webview component
 * @params {string} - token: AeroSync token
 * @params {string} - environment: env name
 * @params {string} - consumerId: unique client ID
 * @params {function} - onSuccess: callback function
 * @params {function} - onClose: callback function
 * @params {function} - onEvent: callback function
 * @params {function} - onError: callback function
 * @params {string} - deeplink: React Native deeplink
 * @params {json} - style: Webview css properties
 * @returns <view> - webview
 */
export default function BankLink({
  token,
  environment,
  deeplink,
  consumerId,
  onSuccess,
  onClose,
  onEvent,
  onLoad,
  onError,
  style,
}) {
  Linking.addEventListener('url', (event) => {
    if (event !== null) {
      const status = getSearchParamFromURL(event.url, 'status');
      this.webView.injectJavaScript(`window.postMessage("${status}")`);
    }
  });

  const [source, setSource] = useState(
    deeplink && consumerId
      ? `${env[environment]}/?token=${token}&deeplink=${deeplink}&consumerId=${consumerId}`
      : deeplink
      ? `${env[environment]}/?token=${token}&deeplink=${deeplink}`
      : consumerId
      ? `${env[environment]}/?token=${token}&consumerId=${consumerId}`
      : `${env[environment]}/?token=${token}`
  );

  const handleNavigationStateChange = (NavState) => {
    const { url } = NavState;
    if (
      url.includes('aerosync.com/redirect') &&
      !url.includes('&token=') &&
      !deeplink
    ) {
      setSource(`${url}&token=${token}`);
    }
  };

  const getSearchParamFromURL = (url, param) => {
    const include = url.includes(param);
    if (!include) return null;
    const params = url.split(/([&,?,=])/);
    const index = params.indexOf(param);
    const value = params[index + 2];
    return value;
  };

  return (
    <View
      style={{
        height: style.height ? style.height : '100%',
        width: style.width ? style.width : '100%',
        backgroundColor: style.bgColor ? style.bgColor : '#FFFFFF',
        opacity: style.opacity ? style.opacity : 1,
      }}
    >
      <WebView
        source={{
          uri: source,
        }}
        onMessage={(event) => {
          const r = JSON.parse(event.nativeEvent.data);
          switch (r.type) {
            case 'pageSuccess':
              onSuccess ? onSuccess(r.payload) : false;
              break;
            case 'widgetClose':
              onClose();
              break;
            case 'widgetPageLoaded':
              onEvent ? onEvent(r.payload) : false;
              break;
            case 'widgetError':
              onError ? onError(r.payload) : false;
              break;
            default:
              onEvent ? onEvent(r.payload) : false;
          }
        }}
        ref={(webView) => (this.webView = webView)}
        onLoad={() => onLoad()}
        onError={(event) => {
          onError(event);
        }}
        onNavigationStateChange={handleNavigationStateChange}
        onOpenWindow={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          const { targetUrl } = nativeEvent;
          if (deeplink) {
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
const env = {
  dev: 'https://dev.aerosync.com',
  staging: 'https://staging.aerosync.com',
  production: 'https://www.aerosync.com',
};
