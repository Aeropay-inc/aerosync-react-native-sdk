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
/**
 * Sample App
 * https://github.com/Aeropay-inc/aerosync-react-native-sdk/blob/main/sample/App.tsx
 *
 * @format
 */

import React, {useState} from 'react';
import BankLink, {
  SuccessEventType,
  WidgetEventType,
  Environment,
} from 'aerosync-react-native-sdk';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function App(): React.JSX.Element {
  const [token, settoken] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [configurationId, setConfigurationId] = useState('');
  const [aeroPassUserUuid, setAeroPassUserUuid] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('staging' as Environment);
  const [output, setoutput] = useState('');
  const [items, setItems] = useState([
    {label: 'DEV', value: 'dev'},
    {label: 'STAGING', value: 'staging'},
    {label: 'SANDBOX', value: 'sandbox'},
    {label: 'PRODUCTION', value: 'production'},
  ]);

  const onLoad = () => {
    console.log('onLoad');
  };

  const onClose = () => {
    console.log('onClose');
    setIsSubmitted(false);
  };

  const onSuccess = (event: SuccessEventType) => {
    setoutput(JSON.stringify(event));
    console.log('onSuccess', event);
    setIsSubmitted(false);
  };

  const onEvent = (event: WidgetEventType) => {
    console.log('onEvent', event);
  };

  const onError = (event: string) => {
    console.log('onError', event);
  };

  if (isSubmitted) {
    return (
      <SafeAreaView>
        <BankLink
          token={token}
          environment={value}
          onError={onError}
          onClose={onClose}
          onEvent={onEvent}
          onSuccess={onSuccess}
          onLoad={onLoad}
          deeplink="testaerosyncsample://"
          configurationId={configurationId}
          aeroPassUserUuid={aeroPassUserUuid}
          style={{
            width: '100%',
            height: '100%',
            opacity: 1,
            bgColor: '#FFFFFF',
          }}></BankLink>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity>
            <Text style={styles.OutputTitle}>{output}</Text>
          </TouchableOpacity>
          <View style={styles.dropdownView}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="select environment*"
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Aerosync token*"
              onChangeText={token => settoken(token)}
              placeholderTextColor="#003f5c"
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter  configurationId (optional)"
              onChangeText={configurationId =>
                setConfigurationId(configurationId)
              }
              placeholderTextColor="#003f5c"
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter aeroPassUserUuid (optional)"
              onChangeText={aeroPassUserUuid =>
                setAeroPassUserUuid(aeroPassUserUuid)
              }
              placeholderTextColor="#003f5c"
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => setIsSubmitted(true)}>
            <Text style={styles.loginText}>Launch Aerosync widget</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  image: {
    marginBottom: 40,
    width: '25%',
    height: '15%',
  },
  inputView: {
    borderWidth: 1,
    borderRadius: 5,
    width: '70%',
    height: 45,
    marginBottom: 20,
  },
  dropdownView: {
    width: '70%',
    height: 45,
    marginBottom: 20,
    zIndex: 100,
  },
  TextInput: {
    color: 'black',
    height: 50,
    flex: 1,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  OutputTitle: {
    color: 'black',
    height: 100,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#24c3d2',
  },
  loginText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default App;

```

## Readme.io document

For more information check the comlete guide here: https://api-aeropay.readme.io/docs/react-native-sdk

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

This project is licensed under the MIT License.
