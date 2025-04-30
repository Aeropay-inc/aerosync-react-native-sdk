import { type AeroSyncEmbeddedInputProps, type AeroSyncWidgetInputProps } from './Types';
import { BankWebView } from './BankWebView';


export function AeroSyncWidget(options: AeroSyncWidgetInputProps) {
  // stylesheet
  // const styles = StyleSheet.create({
  //   container: {
  //     backgroundColor: options?.style?.bgColor || '#FFFFFF',
  //     opacity: options?.style?.opacity || 1,
  //     height: options?.style?.height || '100%',
  //     width: options?.style?.width || '100%',
  //   },
  // });


  // let canGoBack = false;
  // let webViewRef: any;

  // useEffect(() => {
  //   const onBackPress = () => {
  //     /**
  //      * When true is returned the event will not be bubbled up
  //      * & no other back action will execute
  //      */
  //     if (canGoBack && webViewRef) webViewRef.goBack();
  //     else options.onClose();
  //     return true;
  //   };
  //   // the backhandler API detects hardware button presses for back navigation
  //   if (Platform.OS === 'android')
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //   return () => {
  //     if (Platform.OS === 'android')
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   };
  // }, []);

  // const handleNavigationStateChange = (NavState: WebViewNavigation) => {
  //   const { url } = NavState;
  //   canGoBack = NavState.canGoBack;
  //   if (url.includes('/bank/connect')) canGoBack = false;
  // };

  return (
    <BankWebView type='widget'  {...options} />
  );
}


export function AeroSyncEmbeddedView(options: AeroSyncEmbeddedInputProps) {
  return (
    <BankWebView type='embedded' {...options} />
  );
}