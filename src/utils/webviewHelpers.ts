import type { RefObject } from 'react';
import { WebView } from 'react-native-webview';
import type { WidgetPostMessageEvent } from '../Types';

export const postMessageToWebView = (
    webViewRef: RefObject<WebView>,
    message: WidgetPostMessageEvent
): void => {
    if (webViewRef?.current) {
        webViewRef.current.postMessage(JSON.stringify(message));
    }
};