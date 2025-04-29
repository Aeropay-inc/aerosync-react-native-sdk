import { useStore } from "../context/StoreContext";
import { useState } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Switch, Text, useTheme } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SettingScreen() {
    const theme = useTheme();
    const { widgetConfig, setWidgetConfigAction } = useStore();
    const setUser = () => {
    const newConfig = {
        token: 'some-token',
        environment: 'qa',
        configurationId: 'config123',
        aeroPassUserUuid: 'user-uuid-123',
        isEmbeddedFlow: true,
        };
        setWidgetConfigAction(newConfig); // Set widget config in context
    };

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);
    const [token, setToken] = useState<string>('');
    const [configId, setConfigId] = useState<string>('');
    const [aeroPassId, setAeroPassId] = useState<string>('');
    const [dropdownValue, setDropdownValue] = useState<string | undefined>('');
    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
    const toggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    
    const handleSubmit = () => {
        // console.log({
        //   textInputValue,
        //   dropdownValue,
        //   isSwitchOn,
        // });
      };
    
    return (
        <ScrollView contentContainerStyle={styles.container} style={[{ backgroundColor: theme.colors.background }]}>
        <View  style={[{ backgroundColor: theme.colors.background }]}>
            <Text variant="headlineSmall" style={[styles.header, { color: theme.colors.text}]}>Application Settings</Text>
            <Text variant="bodySmall" style={[styles.headerDescription, { color: 'gray'}]}>Manage your details and personal preferences here</Text>

            {/* Token */}
            <View style={styles.formElement}>
                <Text variant="bodyLarge">Token</Text>
                <TextInput
                label="sync token"
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
                label="customization Id"
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
                label="aeroPassUserUuid"
                value={aeroPassId}
                onChangeText={setAeroPassId}
                mode="outlined"
                style={styles.input}
                />
            </View>                        

            {/* Label + Dropdown Selector */}
            <View style={styles.formElement}>
                <Text variant="bodyLarge">Environment</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
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
      },
  });
  