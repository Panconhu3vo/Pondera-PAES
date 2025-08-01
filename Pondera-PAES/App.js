import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { useFonts } from "@expo-google-fonts/raleway";
import { CUSTOM_FONTS } from "./src/constants/Fonts";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // O cualquier otra librería de iconos que uses

// Importa tus pantallas
import PantallaInfo from "./src/screens/PantallaInfo";
import PantallaInicio from "./src/screens/PantallaInicio";
import PantallaFechas from "./src/screens/PantallaFechas";

const Tab = createBottomTabNavigator();

export default function App() {
    //Importando fonts de forma global
    const [fontsLoaded] = useFonts(CUSTOM_FONTS);
    if (!fontsLoaded) return null;

    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Tab.Navigator
                initialRouteName="Inicio" // Pantalla inicial cuando la app carga
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Info") {
                            iconName = focused ? "book" : "book-outline";
                        } else if (route.name === "Inicio") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "Fechas") {
                            iconName = focused
                                ? "calendar"
                                : "calendar-outline";
                        }

                        // Puedes devolver cualquier componente aquí que quieras como icono
                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor: "#fff", // Color del icono y texto cuando la pestaña está activa
                    tabBarInactiveTintColor: "#8F97BF", // Color del icono y texto cuando la pestaña está inactiva
                    tabBarStyle: {
                        backgroundColor: "#222559", // Color de fondo de la barra de tabs
                        borderTopColor: "#8F97BF", // Color del borde superior de la barra
                        borderTopWidth: 1,
                        height: 90, // Altura de la barra (ajusta si necesitas más espacio para el texto o el icono)
                        paddingBottom: 20, // Espacio para que el texto no se pegue al borde inferior en iOS
                    },
                    tabBarLabelStyle: {
                        fontSize: 12, // Tamaño de la fuente de la etiqueta
                    },
                    headerShown: false, // Oculta el encabezado por defecto si no lo necesitas, o true si quieres el título de la pantalla
                })}>
                <Tab.Screen
                    name="Info"
                    component={PantallaInfo}
                    options={{ title: "Información" }}
                />
                <Tab.Screen
                    name="Inicio"
                    component={PantallaInicio}
                    options={{ title: "Inicio" }}
                />
                <Tab.Screen
                    name="Fechas"
                    component={PantallaFechas}
                    options={{ title: "Calendario" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 40,
    },
});
