import { Image, StyleSheet, Text, View } from "react-native";
import { useStore } from "../context/StoreContext";
import { Button, RadioButton, useTheme } from "react-native-paper";
import { useState } from "react";
import Icon from "@react-native-vector-icons/fontawesome6";


export default function PaymentScreen() {
    const { widgetConfig } = useStore();
    const theme = useTheme();
    const [checked, setChecked] = useState('bank');
    const [isCardEnabled, setIsCardEnabled] = useState(false);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.title, { color: theme.colors.text }]}>Select a payment method</Text>

            <View style={styles.splitContainer}>
                <View style={styles.leftSide}>
                <Text style={[styles.carDetails, { color: theme.colors.text }]}>
                    2023 Cadillac CT5 {'\n'}
                    Premium Luxury 4D {'\n'}
                    Sedan Gas
                </Text>
                </View>
                <View style={styles.rightSide}>
                <Image
                    source={require('../assets/image/cadillac.png')}
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

            <Button mode="contained"  style={styles.linkButton} disabled={true}>
                <View style={{ flexDirection: 'row', marginRight: 20, gap: 15 }}>
                    <Icon name="credit-card" iconStyle="solid" size={18} />    
                    <Text style={[styles.buttonText, { color: theme.colors.text }]}>Link new bank</Text>
                    <Icon name="user" iconStyle="solid" size={18} />    
                </View>
            </Button>            

            {/* Radio button for "Credit/Debit card" */}
            <View style={styles.radioButtonContainer}>
                <RadioButton
                value="card"
                status={checked === 'card' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('card')}
                disabled={!isCardEnabled} // Disable if isCardEnabled is false
                />
                <Text style={[[{ color: theme.colors.text }, isCardEnabled ? null : styles.disabledText]]}>
                Credit/Debit card
                </Text>
            </View>

            <Button mode="contained"  style={styles.submitButton} disabled={true}>
                Next: review
            </Button>

        </View>
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
      linkButton: {
        marginBottom: 20,
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: '#80bfff'    
      }
  });