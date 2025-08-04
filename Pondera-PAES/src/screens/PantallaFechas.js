import { View, Text, StyleSheet, FlatList } from "react-native";
import fechas from "../../data/Fechas.json";
import { useState, useEffect } from "react";
import DateBlock from "../components/DateBlock";

export default function PantallaFechas() {
    const [fecha, setFecha] = useState([]);

    useEffect(() => {
        if (fechas) {
            setFecha = fechas;
        } else {
            console.log("No se encontro el archivo");
        }
    }, []);

    return (
        <View>
            <FlatList
                data={fecha}
                keyExtractor={(item, index) => item.año + "_" + index}
                renderItem={<DateBlock dia={item.dia}mes={item.mes}descripcion={item.descripcion} />}
            />
        </View>
    );
}
