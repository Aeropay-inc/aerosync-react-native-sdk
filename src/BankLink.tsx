import { type AeroSyncEmbeddedInputProps, type AeroSyncWidgetInputProps } from './Types';
import { BankWebView } from './BankWebView';

export function AeroSyncWidget(options: AeroSyncWidgetInputProps) {

  return (
    <BankWebView type='widget'  {...options} />
  );
}

export function AeroSyncEmbeddedView(options: AeroSyncEmbeddedInputProps) {
  return (
    <BankWebView type='embedded' {...options} />
  );
}