import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colores from "../constants/Colores";

export default function Title({ textTitle }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{textTitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 32,
        fontWeight: "bold",
        color: colores.primario,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
