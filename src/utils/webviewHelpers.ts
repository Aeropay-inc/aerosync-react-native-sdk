import type { RefObject } from 'react';
import { WebView } from 'react-native-webview';
import type { WidgetPostMessageEvent } from '../Types';

export const postMessageToWebView = (
    webViewRef: RefObject<WebView | null>,
    message: WidgetPostMessageEvent
): void => {
    if (webViewRef?.current) {
        const jsToInject = `
            window.postMessage(${JSON.stringify(message)}, '*');
            true;
        `;
        webViewRef.current.injectJavaScript(jsToInject);
    }
};