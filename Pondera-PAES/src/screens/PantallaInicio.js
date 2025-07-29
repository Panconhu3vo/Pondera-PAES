import { View, Text, StyleSheet } from "react-native";
import Table from "../components/TablaPonderaciones/Table";
import Header from "../components/Header";

export default function PantallaInicio() {
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Header textTitle={"Tabla De Ponderaciones"} />
            <Table />
        </View>
    );
}
