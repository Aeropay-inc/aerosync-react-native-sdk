# aerosync-react-native-sdk

This React Native SDK provides an interface to load Aerosync-UI in React Native application. Securely link your bank account through your bank’s website. Log in with a fast, secure, and tokenized connection. Your information is never shared or sold.

## Installation

```sh
npm install aerosync-react-native-sdk
```

## Usage

```js
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
  const configurationId = '';

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
      configurationId={configurationId}
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
```

## Readme.io document

For more information check the comlete guide here: https://api-aeropay.readme.io/docs/react-native-sdk

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

This project is licensed under the MIT License.
