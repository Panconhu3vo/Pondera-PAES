import { TextInput, View, StyleSheet } from "react-native";
import color from "../constants/Colores";

export default function Input() {
    return (
        <View style={styles.box}>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                maxLength={4}></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        borderColor: color.primario,
        borderWidth: 4,
        borderRadius: 10,
        width: 136,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: 140,
        height: 45,
        textAlign: "center",
        fontFamily: "Raleway-Bold",
        color: color.primario,
        fontSize: 20,
    },
});
