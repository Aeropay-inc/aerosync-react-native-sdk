import type { WebViewProps } from 'react-native-webview';

export interface AeroSyncWidgetProps {
  token: string;
  onLoad: () => void;
  onError: (event: string) => void;
  onEvent: (event: WidgetEventType) => void;
  onClose: () => void;
  onSuccess: (event: SuccessPayload) => void;
  configurationId?: string;
  environment: Environment;
  manualLinkOnly?: boolean;
  deeplink: string;
  handleMFA?: boolean;
  aeroPassUserUuid: string,
  jobId?: string;
  connectionId?: string;
  stateCode?: string,
  customWebViewProps?: CustomWebViewProps;
  theme?: WidgetThemeType
}

export type CustomWebViewProps = Omit<WebViewProps, HiddenWebViewProps>

export type AeroSyncEmbeddedProps = Pick<AeroSyncWidgetProps,
  'token' | 'onLoad' | 'onError' | 'configurationId' | 'environment' | 'deeplink' | 'theme'> & {
    onBankClick: (event: WidgetEventBankClickType) => void;
  }

export type AeroSyncWebViewProps =
  | { type: 'widget', props: AeroSyncWidgetProps }
  | { type: 'embedded', props: AeroSyncEmbeddedProps };

// single-account success (AeroPass returning user + AeroPass link-new-bank)
export interface SuccessEventType {
  connectionId: string;
  clientName: string;
  aeroPassUserUuid: string;
}

// one linked account in the multi-account success payload
export interface SuccessAccountType {
  connectionId: string;
  accountType: string;
  accountNumberDisplay: string;
}

// multi-account success (enable_multiple_account_linking)
export interface MultiAccountSuccessEventType {
  accounts: SuccessAccountType[];
  clientName: string;
  aeroPassUserUuid: string;
}

// onSuccess payload: single-account or multi-account
export type SuccessPayload = SuccessEventType | MultiAccountSuccessEventType;

export interface WidgetEventType {
  pageTitle: string;
  onLoadApi: string;
}

export interface WidgetEventBankClickType {
  stateCode: string
}

export type Environment = 'sandbox' | 'production';

export const env: { [key in Environment]: string } = {
  sandbox: 'https://sandbox-sync.aero.inc',
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

export const WidgetPostMessageTypes = {
  EmbeddedView: 'embeddedView'
} as const

export type WidgetPostMessageType = typeof WidgetPostMessageTypes[keyof typeof WidgetPostMessageTypes]

export type WidgetPostMessage<TType extends WidgetPostMessageType, TPayload extends unknown> =
  TPayload extends undefined ? never : { type: TType, payload: TPayload }

export type WidgetPostMessageOnClose = WidgetPostMessage<'embeddedView', { name: 'onClose' }>
export type WidgetPostMessageOnSuccess = WidgetPostMessage<'embeddedView', { name: 'onSuccess' }>
export type WidgetPostMessageOnToggleTheme = WidgetPostMessage<'embeddedView', { name: 'onToggleTheme', theme: WidgetThemeType }>
export type WidgetPostMessageEvent = WidgetPostMessageOnSuccess | WidgetPostMessageOnClose | WidgetPostMessageOnToggleTheme