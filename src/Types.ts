import type { DimensionValue, ColorValue } from 'react-native';

export interface Options {
  onLoad: () => void;
  onClose: () => void;
  onSuccess: (event: SuccessEventType) => void;
  onEvent: (event: WidgetEventType) => void;
  onError: (event: string) => void;
  token: string;
  configurationId?: string;
  aeroPassUserUuid?: string;
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
  environment: string;
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
