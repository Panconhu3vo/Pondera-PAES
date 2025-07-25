import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
    //Importando fonts de forma global
    const [fontsLoaded] = useFonts(CUSTOM_FONTS);
    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
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
});
