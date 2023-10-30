/**
 * AeroSync UI HomePage
 * The defaut page of AeroSync App
 */
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";

export default function HomePage({navigation}) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/icon.png")} />
            <TouchableOpacity>
                <Text style={styles.HomeTitle}>AeroSync UI Mock App</Text>
            </TouchableOpacity>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot_button} >Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() =>
                navigation.navigate('ViewBank')}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
        width: "60%",
        height: "25%"
    },
    inputView: {
        backgroundColor: "#baf5fa",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    HomeTitle: {
        height: 30,
        marginBottom: 30,
        fontSize: 20,
        fontWeight: 'bold'
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#24c3d2",
    }
});