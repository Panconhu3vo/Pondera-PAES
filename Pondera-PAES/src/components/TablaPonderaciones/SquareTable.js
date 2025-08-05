import { View, StyleSheet, Text } from "react-native";
import colores from "../../constants/Colores";

export default function SquareTable({ textSquare, rotate, litleSquare }) {
    let squareStyle;

    if (rotate) {
        squareStyle = { width: 45, height: 120 };
    } else if (litleSquare) {
        squareStyle = { width: 45, height: 45 };
    } else {
        squareStyle = { width: 120, height: 45 };
    }

    return (
        <View style={[styles.square, squareStyle]}>
            {rotate ? (
                <View style={styles.rotatedWrapper}>
                    <Text style={[styles.textSquare, styles.rotatedText]}>
                        {textSquare}
                    </Text>
                </View>
            ) : (
                <Text style={styles.textSquare}>{textSquare}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    square: {
        backgroundColor: colores.secundario,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        overflow: "hidden",
    },
    textSquare: {
        fontFamily: "Raleway-Bold",
        fontSize: 15,
        color: colores.primario,
        textAlign: "center",
    },
    rotatedWrapper: {
        transform: [{ rotate: "-90deg" }],
        width: 120,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
    },
    rotatedText: {
        // Asegura que el texto no se corte
        width: 120,
        textAlign: "center",
    },
});
