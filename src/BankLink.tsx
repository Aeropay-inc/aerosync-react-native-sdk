import { type AeroSyncEmbeddedProps, type AeroSyncWidgetProps } from './Types';
import { BankWebView } from './BankWebView';

export function AeroSyncWidget(options: AeroSyncWidgetProps) {

  return (
    <BankWebView type='widget' props={options} />
  );
}

export function AeroSyncEmbeddedView(options: AeroSyncEmbeddedProps) {
  return (
    <BankWebView type='embedded' props={options} />
  );
}