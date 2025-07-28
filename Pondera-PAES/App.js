import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { useFonts } from "@expo-google-fonts/raleway";
import { CUSTOM_FONTS } from "./src/constants/Fonts";

import Title from "./src/components/Titles";
import DateBlock from "./src/components/DateBlock";
import Header from "./src/components/Header";

export default function App() {
    //Importando fonts de forma global
    const [fontsLoaded] = useFonts(CUSTOM_FONTS);
    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                }}>
                <Header textTitle={"Ponderaciones"} />
            </View>

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
