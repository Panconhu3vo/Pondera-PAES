import {
    StyleSheet,
    SafeAreaView,
    Platform,
    View,
    ScrollView,
} from "react-native";
import Table from "../components/TablaPonderaciones/Table";
import Header from "../components/Header";
import ModifyTable from "../components/ModifyTable";
import { useState } from "react";
import color from "../constants/Colores";

export default function PantallaInicio() {
    const [puntajes, setPuntajes] = useState({});

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        paddingVertical: Platform.OS === "android" ? 35 : 0,
                    }}>
                    <Header textTitle={"Cambia tu puntaje"} />
                    <ModifyTable
                        puntajes={puntajes}
                        setPuntajes={setPuntajes}
                    />
                    <Header textTitle={"Tabla de ponderaciones"} />
                    <Table puntajes={puntajes} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: color.fondo,
    },
});
