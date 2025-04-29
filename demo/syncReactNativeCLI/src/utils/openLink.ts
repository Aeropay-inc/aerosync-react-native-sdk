import { Linking } from 'react-native';

export async function openLink(url: string) {
  try {
    await Linking.openURL(url);
  } catch (error) {
    console.error('Failed to open URL:', error);
  }
}