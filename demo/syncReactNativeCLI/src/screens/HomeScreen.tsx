import { StyleSheet, View } from "react-native";
import { Text, useTheme } from 'react-native-paper';

const HomeScreen = () => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>
                Welcome to Our App 
            </Text>
            <Text style={[styles.description, { color: colors.text === '#ffffff' ? '#d1d1d1' : '#585858' }]}>
                This is the home page where you can find the latest features and updates.
                Enjoy exploring the app, and feel free to provide feedback. {}
            </Text>
        </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20, 
    },
    title: {
      fontSize: 32,  
      fontWeight: 'bold', 
      marginBottom: 20, 
    },
    description: {
      fontSize: 18,
      textAlign: 'center',
      lineHeight: 24,
        },
  });


  
  export default HomeScreen;
