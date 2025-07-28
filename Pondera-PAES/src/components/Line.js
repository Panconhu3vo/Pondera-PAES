import { View, StyleSheet } from "react-native";
import color from "../constants/Colores";
export default function Line() {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                margin: 1,
            }}>
            <View style={styles.line}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    line: {
        borderBottomColor: color.terciario,
        borderBottomWidth: 2,
        width: 250,
        borderRadius: 10,
    },
});
