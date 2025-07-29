import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { useFonts } from "@expo-google-fonts/raleway";
import { CUSTOM_FONTS } from "./src/constants/Fonts";

import PantallaInicio from "./src/screens/PantallaInicio";
import Input from "./src/components/Input";

export default function App() {
    //Importando fonts de forma global
    const [fontsLoaded] = useFonts(CUSTOM_FONTS);
    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <PantallaInicio />
            <Input />

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 40,
    },
});
