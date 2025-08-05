import { View, StyleSheet, Text } from "react-native";
import colores from "../../constants/Colores";

export default function SquareTotal({ textSquare }) {
    return (
        <View style={[styles.square]}>
            <Text style={styles.textSquare}>{textSquare}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    square: {
        backgroundColor: colores.secundario,
        width: 139,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    textSquare: {
        fontFamily: "Raleway-Bold",
        fontSize: 15,
        color: colores.primario,
        textAlign: "center",
    },
});
