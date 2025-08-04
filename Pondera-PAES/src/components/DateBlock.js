import { View, Text, StyleSheet } from "react-native";
import color from "../constants/Colores";

export default function DateBlock({ dia, mes, descripcion }) {
    return (
        <View style={styles.container}>
            <View style={styles.fecha}>
                <Text style={styles.textMes}>{mes}</Text>
                <Text style={styles.textDia}>{dia}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textDescripcion}>{descripcion}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: color.primario || "#000    ",
        width: 370,
        height: 110,
        borderRadius: 10,
        flexDirection: "row",
        padding: 10,
        gap: 5,
    },
    fecha: {
        alignItems: "center",
        flexDirection: "row",
    },
    textContainer: {
        backgroundColor: color.fondo,
        borderRadius: 10,
        width: 235,
        height: 90,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },

    textMes: {
        fontSize: 16,
        color: "#fff",
        fontFamily: "Raleway-Bold",
        transform: [{ rotate: "-90deg" }],
    },

    textDia: {
        fontSize: 64,
        color: "#fff",
        fontFamily: "Raleway-Bold",
        height: 85,
    },

    textDescripcion: {
        fontSize: 12,
        fontFamily: "Raleway-Bold",
        color: color.primario,
    },
});
