import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Platform,
    StatusBar,
} from "react-native";
import Table from "../components/TablaPonderaciones/Table";
import Header from "../components/Header";
import ModifyTable from "../components/ModifyTable";
import { useState } from "react";

export default function PantallaInicio() {
    const [puntajes, setPuntajes] = useState({});

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={{ paddingTop: Platform.OS === "android" && 35 }}>
                <Header textTitle={"Cambia Tu Puntaje"} />
                <ModifyTable puntajes={puntajes} setPuntajes={setPuntajes} />
                <Header textTitle={"Tabla De Ponderaciones"} />
                {console.log(puntajes)}
                <Table puntajes={puntajes} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F5FCFF", // Asegúrate de que el color de fondo de tu Safe Area sea el deseado
    },
});
