import { View, Text, StyleSheet, ScrollView } from "react-native";
import Table from "../components/TablaPonderaciones/Table";
import Header from "../components/Header";
import ModifyTable from "../components/ModifyTable";

export default function PantallaInicio() {
    return (
        <ScrollView>
            <Header textTitle={"Cambia Tu Puntaje"} />
            <ModifyTable />
            <Header textTitle={"Tabla De Ponderaciones"} />
            <Table />
        </ScrollView>
    );
}
