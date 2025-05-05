import type { RefObject } from "react";
import type WebView from "react-native-webview";

class AeroSyncSDK {
    private widgetWebViewRef: RefObject<WebView | null> = { current: null };
    private embeddedWebViewRef: RefObject<WebView | null> = { current: null };

    get getWidgetWebViewRef() {
        return this.widgetWebViewRef;
    }

    setWidgetWebViewRef(ref: RefObject<WebView | null>) {
        this.widgetWebViewRef = ref;
    }

    get getEmbeddedWebViewRef() {
        return this.embeddedWebViewRef;
    }

    setEmbeddedWebViewRef(ref: RefObject<WebView | null>) {
        this.embeddedWebViewRef = ref;
    }
    clear() {
        this.widgetWebViewRef = { current: null }
        this.embeddedWebViewRef = { current: null }
    }
}

export default new AeroSyncSDK;