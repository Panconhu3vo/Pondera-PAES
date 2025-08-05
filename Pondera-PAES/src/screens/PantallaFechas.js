import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Platform,
    SafeAreaView,
} from "react-native";

import { useState, useEffect } from "react";
import DateBlock from "../components/DateBlock";

const fechas = require("../../data/Fechas.json");

export default function PantallaFechas() {
    const [fecha, setFecha] = useState([]);
    useEffect(() => {
        if (fechas) {
            setFecha(fechas);
        } else {
            console.log("No se encontro el archivo");
        }
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F5FCFF" }}>
            <View style={styles.pantalla}>
                <FlatList
                    data={fecha}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <DateBlock
                            dia={item.dia < 10 ? "0" + item.dia : item.dia}
                            mes={item.mes}
                            descripcion={item.descripcion}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pantalla: {
        alignItems: "center",
        flex: 1,
        gap: 10,
        backgroundColor: "#F5FCFF",
        flex: 1,
        paddingTop: Platform.OS == "android" && 35,
    },
});
