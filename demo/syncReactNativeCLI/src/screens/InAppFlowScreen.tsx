import React, { useMemo, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useStore } from '../context/StoreContext';
import { useFocusEffect } from '@react-navigation/native';
import { useRef } from 'react';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native';
import { Platform } from 'react-native';

// Build a URL with query params based on key/value pairs
export function buildUrlWithParams(
    baseUrl: string,
    params: Record<string, string | number | boolean | null | undefined>
): string {
    try {
        const url = new URL(baseUrl);
        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            url.searchParams.set(key, String(value));
        });
        return url.toString();
    } catch (_err) {
        // Fallback for RN without URL polyfill or malformed baseUrl
        const query = Object.entries(params)
            .filter(([, v]) => v !== undefined && v !== null)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
            .join('&');
        if (!query) return baseUrl;
        return baseUrl.includes('?') ? `${baseUrl}&${query}` : `${baseUrl}?${query}`;
    }
}

export default function InAppFlowScreen() {
    const theme = useTheme();
    const { widgetConfig } = useStore();
    const webViewRef = useRef<WebView>(null);

    const onWebViewMessage = async (event: any) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);

            /*
             * If the workflow is inAppBrowser, open the widgetUrl in inAppBrowser
             */
            if (data.type === 'inAppBrowser' && data.url) {
                const targetUrl = data.url;

                try {
                    const available = await InAppBrowser.isAvailable();

                    if (available) {
                        // inappbrowser openAuth
                        await InAppBrowser.open(targetUrl, {
                            dismissButtonStyle: 'close',
                            animated: true,
                            showInRecents: true,
                            modalEnabled: true,
                            enableBarCollapsing: true,
                            showTitle: true,
                            forceCloseOnRedirection: false,
                            toolbarColor: Platform.OS === 'android' ? '#ffffff' : undefined,
                        });
                    } else {
                        Linking.openURL(targetUrl);
                    }
                } catch (err) {
                    console.warn('Failed to open InAppBrowser, falling back to Linking:', err);
                    Linking.openURL(targetUrl);
                }
            } else {
                console.warn('Invalid message from WebView:', data);
            }
        } catch (error) {
            console.error('Invalid message from WebView:', error);
        }
    };

    // Prepare a string to inject the widgetConfig into the window before content loads
    const injectedConfig = useMemo(() => {
        const cfg = widgetConfig ? {
            token: widgetConfig.token,
            environment: widgetConfig.environment,
            configurationId: widgetConfig.configurationId,
            aeroPassUserUuid: widgetConfig.aeroPassUserUuid,
            isEmbeddedFlow: widgetConfig.isEmbeddedFlow,
            isHandleMFAFlow: widgetConfig.isHandleMFAFlow,
            stateCode: widgetConfig.stateCode,
            jobId: widgetConfig.jobId,
            connectionId: widgetConfig.connectionId,
        } : {};
        return `
          (function(){
            try {
              // Set initial config
              window.__WIDGET_CONFIG__ = ${JSON.stringify(cfg)};
              // Provide a setter RN can call later without reloading the page
              window.__SET_WIDGET_CONFIG__ = function(next){
                try {
                  if (next && typeof next === 'object') {
                    window.__WIDGET_CONFIG__ = Object.assign({}, window.__WIDGET_CONFIG__ || {}, next);
                    console.log('window.__WIDGET_CONFIG__ updated');
                  }
                } catch(e) {}
              }
            } catch(e) {}
          })();
          true; // required on Android
        `;
    }, [widgetConfig]);

    // On screen focus, push the latest store values into the already-mounted WebView (no reload)
    useFocusEffect(
        useCallback(() => {
            const latest = widgetConfig ? {
                token: widgetConfig.token,
                environment: widgetConfig.environment,
                configurationId: widgetConfig.configurationId,
                aeroPassUserUuid: widgetConfig.aeroPassUserUuid,
                isEmbeddedFlow: widgetConfig.isEmbeddedFlow,
                isHandleMFAFlow: widgetConfig.isHandleMFAFlow,
                stateCode: widgetConfig.stateCode,
                jobId: widgetConfig.jobId,
                connectionId: widgetConfig.connectionId,
            } : {};
            const js = `try{window.__SET_WIDGET_CONFIG__ && window.__SET_WIDGET_CONFIG__(${JSON.stringify(latest)});}catch(e){}`;
            // Allow the WebView to be ready before injection
            setTimeout(() => webViewRef.current?.injectJavaScript(js), 0);
        }, [widgetConfig])
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.webContainer}>
                <WebView
                    ref={webViewRef}
                    source={require('../external/index.html')}
                    style={styles.webview}
                    originWhitelist={['*']}
                    onMessage={onWebViewMessage}
                    injectedJavaScriptBeforeContentLoaded={injectedConfig}
                    javaScriptEnabled
                    domStorageEnabled
                    startInLoadingState
                    allowsBackForwardNavigationGestures
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webContainer: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
});
