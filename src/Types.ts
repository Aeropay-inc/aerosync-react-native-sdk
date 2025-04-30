import type { DimensionValue, ColorValue } from 'react-native';

export type Environment = 'dev' | 'staging' | 'sandbox' | 'production';

export const env: { [key in Environment]: string } = {
  dev: 'https://qa-sync.aero.inc',
  staging: 'https://staging-sync.aero.inc',
  sandbox: 'https://sandbox.aerosync.com',
  production: 'https://sync.aero.inc',
};

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
  limitsNavigationsToAppBoundDomains?: boolean;
  style?: {
    bgColor: ColorValue;
    opacity: number;
    width: DimensionValue;
    height: DimensionValue;
  };
}

export type AeroSyncEmbeddedProps = Pick<AeroSyncWidgetProps,
  'token' | 'onLoad' | 'onError' | 'consumerId' | 'environment' | 'deeplink'> & {
    type: 'embedded'
    onBankClick: () => void;
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
