import { useStore } from "../context/StoreContext";
import { useState } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Switch, Text, useTheme } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { env } from 'aerosync-react-native-sdk';
import Toast from 'react-native-toast-message';

export default function SettingScreen() {
    const theme = useTheme();
    const { setWidgetConfigAction } = useStore();
    const [open, setOpen] = useState(false);
    const [selectedEnv, setSelectedEnv] = useState<string | null>(null);
    const [token, setToken] = useState<string>('');
    const [configId, setConfigId] = useState<string>('');
    const [aeroPassId, setAeroPassId] = useState<string>('');
    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
    const toggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const envItems = Object.entries(env).map(([key, value]) => ({
        label: `${key.toUpperCase()}`,
        value: key,
      }));
    
    const handleSubmit = () => {
        if(token.trim() === '') {
            Toast.show({
                type: 'error',
                text1: 'Token is required!'
                });
            return
        }
        const newConfig = {
            token: token,
            environment: selectedEnv || 'dev',
            configurationId: configId,
            aeroPassUserUuid: aeroPassId,
            isEmbeddedFlow: isSwitchOn,
            };
            // Set widget config in context
            setWidgetConfigAction(newConfig); 
            // show toast 
            Toast.show({
                type: 'success',
                text1: 'Configuration updated successfully!'
              });
      };
    
    return (
        <ScrollView contentContainerStyle={styles.container} style={[{ backgroundColor: theme.colors.background }]}>
        <View  style={[{ backgroundColor: theme.colors.background }]}>
            <Text variant="headlineSmall" style={[styles.header, { color: theme.colors.text}]}>Application Settings</Text>
            <Text variant="bodySmall" style={[styles.headerDescription, { color: 'gray'}]}>Manage your details and personal preferences here</Text>

            {/* Token */}
            <View style={styles.formElement}>
                <Text variant="bodyLarge">Token *</Text>
                <TextInput
                value={token}
                onChangeText={setToken}
                mode="outlined"
                style={styles.input}
                />
            </View>

            {/* configId */}
            <View style={styles.formElement}>
                <Text variant="bodyLarge">configuration Id</Text>
                <TextInput
                value={configId}
                onChangeText={setConfigId}
                mode="outlined"
                style={styles.input}
                />
            </View>
            
            {/* aeropassId */}
            <View style={styles.formElement}>
                <Text variant="bodyLarge">AeroPass ID</Text>
                <TextInput
                value={aeroPassId}
                onChangeText={setAeroPassId}
                mode="outlined"
                style={styles.input}
                />
            </View>                        

            {/* Label + Dropdown Selector */}
            <View style={styles.formElement}>
                <Text variant="bodyLarge">Environment *</Text>
                <DropDownPicker
                    open={open}
                    value={selectedEnv}
                    items={envItems}
                    setOpen={setOpen}
                    setValue={setSelectedEnv}
                    setItems={() => {}}
                    listMode="SCROLLVIEW"
                    placeholder="Select an option"
                    placeholderStyle={{
                        color: '#999999',
                      }}
                    style={[
                        styles.dropdown,
                        {
                          backgroundColor: theme.colors.text === '#ffffff' ? '#121212' : '#FAFAFA',
                          borderColor: theme.colors.text === '#ffffff' ? '#79747E' : '#938F99',
                          borderRadius: 4,
                          borderWidth: 1,
                        },
                      ]}
                      dropDownContainerStyle={{
                        backgroundColor: theme.colors.surface, 
                        borderColor: theme.colors.outline,
                      }}
                      textStyle={{
                        color: theme.colors.text, 
                      }}
                      selectedItemContainerStyle={{
                        backgroundColor: theme.colors.primary, 
                      }}
                      selectedItemLabelStyle={{
                        fontWeight: 'bold',
                      }}               
                />
            </View>

            {/* Label + Switch */}
            <View style={styles.formSwitchElement}>
                <Text variant="bodyLarge" style={styles.formSwitchElementLabel}>Embedded View ?</Text>
                <Switch value={isSwitchOn} onValueChange={toggleSwitch} />
            </View>

            {/* Submit Button */}
            <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                Submit
            </Button>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    header: {
      textAlign: 'center',
    },
    headerDescription: {
        textAlign: 'center',
        marginBottom: 40,
    },
    formElement: {
      marginBottom: 20,
    },
    formSwitchElement: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    formSwitchElementLabel: {
        flex: 1
    },
    input: {
      marginTop: 8,
    },
    submitButton: {
      marginTop: 20,
      alignSelf: 'center',
    },
    dropdown: {
        marginBottom: 20,
        height: 60,
        marginTop: 8
      },
  });
  