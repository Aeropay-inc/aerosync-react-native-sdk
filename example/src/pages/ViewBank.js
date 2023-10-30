/**
 * AeroSync UI HomePage
 * The defaut page of AeroSync App
 */
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";

export default function ViewBank({ navigation, route }) {

    return (
        <View style={styles.container}>
                <Image style={styles.image} source={require("../../assets/icon.png")} />
                <Text style={styles.HomeTitle}>Add new Bank</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddBank')}
                    style={styles.loginBtn}>
                        <Text style={styles.loginText}>
                        Launch AeroSync-UI</Text>
                </TouchableOpacity>

            {route.params && Object.keys(route.params.data).length === 0 &&
                    <Text style={styles.ResponseTitle}>
                        Aerosync-UI webview was closed. Please retry!
                    </Text>
            }
            {route.params && Object.keys(route.params.data).length > 0 &&
                <Text style={styles.ResponseTitle}>
                    Bank Added successfully!{"\n"}
                    Client Name: {route.params.data.ClientName}{"\n"}
                    User ID: user_id: {route.params.data.user_id}{"\n"}
                </Text>
            }
            {!route.params &&
                <Text style={styles.ResponseTitle}>
                    No banks have been added yet.{"\n"}
                    To continue click on 'Launch Aerosync-UI' button.
                </Text>
            }
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
        marginBottom: 30,
        fontSize: 20,
        fontWeight: 'bold'
    },
    ResponseTitle: {
        marginTop: 30,
        fontSize: 15,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#24c3d2",
    },
});