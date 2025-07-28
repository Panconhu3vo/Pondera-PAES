import { View, StyleSheet, Text } from "react-native";
import colores from "../../constants/Colores";

export default function SquareTable({ textSquare, rotate, litleSquare }) {
    const squareSize = rotate
        ? { width: 45, height: 120 }
        : litleSquare
        ? { width: 45, height: 45 }
        : { width: 120, height: 45 };

    return (
        <View style={[styles.square, squareSize]}>
            <View style={rotate && styles.rotatedTextContainer}>
                <Text style={styles.textSquare}>{textSquare}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    square: {
        backgroundColor: colores.secundario,
        width: 120,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    textSquare: {
        fontFamily: "Raleway-Bold",
        fontSize: 14,
        color: colores.primario,
        textAlign: "center",
    },
    rotatedTextContainer: {
        transform: [{ rotate: "-90deg" }],
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
});
