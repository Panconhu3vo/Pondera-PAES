import { View, Text, StyleSheet, Platform, SafeAreaView } from "react-native";
import UniversidadesDropDown from "../components/DropButtons/UniversidadesDropDown";
import Header from "../components/Header";
import { useState } from "react";
import color from "../constants/Colores";
import CarrerasDropDown from "../components/DropButtons/CarrerasDropDown";

export default function PantallaConfiguracion() {
    const [valueU, setValueU] = useState(null);
    const [valueC, setValueC] = useState(null);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header textTitle={"Selecciona tu carrera"} />
                <Text style={styles.label}>Univerisdad:</Text>
                <UniversidadesDropDown value={valueU} setValue={setValueU} />
                <Text style={[styles.label, { marginTop: 20 }]}>Carrera:</Text>
                <CarrerasDropDown
                    value={valueC}
                    setValue={setValueC}
                    university={valueU}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: color.fondo,
    },
    container: {
        backgroundColor: color.fondo,
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === "android" ? 35 : 0,
    },
    label: {
        fontSize: 18,
        paddingVertical: 5,
        color: color.primario,
        fontFamily: "Raleway-Bold",
    },
});
