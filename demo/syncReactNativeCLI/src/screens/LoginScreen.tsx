import Icon from '@react-native-vector-icons/fontawesome6';
import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { TextInput, Title, useTheme, Button } from 'react-native-paper';
import { Support } from '../components/support';

const LoginScreen = ({ onLogin }) => {
    const { colors } = useTheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          onLogin?.();
        }, 500);
      };
  return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            >
            <View style={styles.innerContainer}>
                <Title style={styles.title}>Syncrovibe Login</Title>

                <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                mode="outlined"
                left={<TextInput.Icon icon={() => <Icon name="user" size={16} />} />}
                style={styles.input}
                />

                <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                mode="outlined"
                left={<TextInput.Icon icon={() => <Icon name="lock" size={16} iconStyle='solid' />} />}
                style={styles.input}
                />

                <Button
                mode="contained"
                onPress={handleSubmit}
                loading={loading}
                disabled={!username || !password}
                style={styles.button}
                >
                Login
                </Button>

                {/* <View style={styles.iconRow}>
                    <Support />
                </View> */}
            </View>
            </KeyboardAvoidingView>
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    innerContainer: {
      marginHorizontal: 24,
      alignItems: 'center',
    },
    icon: {
      marginBottom: 12,
    },
    title: {
      fontSize: 28,
      marginBottom: 24,
    },
    subtitle: {
      fontSize: 16,
      color: '#888',
      marginBottom: 24,
    },
    input: {
      width: '100%',
      marginBottom: 16,
    },
    button: {
      marginTop: 12,
      width: '100%',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 18,
        gap: 25
      },
  });