import {
    StyleSheet,
    SafeAreaView,
    Platform,
    View,
    FlatList,
} from "react-native";
import Table from "../components/TablaPonderaciones/Table";
import Header from "../components/Header";
import ModifyTable from "../components/ModifyTable";
import { useState } from "react";
import UniversidadesDropDown from "../components/DropButtons/UniversidadesDropDown";

export default function PantallaInicio() {
    const [puntajes, setPuntajes] = useState({});
    const [open, setOpen] = useState(false);

    // FlatList requiere un array de datos, aunque sea vacío si solo usas el header
    const data = [];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    keyExtractor={(_, index) => index.toString()}
                    scrollEnabled={!open}
                    ListHeaderComponent={
                        <View
                            style={{
                                paddingVertical:
                                    Platform.OS === "android" ? 35 : 0,
                            }}>
                            <Header textTitle={"Selecciona tu carrera"} />
                            <UniversidadesDropDown
                                open={open}
                                setOpen={setOpen}
                            />
                            <Header textTitle={"Cambia tu puntaje"} />
                            <ModifyTable
                                puntajes={puntajes}
                                setPuntajes={setPuntajes}
                            />
                            <Header textTitle={"Tabla de ponderaciones"} />
                            <Table puntajes={puntajes} />
                        </View>
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                    keyboardShouldPersistTaps="handled"
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F5FCFF",
    },
});
