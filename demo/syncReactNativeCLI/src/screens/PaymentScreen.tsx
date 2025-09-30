import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Platform } from "react-native";
import { useStore } from "../context/StoreContext";
import { Button, RadioButton, TextInput, useTheme } from "react-native-paper";
import { useMemo, useState } from "react";
import Icon from "@react-native-vector-icons/fontawesome6";
import Widget from "../components/Widget";
import Toast from "react-native-toast-message";
import Embedded from "../components/embedded";
import Modal from 'react-native-modal';

export default function PaymentScreen() {
  const { widgetConfig } = useStore();
  const theme = useTheme();
  const [checked, setChecked] = useState('bank');
  const [isCardEnabled, setIsCardEnabled] = useState(false);
  const [isWidgetEnabled, setIsWidgetEnabled] = useState(false);
  const [bankLinkData, setBankLinkData] = useState<string | null>(null);

  const formattedBankLinkData = useMemo(() => {
    if (!bankLinkData) return '';
    try {
      const parsed = JSON.parse(bankLinkData);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return bankLinkData;
    }
  }, [bankLinkData]);

  const openWidget = () => {
    /* Widget props guard */
    if (!widgetConfig?.token) {
      Toast.show({
        type: 'error',
        text1: 'Oops! It looks like you haven’t set your token yet.',
        text2: 'Head over to the Settings page to add it.'
      });
      return null;
    };
    setBankLinkData(null);
    setIsWidgetEnabled(true)
  }

  const handleBankLinkSuccess = (data: string) => {
    setIsWidgetEnabled(false);
    setBankLinkData(data);
    Toast.show({
      type: 'success',
      text1: `Bank linked successfully!. | ${data}`,
    });
  }

  return (
    <SafeAreaView style={[{ backgroundColor: theme.colors.background }, { flex: 1 }]}>

      <Modal
        style={styles.modal}
        isVisible={isWidgetEnabled}
        propagateSwipe
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={600}
        animationOutTiming={600}
      >
        <Widget onWidgetClose={() => setIsWidgetEnabled(false)}
          onBankLink={(data: string) => handleBankLinkSuccess(data)} />
      </Modal>
      <ScrollView contentContainerStyle={styles.scrollContent} style={{ flex: 1 }}>
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Select a payment method</Text>

          <View style={styles.splitContainer}>
            <View style={styles.leftSide}>
              <Text style={[styles.carDetails, { color: theme.colors.text }]}>
                KTM RC 200
              </Text>
              <Text style={styles.smallText}>200 cc liquid-cooled</Text>
              <Text style={styles.smallText}>single-cylinder</Text>
              <Text style={styles.smallText}>four-stroke engine</Text>
            </View>
            <View style={styles.rightSide}>
              <Image
                source={require('../assets/image/ktm.png')}
                style={styles.image}
              />
            </View>
          </View>

          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="bank"
              status={checked === 'bank' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('bank')}
            />
            <Text style={{ color: theme.colors.text }}>Pay by bank instantly and save 3%</Text>
          </View>

          {widgetConfig?.isEmbeddedFlow ? (
            <View style={styles.emeddedView}>
              <Embedded onWidgetBankClick={() => setIsWidgetEnabled(true)} />
            </View>
          ) : <Button mode="contained" style={styles.linkButton} onPress={openWidget}>
            <View style={{ flexDirection: 'row', marginRight: 20, gap: 15 }}>
              <Icon name="credit-card" iconStyle="solid" size={18} />
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Link new bank</Text>
              <Icon name="user" iconStyle="solid" size={18} />
            </View>
          </Button>}

          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="card"
              status={checked === 'card' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('card')}
              disabled={!isCardEnabled}
            />
            <Text style={[[{ color: theme.colors.text }, isCardEnabled ? null : styles.disabledText]]}>
              Credit/Debit card
            </Text>
          </View>

          <Button mode="contained" style={styles.submitButton} disabled={true}>
            Next: review
          </Button>
          {bankLinkData ? (
            <TextInput
              label="Linked bank data"
              mode="outlined"
              value={formattedBankLinkData}
              editable={false}
              multiline
              numberOfLines={Math.min(16, formattedBankLinkData.split('\n').length || 8)}
              scrollEnabled
              style={styles.bankDataInput}
            />
          ) : null}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledText: {
    color: 'gray', // To indicate it's disabled
  },
  splitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  leftSide: {
    flex: 1,
    justifyContent: 'center',
  },
  rightSide: {
    flex: 1,
    justifyContent: 'center',
  },
  carDetails: {
    fontSize: 18,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  submitButton: {
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: 60
  },
  bankDataInput: {
    marginTop: 12,
    marginBottom: 40,
    width: '100%',
    minHeight: 200,
    textAlignVertical: 'top',
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }) as string,
  },
  linkButton: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#80bfff'
  },
  smallText: {
    fontSize: 12,
    fontWeight: '300',
    color: '#777',
  },
  emeddedView: {
    marginBottom: 20,
    height: 358,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});