/**
 * Integrate AeroSync UI AddBank
 */
import BankLink from 'aerosync-react-native-sdk';

export default function AddBank({ navigation }) {
  // Aerosync will redirect to this link on mobile app after authentication to resume the workflow
  // update below value with the URL scheme of your app
  // https://reactnavigation.org/docs/deep-linking/
  const deeplink = 'exp://192.168.4.225:8081';

  // Aerosync token
  const token = '';

  // unique ID that represents the client to apply the customization
  // optional parameter - leave it blank if not needed
  const consumerId = '';

  // close webview
  onClose = () => {
    // open new screen and remove previous stack screen
    // navigate to the screen to perform steps after account
    // has been successfully linked
    navigation.replace('ViewBank', { data: response });
  };
  //onSuccess
  onSuccess = (response) => {
    navigation.navigate('ViewBank', { data: response });
  };
  //onEvent
  onEvent = (response) => {
    console.log('Webview event triggered: ', response);
  };
  //onError
  onError = (error) => {
    console.log('error', error);
  };
  //onLoad
  onLoad = () => {
    console.log('onload');
  };

  return (
    <BankLink
      token={token}
      environment="production"
      deeplink={deeplink}
      consumerId={consumerId}
      onSuccess={onSuccess}
      onClose={onClose}
      onEvent={onEvent}
      onError={onError}
      onLoad={onLoad}
      style={{
        width: '100%',
        height: '100%',
        bgColor: '#FFFFFF',
        opacity: 1,
      }}
    />
  );
}
