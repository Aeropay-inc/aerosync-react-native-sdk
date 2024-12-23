import type { DimensionValue, ColorValue } from 'react-native';

export interface Options {
  onLoad: () => void;
  onClose: () => void;
  onSuccess: (event: SuccessEventType) => void;
  onEvent: (event: WidgetEventType) => void;
  onError: (event: string) => void;
  token: string;
  consumerId?: string;
  deeplink?: string;
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
  environment: string;
}

export interface SuccessEventType {
  user_id: string;
  user_password: string;
  ClientName: string;
  FILoginAcctId: string | Number;
}

export interface WidgetEventType {
  pageTitle: string;
  onLoadApi: string;
}
