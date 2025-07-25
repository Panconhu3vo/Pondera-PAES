import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Title from "./src/components/Titles";
import { useFonts } from "@expo-google-fonts/raleway";
import { CUSTOM_FONTS } from "./src/constants/Fonts";

export default function App() {
    //Importando fonts de forma global
    const [fontsLoaded] = useFonts(CUSTOM_FONTS);
    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <Title textTitle={"Pondera PAES"} />
            <Title textTitle={"Pondera PAES"} />

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
