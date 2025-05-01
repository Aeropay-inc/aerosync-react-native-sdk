import type { WebViewProps } from 'react-native-webview';

export interface AeroSyncWidgetProps {
  type: 'widget'
  token: string;
  onLoad: () => void;
  onError: (event: string) => void;
  onEvent: (event: WidgetEventType) => void;
  onClose: () => void;
  onSuccess: (event: SuccessEventType) => void;
  consumerId?: string;
  environment: Environment;
  manualLinkOnly?: boolean;
  deeplink: string;
  handleMFA?: boolean;
  jobId?: string;
  userId?: string;
  stateCode?: string,
  customWebViewProps?: CustomWebViewProps;
  theme?: WidgetThemeType
}

export type CustomWebViewProps = Omit<WebViewProps, HiddenWebViewProps>

export type AeroSyncEmbeddedProps = Pick<AeroSyncWidgetProps,
  'token' | 'onLoad' | 'onError' | 'consumerId' | 'environment' | 'deeplink' | 'theme'> & {
    type: 'embedded',
    onBankClick: (event: WidgetEventBankClickType) => void;
  }

export type AeroSyncWebViewProps = AeroSyncWidgetProps | AeroSyncEmbeddedProps;

export type AeroSyncWidgetInputProps = Omit<AeroSyncWidgetProps, 'type'>;

export type AeroSyncEmbeddedInputProps = Omit<AeroSyncEmbeddedProps, 'type'>;


export interface SuccessEventType {
  userId: string;
  connectionId: string;
  clientName: string;
  aeroPassUserUuid: string;
}

export interface WidgetEventType {
  pageTitle: string;
  onLoadApi: string;
}

export interface WidgetEventBankClickType {
  stateCode: string
}

export type Environment = 'dev' | 'staging' | 'sandbox' | 'production';

export const env: { [key in Environment]: string } = {
  dev: 'https://qa-sync.aero.inc',
  staging: 'https://staging-sync.aero.inc',
  sandbox: 'https://sandbox.aerosync.com',
  production: 'https://sync.aero.inc',
};

const WidgetThemes = {
  Light: 'light',
  Dark: 'dark'
} as const


export type WidgetThemeType = typeof WidgetThemes[keyof typeof WidgetThemes]

type HiddenWebViewProps =
  | 'onMessage'
  | 'injectedJavaScript'
  | 'source'
  | 'onNavigationStateChange'
  | 'injectedJavaScriptBeforeContentLoaded'
  | 'onShouldStartLoadWithRequest'
  | 'onLoadStart'
  | 'onLoadEnd'
  | 'onLoadProgress'
  | 'renderError'
  | 'renderLoading'
  | 'onContentProcessDidTerminate'
  | 'userAgent'
  | 'originWhitelist'
  | 'allowUniversalAccessFromFileURLs'
  | 'sharedCookiesEnabled'
  | 'onHttpError'
  | 'onSslError'
  | 'onRenderProcessGone';