import type { DimensionValue, ColorValue } from 'react-native';

export interface Options {
  onLoad: () => void;
  onClose: () => void;
  onSuccess: (event: object) => void;
  onEvent: (event: object) => void;
  onError: (event: object) => void;
  token: string;
  consumerId?: string;
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
  environment: 'staging' | 'dev' | 'production';
}
