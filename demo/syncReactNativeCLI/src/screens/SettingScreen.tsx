import { useStore } from "../context/StoreContext";
import { useState } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput, Button, Switch, Text, useTheme } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { env, Environment } from 'aerosync-react-native-sdk';
import Toast from 'react-native-toast-message';

export default function SettingScreen() {
    const theme = useTheme();
    const { setWidgetConfigAction } = useStore();
    const [open, setOpen] = useState(false);
    const [selectedEnv, setSelectedEnv] = useState<string | null>(null);
    const [token, setToken] = useState<string>('');
    const [configId, setConfigId] = useState<string>('');
    const [aeroPassId, setAeroPassId] = useState<string>('');
    const [jobId, setJobId] = useState<string>('');
    const [connectionId, setConnectionId] = useState<string>('');
    const [isEmbeddedSwitchOn, setIsEmbeddedSwitchOn] = useState<boolean>(false);
    const toggleEmbeddedSwitch = () => setIsEmbeddedSwitchOn(!isEmbeddedSwitchOn);
    const [isHandleMFASwitchOn, setIsHandleMFASwitchOn] = useState<boolean>(false);
    const toggleHandleMFASwitch = () => setIsHandleMFASwitchOn(!isHandleMFASwitchOn);    
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
        if(aeroPassId.trim() === '') {
            Toast.show({
                type: 'error',
                text1: 'Aeropass Id is required!'
                });
            return
        }        
        const newConfig = {
            token: token,
            environment: (selectedEnv || 'dev') as Environment,
            configurationId: configId,
            aeroPassUserUuid: aeroPassId,
            isEmbeddedFlow: isEmbeddedSwitchOn,
            isHandleMFAFlow: isHandleMFASwitchOn
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
        <SafeAreaProvider style={[{ backgroundColor: theme.colors.background }, { flex: 1 }]} edges={['top', 'bottom']}>
          <ScrollView>
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <Text variant="headlineSmall" style={[styles.header, { color: theme.colors.text}]}>Application Settings</Text>
                <Text variant="bodySmall" style={[styles.headerDescription, { color: 'gray'}]}>Manage your details and personal preferences here</Text>

                {/* Embedded */}
                <View style={styles.formSwitchElement}>
                    <Text variant="bodyLarge" style={styles.formSwitchElementLabel}>Embedded View ?</Text>
                    <Switch value={isEmbeddedSwitchOn} onValueChange={toggleEmbeddedSwitch} />
                </View>

                {/* Handle MFA */}
                <View style={styles.formSwitchElement}>
                    <Text variant="bodyLarge" style={styles.formSwitchElementLabel}>Handle MFA ?</Text>
                    <Switch value={isHandleMFASwitchOn} onValueChange={toggleHandleMFASwitch} />
                </View>     

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
                    <Text variant="bodyLarge">AeroPass Id*</Text>
                    <TextInput
                    value={aeroPassId}
                    onChangeText={setAeroPassId}
                    mode="outlined"
                    style={styles.input}
                    />
                </View>                        

                {/* Environment */}
                <View style={styles.formElement}>
                    <Text variant="bodyLarge">Environment</Text>
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

                {/* jobId */}
                { isHandleMFASwitchOn && 
                <View style={styles.formElement} >
                    <Text variant="bodyLarge">Job Id*</Text>
                    <TextInput
                    value={jobId}
                    onChangeText={setJobId}
                    mode="outlined"
                    style={styles.input}
                    />
                </View>}

                {/* connection ID */}
                {
                  isHandleMFASwitchOn && 
                <View style={styles.formElement}>
                    <Text variant="bodyLarge">Connection Id*</Text>
                    <TextInput
                    value={connectionId}
                    onChangeText={setConnectionId}
                    mode="outlined"
                    style={styles.input}
                    />
                </View>                   
                }                         

                <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                    Submit
                </Button>
            </View>
          </ScrollView>
        </SafeAreaProvider>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'flex-start',
      backgroundColor: '#fff',      
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
      alignSelf: 'center',
      marginBottom: 35
    },
    dropdown: {
        height: 60,
        marginTop: 8
      },
  });
  