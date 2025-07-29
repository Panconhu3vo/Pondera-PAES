import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Title from "./src/components/Titles";
import { useFonts } from "@expo-google-fonts/raleway";
import { CUSTOM_FONTS } from "./src/constants/Fonts";
import CareerDescription from "./src/components/CareerDescription";

export default function App() {
    //Importando fonts de forma global
    const [fontsLoaded] = useFonts(CUSTOM_FONTS);
    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <CareerDescription
                NameCareer={
                    "Licenciatura en Ingeniería en Ciencia de la Computación"
                }
                Description={
                    "{Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum}"
                }
                NameUniversity={"Pontif.Universidad Catolica de Chile"}
            />
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
