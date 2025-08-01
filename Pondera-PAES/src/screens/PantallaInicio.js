import { StyleSheet, ScrollView, SafeAreaView, Platform } from "react-native";
import Table from "../components/TablaPonderaciones/Table";
import Header from "../components/Header";
import ModifyTable from "../components/ModifyTable";

export default function PantallaInicio() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={{ paddingTop: Platform.OS === "android" && 35 }}>
                <Header textTitle={"Cambia Tu Puntaje"} />
                <ModifyTable />
                <Header textTitle={"Tabla De Ponderaciones"} />
                <Table />
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
