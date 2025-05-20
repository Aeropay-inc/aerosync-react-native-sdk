# aerosync-react-native-sdk

This React Native SDK provides an interface to load Aerosync-UI in React Native application. Securely link your bank account through your bank’s website. Log in with a fast, secure, and tokenized connection. Your information is never shared or sold.

## 1. Install and Link Aerosync React Native SDK

Install the `aerosync-react-native-sdk` library along with its required peer dependency, `react-native-webview`:

```sh
npm install aerosync-react-native-sdk react-native-webview
```

Note: `react-native-webview` is a required peer dependency for `aerosync-react-native-sdk`.

### iOS Setup

1. Navigate to the ios directory and install CocoaPods dependencies:
   `cd ios
pod install`

2. Ensure your iOS deployment target is **11.0 or higher**.

### Android Setup

1. Make sure the following permission is added to your `AndroidManifest.xml`, if required:
   `<uses-permission android:name="android.permission.INTERNET" />`

2. Autolinking should handle the native module setup automatically—no manual changes needed.

## 2. Minimal example to implement Aerosync React Native Sdk

```PaymentScreen.tsx

import {
  AeroSyncWidget,
  SuccessEventType,
  WidgetEventType,
} from "aerosync-react-native-sdk";

import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Toast from "react-native-toast-message";
import Modal from 'react-native-modal';
import { useStore } from "../context/StoreContext";
import { useThemeContext } from "../context/ThemeContext";
import { Button } from "react-native-paper";

export default function PaymentScreen() {
  const { widgetConfig } = useStore();
  const { isDarkTheme } = useThemeContext();

  // State to control whether the widge is shown
  const [isWidgetEnabled, setIsWidgetEnabled] = useState(false);

  // Determine widget theme based on app theme
  const currentTheme = isDarkTheme ? 'dark' : 'light';

  // Deeplink scheme used for routing back from external services
  const DEEP_LINK = 'syncroVibeReactCli://';

  // --- Callback: Widget loaded successfully
  const onWidgetLoad = () => {
    console.log('Widget loaded');
  };

  // --- Callback: Widget was closed (either manually or automatically)
  const onWidgetClose = () => {
    console.log('Widget closed');
    setIsWidgetEnabled(false);  // Hide widget modal
  };

  // --- Callback: User successfully linked their bank and widget closed
  const onWidgetSuccess = (event: SuccessEventType) => {
    console.log('Bank linking successful', event);
    setIsWidgetEnabled(false);  // Hide widget modal

    // Show a toast to inform the user of success(optional)
    Toast.show({
      type: 'success',
      text1: 'Bank linked successfully!',
    });
  };

  // --- Callback: Fired on every widget event
  const onWidgetEvent = (event: WidgetEventType) => {
    console.log('Widget event:', event);
  };

  // --- Callback: Widget encountered an error
  const onWidgetError = (event: string) => {
    console.log('Widget error:', event);
  };

  const showWidget = () =>  {
    setIsWidgetEnabled(true)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      {/*
  			Full-screen modal to display the AeroSync widget to link a bank.
  			This modal is optional — you can customize or replace it with your own
        layout/styling as needed.
			*/}
      <Modal
        style={styles.modal}
        isVisible={isWidgetEnabled}
        propagateSwipe
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={600}
        animationOutTiming={600}
      >
        {/* AeroSync Widget: bank linking process */}
        <AeroSyncWidget
          onLoad={onWidgetLoad}
          onError={onWidgetError}
          onClose={onWidgetClose}
          onEvent={onWidgetEvent}
          onSuccess={onWidgetSuccess}
          token={widgetConfig?.token!}
          deeplink={DEEP_LINK}
          theme={currentTheme}
          consumerId={widgetConfig?.configurationId}
          environment={widgetConfig?.environment!}
          customWebViewProps={{
            style: { marginTop: 30, backgroundColor: isDarkTheme ? '#000000' : '#FFFFFF' }
          }}
        />
      </Modal>

      {/* Main content area */}
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Select a payment method</Text>
          <Button mode="contained"  style={styles.linkButton} onPress={showWidget}>
                Link new bank
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  linkButton: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#80bfff'
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});


```

## Readme.io document

For more information check the comlete guide here: https://api-aeropay.readme.io/docs/react-native-sdk

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

This project is licensed under the MIT License.
