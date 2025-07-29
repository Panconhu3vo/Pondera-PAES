import { Text, StyleSheet, View } from "react-native";
import color from "../constants/Colores";
export default function CareerDescription({
    NameCareer,
    NameUniversity,
    Description,
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.nameCareer}>{NameCareer}</Text>
            <Text style={styles.nameUniversity}>{NameUniversity}</Text>
            <Text style={styles.description}>{Description}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    nameCareer: {
        color: color.primario,
        fontSize: 24,
        border: 1,
        fontFamily: "Raleway-Bold",
    },
    nameUniversity: {
        color: color.secundario,
        fontSize: 18,
        fontFamily: "Raleway-Bold",
    },

    description: {
        color: color.primario,
        fontSize: 14,
        fontFamily: "Raleway-Bold",
    },

    container: {
        width: 360,
    },
});
