import type { DimensionValue, ColorValue } from 'react-native';

export type Environment = 'dev' | 'staging' | 'sandbox' | 'production';

export const env: { [key in Environment]: string } = {
  dev: 'https://qa-sync.aero.inc',
  staging: 'https://staging-sync.aero.inc',
  sandbox: 'https://sandbox.aerosync.com',
  production: 'https://sync.aero.inc',
};

export interface Options {
  onLoad: () => void;
  onClose: () => void;
  onSuccess: (event: SuccessEventType) => void;
  onEvent: (event: WidgetEventType) => void;
  onError: (event: string) => void;
  token: string;
  configurationId?: string;
  aeroPassUserUuid?: string;
  manualLinkOnly?: boolean;
  deeplink?: string;
  handleMFA?: boolean;
  jobId?: string;
  userId?: string;
  style?: {
    bgColor: ColorValue;
    opacity: number;
    width: DimensionValue;
    height: DimensionValue;
  };
  environment: Environment;
}

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
