import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import color from "../constants/Colores";

export default function ButtonRed({ textButton, buttonFunction }) {
    return (
        <View>
            <TouchableOpacity onPress={buttonFunction} style={styles.button}>
                <Text style={styles.textButton}>{textButton}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    textButton: {
        fontFamily: "Raleway-Bold",
        fontSize: 14,
        color: color.primario,
    },
    button: {
        borderColor: color.terciario,
        borderWidth: 4,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        width: 120,
        paddingHorizontal: 20,
    },
});
